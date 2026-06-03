import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { sendEmail } from "../_shared/resend.ts";

serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  let body: { user_id?: string; email?: string; first_name?: string };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { email, first_name } = body;

  if (!email) {
    return new Response(JSON.stringify({ error: "email is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const name = first_name?.trim() || "there";

  const result = await sendEmail({
    to: email,
    subject: "Welcome to TheMapScraper 👋",
    text: `Hey ${name},

Thanks for signing up to TheMapScraper — really appreciate it.

Quick question while you're getting started: what are you hoping to use it for? Even a one-liner helps me understand how people are using it.

Just reply to this email.

Jose
themapscraper.com`,
  });

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

// Deploy: supabase functions deploy send-welcome-email
