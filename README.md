About EcoTrack 💚-
A Mumbai-born platform building India's most accessible e-waste recycling network.

Why we exist ❓-
Mumbai produces over 120,000 tonnes of e-waste each year — most of it ends up in informal scrap yards or landfills. We built EcoTrack so any resident can responsibly dispose of an old phone, AC, fridge or laptop in under a minute, and get paid for it.

Our mission 🥅- 
Make responsible e-waste disposal the default option for every Indian household by 2030 — starting with Mumbai, expanding to Pune, Delhi and Bengaluru next.

How we work 🌿 - 
We partner only with CPCB-authorised recyclers, verify every pickup with AI, and publish quarterly impact reports so our community can see exactly where their devices end up.

# 🌿 Green Loop Quest

**Green Loop Quest** is a full-stack e-waste recycling platform that makes responsible electronics disposal simple, rewarding, and transparent. Users can schedule doorstep pickups, have their e-waste validated by AI, track their orders in real time, and earn eco-credits for every item they recycle.

---

## ✨ Features

- **AI-Powered Image Validation** — Upload photos of your e-waste; Google Gemini AI verifies the device type and brand before your order is accepted.
- **Schedule Pickups** — Pick a convenient date and time slot; an interactive map helps you choose a nearby certified recycler.
- **Order Tracking** — Follow your order through every stage: Pending → Validated → Scheduled → Out for Pickup → Collected → Completed.
- **Eco Wallet** — Earn eco-credits for recycling; redeem them for cash, vouchers, or tree plantings.
- **Impact Dashboard** — See your personal contribution — CO₂ saved, materials recovered, and more.
- **Authentication** — Secure email/password sign-up and sign-in with Supabase Auth and Google reCAPTCHA.
- **Dark / Light Mode** — Full theme toggle powered by `next-themes`.
- **Responsive Design** — Mobile-first UI built with Tailwind CSS and shadcn/ui.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS, shadcn/ui, Radix UI |
| Routing | React Router v6 |
| Data Fetching | TanStack Query (React Query) |
| Forms | React Hook Form + Zod |
| Backend / Auth | Supabase (PostgreSQL + Auth + Storage) |
| Edge Functions | Supabase Edge Functions (Deno) |
| AI Validation | Google Gemini 2.5 Flash (via AI gateway) |
| Charts | Recharts |
| CAPTCHA | Google reCAPTCHA v2 |
| Theming | next-themes |

---

## 📁 Project Structure

```
src/
├── assets/               # Static images (hero background, feature icons)
├── components/
│   ├── ui/               # shadcn/ui primitive components
│   ├── Hero.tsx          # Landing page hero section
│   ├── Features.tsx      # Feature highlights grid
│   ├── HowItWorks.tsx    # Step-by-step explainer
│   ├── Impact.tsx        # Environmental impact stats
│   ├── CTA.tsx           # Call-to-action section
│   ├── Navigation.tsx    # Top navigation bar
│   ├── Footer.tsx        # Site footer
│   ├── RecyclerMap.tsx   # Interactive recycler location map
│   ├── OrderReceipt.tsx  # Post-submission order receipt
│   ├── OrderTracking.tsx # Order status tracker
│   ├── ReCaptcha.tsx     # reCAPTCHA wrapper
│   └── ThemeToggle.tsx   # Dark/light mode toggle
├── hooks/
│   ├── use-scroll-reveal.ts  # Scroll-triggered animation hook
│   ├── use-mobile.tsx        # Mobile breakpoint hook
│   └── use-toast.ts          # Toast notification hook
├── integrations/
│   └── supabase/         # Supabase client and auto-generated types
├── lib/
│   └── utils.ts          # Tailwind class merge utility
├── pages/
│   ├── Index.tsx         # Landing page
│   ├── Auth.tsx          # Login / Sign-up
│   ├── Dashboard.tsx     # User dashboard + order history
│   ├── CreateOrder.tsx   # Multi-step order creation flow
│   ├── EcoWalletPage.tsx # Eco-credits wallet
│   ├── FeaturesPage.tsx
│   ├── HowItWorksPage.tsx
│   ├── ImpactPage.tsx
│   ├── PricingPage.tsx
│   ├── AboutPage.tsx
│   ├── BlogPage.tsx
│   ├── CareersPage.tsx
│   ├── ContactPage.tsx
│   └── LegalPage.tsx     # Privacy, Terms, Cookies, Refund policies
└── App.tsx               # Root component and route definitions

supabase/
├── functions/
│   └── validate-ewaste-image/   # Edge function for AI image validation
└── migrations/                  # Database migration files
```

---

## 🗄️ Database Schema

### `orders`
| Column | Type | Description |
|---|---|---|
| `id` | uuid | Primary key |
| `user_id` | uuid | FK to authenticated user |
| `ewaste_type` | enum | Device category (laptop, mobile, tv, etc.) |
| `brand` | text | Device brand |
| `image_url` | text | Uploaded image URL |
| `status` | enum | Order lifecycle status |
| `recycler_name` | text | Assigned recycler |
| `recycler_address` | text | Recycler location |
| `recycler_lat/lng` | float | Recycler coordinates |
| `pickup_date` | date | Scheduled pickup date |
| `pickup_time_slot` | text | Selected time window |
| `tracking_number` | text | Auto-generated tracking ID |
| `estimated_amount` | numeric | Estimated eco-credit payout |
| `validation_message` | text | AI validation result message |

### `profiles`
Stores user display name, email, and avatar linked to Supabase Auth.

### Order Status Flow
```
pending → validated / rejected → scheduled → out_for_pickup → collected → completed
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (or [Bun](https://bun.sh/))
- A [Supabase](https://supabase.com/) project
- A Lovable AI Gateway API key (for image validation)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/green-loop-quest.git
cd green-loop-quest

# Install dependencies
npm install
# or
bun install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://<your-project>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<your-supabase-anon-key>
VITE_SUPABASE_PROJECT_ID=<your-project-id>
```

For the edge function, set `LOVABLE_API_KEY` in your Supabase project's Edge Function secrets.

### Database Setup

Apply the included migrations to your Supabase project:

```bash
supabase db push
```

### Development

```bash
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

### Build

```bash
npm run build
```

---

## 🤖 AI Image Validation

The `validate-ewaste-image` Supabase Edge Function accepts up to two images per order. It sends them to Google Gemini 2.5 Flash, which checks:

1. Whether the image shows the declared device type (e.g., laptop, TV, mobile).
2. Whether the visible brand matches the user's selection.

The function returns a JSON response with `isValid`, `confidence`, `reason`, and `detectedBrand`. Orders that fail validation are flagged as `rejected` and the user is notified with the AI's reasoning.

---

## 📦 Supported E-Waste Categories

Laptops · Printers · Mobile Phones · Tablets · Monitors · Keyboards · Mice · TVs · Air Conditioners · Smart Watches · Microwaves · Washing Machines · Refrigerators · Coolers · Speakers · Other

---

## 📄 License

This project is private. All rights reserved.
