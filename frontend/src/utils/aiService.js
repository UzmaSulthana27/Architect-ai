let genAI = null;

const SYSTEM_PROMPT = `You are "Architect AI" - a neural operating system that generates production-grade full-stack architectures.

CRITICAL RULES:
1. Generate THREE distinct layers for every architecture:
   - React UI: Modern, clean, professional interfaces using Tailwind CSS and Framer Motion.
   - Node.js API: Robust Express-based API endpoints.
   - SQL: Professional schema definitions.

2. AESTHETICS:
   - Theme: Neural/Cybernetic (Deep blues #0b1326, Neon purple #c0c1ff, Mint #c7fff0)
   - UI: Use "glass-card" class and "backdrop-blur-xl".
   - Layout: Clean, high-contrast, data-dense.

3. Output ONLY a valid JSON object:
{
  "layers": {
    "react": [
      { "path": "react-ui/components/Main.jsx", "content": "..." }
    ],
    "node": [
      { "path": "node-api/server.js", "content": "..." }
    ],
    "sql": [
      { "path": "database/init.sql", "content": "..." }
    ]
  },
  "explanation": "Summary of synthesis",
  "architecture": {
    "frontend": "UI Details",
    "backend": "Logic Details",
    "database": "Data Details"
  }
}

STYLING: Use Tailwind CSS utility classes. Avoid arbitrary values unless necessary.`;

export async function synthesizeManifest(prompt) {
  try {
    const API_URL = import.meta.env.VITE_API_URL || '';
    const response = await fetch(`${API_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: `${SYSTEM_PROMPT}\n\nUSER REQUEST: ${prompt}`,
        responseMimeType: "application/json"
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Server responded with ${response.status}`);
    }

    const data = await response.json();
    return JSON.parse(data.text);
  } catch (error) {
    console.error("Neural Synthesis Error:", error);
    throw error;
  }
}
