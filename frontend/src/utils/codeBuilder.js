
export function buildPreviewHTML(files) {
  if (!files || files.length === 0) return '';

  // Extract content from files
  // In our manifest, files often look like { path: "react-ui/components/Main.jsx", content: "..." }
  // We want to combine them into something that can run in a standalone HTML page.
  
  // For a simple preview, we usually look for a primary file or combine scripts.
  // Since this is a "Neural Workspace", we'll try to find a component and render it.
  
  const reactFiles = files.filter(f => f.path.includes('react-ui') || f.path.endsWith('.jsx') || f.path.endsWith('.js'));
  const cssFiles = files.filter(f => f.path.endsWith('.css'));
  
  // Basic implementation: find the first JSX file and treat it as the main component
  // In a real app, you'd need a bundler, but for a preview we can use Babel standalone
  const mainFile = reactFiles.find(f => f.path.includes('Main') || f.path.includes('App')) || reactFiles[0];
  
  if (!mainFile) {
    // If no react files, maybe it's just HTML?
    const htmlFile = files.find(f => f.path.endsWith('.html'));
    if (htmlFile) return htmlFile.content;
    return '<div style="color: white; padding: 20px;">No previewable content found.</div>';
  }

  const code = mainFile.content;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="https://unpkg.com/framer-motion@11.0.3/dist/framer-motion.js"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            neon: '#1ee6d2',
            'bg-dark': '#0b1326',
          }
        }
      }
    }
  </script>

  <style>
    body { background: #0b1326; color: white; margin: 0; min-height: 100vh; font-family: sans-serif; overflow-x: hidden; }
    .glass-card {
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 1rem;
    }
    ${cssFiles.map(f => f.content).join('\n')}
  </style>
  
  <script>
    // Console log forwarding
    const originalLog = console.log;
    const originalError = console.error;
    
    function forwardLog(level, args) {
      window.parent.postMessage({
        type: 'console',
        level: level,
        message: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ')
      }, '*');
    }

    console.log = (...args) => { originalLog(...args); forwardLog('info', args); };
    console.error = (...args) => { originalError(...args); forwardLog('error', args); };

    window.onerror = (message) => {
      console.error(message);
    };
  </script>
</head>
<body>
  <div id="preview-root"></div>

  <script type="text/babel">
    const { useState, useEffect, useRef, useMemo } = React;
    const { motion, AnimatePresence } = window.Motion || {};
    
    // Auto-inject lucide icons into the global scope
    if (window.lucide) {
      Object.entries(window.lucide.icons).forEach(([name, icon]) => {
        const componentName = name.charAt(0).toUpperCase() + name.slice(1).replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        window[componentName] = lucide.createLucideIcon(name, icon);
      });
    }

    // Helper to extract component name from code
    function findComponentName(code) {
      const match = code.match(/export default function (\w+)/) || 
                    code.match(/function (\w+)/) || 
                    code.match(/const (\w+) =/);
      return match ? match[1] : 'PreviewComponent';
    }

    try {
      // Use hex encoding for the code to avoid any escaping issues in the generated string
      const hexCode = '${Buffer.from(code).toString('hex')}';
      const decodedCode = new TextDecoder().decode(new Uint8Array(hexCode.match(/.{1,2}/g).map(byte => parseInt(byte, 16))));
      
      let transformedCode = decodedCode;
      
      // Sophisticated import removal - non-greedy and handles multiline
      transformedCode = transformedCode.replace(/import[\s\S]*?from\s+['"].*?['"];?/g, '');
      transformedCode = transformedCode.replace(/export\s+default\s+/g, '');
      
      const componentName = findComponentName(transformedCode);
      
      const renderCode = \`
        \${transformedCode}
        const container = document.getElementById('preview-root');
        if (container) {
          const root = ReactDOM.createRoot(container);
          root.render(React.createElement(\${componentName}));
        }
      \`;
      
      const transformed = Babel.transform(renderCode, { 
        presets: ['react'],
        plugins: [] 
      }).code;
      
      eval(transformed);
    } catch (err) {
      console.error("Synthesis Error: " + err.message);
      document.getElementById('preview-root').innerHTML = \`
        <div style="padding: 40px; text-align: center; font-family: monospace;">
          <h2 style="color: #1ee6d2; margin-bottom: 10px;">NEURAL SYNTHESIS FAILURE</h2>
          <p style="opacity: 0.7; color: #ff6b6b;">\${err.message}</p>
        </div>
      \`;
    }
  </script>
</body>
</html>
  `;
}
