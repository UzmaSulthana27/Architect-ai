# Architect AI | Neural Development Console

Architect AI is a state-of-the-art full-stack development environment designed for rapid synthesis of production-ready web applications. It leverages the power of Gemini AI to bridge the gap between creative prompt-engineering and high-fidelity code generation.

## 🏗 Project Architecture

The project is structured with a clear separation between frontend and backend logic to ensure scalability and maintainability.

### `/backend`
The core engine of the platform, powered by **Node.js** and **Express**.
- **`server.js`**: The main entry point. It orchestrates the API gateway and integrates with Vite for a seamless development experience.
- **API Routes**: Handles secure neural synthesis requests and system health telemetry.
- **Gemini Proxy**: Manages communication with Google's Generative AI models.

### `/frontend`
The interface layer, built with **React 19** and **Vite 6**.
- **`src/`**: Contains all functional components, neural hooks, and state management logic.
- **`public/`**: Static assets and neural configuration maps.
- **`vite.config.js`**: Optimized build configuration for high-performance neural rendering.

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **NPM** (v9 or higher)

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `.env`:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

### Development
Launch the neural link in development mode:
```bash
npm run dev
```

### Production Build
Synthesize a production-ready assembly:
```bash
npm run build
npm start
```

## 🛠 Tech Stack
- **Frontend**: React, Framer Motion, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express, Google GenAI SDK
- **Visualization**: Recharts, D3.js (via architectural templates)
- **State**: Zustand / React Hooks

## 📜 System Protocols
This project adheres to strict neural-security protocols. All AI communications are proxied via the backend to prevent API key exposure and ensure data integrity.

---
© 2026 NEURAL GRID OPERATING SYSTEMS | ARCHITECT AI PROTOCOL
