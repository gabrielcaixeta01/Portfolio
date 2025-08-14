# 🚀 Gabriel Caixeta Romero | Portfolio

> Modern, responsive portfolio showcasing full-stack development, machine learning, and UX design projects.

[![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.11-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23.12-black?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

## 🌟 Overview

A modern, bilingual portfolio website built with Next.js, showcasing my expertise in full-stack development, machine learning, and user experience design. Features responsive design, dark mode support, interactive animations, and a comprehensive project showcase.

**🔗 Live Demo**: [gabrielcaixeta.dev](https://your-domain.com) _(Update with your deployed URL)_

## ✨ Features

### 🎨 **Design & User Experience**

- **🌓 Dark/Light Mode**: Seamless theme switching with `next-themes`
- **🌍 Bilingual Support**: Portuguese and English localization
- **📱 Fully Responsive**: Mobile-first design that works on all devices
- **🎭 Interactive Animations**: Smooth transitions with Framer Motion
- **✨ Particle Background**: Dynamic particle system using `tsparticles`
- **🎯 Accessible**: WCAG compliant with keyboard navigation support

### 🏗️ **Technical Features**

- **⚡ Next.js 15**: Latest App Router with server components
- **🔷 TypeScript**: Full type safety across the application
- **🎨 Tailwind CSS 4**: Utility-first styling with custom design system
- **🚀 Performance Optimized**: Lazy loading, image optimization, and efficient animations
- **📊 SEO Ready**: Meta tags, structured data, and sitemap support

### 🧩 **Components & Sections**

- **🏠 Hero Section**: Animated introduction with call-to-actions
- **👨‍💻 About**: Personal background and technical expertise
- **📁 Projects**: Interactive card grid with tech stack chips and project links
- **🛠️ Skills**: Animated skill bars with technology icons
- **📬 Contact**: Social links and contact information

## 🛠️ Tech Stack

### **Frontend**

- **Framework**: Next.js 15.4.5 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4.1.11
- **Animations**: Framer Motion 12.23.12
- **Icons**: React Icons 5.5.0
- **Particles**: TSParticles 2.12.0

### **Development Tools**

- **Linting**: ESLint 9 with Next.js config
- **Type Checking**: TypeScript with strict mode
- **Build Tool**: Next.js built-in bundler
- **Package Manager**: npm

### **Deployment**

- **Platform**: Vercel (recommended) / Netlify
- **Domain**: Custom domain with SSL
- **Analytics**: Ready for Google Analytics integration

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── images/              # Project screenshots and assets
│   │   └── projects/        # Project-specific images
│   ├── gabriel.jpg          # Profile picture
│   └── favicon.ico          # Site favicon
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout component
│   │   └── page.tsx         # Home page
│   ├── components/
│   │   ├── sections/        # Page sections
│   │   │   ├── Hero.tsx     # Landing section
│   │   │   ├── SobreMim.tsx # About section
│   │   │   ├── Projetos.tsx # Projects showcase
│   │   │   ├── Conhecimentos.tsx # Skills section
│   │   │   └── Contato.tsx  # Contact section
│   │   ├── ProjectCard.tsx  # Reusable project card
│   │   ├── Navbar.tsx       # Navigation component
│   │   ├── ThemeSwitch.tsx  # Dark mode toggle
│   │   └── ParticlesBackground.tsx # Animated background
│   └── contexts/
│       ├── LanguageContext.tsx # i18n management
│       └── RocketContext.tsx   # Cursor animation
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── next.config.ts          # Next.js configuration
```

## 🎯 Featured Projects

### 🏆 **CS50 Capstone: Stock Predictor**

- **Tech Stack**: Next.js, TypeScript, Python, scikit-learn, Vercel
- **Description**: ML-powered stock prediction platform with Random Forest models and news sentiment analysis
- **Features**: Interactive charts, ticker search, real-time predictions

### 📅 **UnB Academic Agenda**

- **Tech Stack**: React, Next.js, Tailwind, TypeScript
- **Description**: Visual schedule planner for university students
- **Features**: Class organization, task management, clean UI with local storage

### 🎓 **TREINI (Teacher Evaluation)**

- **Tech Stack**: Next.js, Tailwind, NestJS, PostgreSQL, Prisma
- **Description**: Comprehensive professor evaluation platform for CJTR
- **Features**: Accessibility-focused design, fast search, streamlined submission flow

### 🎨 **UX Design Projects**

- **Tools**: Figma, Design Systems, User Research
- **Projects**: Dental Marketplace, Ontological Modeling interfaces
- **Focus**: Information architecture, user flows, prototyping

## 🚀 Getting Started

### **Prerequisites**

- Node.js 18+
- npm or yarn
- Git

### **Installation**

1. **Clone the repository**

   ```bash
   git clone https://github.com/gabrielcaixeta01/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### **Available Scripts**

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

## 🎨 Customization

### **Adding New Projects**

1. Edit `src/components/sections/Projetos.tsx`
2. Add project object to the `projects` array:
   ```typescript
   {
     badge: "Project Type",
     title: "Project Name",
     description: "Brief description...",
     tech: ["Next.js", "TypeScript", "Tailwind"],
     image: "/images/project-cover.jpg", // Optional
     link: "https://github.com/username/repo",
     linkLabel: "Link"
   }
   ```

### **Updating Personal Information**

- **About Section**: Edit `src/contexts/LanguageContext.tsx` translations
- **Contact Info**: Update `src/components/sections/Contato.tsx`
- **Skills**: Modify `src/components/sections/Conhecimentos.tsx`

### **Theme Customization**

- **Colors**: Edit `tailwind.config.ts`
- **Fonts**: Update `src/app/globals.css`
- **Animations**: Modify Framer Motion configs in components

## 🌐 Internationalization

The portfolio supports Portuguese and English:

- **Language Context**: `src/contexts/LanguageContext.tsx`
- **Translation Keys**: Organized by sections (navbar, about, projects, skills, contact)
- **Language Toggle**: Available in the navigation bar
- **Default Language**: Portuguese (can be changed in context)

### **Adding New Languages**

1. Add translation object to `LanguageContext.tsx`
2. Update language selector in `Navbar.tsx`
3. Add appropriate flag icons

## 📈 Performance & SEO

### **Lighthouse Scores** _(Target)_

- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 95+

### **Optimizations**

- ✅ Image optimization with `next/image`
- ✅ Lazy loading for below-fold content
- ✅ Efficient animations with GPU acceleration
- ✅ Code splitting and tree shaking
- ✅ Responsive images and WebP format
- ✅ Preload critical resources

## 🚢 Deployment

### **Vercel (Recommended)**

1. Connect GitHub repository to Vercel
2. Configure build settings (auto-detected)
3. Set environment variables if needed
4. Deploy with automatic CI/CD

### **Manual Deployment**

```bash
npm run build
npm run start
```

### **Environment Variables**

```env
# Add any required environment variables
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 🤝 Contributing

While this is a personal portfolio, suggestions and improvements are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to branch (`git push origin feature/improvement`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See `LICENSE` file for details.

## 👨‍💻 About the Developer

**Gabriel Caixeta Romero**

- 🎓 Computer Engineering Student at UnB (University of Brasília)
- 💻 Full-Stack Developer specializing in Next.js, NestJS, and Python
- 🤖 Machine Learning enthusiast with experience in scikit-learn
- 🎨 UX/UI Designer with Figma expertise
- 🌱 Currently exploring AI and embedded systems

### **Connect with me:**

- 💼 [LinkedIn](https://linkedin.com/in/gabrielcaixeta01)
- 🐙 [GitHub](https://github.com/gabrielcaixeta01)
- ✉️ [Email](mailto:your-email@example.com)

---

<div align="center">
  <strong>Built with ❤️ using Next.js and TypeScript</strong>
</div>
