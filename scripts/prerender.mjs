/**
 * Post-build pre-rendering script.
 *
 * Reads dist/index.html as a template, then for every route in
 * prerender.routes.mjs writes a dist/<path>/index.html with:
 *   - Route-specific <title>, <meta name="description">, og/twitter tags, canonical
 *   - Route-specific JSON-LD schemas as static <script> tags
 *
 * Vercel serves static files before applying rewrites, so these HTML files
 * are returned directly to crawlers without JavaScript execution.
 *
 * To add a new page: append its entry to scripts/prerender.routes.mjs.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { routes } from './prerender.routes.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = join(__dirname, '..', 'dist')

// Load the SSR renderer built by `vite build --config vite.ssr.config.ts`
let ssrRender = null
try {
  const ssrEntry = join(__dirname, '..', 'dist-ssr', 'entry-server.js')
  const { render } = await import(ssrEntry)
  ssrRender = render
  console.log('  SSR renderer loaded\n')
} catch {
  console.warn('  SSR renderer not found — body content will not be injected\n')
}

function esc(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function buildHtml(template, { title, description, ogTitle, ogDescription, ogUrl, canonical, schemas, bodyHtml }) {
  let html = template

  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${esc(title)}</title>`,
  )
  html = html.replace(
    /<meta name="description" content="[^"]*"\s*\/>/,
    `<meta name="description" content="${esc(description)}" />`,
  )
  html = html.replace(
    /<meta property="og:title" content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${esc(ogTitle)}" />`,
  )
  html = html.replace(
    /<meta property="og:description" content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${esc(ogDescription)}" />`,
  )
  html = html.replace(
    /<meta property="og:url" content="[^"]*"\s*\/>/,
    `<meta property="og:url" content="${esc(ogUrl)}" />`,
  )
  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${esc(canonical)}" />`,
  )
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"\s*\/>/,
    `<meta name="twitter:title" content="${esc(ogTitle)}" />`,
  )
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"\s*\/>/,
    `<meta name="twitter:description" content="${esc(ogDescription)}" />`,
  )

  if (schemas && schemas.length > 0) {
    const schemaHtml = schemas
      .map(s => `  <script type="application/ld+json">${JSON.stringify(s)}</script>`)
      .join('\n')
    html = html.replace('</head>', `${schemaHtml}\n</head>`)
  }

  if (bodyHtml) {
    html = html.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`)
  }

  return html
}

const template = readFileSync(join(distDir, 'index.html'), 'utf-8')

let ok = 0
let fail = 0

for (const route of routes) {
  try {
    const { path, title, description, ogTitle, ogDescription, schemas, renderSsr } = route
    const canonical = `https://www.themapscraper.com${path}`
    const resolvedOgTitle = ogTitle ?? title
    const resolvedOgDesc = ogDescription ?? description

    let bodyHtml = ''
    if (renderSsr && ssrRender) {
      try {
        bodyHtml = ssrRender(path)
      } catch (ssrErr) {
        console.warn(`  SSR render failed for ${path}: ${ssrErr.message}`)
      }
    }

    const html = buildHtml(template, {
      title,
      description,
      ogTitle: resolvedOgTitle,
      ogDescription: resolvedOgDesc,
      ogUrl: canonical,
      canonical,
      schemas: schemas ?? [],
      bodyHtml,
    })

    let outputPath
    if (path === '/') {
      outputPath = join(distDir, 'index.html')
    } else {
      const cleanPath = path.replace(/^\//, '').replace(/\/$/, '')
      const dir = join(distDir, cleanPath)
      mkdirSync(dir, { recursive: true })
      outputPath = join(dir, 'index.html')
    }

    writeFileSync(outputPath, html, 'utf-8')
    console.log(`  ✓  ${path}`)
    ok++
  } catch (err) {
    console.error(`  ✗  ${route.path}: ${err.message}`)
    fail++
  }
}

console.log(`\nPre-rendered ${ok} routes${fail > 0 ? `, ${fail} errors` : ''}.\n`)
if (fail > 0) process.exit(1)
