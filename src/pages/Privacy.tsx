import Canonical from '../components/Canonical'

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

export default function Privacy() {
  return (
    <>
    <Canonical path="/privacy-policy/" />
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
            Privacy Policy
          </h1>
          <p className="font-sans text-[17px] leading-[1.65] text-ink-muted m-0">
            This policy explains what data The Map Scraper collects, why, and how it is
            protected. We keep this short and plain — no legal jargon where we can avoid it.
          </p>
        </div>

        <div className="border-t border-[rgba(32,32,32,0.10)] mb-12" />

        <Section title="Who we are">
          <P>
            The Map Scraper (<strong>themapscraper.com</strong>) is operated as an individual
            based in Barcelona, Spain. For GDPR purposes, The Map Scraper acts as the data
            controller for personal data collected through this website.
          </P>
          <P>
            You can contact us at{' '}
            <a href="mailto:privacy@themapscraper.com" className="text-brand no-underline">
              privacy@themapscraper.com
            </a>.
          </P>
        </Section>

        <Section title="What data we collect">
          <P>We collect only what is necessary to provide the service:</P>
          <UL items={[
            'Email address — used to create and identify your account.',
            'Password — stored as a secure hash via Supabase Auth. We never see your plain-text password.',
            'Search history — the business type and location queries you run, stored so you can re-download past results without re-scraping.',
            'Search results — the Google Maps data returned by your searches, stored temporarily so you can download your CSV.',
            'Payment information — processed entirely by Stripe. We do not store card numbers or bank details on our servers.',
            'Lead balance — the number of leads in your account.',
            'Basic usage data — timestamps of searches and downloads.',
          ]} />
        </Section>

        <Section title="How we use your data">
          <P>Your data is used exclusively to:</P>
          <UL items={[
            'Create and manage your account.',
            'Run searches on your behalf and return results.',
            'Process your lead pack purchases via Stripe.',
            'Let you re-download past search results without using additional leads.',
            'Send transactional emails (e.g. receipt after purchase, low-lead-balance reminder). No marketing emails without your consent.',
          ]} />
          <P>We do not sell, rent, or share your personal data with third parties for marketing purposes.</P>
        </Section>

        <Section title="Third-party processors">
          <P>
            We use the following sub-processors to operate the service. Each is contractually
            bound to handle your data in accordance with GDPR:
          </P>
          <UL items={[
            'Supabase (supabase.com) — database and authentication. Stores your account details and search history. Data hosted in the EU.',
            'Stripe (stripe.com) — payment processing. Handles all card transactions. Stripe is PCI-DSS certified.',
            'Apify (apify.com) — Google Maps scraping infrastructure. Receives your search query to run the scrape. No personal data is shared with Apify beyond the search terms.',
            'Vercel (vercel.com) — website hosting. May process server-side request logs.',
          ]} />
        </Section>

        <Section title="Legal basis for processing (GDPR)">
          <P>We process your personal data under the following legal bases:</P>
          <UL items={[
            'Contract performance — processing your account details and searches is necessary to provide the service you signed up for.',
            'Legitimate interest — storing search history to allow re-downloads without re-scraping.',
            'Legal obligation — retaining payment records as required by Spanish and EU tax law.',
          ]} />
        </Section>

        <Section title="Data retention">
          <P>
            Account data is retained for as long as your account is active. Search results are
            retained for 90 days after the search date, then deleted. Payment records are
            retained for 7 years as required by Spanish tax regulations.
          </P>
          <P>
            If you delete your account, all personal data is deleted within 30 days, except
            payment records which we are legally required to retain.
          </P>
        </Section>

        <Section title="Your rights under GDPR">
          <P>If you are located in the EU or UK, you have the right to:</P>
          <UL items={[
            'Access — request a copy of the personal data we hold about you.',
            'Rectification — ask us to correct inaccurate data.',
            'Erasure — ask us to delete your data (subject to legal retention obligations).',
            'Portability — receive your data in a machine-readable format.',
            'Restriction — ask us to pause processing your data in certain circumstances.',
            'Objection — object to processing based on legitimate interest.',
            'Withdraw consent — where processing is based on consent, you may withdraw it at any time.',
          ]} />
          <P>
            To exercise any of these rights, email{' '}
            <a href="mailto:privacy@themapscraper.com" className="text-brand no-underline">
              privacy@themapscraper.com
            </a>. We will respond within 30 days.
          </P>
          <P>
            You also have the right to lodge a complaint with the Spanish Data Protection
            Authority (AEPD) at{' '}
            <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-brand no-underline">
              aepd.es
            </a>.
          </P>
        </Section>

        <Section title="Cookies">
          <P>
            We use only functional cookies necessary for authentication (session tokens) and
            payment processing (Stripe). We do not use tracking or advertising cookies. No
            cookie consent banner is shown because we only use strictly necessary cookies.
          </P>
        </Section>

        <Section title="Security">
          <P>
            All data is transmitted over HTTPS. Passwords are hashed using bcrypt via
            Supabase Auth. Database access is restricted to application-level credentials with
            minimum required permissions. We do not log or store raw passwords at any point.
          </P>
        </Section>

        <Section title="Changes to this policy">
          <P>
            If we make material changes, we will update the "Last updated" date at the top of
            this page. For significant changes, we will notify you by email.
          </P>
        </Section>

        <Section title="Contact">
          <P>
            Questions about this policy? Email us at{' '}
            <a href="mailto:privacy@themapscraper.com" className="text-brand no-underline">
              privacy@themapscraper.com
            </a>.
          </P>
        </Section>

      </div>
    </main>
    </>
  )
}
