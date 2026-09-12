<div align="center">
  <h1>flowroute</h1>
  <p><b>Stop wasting time in traffic — leave at the right minute.</b><br/>A Next.js landing site with a working traffic-route analyzer that scans a departure window and tells you when to leave and which route to take.</p>
  <p>
    <a href="LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-blue.svg"></a>
    <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black?logo=next.js">
    <img alt="React" src="https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white">
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white">
    <img alt="Google Routes API" src="https://img.shields.io/badge/Google-Routes%20API-4285F4?logo=googlemaps&logoColor=white">
    <img alt="Leaflet" src="https://img.shields.io/badge/Leaflet-1.9-199900?logo=leaflet&logoColor=white">
  </p>
</div>

---

flowroute analyzes traffic patterns across a departure window and shows, minute
by minute, how long the same trip would take if you left then — so you can pick
the slot that saves the most time. It is a full marketing site (hero, blog,
contact) built around a real analyzer that talks to Google's Routes API.

## Features

- **Departure-window analysis.** Give an origin, a destination and an optional
  time window; the analyzer builds 10-minute departure slots across the window
  and returns a timeline of predicted travel times, the best and worst slots,
  and how many minutes you'd save by leaving at the best one.
- **Ranked route alternatives.** For the best slot it fetches up to three route
  alternatives, ranked by traffic-aware duration, with distance, Google's route
  labels (e.g. `FUEL_EFFICIENT`, `SHORTER_DISTANCE`) and an encoded polyline
  drawn on the map.
- **Interactive map.** Routes are rendered on a Leaflet / react-leaflet map by
  decoding Google's polylines client-side.
- **Address autocomplete.** Origin and destination fields autocomplete through
  the [Photon](https://photon.komoot.io) geocoder (no key required), with
  reverse geocoding support.
- **Future-window projection.** Google's traffic-aware model only predicts for
  future timestamps, so a window in the past is projected forward to the next
  occurrence of the same weekday and flagged in the response.
- **Demo mode.** Without a Google API key the API returns synthesized durations
  so the UI can be developed and demoed offline.
- **In-memory caching.** Duration lookups are cached by origin, destination,
  day-of-week and 10-minute bucket, with a configurable TTL.
- **Content pages.** A blog (with per-slug pages), a contact page and analytics
  wiring round out the site.

## Tech stack

- **Framework:** Next.js 16 (App Router) with React 19 and TypeScript
- **UI:** shadcn/ui on Radix primitives, Tailwind CSS v4, Framer Motion, `lucide-react`
- **Maps:** Leaflet + react-leaflet
- **Validation:** Zod (request-body schema on the API route)
- **Traffic data:** Google Routes API — `directions/v2:computeRoutes` and
  `distanceMatrix/v2:computeRouteMatrix`
- **Geocoding:** Photon (Komoot)
- **Deploy target:** Vercel

## API

```
POST /api/analyze-route
```

```jsonc
{
  "origin": "Zurich HB",
  "destination": "Bern",
  "start_time": "08:00",   // optional; defaults to now
  "end_time": "10:00"      // optional; defaults to start + 2h
}
```

The response includes `current_duration`, `best_duration` /
`best_departure_time`, `worst_duration` / `worst_departure_time`, `time_saved`,
the full `timeline` of slots, the resolved `window_start` / `window_end`,
`projected_to_next_week`, `demo_mode` and the ranked `routes` array.

## Getting started

```bash
# install (pnpm, npm or yarn — a pnpm lockfile is committed)
pnpm install

# configure secrets
cp .env.example .env.local
# then edit .env.local (see below)

pnpm dev        # http://localhost:3000
pnpm build      # production build
pnpm start      # serve the production build
pnpm lint       # eslint
```

### Environment variables

Copy `.env.example` to `.env.local` for local development; in production, set
these as Project Environment Variables in Vercel — never commit real keys.

| Variable | Required | Purpose |
|---|---|---|
| `GOOGLE_MAPS_API_KEY` | For live data | Server-side only. Powers the Routes API calls. Enable the **Routes API** on this key in the Google Cloud Console. Without it, `/api/analyze-route` runs in demo mode with synthesized durations. |
| `CACHE_TTL_SECONDS` | No | TTL (seconds) for cached duration lookups. Defaults to `1200` (20 min). |

Keep the key server-side — it is read from `process.env.GOOGLE_MAPS_API_KEY`
inside the API route and is never exposed to the client.

## License

Released under the [MIT License](LICENSE) © 2026 Olivier Lüthy. You're free to use, modify and distribute this
software, including commercially, as long as the copyright notice and license are included.

## Author

Built by **Olivier Lüthy** — [GitHub](https://github.com/olivierluethy).
