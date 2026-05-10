# Decode2Deploy 🚀

**Decode2Deploy** is an immersive two-day technical event organized by the **Coding Club BMSIT&M**, powered by **DevsBazaar**. It's not just a hackathon—it's a product-building challenge where participants decode ambiguous real-world signals, build scalable solutions, and deploy them under intense pressure.

This repository contains the Next.js source code for the official Decode2Deploy landing page and event website.

## 🌟 Key Features

- **Cinematic UI/UX**: Built with a sleek, dark-mode-first glassmorphic design language.
- **Interactive Animations**: Powered by Framer Motion, featuring floating components, starry backgrounds, bouncing locks, and smooth scroll animations.
- **Dynamic Event Notification System**: Sequential, time-aware animated notifications for registrations and sponsor spotlights.
- **Live Event Countdown**: Real-time timer counting down to the event launch.
- **Responsive Design**: Carefully optimized for mobile, tablet, and desktop viewing.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, v15+)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Analytics**: Vercel Analytics

## 📂 Project Structure

```text
├── app/
│   ├── layout.tsx              # Root layout & global fonts (Geist)
│   ├── page.tsx                # Main Landing Page
│   ├── hackathon/page.tsx      # Core Event Page (Timeline, FAQs, Tracks, CTA)
│   ├── guidelines/page.tsx     # Event Rules, Team Formation (3-4 members), Evaluation Criteria
│   └── code-of-conduct/page.tsx# Official Event Code of Conduct
├── components/
│   └── ui/
│       ├── button.tsx          # Reusable Button Component
│       ├── notification.tsx    # Sequential Animated Popups
│       └── stars-background.tsx# Cinematic particle background
└── public/                     # Static assets & logos
```

## 🚀 Getting Started

First, ensure you have Node.js installed. Then, clone the repository and install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📅 Event Overview

- **Format**: 2-Day Offline Event
- **Location**: BMSIT&M, Bengaluru
- **Team Size**: 3-4 Members
- **Key Focus**: Problem decoding, rapid prototyping, and scalable deployment.

## 🤝 Community & Support

- **Organized By**: Coding Club BMSIT&M
- **Powered By**: [DevsBazaar](https://devsbazaar.com/)
- **Support Contact**: Reach out to the organizing team via the details listed on the Hackathon page.

## 📜 License

© 2026 CODING CLUB BMSIT&M. All rights reserved.
Made by Swapnil Biswas.
