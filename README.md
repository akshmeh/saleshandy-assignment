# Saleshandy Assignment - Ecommerce website

A modern E-Commerce MVP built with **Next.js 15 App Router**, **TypeScript**, **Tailwind CSS** and **Zustand**. The application follows a scalable component-driven architecture with centralized state management, reusable UI components, and a design system based on custom design tokens.

---

# 🚀 Tech Stack

## Frontend

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Lucide React Icons

## State Management

- Zustand

## Styling

- Tailwind CSS
- Custom Design Tokens
- Matter Font
- Caveat Font

## Utilities

- clsx
- tailwind-merge
- custom `cn()` utility

---

# 🏗️ Architecture Overview

The project follows a feature-based architecture with clear separation of concerns.

## Core Principles

- Reusable components
- Centralized state management
- Minimal prop drilling
- Scalable folder structure

---

# 📁 Folder Structure

```text
src
├── app
├── components
├── mock
├── store
└── types
```

## App Router

```text
app
├── page.tsx
├── products
│   ├── page.tsx
│   └── [pid]
│       └── page.tsx
├── checkout
├── profile
├── orders
└── wishlist
```

Handles:

- Routing
- Page composition
- Layout management
- Server Components

---

## Components

```text
components
├── cart
├── filter
├── layout
├── product
├── search
```

Responsible for:

- Presentation layer
- UI rendering
- User interactions
- Reusable business UI

---

## Zustand Stores

```text
store
├── cartStore.ts
├── productStore.ts
├── wishlistStore.ts
├── orderStore.ts
├── userStore.ts
└── uiStore.ts
```

Responsible for:

- Global state
- Business logic
- Shared application state
- User interactions

---

# 🎨 Design System

The UI follows a custom design system defined in `global.css`.

---

## Typography

### Matter Font

Primary font used throughout the application.

Used for:

- Headings
- Body content
- Navigation
- Buttons
- Forms

### Caveat Font

Used selectively for:

- Hero headings
- Marketing content
- Decorative typography

---

## Color Palette

### Core Colors

| Variable | Value | Usage |
|-----------|---------|---------|
| `--color-page-bg` | `#ffffff` | Main page background |
| `--color-text-fg` | `#0b0b0b` | Primary text, headings, content |
| `--color-text-muted` | `#656565` | Secondary text, labels, captions |

### Brand Colors

| Variable | Value | Usage |
|-----------|---------|---------|
| `--color-brand-blue` | `#275df5` | Primary actions, buttons, links |
| `--color-brand-purple` | `#9662ff` | Feature highlights, promotional elements |
| `--color-brand-green` | `#37b489` | Success states, stock indicators |
| `--color-brand-yellow` | `#ffce1f` | Ratings, highlights, attention-grabbing elements |

### Surface & Border Colors

| Variable | Value | Usage |
|-----------|---------|---------|
| `--color-brand-muted-bg` | `#f9f9f9` | Secondary backgrounds, cards, sections |
| `--color-brand-border` | `#e2e8f0` | Borders, dividers, card outlines |
| `--color-border-input` | `#dc2626` | Validation errors, destructive states |
| `--color-brand-red` | `#0f172a` | Dark accent color used for emphasis and contrast |

## Border Radius

| Token | Value |
|---------|---------|
| radius-sm | 4px |
| radius-md | 6px |
| radius-default | 8px |
| radius-card | 10px |
| radius-primary | 14px |
| radius-chip | 18px |
| radius-pill | 22px |

---

## Spacing Scale

Uses a 4px design rhythm.

Examples:

```text
4px
8px
12px
16px
24px
32px
48px
64px
96px
```

---

# ⚙️ Conditional Rendering Strategy

The application heavily relies on conditional rendering to improve user experience and maintain clean UI states.

# 📱 Responsive Design

The application is fully responsive.

### Mobile First

Built using Tailwind responsive utilities:

```tsx
grid-cols-1
sm:grid-cols-2
md:grid-cols-3
lg:grid-cols-4
```

### Responsive Layouts

Examples:

```tsx
flex-col
lg:flex-row
```

```tsx
hidden lg:block
```

```tsx
block lg:hidden
```

Features:

- Mobile navigation
- Responsive product grids
- Adaptive checkout flow
- Mobile cart drawer
- Responsive forms

---

# 🔥 Key Features

## Product Catalog

- Search products
- Category filtering
- Brand filtering
- Sorting
- Pagination

## Product Details

- Dynamic routes
- Variant selection
- Quantity management
- Add to cart

## Shopping Cart

- Add products
- Remove products
- Quantity controls
- Live totals

## Wishlist

- Add to wishlist
- Remove from wishlist
- Persistent state

## Checkout

- Billing address
- Shipping address
- Order summary
- Payment selection

## User Profile

- User information
- Addresses
- Order history

---

# 🚀 Local Development Setup

## Prerequisites

- Node.js 20+
- npm / pnpm / yarn

---

## Clone Repository

```bash
git clone <repository-url>
```

```bash
cd saleshandy-assignment
```

---

## Install Dependencies

Using npm:

```bash
npm install
```

Using pnpm:

```bash
pnpm install
```

Using yarn:

```bash
yarn install
```

---

## Run Development Server

```bash
npm run dev
```

Application will be available at:

```text
http://localhost:3000
```

---

## Production Build

```bash
npm run build
```

---

## Start Production Server

```bash
npm run start
```

---

## Lint

```bash
npm run lint
```

---

# 📦 Project Conventions

## Components

- Small and reusable
- Single responsibility
- UI focused

## State

- Stored in Zustand
- Business logic centralized
- Shared state only

## Styling

- Tailwind CSS
- Design tokens
- Utility-first approach

## Type Safety

- Strict TypeScript
- Shared types in `/types`

---

# Future Enhancements

- Backend integration
- Authentication
- Payment gateway integration
- Product reviews
- Inventory management
- Admin dashboard
- Order tracking API
- Analytics integration

---

# License

This project is intended for assesment and portfolio purposes.