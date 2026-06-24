<div align="center">

<img src="src/assets/serphouse-logo.png" alt="SERPHouse logo" width="80" />

# @serphouse/serphouse-nodejs

**The official Node.js SDK for live SERP data — Google, Bing, Yahoo, and SEO intelligence — powered by [SERPHouse](https://serphouse.com).**

Run Google, Bing, and Yahoo searches, resolve locations, and query Jobs, Local, Videos, and more — directly from your Node.js app or TypeScript project. Structured JSON in, production-ready results out.

<br />

[![TypeScript 5+](https://img.shields.io/badge/TypeScript-5%2B-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js 18+](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![npm](https://img.shields.io/npm/v/%40serphouse%2Fserphouse-nodejs?logo=npm)](https://www.npmjs.com/package/@serphouse/serphouse-nodejs)
[![Tests](https://img.shields.io/github/actions/workflow/status/SERPHouse/serphouse-nodejs/run-tests.yml?logo=githubactions&label=Tests)](https://github.com/SERPHouse/serphouse-nodejs/actions/workflows/run-tests.yml)
[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

[![Website](https://img.shields.io/badge/Website-serphouse.com-7B42BC)](https://serphouse.com)
[![API Docs](https://img.shields.io/badge/API-Docs-7B42BC)](https://docs.serphouse.com/)
[![GitHub](https://img.shields.io/badge/GitHub-SERPHouse-181717?logo=github)](https://github.com/SERPHouse/serphouse-nodejs)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-SERPHouse-0A66C2?logo=linkedin)](https://linkedin.com/company/serphouse)

</div>

---

## Table of Contents

- [Why This SDK](#why-this-sdk)
- [Quick Start](#quick-start)
- [What You Can Build](#what-you-can-build)
- [SDK Overview](#sdk-overview)
- [Client Options](#client-options)
- [Responses & Errors](#responses--errors)
- [TypeScript](#typescript)
- [Development](#development)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Why This SDK

| | |
|---|---|
| **20 API methods** | Google, Bing, and Yahoo SERP plus Google verticals and account utilities — all typed and ready to call |
| **Zero boilerplate** | Auth headers, JSON parsing, and error mapping are handled for you |
| **Two call styles** | Use namespaced methods (`client.google.search`) or flat aliases (`client.google_search`) — same underlying API |
| **TypeScript-first** | Exported types for every search engine, parameter set, and response shape |
| **JSON or HTML** | Request structured JSON by default, or pass `responseType: 'html'` when you need raw markup |

---

## Quick Start

**1.** Get your API key from the [SERPHouse Dashboard](https://app.serphouse.com/register).

**2.** Install the package:

```bash
npm install @serphouse/serphouse-nodejs
```

**3.** Create a client and run your first search:

```ts
import { SERPHouse } from '@serphouse/serphouse-nodejs';

const client = new SERPHouse('YOUR_API_KEY');

const { results } = await client.google.search({
  q: 'Fresh Bagels',
  domain: 'google.com',
  lang: 'en',
  device: 'desktop',
  loc: 'New York,United States',
});
```

> **CommonJS?** `const { SERPHouse } = require('@serphouse/serphouse-nodejs');` works the same way.

---

## What You Can Build

For SEO teams, agencies, and SaaS builders who need live search data inside their own applications — no scrapers, no proxy management, no captcha headaches.

| Use case | SDK call |
|----------|----------|
| **Track rankings** | `client.google.search({ q: 'crm software', loc: 'United States', … })` |
| **Beat competitors** | `client.google.search` with `page` and `date_range` filters |
| **Own local search** | `client.google.local({ q: 'emergency plumber', loc: 'Chicago,Illinois,United States', … })` |
| **Discover keywords** | `client.google.autocomplete({ q: 'best saas for', … })` — 5 credits/request |
| **Monitor on Bing** | `client.bing.search({ q: 'your brand', loc: 'United States', device: 'mobile', … })` |
| **Multi-engine coverage** | `client.yahoo.news` alongside `client.google.news` for the same query |
| **Resolve locations** | `client.extra.location_search({ q: 'Austin', type: 'google' })` → use `loc` or `loc_id` in searches |

---

## SDK Overview

The `SERPHouse` client groups **20 methods** across four namespaces. Google and Bing search endpoints require exactly one location field — `loc` (e.g. `Austin,Texas,United States`) or `loc_id` (from `extra.location_search`). Never send both or omit both. Yahoo SERP methods do not require location.

### Reference

| Method | Description | Docs |
|--------|-------------|------|
| `extra.account_info` | Account balance, plan, and credit usage | [Account Info](https://docs.serphouse.com/extra-apis/account-info) |
| `extra.domain_list` | Supported Google, Bing, and Yahoo domains | [Domains List](https://docs.serphouse.com/extra-apis/domains-list) |
| `extra.language_list` | Language codes by engine (`google` \| `bing` \| `yahoo`) | [Languages List](https://docs.serphouse.com/extra-apis/languages-list) |
| `extra.location_search` | Resolve city/country names to `loc_id` | [Locations List](https://docs.serphouse.com/extra-apis/locations-list) |

### Google

| Method | Alias | Description | Docs |
|--------|-------|-------------|------|
| `google.search` | `google_search` | Web search | [Search API](https://docs.serphouse.com/google-apis/google-search-api) |
| `google.image` | `google_image` | Image search | [Image API](https://docs.serphouse.com/google-apis/google-image-api) |
| `google.news` | `google_news` | News search | [News API](https://docs.serphouse.com/google-apis/google-news-api) |
| `google.shopping` | `google_shopping` | Shopping & products | [Shopping API](https://docs.serphouse.com/google-apis/google-shopping-api) |
| `google.video` | `google_video` | Video results | [Videos API](https://docs.serphouse.com/google-apis/google-videos-api) |
| `google.short_video` | `google_short_video` | Shorts, TikTok, Reels | [Short Videos API](https://docs.serphouse.com/google-apis/google-short-videos-api) |
| `google.local` | `google_local` | Local / Maps listings | [Local API](https://docs.serphouse.com/google-apis/google-local-api) |
| `google.jobs` | `google_jobs` | Job listings | [Jobs API](https://docs.serphouse.com/google-apis/google-jobs-api) |
| `google.forums` | `google_forums` | Forum & discussion results | [Forums API](https://docs.serphouse.com/google-apis/google-forums-api) |
| `google.autocomplete` | `google_autocomplete` | Autocomplete suggestions | [Autocomplete API](https://docs.serphouse.com/google-apis/google-autocomplete-api) |

### Bing

| Method | Alias | Description | Docs |
|--------|-------|-------------|------|
| `bing.search` | `bing_search` | Web search | [Search API](https://docs.serphouse.com/bing-apis/bing-search-api) |
| `bing.image` | `bing_image` | Image search | [Image API](https://docs.serphouse.com/bing-apis/bing-image-api) |
| `bing.news` | `bing_news` | News search | [News API](https://docs.serphouse.com/bing-apis/bing-news-api) |

### Yahoo

| Method | Alias | Description | Docs |
|--------|-------|-------------|------|
| `yahoo.search` | `yahoo_search` | Web search | [Search API](https://docs.serphouse.com/yahoo-apis/yahoo-search-api) |
| `yahoo.image` | `yahoo_image` | Image search | [Image API](https://docs.serphouse.com/yahoo-apis/yahoo-image-api) |
| `yahoo.news` | `yahoo_news` | News search | [News API](https://docs.serphouse.com/yahoo-apis/yahoo-news-api) |

> Endpoint-level parameter details live in the [`doc/`](doc/) folder and on [docs.serphouse.com](https://docs.serphouse.com/).

---

## Client Options

Pass a second argument to the constructor to customize behavior:

| Option | Default | Description |
|--------|---------|-------------|
| `baseUrl` | `https://api.serphouse.com` | API base URL |
| `timeout` | `60000` | Request timeout in milliseconds |

Authentication is key-only — pass your API key as the first constructor argument. The SDK sends it as a `Bearer` token on every request.

---

## Responses & Errors

| | |
|---|---|
| **Success shape** | `{ status: 'success', msg: string, results: T }` — every method returns a Promise resolving to this |
| **HTML responses** | Pass `{ responseType: 'html' }` as the second argument on any POST method |
| **Errors** | Failed requests throw `SERPHouseError` with `statusCode`, `apiMessage`, and `apiError` fields |
| **Validation** | API validation errors arrive as structured field messages inside `apiError` |

---

## TypeScript

Types ship with the package — no `@types` install needed.

| Export | Purpose |
|--------|---------|
| `SERPHouse` | Main client class |
| `SERPHouseError` | Typed error for failed API calls |
| `GoogleSearchParams` | Parameters for all Google endpoints |
| `BingSearchParams` | Parameters for Bing endpoints |
| `YahooSearchParams` / `YahooImageParams` | Parameters for Yahoo endpoints |
| `ApiSuccessResponse` | Success response wrapper |
| `RequestOptions` | Per-request options (`responseType`) |

---

## Development

```bash
git clone https://github.com/SERPHouse/serphouse-nodejs.git
cd serphouse-nodejs
npm install
```

| Command | Description |
|---------|-------------|
| `npm run build` | Compile TypeScript to `lib/` |
| `npm run dev` | Watch mode — recompile on change |
| `npm test` | Run Jest tests (requires `API_KEY` in `.env`) |
| `npm run lint` | ESLint on `src/` |

Copy `.env.example` to `.env` and add your API key before running integration tests.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `API key is required` | Pass a non-empty string to `new SERPHouse('…')` |
| Invalid key | Verify your key in the [SERPHouse dashboard](https://serphouse.com) |
| Credit exhausted | Check balance with `client.extra.account_info()` |
| Location error | For Google and Bing, include `loc` or `loc_id` (not both); use `extra.location_search` to resolve IDs |
| Request timed out | Increase `timeout` in client options or check network connectivity |
| Type errors | Import parameter types from `@serphouse/serphouse-nodejs` — see [TypeScript](#typescript) |

---

## Contributing

Contributions are welcome. Please keep changes focused and match existing code style.

```bash
git checkout -b feature/your-feature
npm install
npm run build
npm test
git commit -m "Add your feature"
git push origin feature/your-feature
```

Then open a Pull Request. Update this README if you change setup, configuration, or public API surface.

---

## License

[MIT License](LICENSE) — Copyright SERPHouse.
