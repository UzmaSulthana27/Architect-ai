import React from 'react';
import { useStore } from '../../store/useStore';
import { buildPreviewHTML } from '../../utils/codeBuilder';

export default function LivePreview() {
  const { currentFiles } = useStore();
  
  // Convert our file structure into a single HTML preview
  const srcDoc = React.useMemo(() => buildPreviewHTML(currentFiles), [currentFiles]);

  return (
    <div className="w-full h-full bg-[#0b1326] relative overflow-hidden">
      <iframe
        title="preview"
        srcDoc={srcDoc}
        className="w-full h-full border-none"
        sandbox="allow-scripts allow-same-origin"
      />
      
      {/* Scanline effect for that retro-future look */}
      <div className="absolute inset-0 pointer-events-none bg-scanlines opacity-[0.03]" />
    </div>
  );
}
