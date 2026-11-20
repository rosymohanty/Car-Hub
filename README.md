# Car Hub – Car Showcase

A car rental showcase built with **Next.js 16 (App Router)**, **React 19**, **TypeScript** and **Tailwind CSS v4**. Browse a catalogue of cars, filter by manufacturer, model, fuel type and year, view details in a modal, and load more results.

## Features

- Hero section with smooth scroll to the catalogue
- Search by manufacturer (searchable dropdown) and model
- Filters for fuel type and year, stored in the URL search params
- Car cards with estimated daily rental price
- Car details modal (Headless UI Dialog)
- "Show More" pagination
- Server-side data fetching with Suspense streaming
- Fully responsive layout

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack, Cache Components) |
| UI | React 19, TypeScript |
| Styling | Tailwind CSS v4 (`@theme` in CSS) |
| Components | Headless UI v2 (Combobox, Listbox, Dialog) |
| Data | [API Ninjas Cars API](https://api-ninjas.com/api/cars) |
| Images (optional) | [imagin.studio](https://www.imagin.studio/) |

## Getting Started

### Prerequisites

- Node.js 20.9 or later
- npm
- A free API key from [api-ninjas.com](https://api-ninjas.com/)

### Installation

```bash
git clone <your-repo-url>
cd car_showcase
npm install
```

### Environment variables

Create a `.env.local` file in the project root:

```env
# Required: server-side key for the cars data
API_NINJAS_KEY=your_api_ninjas_key

# Optional: only needed if you use imagin.studio car images
NEXT_PUBLIC_IMAGIN_API_KEY=your_imagin_key
```

> Do not commit `.env.local`. Restart the dev server after changing it.

### Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other scripts

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # lint the code
```

## Project Structure

```
car_showcase/
├── app/
│   ├── globals.css        # Tailwind v4 theme + custom classes
│   ├── layout.tsx         # Root layout (Navbar, Footer)
│   └── page.tsx           # Home page (catalogue, Suspense)
├── components/
│   ├── CarCard.tsx
│   ├── CarDetails.tsx     # Details modal
│   ├── CustomButton.tsx
│   ├── CustomFilter.tsx   # Fuel / year dropdown
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── SearchBar.tsx
│   ├── SearchManufacturer.tsx
│   ├── ShowMore.tsx
│   └── index.ts           # Barrel file
├── constants/index.ts     # Manufacturers, fuels, years, footer links
├── types/index.ts         # TypeScript interfaces
├── utils/index.ts         # fetchCars, rent calculation, URL helpers
└── public/                # Icons and images
```

## How It Works

1. `SearchBar` and `CustomFilter` update the URL search params (`manufacturer`, `model`, `fuel`, `year`, `limit`).
2. `app/page.tsx` reads the params and passes them to `fetchCars` inside a `<Suspense>` boundary.
3. `fetchCars` (in `utils/index.ts`) calls the API Ninjas Cars API on the server, so the API key is never exposed to the browser.
4. Results render as `CarCard` components. "Show More" increases the `limit` param.

## Known Limitations (API Ninjas free plan)

- Each request returns very few cars (often one per make), so with no manufacturer selected the app queries several makes and merges the results.
- Fields such as `city_mpg`, `highway_mpg` and `combination_mpg` are premium-only. The app falls back to an estimate for the price and shows "N/A" for MPG.
- Each make is one API request, so avoid reloading repeatedly to stay inside your free quota.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| "Oops, no results" | Check the terminal for `API Ninjas error:` lines and confirm `API_NINJAS_KEY` is set. |
| `Module not found: Can't resolve '@utils'` | Use `@/utils`, `@/types`, `@/components`, `@/constants` imports. |
| `hostname "cdn.imagin.studio" is not configured` | Add the host under `images.remotePatterns` in `next.config.ts`, or use local images. |
| Styles not applied | Make sure `globals.css` starts with `@import "tailwindcss";` (Tailwind v4). |
| Stale errors after changes | Run `rm -rf .next && npm run dev`. |

## Author

**Rojalin Mohanty**
GitHub: [github.com/rosymohanty](https://github.com/rosymohanty)

## License

This project is for learning and portfolio purposes.
