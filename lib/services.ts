/*
 * Single source of truth for the three services Ads of Stupid offers.
 * Pure data (no React / no "use client") so it can be imported safely by
 * server components (generateMetadata, JSON-LD, sitemap) AND client
 * components (ServiceDetail, ServicesHub, nav dropdown, footers).
 *
 * Icons are stored as string keys and mapped to lucide-react components
 * inside the client components — keeps this module fully serializable.
 */

export interface Deliverable {
  icon: string;
  title: string;
  body: string;
}

export interface ProcessStep {
  title: string;
  body: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  /** short label for nav + footer + cards */
  navLabel: string;
  /** one-line summary for hub cards + nav dropdown */
  tagline: string;
  order: number;
  /** hero / accent colour (one of the brand's 5 element tokens) */
  accent: string;
  /** accent as "r,g,b" so components can build rgba() tints */
  accentRgb: string;
  /** lucide icon name for the hub card + hero chip */
  icon: string;

  eyebrow: string;
  h1Lead: string;
  h1Highlight: string;
  heroSub: string;

  // ---- SEO ----
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogAlt: string;

  // ---- body ----
  problemHeading: string;
  problem: string[];
  pullQuote: string;
  forWho: string[];

  deliverablesHeading: string;
  deliverablesIntro: string;
  deliverables: Deliverable[];

  processHeading: string;
  processIntro: string;
  process: ProcessStep[];

  outcomesHeading: string;
  outcomes: string[];

  faqs: Faq[];

  ctaHeading: string;
  ctaSub: string;
}

