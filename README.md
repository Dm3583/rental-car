# Rental Car

A web app for a car rental company. Users can browse the car catalog, filter it by brand, hourly price and mileage, open a car's details page and send a booking request.

**Live demo:** https://rental-car-two-khaki.vercel.app

## Features

- **Home page**: a hero banner with a link to the catalog.
- **Catalog**:
  - Filter by brand, maximum price per hour and mileage range. Filtering happens on the backend.
  - Filters are stored in the URL, so a filtered catalog can be shared or reloaded.
  - Pagination with a **Load More** button (`useInfiniteQuery`).
  - Loader overlay while loading, plus an empty state when no cars match.
  - "From" / "To" mileage validation.
- **Car details page** (`/catalog/[carId]`):
  - Photo, description, rental conditions, specifications and features.
  - Booking form with client-side validation.
  - Toast notifications for success and API errors. Server validation errors are also shown under the field.
- **Metadata**: page titles, descriptions and Open Graph tags. Catalog titles reflect the active filters; details pages use the car's name.
- **Error handling**: custom 404 pages (global and "Car not found") and error boundaries with retry.
- **Responsive layout**: a burger menu and single-column layouts below 768px.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) with TypeScript
- React 19
- [TanStack Query v5](https://tanstack.com/query): server-side prefetch with hydration, infinite queries, mutations
- Axios
- CSS Modules and modern-normalize
- react-hot-toast, react-icons
- ESLint, Prettier

## API

Data comes from the [Car Rental API](https://car-rental-api.goit.study):

| Method | Endpoint                      | Used for                            |
| ------ | ----------------------------- | ----------------------------------- |
| GET    | `/cars`                       | Paginated, filtered car list        |
| GET    | `/cars/filters`               | Brand and price options for filters |
| GET    | `/cars/{id}`                  | Car details                         |
| POST   | `/cars/{id}/booking-requests` | Booking request                     |

## Getting started

Requirements: Node.js 20+ and npm.

```bash
git clone https://github.com/Dm3583/rental-car.git
cd rental-car
npm install
npm run dev
```

Open http://localhost:3000. No environment variables are required.

## Scripts

| Command                | Description                      |
| ---------------------- | -------------------------------- |
| `npm run dev`          | Start the development server     |
| `npm run build`        | Create a production build        |
| `npm run start`        | Run the production build         |
| `npm run lint`         | Run ESLint                       |
| `npm run format`       | Format the code with Prettier    |
| `npm run format:check` | Check formatting without writing |

## Project structure

```
app/          Routes: home, catalog, car details, loading, error and 404 pages
components/   Reusable UI components (filters, cards, form fields, header, loaders)
lib/          API client, API requests, query keys and options, helpers
types/        Shared TypeScript types
public/       Images and icons
```

## Deployment

The app is deployed on [Vercel](https://vercel.com). Every push to `master` triggers a new deployment.
