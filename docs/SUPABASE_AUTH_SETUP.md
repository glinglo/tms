# Supabase Auth — production URLs

Apply these in [Supabase Dashboard](https://supabase.com/dashboard) → your project → **Authentication** → **URL configuration**.

## Site URL

```
https://www.themapscraper.com
```

## Redirect URLs

Add each line (Supabase accepts wildcards):

```
https://www.themapscraper.com/**
https://themapscraper.com/**
http://localhost:5173/**
http://localhost:5174/**
http://localhost:3000/**
http://localhost:3001/**
```

If you use Vercel preview deployments, also add:

```
https://*.vercel.app/**
```

## Email confirmations

With `emailRedirectTo` set in the app, confirmation links send users to:

`https://www.themapscraper.com/dashboard`

Ensure that path is allowed by the redirect URLs above.

## Optional env (Vercel Production)

| Variable | Value |
|----------|--------|
| `SITE_URL` | `https://www.themapscraper.com` |
| `VITE_SITE_URL` | `https://www.themapscraper.com` |

`SITE_URL` is used by Stripe checkout success/cancel URLs.  
`VITE_SITE_URL` is used for sign-up email redirects when not on localhost.
