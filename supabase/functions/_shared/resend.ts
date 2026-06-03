interface SendEmailOptions {
  to: string;
  subject: string;
  text: string;
}

interface SendEmailResult {
  success: boolean;
  id?: string;
  error?: string;
}

export async function sendEmail(opts: SendEmailOptions): Promise<SendEmailResult> {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) {
    return { success: false, error: "RESEND_API_KEY is not set" };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Jose from TheMapScraper <jose@themapscraper.com>",
      to: [opts.to],
      subject: opts.subject,
      text: opts.text,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    return { success: false, error: data?.message ?? `HTTP ${res.status}` };
  }

  return { success: true, id: data.id };
}
