export async function startCheckout(priceId: string, userId: string, userEmail: string): Promise<void> {
  const res = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ priceId, userId, userEmail }),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error((body as { error?: string }).error ?? 'Failed to create checkout session')
  }
  const { url } = await res.json() as { url: string }
  if (url) window.location.href = url
}
