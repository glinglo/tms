import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { sendEmail } from "../_shared/resend.ts";

interface NurtureEmail {
  subject: string;
  text: string;
}

function getEmail(template: string): NurtureEmail | null {
  switch (template) {
    case "nurture_1":
      return {
        subject: "Did you get your first leads?",
        text: `Hey, just checking in — did you get a chance to try TheMapScraper yet?

If you ran your first scrape, I'd love to know what you searched for.

If not, here's the link to get started: https://themapscraper.com/dashboard

Takes about 2 minutes.

— Jose`,
      };

    case "nurture_2":
      return {
        subject: "The problem with manual prospecting",
        text: `Hey, most people who sign up for TheMapScraper are trying to stop doing one thing: manually copying business info from Google Maps into a spreadsheet.

It's slow, error-prone, and honestly just painful.

If that sounds familiar, the paid plan lets you pull 500+ leads at a time with emails included.

Worth a look: https://themapscraper.com/pricing

— Jose`,
      };

    case "nurture_3":
      return {
        subject: "How agencies use TheMapScraper",
        text: `Hey, one of the most common use cases I see: agencies scraping leads by city + niche (e.g. 'plumbers in Chicago') to build prospecting lists for their clients.

The free plan gives you 50 leads/month to test it.

If you need more — or want emails included — the paid plans start at €9/month: https://themapscraper.com/pricing

— Jose`,
      };

    case "nurture_4":
      return {
        subject: "Last thing — 20% off if you upgrade this week",
        text: `Hey, you've been on the free plan for a couple weeks now.

If TheMapScraper's been useful and you want to unlock more leads + email enrichment, I'll give you 20% off your first month.

Just reply 'upgrade' and I'll send you the link.

— Jose`,
      };

    default:
      return null;
  }
}

serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  let body: { user_id?: string; email?: string; template?: string };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { email, template } = body;

  if (!email || !template) {
    return new Response(JSON.stringify({ error: "email and template are required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const nurtureEmail = getEmail(template);
  if (!nurtureEmail) {
    return new Response(JSON.stringify({ error: `Unknown nurture template: ${template}` }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const result = await sendEmail({
    to: email,
    subject: nurtureEmail.subject,
    text: nurtureEmail.text,
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

// Deploy: supabase functions deploy send-nurture-email