export const SERVICES: Service[] = [
  // =========================================================================
  // 1. PERFORMANCE MARKETING
  // =========================================================================
  {
    slug: "performance-marketing",
    navLabel: "Performance marketing",
    tagline: "Meta & Google ads measured in revenue, not reach.",
    order: 1,
    accent: "#F2683C",
    accentRgb: "242,104,60",
    icon: "Target",

    eyebrow: "Performance marketing",
    h1Lead: "Performance marketing that's",
    h1Highlight: "measured in revenue, not reach.",
    heroSub:
      "Meta and Google ads for D2C brands in India — built on research, tracked to the rupee, and optimised for profit. We don't spend a paisa until we know who's actually buying.",

    metaTitle: "Performance Marketing Agency for D2C Brands",
    metaDescription:
      "Performance marketing for D2C brands in India. Meta & Google ads built on research, tracked to the rupee, and optimised for ROAS and profit — not vanity metrics. 13× ROAS delivered. Book a free funnel audit.",
    keywords: [
      "performance marketing agency",
      "d2c performance marketing",
      "meta ads agency india",
      "google ads agency",
      "roas optimization",
      "performance marketing pune",
      "ecommerce ads agency",
      "paid social agency india"
    ],
    ogAlt: "Performance marketing for D2C brands — Ads of Stupid",

    problemHeading: "Most ad budgets die from guessing, not bad luck.",
    problem: [
      "Boosting posts, copying a competitor's creative, launching on day one with no audience research — every blown budget has a reason behind it. It's never bad luck. It's a missing audience, a broken funnel, or no tracking telling you what actually worked.",
      "Performance marketing isn't about spending more. It's about knowing — before the money goes out — who you're talking to, what they want, and which rupee is coming back as revenue. We slow it down, read the data, and only then scale what's proven."
    ],
    pullQuote:
      "We optimise for revenue and profit — the only two numbers that keep your brand alive.",
    forWho: [
      "D2C brands already making some sales who want predictable, profitable scale",
      "Founders tired of agencies reporting on impressions instead of orders",
      "Brands on Shopify, Meta or Google ready to spend with a strategy behind it"
    ],

    deliverablesHeading: "What performance marketing with us includes",
    deliverablesIntro:
      "Everything that turns a rupee of ad spend into tracked, profitable revenue — and nothing that just looks good in a screenshot.",
    deliverables: [
      {
        icon: "Search",
        title: "Audience & market research",
        body: "Before any spend, we map who's actually buying, what they want, and the angles worth testing — so your budget starts with a strategy, not a guess."
      },
      {
        icon: "Megaphone",
        title: "Meta & Google campaigns",
        body: "Full-funnel campaigns across Meta and Google, built, launched and managed by the same person who picks up the phone when you call."
      },
      {
        icon: "FlaskConical",
        title: "Creative & offer testing",
        body: "Structured tests with a reason behind each one. We keep what the data backs and kill what it doesn't — no testing for the sake of it."
      },
      {
        icon: "Activity",
        title: "Tracking & attribution",
        body: "Pixels, conversions API and clean attribution so every result is real — not a platform's inflated claim about its own ads."
      },
      {
        icon: "BarChart3",
        title: "Live revenue dashboard",
        body: "A dashboard you can open any time. No status-email theatre — you see ROAS, spend and profit for yourself, whenever you want."
      },
      {
        icon: "Hand",
        title: "We'll tell you to stop",
        body: "If a channel or campaign is wasting money, we say so — even when it shrinks our own invoice. A partner, not an order-taker."
      }
    ],

    processHeading: "How we run your ads",
    processIntro: "The same formula we run for every brand — research first, scale last.",
    process: [
      { title: "Research", body: "We study your market, customer and competitors before touching ads manager." },
      { title: "Build & track", body: "We set up clean tracking, then build full-funnel campaigns and creative tests." },
      { title: "Launch & read", body: "We launch deliberately and read the data — what's converting, what's wasting spend." },
      { title: "Scale what works", body: "We pour budget into proven winners and cut the rest. Repeatable, every month." }
    ],

    outcomesHeading: "What you walk away with",
    outcomes: [
      "Ad spend tracked to the rupee — every result is real",
      "ROAS and profit you can actually see on a live dashboard",
      "A direct line to the person running your campaigns",
      "Scale that's earned from data, not hope"
    ],

    faqs: [
      {
        q: "What ad budget do I need to start?",
        a: "There's no hard minimum, but performance marketing works best once you have a product that's selling and enough budget to test properly. On a free call we'll tell you honestly whether you're ready — and if you're not, what to fix first."
      },
      {
        q: "Which platforms do you run ads on?",
        a: "Primarily Meta (Instagram & Facebook) and Google — the two channels where most D2C revenue is won in India. We recommend the mix based on your product and customer, never a one-size playbook."
      },
      {
        q: "How is this different from boosting posts?",
        a: "Boosting is spending without a strategy. We start with research, build full-funnel campaigns with proper tracking, and optimise for revenue — so you know which rupee came back, instead of guessing."
      },
      {
        q: "Do you lock me into a long contract?",
        a: "No. We earn the next month, every month. If we're not adding value, you should be free to walk."
      },
      {
        q: "How soon will I see results?",
        a: "Tracking and the first campaigns go live quickly, but real performance marketing compounds. You'll see early signal in weeks and proven scale over the months that follow — and we'll set honest expectations up front."
      }
    ],

    ctaHeading: "Want to know where your ad spend is leaking?",
    ctaSub:
      "Book a free strategy call. We'll audit your current funnel and tell you exactly what we'd do to make it profitable — even if you never hire us."
  },

  // =========================================================================
  // 2. E-COMMERCE STORE SETUP
  // =========================================================================
  {
    slug: "ecommerce-store-setup",
    navLabel: "E-commerce store setup",
    tagline: "Shopify stores built to sell, not just sit there.",
    order: 2,
    accent: "#5BA82F",
    accentRgb: "91,168,47",
    icon: "ShoppingBag",

    eyebrow: "E-commerce store setup",
    h1Lead: "An online store built to",
    h1Highlight: "sell, not just sit there.",
    heroSub:
      "Shopify stores set up for D2C brands in India — fast, trustworthy, and built around the buying decision. A store visitors actually convert on, not one they just admire and leave.",

    metaTitle: "E-commerce Store Setup for D2C Brands",
    metaDescription:
      "E-commerce and Shopify store setup for D2C brands in India. Fast, mobile-first, conversion-built online stores with clean tracking and a checkout designed to sell. Book a free store audit.",
    keywords: [
      "ecommerce store setup",
      "shopify store setup",
      "shopify development india",
      "d2c store setup",
      "ecommerce website design",
      "shopify agency pune",
      "online store setup india",
      "conversion focused store"
    ],
    ogAlt: "E-commerce store setup for D2C brands — Ads of Stupid",

    problemHeading: "A pretty store that doesn't convert is just an expensive brochure.",
    problem: [
      "Most new D2C stores are built to look good in a portfolio — slow to load, cluttered checkout, no tracking, and a homepage that wins design points but loses sales. Traffic comes, bounces, and you never find out why.",
      "We build the unglamorous things right: speed, trust, a checkout that gets out of the way, and tracking that tells you exactly where buyers drop off. The store becomes a machine for the sale — ready to take ads the day it launches."
    ],
    pullQuote:
      "Boring done right beats flashy done wrong. The money hides in the unglamorous details.",
    forWho: [
      "New D2C brands launching their first online store",
      "Founders on a slow, clunky store losing sales they can't explain",
      "Brands moving to Shopify who want it done right the first time"
    ],

    deliverablesHeading: "What store setup with us includes",
    deliverablesIntro:
      "Everything you need to launch a store that's ready to take ads and convert from day one.",
    deliverables: [
      {
        icon: "Store",
        title: "Shopify store build",
        body: "A clean, fast, mobile-first Shopify store built around how people actually buy — not how a template wants to look."
      },
      {
        icon: "Zap",
        title: "Speed & mobile optimisation",
        body: "Most D2C traffic is on a phone. We build for fast loads and a thumb-friendly experience so you don't lose buyers to a spinner."
      },
      {
        icon: "ShieldCheck",
        title: "Trust & conversion essentials",
        body: "Reviews, clear policies, trust signals and a frictionless checkout — the quiet things that decide whether a visitor buys."
      },
      {
        icon: "CreditCard",
        title: "Payments & shipping setup",
        body: "Indian payment gateways, COD and shipping logic configured properly, so checkout never breaks at the last step."
      },
      {
        icon: "Activity",
        title: "Tracking from day one",
        body: "Pixels and conversion tracking installed at launch — so your very first ad rupee is measurable, not invisible."
      },
      {
        icon: "Boxes",
        title: "Product & collection structure",
        body: "Products, collections and navigation organised so customers find — and buy — without having to think about it."
      }
    ],

    processHeading: "How we build your store",
    processIntro: "Built deliberately, in the right order — so launch day isn't a scramble.",
    process: [
      { title: "Plan", body: "We map your products, customer journey and the decisions that lead to a sale." },
      { title: "Build", body: "We build the store fast and mobile-first, with trust and conversion baked in." },
      { title: "Wire tracking", body: "Payments, shipping and tracking configured and tested end to end." },
      { title: "Launch ready", body: "You go live with a store that's ready to take traffic and convert it." }
    ],

    outcomesHeading: "What you walk away with",
    outcomes: [
      "A fast, mobile-first store built to convert",
      "Checkout, payments and shipping that just work",
      "Tracking live from day one — every visit measurable",
      "A store ready for ad spend, not one you'll rebuild in six months"
    ],

    faqs: [
      {
        q: "Do you build on Shopify or other platforms?",
        a: "We specialise in Shopify — it's the fastest, most reliable way for a D2C brand in India to launch and scale. If another platform genuinely fits you better, we'll tell you."
      },
      {
        q: "I already have a store. Can you fix it instead of rebuilding?",
        a: "Often, yes. We'll audit what you have and tell you honestly whether it's worth fixing or rebuilding — we won't sell you a rebuild you don't need."
      },
      {
        q: "Will the store be ready to run ads on?",
        a: "That's the whole point. Tracking is installed at launch and the store is built around conversion — so your first ad rupee is measurable and working."
      },
      {
        q: "How long does a store build take?",
        a: "It depends on the number of products and complexity, but most D2C stores come together in a few weeks. We'll give you a clear timeline on the call."
      },
      {
        q: "Do you also run the ads after launch?",
        a: "Yes — store setup and performance marketing fit together. Many brands have us build the store, then run their Meta and Google ads on top. You can do either or both."
      }
    ],

    ctaHeading: "Want a store that's built to sell?",
    ctaSub:
      "Book a free call. We'll look at what you're selling and show you exactly how we'd build — or fix — your store to convert. No pressure."
  },

  // =========================================================================
  // 3. D2C GROWTH STRATEGY
  // =========================================================================
  {
    slug: "d2c-growth-strategy",
    navLabel: "D2C growth strategy",
    tagline: "The roadmap above the ads — built for your brand.",
    order: 3,
    accent: "#3B8EE6",
    accentRgb: "59,142,230",
    icon: "Compass",

    eyebrow: "D2C growth strategy",
    h1Lead: "A growth roadmap for your brand,",
    h1Highlight: "not a recycled playbook.",
    heroSub:
      "The strategy layer above the ads — positioning, funnel, retention, and the plan that turns a store that sits there into a brand that compounds. Built for your brand, specifically.",

    metaTitle: "D2C Growth Strategy for Founders in India",
    metaDescription:
      "D2C growth strategy for founders in India — positioning, full-funnel mapping, retention, and a clear 90-day roadmap to profitable scale. The strategy above the ads, built for your brand. Book a free call.",
    keywords: [
      "d2c growth strategy",
      "d2c marketing strategy",
      "ecommerce growth strategy",
      "d2c consulting india",
      "brand growth strategy",
      "retention marketing d2c",
      "growth strategy pune",
      "d2c scale strategy"
    ],
    ogAlt: "D2C growth strategy for founders — Ads of Stupid",

    problemHeading: "Spend without strategy is just expensive guessing.",
    problem: [
      "Plenty of brands have ads running, a store live, and money going out — and still no clear answer to the real questions. Who exactly are we for? Why us over the cheaper option? Where does growth actually come from next quarter? Without that, every channel is a gamble.",
      "Growth strategy is the layer above the tactics. We figure out your positioning, map the full funnel from first click to repeat order, and hand you a roadmap to revenue — so every rupee, ad and email is pulling in the same direction."
    ],
    pullQuote:
      "Research before rupees. We don't spend a paisa until we know who we're talking to and what's worth saying.",
    forWho: [
      "Founders who feel busy but aren't sure growth is going the right direction",
      "Brands with ads and a store but no clear plan tying them together",
      "D2C teams who want a roadmap, not just more channels"
    ],

    deliverablesHeading: "What a growth strategy with us includes",
    deliverablesIntro:
      "The thinking that makes every tactic work harder — turned into a plan you can actually run.",
    deliverables: [
      {
        icon: "Search",
        title: "Market & customer research",
        body: "Who's really buying, what they want, and where you sit against competitors — the foundation every decision rests on."
      },
      {
        icon: "Crosshair",
        title: "Positioning & messaging",
        body: "A sharp answer to 'why you' that makes your ads, store and emails finally say the same thing."
      },
      {
        icon: "Workflow",
        title: "Full-funnel mapping",
        body: "Every step from first click to repeat purchase, mapped — so we can see exactly where buyers leak out."
      },
      {
        icon: "Repeat",
        title: "Retention & LTV plan",
        body: "Acquisition is rented; retention is owned. We plan the email, WhatsApp and repeat-purchase engine that compounds."
      },
      {
        icon: "Map",
        title: "A 90-day growth roadmap",
        body: "A prioritised plan of what to do, in what order — not a vague deck you'll open once and never again."
      },
      {
        icon: "BarChart3",
        title: "Metrics that matter",
        body: "The handful of numbers worth watching — revenue, profit, LTV — and the vanity metrics to ignore."
      }
    ],

    processHeading: "How we build your strategy",
    processIntro: "A deliberate path from 'where are we' to 'here's the plan'.",
    process: [
      { title: "Audit", body: "We dig into your brand, numbers, funnel and market to find what's really going on." },
      { title: "Position", body: "We sharpen who you're for and why you win — the message everything else hangs on." },
      { title: "Map the funnel", body: "We map acquisition, conversion and retention end to end and find the leaks." },
      { title: "Hand you the plan", body: "You get a prioritised 90-day roadmap — and we can run it with you if you want." }
    ],

    outcomesHeading: "What you walk away with",
    outcomes: [
      "Crystal-clear positioning and messaging",
      "A full-funnel map showing exactly where growth is leaking",
      "A prioritised 90-day roadmap to profitable scale",
      "Confidence that every rupee is pulling the same direction"
    ],

    faqs: [
      {
        q: "Is this just a strategy deck, or do you execute too?",
        a: "You get a real, prioritised roadmap — not a deck that gathers dust. And we can execute it with you: performance marketing and store setup are the same system, one layer down."
      },
      {
        q: "We already run ads. Why do we need strategy?",
        a: "Ads are tactics. If the positioning, funnel and retention underneath them aren't right, you're scaling a leaky bucket. Strategy makes the spend you're already doing work harder."
      },
      {
        q: "How long does the strategy work take?",
        a: "It depends on your stage and data, but most engagements deliver a roadmap in a few weeks. We'll scope it honestly on the call."
      },
      {
        q: "Will this work for an early-stage brand?",
        a: "Yes — earlier is often better. Getting positioning and funnel right before you pour on ad spend saves you from buying your way into the wrong audience."
      },
      {
        q: "What happens after the roadmap?",
        a: "Your call. Some founders run it in-house with the plan we hand over; others have us execute the ads and retention. Either way, you own the strategy."
      }
    ],

    ctaHeading: "Not sure where your growth comes from next?",
    ctaSub:
      "Book a free strategy call. We'll dig into your brand and funnel and show you the roadmap we'd run — even if you take it and do it yourself."
  }
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);

/*
 * Slugs that have their own bespoke, hand-designed route under
 * app/services/<slug>/page.tsx. These are excluded from the generic
 * [slug] route's static params so two pages never resolve to the same path.
 */
export const BESPOKE_SLUGS = [
  "performance-marketing",
  "ecommerce-store-setup",
  "d2c-growth-strategy"
];

export const GENERIC_SERVICE_SLUGS = SERVICE_SLUGS.filter(
  (slug) => !BESPOKE_SLUGS.includes(slug)
);
