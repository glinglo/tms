import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { sendEmail } from "../_shared/resend.ts";

serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  let body: { user_id?: string; email?: string; credits_remaining?: number; plan?: string; business_type?: string; location?: string };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { email, credits_remaining, business_type, location } = body;

  if (!email || credits_remaining === undefined) {
    return new Response(JSON.stringify({ error: "email and credits_remaining are required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  let subject: string;
  let text: string;

  if (credits_remaining === 0) {
    if (business_type && location) {
      subject = `Want more leads from ${location}?`;
      text = `Hey,

Looking for more ${business_type} in ${location}?

For just €9 you get 500 leads: https://themapscraper.com/pricing

Jose`;
    } else {
      subject = "Your free leads are gone";
      text = `Hey,

Your free leads are gone. For just €9 you get 500 leads:
https://themapscraper.com/pricing

Jose`;
    }
  } else {
    subject = "You're running low on leads";
    text = `Hey,

Just a heads up — you're down to ${credits_remaining} leads on your TheMapScraper account.

Once they run out, scrapes will pause until you top up.

You can grab more here: https://themapscraper.com/pricing

Let me know if you have any questions.

Jose`;
  }

  const result = await sendEmail({ to: email, subject, text });

  if (!result.success) {
    return new Response(JSON.stringify({ error: result.error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ sent: true, id: result.id }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});

// Deploy: supabase functions deploy send-low-credits-email
