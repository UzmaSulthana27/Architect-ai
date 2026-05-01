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

## 🌐 Deployment

### Frontend (Vercel)
To deploy the frontend to Vercel:
1. **Export to GitHub**: Use the "Export to GitHub" feature in AI Studio settings.
2. **Import to Vercel**: Connect your GitHub account to Vercel and select the repository.
3. **Configure Project**:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Output Directory**: `dist`
   - **Environment Variables**: Add `VITE_API_URL` pointing to your Render backend URL (e.g., `https://architect-ai-backend.onrender.com`).

4. **Finding your Vercel URL**:
   - Once you create the project in Vercel, go to the **Project Overview** page.
   - You will see a "Domains" section with a link (e.g., `https://architect-ai-uzmas-projects.vercel.app`).
   - If the build is still running, you can find the url in **Settings > Domains**.
   - **Important**: Use this exact URL for your Render `CORS_ORIGIN` environment variable.

### Final Verification
- **Frontend**: Visit your Vercel URL. It should load the "Neural Console".
- **Backend API**: Visit `https://your-backend.onrender.com/api/health`. It should return `{"status": "ok"}`.
- **Connection**: Open the browser console on your Vercel app. If you see CORS errors, double check the `CORS_ORIGIN` on Render.

### Backend (Render)
To deploy the backend to Render:
1. **New Web Service**: Create a new Web Service in the Render dashboard.
2. **Select Repository**: Choose your synced GitHub repository.
3. **Configure Service**:
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. **Environment Variables**:
   - `NODE_ENV`: `production`
   - `GEMINI_API_KEY`: Your Google Gemini API Key
   - `CORS_ORIGIN`: Your actual Vercel frontend URL (from step above). Use `*` temporarily if you aren't sure yet.
   - `PORT`: `3000` (Render usually sets this automatically, but you can be explicit).

> [!TIP]
> Ensure your Vercel **Root Directory** is set to `frontend`. Our configuration now uses `./src/main.jsx` which is highly compatible with Vercel's build process.

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
