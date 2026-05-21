const LAST_UPDATED = 'May 2026'

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <h2
      className="font-display font-bold tracking-[-0.02em] leading-[1.2] text-ink m-0 mb-4"
      style={{ fontSize: 'clamp(20px, 2.5vw, 26px)' }}
    >
      {title}
    </h2>
    <div className="font-sans text-[15px] leading-[1.75] text-[#3a3a3a]">
      {children}
    </div>
  </div>
)

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="m-0 mb-[14px]">{children}</p>
)

const UL = ({ items }: { items: string[] }) => (
  <ul className="m-0 mb-[14px] pl-5 flex flex-col gap-[6px]">
    {items.map((item, i) => <li key={i}>{item}</li>)}
  </ul>
)

export default function Terms() {
  return (
    <main className="bg-cream px-6 pt-20 pb-24">
      <div className="max-w-[680px] mx-auto">

        <div className="mb-14">
          <p className="font-sans text-xs font-semibold text-ink-faint uppercase tracking-[0.06em] m-0 mb-3">
            Last updated: {LAST_UPDATED}
          </p>
          <h1
            className="font-display font-extrabold leading-none tracking-[-0.03em] text-ink m-0 mb-5"
            style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}
          >
            Terms of Service
          </h1>
          <p className="font-sans text-[17px] leading-[1.65] text-ink-muted m-0">
            By creating an account or using The Map Scraper, you agree to these terms.
            Please read them — they are written to be understood, not to confuse.
          </p>
        </div>

        <div className="border-t border-[rgba(32,32,32,0.10)] mb-12" />

        <Section title="The service">
          <P>
            The Map Scraper (<strong>themapscraper.com</strong>) is a tool that searches Google
            Maps on your behalf and returns publicly available business data as a downloadable
            CSV file. It is operated as an individual based in Barcelona, Spain.
          </P>
          <P>
            The service is provided "as is". While we work to keep it reliable, we do not
            guarantee 100% uptime or the completeness of any scraping result.
          </P>
        </Section>

        <Section title="Your account">
          <P>
            You must provide a valid email address and a password to create an account. You
            are responsible for keeping your credentials secure. Do not share your account.
          </P>
          <P>
            You must be at least 16 years old to use this service (GDPR minimum age for
            digital services in Spain).
          </P>
        </Section>

        <Section title="Acceptable use">
          <P>You may use The Map Scraper to collect publicly available business data for:</P>
          <UL items={[
            'Your own sales, marketing, or research purposes.',
            'Client work on their behalf, provided the client is the end user of the data.',
            'Internal business intelligence.',
          ]} />
          <P>You may not:</P>
          <UL items={[
            'Resell scraped data to third parties without adding substantial value or transformation.',
            'Build or operate a competing scraping service using data or methods derived from this platform.',
            'Attempt to reverse-engineer, scrape, or extract the underlying scraping infrastructure.',
            'Use the data to send unsolicited bulk communications (spam) in violation of applicable law.',
            'Use the service in any way that violates applicable local, national, or international law.',
          ]} />
        </Section>

        <Section title="Credits">
          <P>
            Access to full search results requires credits. One credit equals one lead row
            in the exported CSV.
          </P>
          <UL items={[
            'Credits are purchased in packs via Stripe.',
            'Credits never expire — they remain in your account indefinitely.',
            'Credits are non-refundable. If your search returns fewer results than expected, you are only charged for the leads actually returned.',
            'Credits are non-transferable between accounts.',
          ]} />
        </Section>

        <Section title="Payments">
          <P>
            All payments are processed by Stripe. By purchasing credits, you agree to
            Stripe's terms of service. The Map Scraper does not store your card details.
          </P>
          <P>
            Prices are listed in Euros (€) and include any applicable taxes unless stated
            otherwise.
          </P>
        </Section>

        <Section title="Data and privacy">
          <P>
            Our use of your personal data is described in our{' '}
            <a href="/privacy" className="text-brand no-underline">
              Privacy Policy
            </a>
            . By using the service, you confirm you have read and understood it.
          </P>
          <P>
            You are responsible for ensuring your use of the exported data complies with
            applicable data protection laws in your jurisdiction, including GDPR if applicable.
          </P>
        </Section>

        <Section title="The scraped data">
          <P>
            All data returned by The Map Scraper is sourced from publicly available listings
            on Google Maps. We do not access private, login-protected, or non-public data.
          </P>
          <P>
            We make no warranties about the accuracy, freshness, or completeness of any
            scraped data. Results depend on what Google Maps returns at the time of the search.
          </P>
          <P>
            The Map Scraper is not affiliated with, endorsed by, or connected to Google LLC.
          </P>
        </Section>

        <Section title="Account termination">
          <P>
            You may delete your account at any time from your dashboard settings. On deletion,
            your personal data will be removed within 30 days (see Privacy Policy for retention
            obligations).
          </P>
          <P>
            We reserve the right to suspend or terminate accounts that violate these terms,
            particularly the acceptable use rules above. In cases of clear abuse, termination
            may be immediate and without prior notice. Unused credits will not be refunded upon
            termination for breach.
          </P>
        </Section>

        <Section title="Limitation of liability">
          <P>
            To the maximum extent permitted by law, The Map Scraper is not liable for any
            indirect, incidental, or consequential damages arising from your use of the service
            or the data it returns.
          </P>
          <P>
            Our total liability to you for any claim arising from use of the service is limited
            to the amount you paid for credits in the 30 days preceding the claim.
          </P>
        </Section>

        <Section title="Changes to these terms">
          <P>
            We may update these terms from time to time. We will update the "Last updated"
            date at the top of this page. For material changes, we will notify you by email
            at least 14 days before they take effect. Continued use after that date constitutes
            acceptance of the new terms.
          </P>
        </Section>

        <Section title="Governing law">
          <P>
            These terms are governed by the laws of Spain. Any disputes will be subject to
            the exclusive jurisdiction of the courts of Barcelona, Spain.
          </P>
        </Section>

        <Section title="Contact">
          <P>
            Questions about these terms? Email{' '}
            <a href="mailto:privacy@themapscraper.com" className="text-brand no-underline">
              privacy@themapscraper.com
            </a>.
          </P>
        </Section>

      </div>
    </main>
  )
}
