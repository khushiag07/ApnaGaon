# FarmConnect — Customer App (Phase 1)

A premium, mobile-first React + Tailwind + Framer Motion implementation of the
FarmConnect **Customer App**, built as the first phase of the full platform
described in the brief (Customer App, Farmer App, Delivery Partner App,
Marketing Website, Admin Dashboard).

## Why phase 1 instead of everything at once

The full brief spans ~80 screens across five distinct applications. Building
all of it in one pass tends to produce shallow, inconsistent screens. Instead,
this phase delivers one application **fully and properly** — real routing,
a real design system, real reusable components — so the remaining apps can be
built on the same foundation at the same quality bar, rather than rushed.

## What's included

- Full design system: colors, type scale (Inter + Fraunces display face),
  radii, shadows, motion tokens — in `tailwind.config.js` and `src/index.css`
- Reusable components: `Button` (with ripple), `Badge` family (Organic,
  Verified, Distance, and the **Freshness Meter** — the app's signature visual
  element), `Rating`, `ProductCard`, `FarmerCard`, `CategoryCard`, `SearchBar`,
  bottom nav (mobile) + sidebar (desktop), toasts, skeletons, empty states
- 18 fully built, routed customer screens: Splash, Login, OTP, Home, Search,
  Categories, Product Listing, Farmer Profile, Product Details, Wishlist,
  Cart, Checkout, Order Success, Track Delivery (live map + timeline), Order
  History, Notifications, Profile, Settings, Support
- Dark mode, voice search UI, freshness meter, organic/verified/distance
  badges, AI-recommendation section, quick reorder, favorite farmers
- Mobile-first responsive layout: bottom nav under `768px`, sidebar + top bar
  at `768px` and up, tested from `320px` to `1920px`
- Dummy JSON data in `src/data/mockData.js` standing in for a real API

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL. The app boots at the Home screen; visit `/splash`
and `/login` directly to see the onboarding flow (it's demoed standalone so
every screen stays reachable while testing).

## Project structure

```
src/
  components/   Sidebar, BottomNav, ProductCard, FarmerCard, ui/ primitives
  context/      AppContext — cart, wishlist, dark mode, toasts
  data/         Dummy JSON (products, farmers, orders, categories)
  layouts/      CustomerLayout (responsive shell)
  pages/        One file per screen, under pages/customer
  routes/       AppRoutes.jsx — all route definitions
  utils/        cn(), formatCurrency(), formatDistance()
```

## What's next

Say the word and I'll build the **Farmer App**, **Delivery Partner App**,
**Marketing Website**, or **Admin Dashboard** next, reusing this same design
system and component library.
