# Arisa Nutrition Website

A premium, modern, and fully responsive dietician portfolio and consultation website built with React, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Premium Design**: Soft wellness aesthetic with pastel colors and elegant typography
- **Fully Responsive**: Mobile-first design that works beautifully on all devices
- **Smooth Animations**: Premium animations powered by Framer Motion
- **Modern Tech Stack**: React + TypeScript + Tailwind CSS
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Conversion Focused**: Strategic CTAs and booking flow
- **Accessible**: WCAG compliant with proper ARIA labels

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📂 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── About.tsx
│   │   ├── QuoteBanner.tsx
│   │   ├── WhyChooseTestimonials.tsx
│   │   ├── Programs.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Blog.tsx
│   │   └── FinalCTA.tsx
│   └── ui/
│       ├── ServiceCard.tsx
│       ├── TestimonialCard.tsx
│       ├── PricingCard.tsx
│       ├── BlogCard.tsx
│       ├── BookingModal.tsx
│       ├── FloatingWhatsAppButton.tsx
│       └── ScrollToTop.tsx
├── data/
│   └── content.ts
├── utils/
│   └── animations.ts
├── App.tsx
├── main.tsx
└── index.css
```

## 🎨 Design System

### Colors

- **Cream**: `#FAF7F5` - Background
- **Blush**: `#F5E6E8` - Accent sections
- **Blush Pink**: `#E8A0AA` - CTAs and highlights (strengthened)
- **Rose Pink**: `#D97792` - Primary CTA color
- **Muted Rose**: `#C77B8A` - Secondary CTA color
- **Sage Green**: `#9CAF88` - Primary brand color
- **Olive Green**: `#7A8B6F` - Secondary brand color
- **Dark Olive**: `#5A6B52` - Dark sections

### Typography

- **Headings**: Playfair Display (Serif)
- **Body**: Inter (Sans-serif)

## 📱 Sections

1. **Navigation Bar** - Sticky navbar with smooth scroll
2. **Hero Section** - Split-screen hero with floating contact card
3. **Services Section** - 8 service cards with hover effects
4. **About Section** - Professional profile with qualifications
5. **Quote Banner** - Inspirational quote with decorative elements
6. **Why Choose + Testimonials** - Benefits and client reviews
7. **Programs Section** - 3 pricing tiers with booking CTAs
8. **How It Works** - 5-step journey timeline
9. **Blog Section** - 3 featured nutrition tips
10. **Final CTA** - Premium conversion section
11. **Footer** - Contact info, links, and disclaimer

## 🔧 Customization

### Updating Content

All content is centralized in `src/data/content.ts`. Update this file to:
- Change contact information
- Modify services and programs
- Update testimonials
- Edit blog posts
- Customize navigation links

### Replacing Images

Image placeholders are used throughout. Replace them by:
1. Adding images to the `public/` directory
2. Updating image paths in components and data files

### Styling

- Global styles: `src/index.css`
- Tailwind config: `tailwind.config.js`
- Color scheme can be modified in the Tailwind config

## 📞 Contact Integration

- **WhatsApp**: Configured to open `https://wa.me/919550220704`
- **Email**: Links to `aadibaa004@gmail.com`
- **Instagram**: Links to `@dt.aadiba`
- **Booking Modal**: Form validation with success feedback

## 🌐 Deployment

The website can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

Build the production bundle:
```bash
npm run build
```

The `dist/` folder contains the optimized production build.

## 📄 License

© 2026 Arisa Nutrition. All rights reserved.

## 👨‍💻 Developer

Built with ❤️ for Dt. Aadiba Azeemuddin - Arisa Nutrition

---

**Note**: This website includes image placeholders. Replace them with actual high-quality images before deployment for the best user experience.
