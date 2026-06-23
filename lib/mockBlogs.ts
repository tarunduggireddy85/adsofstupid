export type BlogStatus = "Published" | "Draft" | "Archived";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  featuredImage: string;
  category: string;
  tags: string[];
  author: string;
  status: BlogStatus;
  createdAt: string;
  publishDate: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
};

export const BLOG_CATEGORIES = [
  "Performance Marketing",
  "Web Development",
  "Strategy",
  "Conversion"
];

export const mockBlogs: BlogPost[] = [
  {
    id: "blog-001",
    title: "Google Ads vs Meta Ads: Which Should You Run First in India?",
    slug: "google-ads-vs-meta-ads-india",
    description:
      "When to run Google Ads vs Meta Ads in India — and the cross-platform pixel funnel serious brands use to cut cost per lead by up to 3x.",
    content: `Most Indian businesses make the same mistake: they pick a platform based on what they heard at a networking event.

They run ads for two months, get mediocre results, and conclude that "ads don't work."

The platform wasn't the problem. The logic was.

The Google Ads vs Meta Ads debate is one of the most common questions we get from Indian business owners — and most of them are starting with the wrong one. They solve different problems at different stages of the customer journey. But here's what almost nobody tells you — the smartest brands don't choose between them. They use both, in a specific order, with a pixel strategy that makes each platform's data work for the other.

This is how serious brands run it. And it starts before you spend a single rupee on ads.

## Before anything else: install both pixels on your website today

This is the step most businesses skip — and it's the one that costs them the most money later.

Both Google and Meta have tracking pixels. Think of them as silent counters sitting on your website, recording every visitor who lands on your pages. They don't run ads. They don't cost anything. They just collect data.

The Meta Pixel is a small piece of code you place on your website. It records behaviour — visits, adds to cart, purchases — and ties it to a real Facebook/Instagram user profile. That person is now in your Custom Audience.

The Google Tag does something similar — it tracks visits and feeds data back to your Google Ads account, so Google knows which clicks turned into customers.

Here's why this matters right now, before you've spent anything: pixels need time to collect data before they become useful. Meta needs a minimum of 500–1,000 website visitors in a Custom Audience before it can start retargeting effectively. Every day you run traffic without a pixel installed is a day of data you can never get back.

**How to install them (takes about 20 minutes total):**

Meta Pixel: go to Meta Business Suite → Events Manager → Connect Data Sources → Web. If you're on Wix, paste your Pixel ID directly into Wix's Marketing Integrations — no code needed. For Shopify, use the native Meta Sales Channel integration.

Google Tag: go to Google Ads → Tools → Conversions → create a conversion action. Wix and Shopify both have native Google Ads integrations that handle this without touching code.

If you plan to run serious campaigns, set up Google Tag Manager (GTM) first and manage both pixels as containers inside it. This is the cleanest setup — one place to control everything.

Once both are installed, you're ready to run the cross-platform funnel the big brands use.

## The core difference: intent vs interest

Google Ads works on intent. Someone types "performance marketing agency in Pune" into Google — they already know they need help. Your ad meets them mid-decision. You're not creating demand; you're capturing it.

Meta Ads work on interest. Nobody opens Instagram looking to hire a marketing agency. But they scroll past the right creative, they click through, they land on your site — and now the Meta Pixel has them tagged.

These platforms aren't competitors. They're two stages of the same funnel.

## Current rupee CPC benchmarks for India

_Data is based on Ads of Stupid client averages and general market trends. Your results will vary based on offer quality and landing page conversion rate._

### Google Search Ads (high intent)

- Average CPC across industries: ₹20–₹24
- Low competition niches (local services, niche products): ₹5–₹15
- High competition (finance, legal, real estate, education): ₹50–₹150+
- Display Ads average CPC: ₹5

### Meta Ads (interest and awareness)

- Average CPC (link clicks): ₹3–₹12
- Average Cost Per Lead — cold audience: ₹150–₹350
- Average Cost Per Lead — retargeted website visitors: ₹40–₹90

Look at that retargeting CPL column. This is the number most people never see because they never set up the pixel. A cold Meta lead might cost ₹250. A retargeted lead — someone who already visited your site from Google — costs ₹80. Same platform. Three times cheaper. Significantly warmer prospect.

## Google Ads vs Meta Ads in India: which platform to run first

Match the platform to how your customers actually find you:

- Local service business (salon, clinic, coaching) → Start with Google Ads. People search when they need you. Capture that intent.
- E-commerce (fashion, beauty, home goods) → Start with Meta Ads. Visual product, impulse buy — Instagram is a shopping platform.
- D2C brand, new product → Start with Meta Ads. Nobody's searching for you yet. Build awareness first.
- B2B / high-ticket service → Start with Google Ads. Long decision cycle. Buyers research on Google, not Instagram.
- Restaurant or food delivery → Start with Meta Ads. Location-based, visual, impulse-driven.
- Real estate → Start with Google Ads. High-intent buyers Google first. Retarget on Meta.
- EdTech / online course → Start with Meta Ads. Aspiration sells courses. Retarget warm leads with Google.
- Event or launch → Start with Meta Ads. Speed and reach matter more than intent for time-sensitive offers.

One rule that cuts through most of the confusion: if people are already searching for what you sell, start with Google. If they're not, start with Meta to build awareness — and let the pixel collect those visitors for later.

## The cross-platform pixel funnel: how serious brands actually run this

This is the part almost no one explains clearly.

### Step 1 — Install both pixels before you spend anything

Both are collecting visitor data from day one — even before your first ad goes live. If you're getting any organic traffic at all, you're already building an audience for free.

### Step 2 — Start Google Ads (Week 1)

Run Google Search Ads targeting high-intent keywords for your business. Every person who clicks your ad and lands on your website is now being tagged by the Meta Pixel. Google brings the intent. Meta silently tags the visitor.

### Step 3 — Let the Meta Pixel build your Custom Audience (Weeks 1–4)

You're not running Meta Ads yet. You're just letting the pixel fill up. Once you've sent 500–1,000 visitors through Google, you have a real Custom Audience in Meta. These are not random Instagram scrollers. They're warm prospects who actively searched for your service, clicked an ad, and visited your site.

### Step 4 — Launch Meta retargeting campaigns (Week 4–5)

Now you turn on Meta Ads — but only to Website Visitors. Your ad might say: "Still thinking about it? Here's what our clients say." Or simply show a case study with real results. The audience already knows who you are. You're reminding them, not introducing yourself.

### Step 5 — The loop compounds (Month 2+)

Google keeps driving new intent-based visitors → Meta Pixel keeps tagging them → Meta retargeting keeps converting the warm ones.

By month 3, your retargeting audience is large enough to build Lookalike Audiences on Meta — people who share traits with your website visitors — and your cold Meta campaigns now have far better targeting data than any interest-based guess could give you.

## The math: what ₹15,000/month actually gets you

**Amateur logic — standalone campaigns:**

₹15,000 on Google Ads only: ~625 clicks at ₹24 avg CPC. At 3% landing page conversion: 18–20 leads. High intent, good close rate. CPL: ₹750–₹850.

₹15,000 on Meta Ads only (cold audience): at ₹250 avg CPL: 60 leads. Cheaper per lead, but these people weren't looking for you. Expect a much lower close rate.

**Lethal logic — cross-platform system:**

Split the budget: ₹12,000 Google + ₹3,000 Meta retargeting.

- Google brings ~500 website visitors/month at ₹24 avg CPC
- Meta Pixel tags all 500 as a Custom Audience
- Meta retargeting at ₹80 CPL converts ~37 of those into leads
- Google Search also converts at 3% → ~15 leads
- Total: ~50 leads on ₹15,000 spend. Effective CPL: ₹300.

The cross-platform setup doesn't just lower CPL. It improves lead quality — because every Meta retargeting lead already has context on your business before they fill in the form.

## Stop sending traffic to your homepage

It doesn't matter which platform you pick. If your ad says "best marketing agency in Pune" and the click lands on a homepage with five service cards, a tool stack carousel, and a contact form buried at the bottom — you're setting money on fire.

Every ad needs a dedicated landing page that matches the exact promise of the ad. One message. One offer. One button. And if the Meta Pixel is installed, that landing page becomes your retargeting trigger — make sure the pixel fires a specific event (ViewContent or Lead) on it so Meta knows exactly who to target next.

This is the biggest reason Indian businesses conclude that ads don't work. Not the platform. Not the budget. Not even the creative. The landing page is where campaigns go to die.

## The stupidly simple version

Install the Meta Pixel and Google Tag today — before your first ad.

Start with Google Ads to capture people already searching for what you sell.

Let Meta Pixel tag every visitor silently.

Once you have 500+ visitors tagged, turn on Meta retargeting. Now Meta isn't showing your ads to strangers — it's reminding people who already know you.

That's the funnel. The only reason most businesses miss this is that nobody bothered to install the pixel before the traffic started.

## Frequently asked questions

### Is Google Ads better than Meta Ads for Indian small businesses?

Depends on how customers find you. If they search for your category on Google, start there. If not, start with Meta for awareness. But regardless of which you start with, install the Meta Pixel on day one — so you can retarget your Google traffic on Meta from week four onwards.

### What is Meta Pixel and do I need it?

Meta Pixel is a free tracking code you place on your website. It records every visitor and lets you run retargeting ads to those exact people on Facebook and Instagram. Without it, Meta can only target cold strangers. With it, you can target people who already visited your site — at roughly one-third the CPL of cold traffic.

### What is a good CPC for Google Ads in India?

For most non-competitive niches, ₹15–₹40 per click is reasonable. Finance, legal, and real estate can hit ₹100–₹150+ per click, which is still worthwhile if customer lifetime value is high. If you're paying ₹5 per click, your niche has low competition or your Quality Score is doing strong work.

### Is Meta Ads cheaper than Google Ads in India?

Cold Meta clicks: ₹3–₹12. Retargeted Meta leads: ₹40–₹90 CPL. Google Search: ₹20–₹40 avg CPC with higher intent. The raw click cost on Meta is lower. The cost per actual customer depends entirely on your funnel quality — and whether you've installed the pixel.

### How much should I spend to start?

Don't start below ₹10,000/month if you want data fast enough to learn from. ₹15,000–₹25,000/month on one platform for 60 days is a real test. For the cross-platform setup, ₹12,000 Google + ₹3,000 Meta retargeting is a solid starting split.

### Can I run Google Ads and Meta Ads at the same time?

Yes — but run them as a system, not two separate experiments. Start Google first, let the Meta Pixel build a Custom Audience from that traffic, then launch Meta retargeting. Splitting a small budget across both cold audiences simultaneously means neither campaign has enough data to optimise.

### What ROAS should I expect from Meta Ads in India?

For e-commerce, 2x–4x ROAS is common at the start. Retargeting campaigns typically outperform cold campaigns by 2–3x on ROAS because the audience is warmer. Below 1.5x usually means the landing page or offer needs work — not the platform.

## Want someone to build this for you?

Setting up the pixels correctly, structuring the cross-platform funnel, and making sure Google and Meta are talking to each other — that takes most businesses 3 months of trial and error to figure out on their own.

We do it in the first week.

If something here clicked, book a call. We will look at your funnel — from pixel setup to the first retargeting win — and tell you exactly what we would do.`,
    featuredImage: "/blog/google-ads-vs-meta-ads-india.webp",
    category: "Performance Marketing",
    tags: ["Google Ads", "Meta Ads", "Pixel Strategy"],
    author: "Ads of Stupid",
    status: "Published",
    createdAt: "2026-03-20T09:00:00.000Z",
    publishDate: "2026-03-20",
    seoTitle: "Google Ads vs Meta Ads in India: Which to Run First",
    seoDescription:
      "When to run Google Ads vs Meta Ads in India, plus the cross-platform pixel funnel that cuts cost per lead by up to 3x.",
    seoKeywords: "google ads vs meta ads india, meta pixel, cross-platform retargeting, cpc india"
  },
  {
    id: "blog-002",
    title: "Your Startup is Building a Brand. Nobody Asked For That",
    slug: "startup-brand-awareness-mistake",
    description:
      "Spending on brand before demand is the startup marketing trap. Here's the 80/20 fix that actually fills pipeline.",
    content: `You have ₹5 lakhs to spend on marketing. You spend it on a brand film, a logo refresh, some Instagram Reels, and a few "awareness" campaigns. Six months later, you have followers. No customers. And a founder who is convinced the market "just isn't ready yet."

The market was ready. You were just talking to it wrong.

**Here is the startup marketing mistake nobody talks about:** spending money on brand before you've earned the right to have one. You are not Tata. You are not Zepto. You don't get to build brand affinity before you build demand. That order matters more than your entire marketing calendar.

If you are a startup with less than ₹50L in monthly revenue, this post is for you. Read it before you renew that branding agency retainer.

## The Trap

Most startup founders hear "marketing" and immediately think visibility. Get the logo right. Get the colors consistent. Run campaigns so people "know who you are."

So they do. They spend. They post. They run beautiful ads that look like something a D2C brand worth ₹500 crore would run. And then they sit back and wait for customers who never come.

This is the brand-before-demand trap. And it is stupidly common. According to research, 50% of marketing budgets are wasted on ineffective strategies — and for startups, a massive chunk of that waste lives right here: building recognition for a product nobody is actively looking for yet.

Brand awareness is a long game. It pays off in year three, maybe year five. It's how Apple stays Apple. But you are not Apple. You have a runway. You have investors. You have a team watching the numbers every Monday morning.

You don't have time for a long game. You need customers this quarter.

## The Reality

Here is the thing nobody explains clearly: **brand awareness and demand generation are not the same thing.** Not even close.

Brand awareness says: _"We exist. Isn't that nice?"_ Demand generation says: _"You have a problem. We fix it. Here's how to get started."_

One builds familiarity. The other builds revenue.

When you run a brand awareness campaign with a ₹2 lakh budget, you get impressions. Maybe some reach. Possibly some "great content!" comments from people who will never buy from you. When you run a demand generation campaign with the same ₹2 lakh, you get clicks from people actively looking for what you sell, retargeting windows on warm audiences, and actual conversion data you can optimize against.

It is like trying to fill a bucket by spraying a garden hose in the air versus pointing it directly at the bucket. Same water. Wildly different results.

## The fix for startups

Here's the stupidly simple framework for early-stage startups:

**Spend 80% of your budget on demand.** Target people who are already searching for your solution. Google Search ads, intent-based Meta campaigns, SEO for bottom-of-funnel keywords — the stuff with a direct line to purchase. This is performance marketing, and for startups, it should be your entire world right now.

**Spend 20% on brand.** Not zero — but 20. Use it on retargeting warm audiences, email nurture sequences, and organic content that answers specific questions your buyers are already Googling.

Your brand will grow as a byproduct of your demand engine working. Every customer who buys, every review they leave, every referral they send — that is brand equity. You don't manufacture brand. You earn it through customers.

**Stop measuring marketing success in reach and impressions.** Measure it in cost per lead, cost per acquisition, and revenue attributed. If your marketing team is celebrating a reel that got 50,000 views but can't tell you how many sales it drove, that's not a win. That's a vanity number with a monthly retainer attached to it.

## The Verdict

Brand awareness is for companies that have already won their market. Demand generation is for companies that are still trying to enter it.

If you are a startup, you are trying to enter. Act like it.

- Run ads that target buyers, not bystanders
- Measure everything against revenue, not reach
- Build your brand with customers, not campaigns

The startups that survive don't out-brand the competition. They out-convert them.

Most early-stage founders don't fail because they had a bad product. They fail because they marketed it to people who were never going to buy it, using money they couldn't afford to waste.

If any of this sounds familiar, you are not alone — and you are not too far gone. We help startups build marketing that actually fills pipeline — without burning budget on awareness campaigns that won't pay off for three years.`,
    featuredImage: "/blog/startup-brand-awareness-mistake.webp",
    category: "Performance Marketing",
    tags: ["Demand Generation", "Startups", "Brand"],
    author: "Ads of Stupid",
    status: "Published",
    createdAt: "2026-03-17T09:00:00.000Z",
    publishDate: "2026-03-17",
    seoTitle: "The Startup Brand-Before-Demand Trap (And the 80/20 Fix)",
    seoDescription:
      "Early-stage startups waste budget on brand awareness before demand. Here's the 80/20 framework that fills pipeline instead.",
    seoKeywords: "startup marketing mistake, demand generation, brand vs demand, performance marketing"
  },
  {
    id: "blog-003",
    title: "Marketing Resolutions That Will Bankrupt You in 2026",
    slug: "marketing-resolutions-that-will-bankrupt-you-in-2026",
    description:
      "Three common marketing resolutions that quietly bankrupt businesses — and what to do instead.",
    content: `It is that time of year again. You are writing down goals in a fresh notebook. You feel motivated. You are ready to "crush it" in 2026.

Stop. Most marketing resolutions are just expensive ways to procrastinate. You don't need _more_ ideas. You need _better_ logic.

I see business owners making the same three mistakes every January. They chase "Magic" (trends) instead of "Logic" (math). Here are the three resolutions you need to delete from your list before they bankrupt you.

## "I will post on Instagram every single day."

**The Trap:** You think volume equals success. You plan to churn out 365 reels, 365 posts, and 1,000 stories.

**The Reality:** You will burn out by February 15th. The algorithm in 2026 doesn't care about _how much_ you post; it cares about _how long_ people watch. Posting mediocre content every day actually hurts your account because it trains the algorithm that your content is skippable.

**The Fix:** Post less. Promote more. Write 4 great posts a month. Then, use the money you were going to spend on a social media manager and put it into Performance Marketing (Ads). One great post seen by 10,000 people is worth more than 30 bad posts seen by nobody.

## "I'm going to start a Podcast / YouTube Channel."

**The Trap:** You see big influencers doing it, so you think you should too.

**The Reality:** You are distracting yourself from the real problem. If you can't sell your product with a simple landing page, you won't sell it with a podcast. Building an audience takes 2 years. Do you have 2 years of runway cash in the bank?

**The Fix:** Fix your funnel first. Don't build a megaphone (audience) until you have a bucket that holds water (a converting offer). Until your website converts at 3%, a podcast is just a vanity project.

## "I need to Rebrand."

**The Trap:** Sales are low, so you blame your logo. You want to change your colors, your font, and your vibe.

**The Reality:** Your logo is not the problem. Your **website structure** is the problem. Your **offer** is the problem. Nike could sell shoes with a "Comic Sans" logo because their product is good. Changing your colors is "productive procrastination." It feels like work, but it generates zero revenue.

**The Fix:** Keep the logo. Change the offer. Instead of spending ₹50,000 on a designer, spend it on figuring out why people aren't clicking "Buy." Is the price too high? Is the shipping too slow? Is the promise unclear?

## The verdict for 2026

This year, be boring. Boring businesses make money. Exciting businesses make noise.

- Don't chase trends.
- Don't try to be famous.
- Just look at the data.

Happy New Year. Now get back to work.`,
    featuredImage: "/blog/marketing-resolutions-that-will-bankrupt-you-in-2026.webp",
    category: "Strategy",
    tags: ["Strategy", "Budgeting"],
    author: "Ads of Stupid",
    status: "Published",
    createdAt: "2026-01-02T09:00:00.000Z",
    publishDate: "2026-01-02",
    seoTitle: "Marketing Resolutions That Will Bankrupt You in 2026",
    seoDescription:
      "Daily posting, launching a podcast, and rebranding feel productive but waste money. Here's what to do instead in 2026.",
    seoKeywords: "marketing resolutions 2026, marketing mistakes, small business marketing"
  },
  {
    id: "blog-004",
    title: "Your Website is Pretty. That's Why It's Useless",
    slug: "your-website-is-pretty-that-s-why-it-s-useless",
    description:
      "Most business owners treat their website like an art gallery. It should be a sales floor. Here's the fix.",
    content: `Most business owners treat their website like a digital art gallery. It should be treated like a digital sales floor.

You hired a designer. They used trendy colors, cool animations, and a massive, cinematic video in the hero section. It looks beautiful. You showed your friends, and they said, "Wow."

But when you look at your analytics, you see the truth: people land, look around for 5 seconds, and leave.

Why? Because your website is pretty, but it's stupid.

Here is the difference between a website designed for awards and a website designed for revenue.

## The Trap: Aesthetics Over Action

The biggest mistake businesses make is prioritizing "looking professional" over being clear.

When a potential customer lands on your site, they have high anxiety and low patience. They are asking three subconscious questions in the first three seconds:

1. Where am I?
2. What can I do here?
3. Why should I care?

If your beautiful, abstract background video doesn't answer those questions immediately, they hit the "Back" button. You sacrificed clarity for coolness.

## The Science: Cognitive Load

Every unnecessary element on your page — every sliding banner, every vague headline like "Welcome to the Future" — adds to the user's cognitive load.

The human brain wants to conserve energy. If your site makes them think too hard to find the "Contact" button or figure out what you actually sell, their brain signals them to leave.

A confusing website is a rejection letter to your customers.

## The Fix: The "Stupidly Simple" Framework

As a web development agency, we believe a high-converting site isn't about what you add; it's about what you take away.

To turn your pretty brochure into a sales engine, apply these three rules:

- **The 3-Second Rule (Hero Section):** Your main headline must state exactly what you do and who it's for. No clever metaphors. If you sell plumbing, say "We Fix Leaks Fast."
- **The Obvious Button (CTA):** Your call-to-action button should be a contrasting color that doesn't exist anywhere else on the site. It shouldn't say "Learn More." It should say "Get a Quote" or "Buy Now."
- **Kill the Sliders:** Nobody watches rotating banners past the first slide. Replace them with one strong, static message.

## The Verdict

Your vanity wants a beautiful website. Your bank account wants an ugly one that works.

The best websites are often boring. They are fast, they are obvious, and they guide the user relentlessly toward the checkout. Stop trying to be an artist. Start trying to be a salesperson.`,
    featuredImage: "/blog/your-website-is-pretty-that-s-why-it-s-useless.webp",
    category: "Web Development",
    tags: ["Web Development", "CRO", "Conversion"],
    author: "Ads of Stupid",
    status: "Published",
    createdAt: "2025-12-27T09:00:00.000Z",
    publishDate: "2025-12-27",
    seoTitle: "Your Website is Pretty. That's Why It's Useless",
    seoDescription:
      "A pretty website that doesn't convert is useless. The Stupidly Simple framework to turn it into a sales engine.",
    seoKeywords: "website conversion, cro, web design mistakes, high converting website"
  },
  {
    id: "blog-005",
    title: "Stop Burning Money on the \"Boost Post\" Button",
    slug: "stop-boosting-posts",
    description:
      "Why the \"Boost Post\" button wastes money on vanity metrics instead of sales — and what to run instead.",
    content: `**The "Boost Post" button is the most expensive button on the internet.**

It sits there under your Instagram photo, glowing blue, begging you to click it. It promises you thousands of views for just a few hundred rupees. It feels easy. It feels smart.

But if you are trying to build a business, hitting that button is one of the "stupid" marketing decisions we talk about.

Here is why the "Boost" button is a trap, and what you should do instead.

### 1. The Trap: Vanity vs. Revenue

When you click "Boost," Facebook's algorithm asks you one simple question (implied): _"Do you want attention?"_

You say yes. So, the algorithm goes out and finds people who are addicted to liking things. It shows your ad to "Likers" — people who double-tap everything but buy nothing.

You get 500 likes. You feel good. Your vanity metric goes up. **But your bank account stays the same.**

As a performance marketing agency, we don't care about likes. We care about **ROAS** (Return on Ad Spend). You cannot pay your rent with likes.

### 2. The Science: Why It Fails

The "Boost" button is a stripped-down, "dummy" version of Facebook's actual advertising engine. It removes 90% of the controls.

- **No Exclusion Targeting:** You can't tell it to _avoid_ your current customers (so you waste money showing ads to people who already bought).
- **Limited Objectives:** You can mostly optimize for "Engagement" or "Traffic." You rarely get deep "Conversion" tracking.
- **No Creative Testing:** You can only promote one image. You can't test 5 headlines to see which one sells best.

It is like trying to fly a fighter jet with an Xbox controller. You have no real control.

### 3. The Fix: Ads Manager

If you want to stop burning cash and start making sales, you need to graduate to **Meta Ads Manager**.

This is the cockpit. Here, we don't optimize for "Likes." We optimize for **"Conversions"** (Sales, Leads, Bookings).

- **The Laser:** Instead of "People in Pune," we target "People in Pune, aged 25-40, who actively shop for shoes online and viewed my website in the last 7 days."
- **The Pixel:** We track exactly what happens _after_ the click. Did they buy? Did they add to cart?
- **The Retargeting:** We show specific ads to people who abandoned their cart, reminding them to finish the purchase.

## The Verdict

The "Boost Post" button is for influencers who want to look famous. **Ads Manager** is for business owners who want to get rich.

Marketing should be stupidly simple, but it shouldn't be lazy. Stop boosting. Start targeting.`,
    featuredImage: "/blog/stop-boosting-posts.webp",
    category: "Performance Marketing",
    tags: ["Meta Ads", "Boost Post", "ROAS"],
    author: "Ads of Stupid",
    status: "Published",
    createdAt: "2025-12-18T09:00:00.000Z",
    publishDate: "2025-12-18",
    seoTitle: "Stop Burning Money on the \"Boost Post\" Button",
    seoDescription:
      "The Boost Post button optimizes for likes, not sales. Why it fails and how to run Meta Ads Manager instead.",
    seoKeywords: "boost post, meta ads manager, roas, facebook ads vanity metrics"
  }
];
