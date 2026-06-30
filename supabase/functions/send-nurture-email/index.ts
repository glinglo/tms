import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { sendEmail } from "../_shared/resend.ts";

interface NurtureEmail {
  subject: string;
  text: string;
}

interface NurturePayload {
  user_id?: string;
  email?: string;
  template?: string;
  business_type?: string | null;
  location?: string | null;
  result_count?: number | null;
}

function getEmail(template: string, payload: NurturePayload): NurtureEmail | null {
  const businessType = payload.business_type ?? "businesses";
  const location = payload.location ?? "your city";

  switch (template) {
    // ── Branch A: Ghost (never searched) ─────────────────────────────────────

    case "ghost_1":
      return {
        subject: "did you find the dashboard okay?",
        text: `Hey,

Noticed you signed up but haven't run a search yet. Wanted to check if everything's working okay on your end -- sometimes people hit a snag with the login.

If you want to give it a go: just go to the dashboard, type a business type and a city, and you'll have a list of leads in about 2 minutes.

https://themapscraper.com/dashboard

Jose`,
      };

    case "ghost_2":
      return {
        subject: "takes 2 minutes, promise",
        text: `Hey,

Still haven't seen a search from you. No worries if the timing's been off.

When you're ready: pick any niche + city you care about and run it. The free plan gives you 25 leads with emails included.

-- Jose`,
      };

    case "ghost_3":
      return {
        subject: "closing your free leads soon",
        text: `Hey,

Your 25 free leads are still sitting there unused. I'll stop bugging you after this.

If you ever need business leads from Google Maps, you know where to find it.

-- Jose`,
      };

    // ── Branch B: Activated (searched, credits remaining) ─────────────────────

    case "activated_1":
      return {
        subject: payload.business_type
          ? `how did the ${payload.business_type} search go?`
          : "how did your first search go?",
        text: `Hey,

Saw you searched for ${businessType} in ${location} -- did the list look useful? Were there emails on most of them?

Curious what you're working on. Just reply if you want to share.

-- Jose`,
      };

    case "activated_2":
      return {
        subject: "what people do with these lists",
        text: `Hey,

Most people who search ${businessType} in ${location} are doing one of two things: cold email outreach or building a prospect list for a client.

If that's you, the free 25 leads is usually enough to test whether it works. When you're ready to scale, paid plans start at €9 for 500 leads.

https://themapscraper.com/pricing

-- Jose`,
      };

    case "activated_3":
      return {
        subject: "when your leads run out",
        text: `Hey,

You've got a few free leads left. When they run out you'll hit a wall -- just wanted to give you a heads up before that happens.

If the tool's been useful, upgrading to 500 leads is €9. No subscription -- leads never expire.

https://themapscraper.com/pricing

-- Jose`,
      };

    // ── Branch C: Exhausted (credits hit 0) ───────────────────────────────────

    case "exhausted_1":
      return {
        subject: "you just ran out of leads",
        text: `Hey,

You just used your last leads searching for ${businessType} in ${location}.

If the list was useful and you need more -- ${location} has hundreds more ${businessType} businesses on Google Maps.

500 more leads for €9, no subscription: https://themapscraper.com/pricing

-- Jose`,
      };

    case "exhausted_2":
      return {
        subject: "what stopped you?",
        text: `Hey,

You ran out of leads a couple days ago and didn't upgrade. No pressure -- just curious what held you back.

Price? Don't need more leads right now? Something didn't work as expected?

A quick reply helps me a lot.

-- Jose`,
      };

    case "exhausted_3":
      return {
        subject: "20% off -- last time I'll mention it",
        text: `Hey,

Last email on this. If TheMapScraper was useful for your ${businessType} search and you want more leads, here's 20% off your first purchase:

https://themapscraper.com/pricing?coupon=promo_1TncfaRgzkWTYE9PiRLmusy1

After this I'll leave you alone.

-- Jose`,
      };

    default:
      return null;
  }
}

serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  let payload: NurturePayload;
  try {
    payload = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { email, template } = payload;

  if (!email || !template) {
    return new Response(JSON.stringify({ error: "email and template are required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const nurtureEmail = getEmail(template, payload);
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
