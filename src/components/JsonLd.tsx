import { useEffect, useRef } from 'react'

export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  const ref = useRef<HTMLScriptElement | null>(null)

  useEffect(() => {
    // If a static prerender already placed a script with the same @type in <head>,
    // skip runtime injection to avoid duplicate structured-data blocks.
    const schemaType = data['@type'] as string | undefined
    if (schemaType) {
      const alreadyPresent = Array.from(
        document.head.querySelectorAll('script[type="application/ld+json"]')
      ).some(el => {
        try { return JSON.parse(el.textContent ?? '')['@type'] === schemaType }
        catch { return false }
      })
      if (alreadyPresent) return
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)
    ref.current = script
    return () => {
      if (ref.current?.parentNode) ref.current.parentNode.removeChild(ref.current)
    }
  // data is intentionally static — schemas don't change at runtime
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
