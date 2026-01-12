# AIALBM - Advanced AI Agent & Large Language Model Platform

AIALBM is a next-generation SaaS platform designed to showcase advanced AI agent capabilities. This project is a modern, high-performance web application built to demonstrate the features of a sophisticated Large Action Model (LAM) system.

![Project Status](https://img.shields.io/badge/Status-Development-blue)
![Tech Stack](https://img.shields.io/badge/Stack-Next.js_14_|_Tailwind_|_Framer_Motion-white)

## 🚀 Overview

This website serves as the landing page, documentation hub, and feature showcase for the AIALBM platform. It features a premium, cyberpunk-inspired design with rich animations, interactive data visualizations, and full bilingual support (English/Korean).

## ✨ Key Features

### 🌐 Core Experience

- **Futuristic Design**: Implements a "Nebula Navy" dark theme with glassmorphism effects (`backdrop-blur`), neon accents, and three.js particle backgrounds.
- **Bilingual Interface**: Seamless switching between English and Korean across the entire site using a custom `LanguageContext`.
- **Responsive Animations**: Extensive use of `framer-motion` for scroll reveals, hover effects, and complex diagrams.

### 🧩 Feature Showcase

Detailed pages for each core capability of the AI platform:

- **Automatic Learning**: Visualization of RLHF (Reinforcement Learning from Human Feedback) loops.
- **Federated Learning**: Interactive animation showing Global Model aggregation from local nodes.
- **Multi-Modalities**: Showcase of Vision, Audio, and Code generation capabilities.
- **Memory System**: Dynamic Knowledge Graph visualization.
- **Security**: Visual representation of PII redaction and security layers.
- **Agent Orchestration**: Interactive dashboard simulation for managing multi-agent swarms.

### 📚 Documentation & Architecture

- **Interactive Architecture**: A dynamic microservices diagram illustrating data flow between Frontend, Storage, Security, and Core Logic.
- **Docs Layout**: A structured documentation area for developers.

## 🛠️ Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **3D Graphics**: [Three.js](https://threejs.org/) / [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- **State Management**: React Context API

## 📂 Project Structure

```bash
src/
├── app/
│   ├── architecture/       # Architecture diagram page
│   ├── docs/               # Documentation pages
│   ├── features/           # Individual feature detailed pages
│   │   ├── ai-ml-agent/
│   │   ├── automatic-learning/
│   │   ├── conversation-management/
│   │   ├── federated-learning/
│   │   ├── history/
│   │   ├── memorize-coding/
│   │   ├── memory-system/
│   │   ├── multi-modals/
│   │   └── security/
│   ├── globals.css         # Global styles & Tailwind directives
│   ├── layout.tsx          # Root layout with LanguageProvider
│   └── page.tsx            # Landing page (Home)
├── components/
│   ├── layout/             # Layout components (Backgrounds, Nav)
│   ├── three/              # Three.js components (ParticleBackground)
│   └── ui/                 # Reusable UI (Modals, Buttons, Cards)
└── context/
    └── LanguageContext.tsx # i18n Logic
```

## 🚦 Getting Started

First, install the dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🎨 Design System

- **Primary Colors**: Nebula Navy (`#0a0b0d`), Quantum Blue (`#4f91ff`), Cosmic Purple (`#8b5cf6`)
- **Typography**: Inter (Sans), Noto Sans KR (Display), JetBrains Mono (Code)
- **Effects**: Custom Tailwind utilities for `glass-card`, `text-glow`, and `neon-border`.
