/**
 * Find the main component in the generated React code
 * Prefer default export, then first named component, then 'App'
 */
const findMainComponent = (code) => {
  // Look for "export default ComponentName"
  const defaultExportMatch = code.match(/export\s+default\s+(\w+)/);
  if (defaultExportMatch) {
    return defaultExportMatch[1];
  }
  
  // Look for "export default function ComponentName"
  const defaultFunctionMatch = code.match(/export\s+default\s+function\s+(\w+)/);
  if (defaultFunctionMatch) {
    return defaultFunctionMatch[1];
  }
  
  // Look for named function components
  const functionMatch = code.match(/(?:function|const)\s+(\w+)\s*=?\s*\(/);
  if (functionMatch) {
    return functionMatch[1];
  }
  
  return 'App'; 
};

/**
 * Builds a complete HTML document for rendering the React components in isolation
 */
export const buildPreviewHTML = (files) => {
  const reactFiles = files.filter(f => f.path.startsWith('react-ui/'));
  const cssFiles = files.filter(f => f.language === 'css');
  
  if (reactFiles.length === 0) {
    return `
      <!DOCTYPE html>
      <html>
        <body style="display: flex; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; background: #f8fafc; color: #94a3b8; margin: 0;">
          <div style="text-align: center; padding: 2rem;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">⚛️</div>
            <h3 style="margin: 0; color: #64748b;">No React nodes synthesized yet</h3>
            <p style="font-size: 0.875rem;">Generate code via the Neural Prompt Bar</p>
          </div>
        </body>
      </html>
    `;
  }
  
  // Remove "export default" lines from components so they don't break the combined execution
  // and instead capture the components as local variables
  const combinedCode = reactFiles.map(f => {
    let content = f.content;
    // Strip export statements that Babel standalone might choke on in a concatenated script
    content = content.replace(/export\s+default\s+/g, '');
    return `// File: ${f.path}\n${content}`;
  }).join('\n\n');
  
  const mainComp = findMainComponent(reactFiles[0].content);

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Neural Preview</title>
      
      <!-- Font -->
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">

      <!-- Tailwind CSS -->
      <script src="https://cdn.tailwindcss.com"></script>
      
      <!-- React & ReactDOM -->
      <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
      <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
      
      <!-- Babel for browser transpilation -->
      <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
      
      <!-- Framer Motion -->
      <script src="https://unpkg.com/framer-motion@11/dist/framer-motion.js"></script>
      
      <!-- Lucide Icons -->
      <script src="https://unpkg.com/lucide@latest"></script>
      <script src="https://unpkg.com/lucide-react@latest"></script>
      
      <style>
        body { font-family: 'Inter', sans-serif; background: white; margin: 0; }
        ${cssFiles.map(f => f.content).join('\n')}
      </style>
    </head>
    <body>
      <div id="root"></div>
      
      <script type="text/babel" data-presets="react">
        const { useState, useEffect, useRef, useMemo, useCallback } = React;
        const { motion, AnimatePresence, useScroll, useTransform } = FramerMotion;
        
        // Mock Lucide components for the preview environment
        const LucideIcon = ({ name, ...props }) => {
          const Icon = lucide[name] || lucide.Circle;
          return <Icon {...props} />;
        };

        // Neutral synthesis combined block
        ${combinedCode}
        
        try {
          const Main = typeof ${mainComp} !== 'undefined' ? ${mainComp} : () => (
            <div className="p-10 text-red-500">Error: Main component "${mainComp}" not found.</div>
          );

          const root = ReactDOM.createRoot(document.getElementById('root'));
          root.render(
            <React.StrictMode>
              <Main />
            </React.StrictMode>
          );
        } catch (err) {
          console.error('Render Error:', err);
        }

        // Bridge console to parent OS
        const capture = (level) => (...args) => {
          window.parent.postMessage({
            type: 'console',
            level,
            message: args.map(arg => 
              typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' ')
          }, '*');
        };

        console.log = capture('info');
        console.warn = capture('warning');
        console.error = capture('error');

        window.addEventListener('error', (e) => capture('error')(e.message));
      </script>
    </body>
    </html>
  `;
};
