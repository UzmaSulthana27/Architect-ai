import { create } from 'zustand';

export const useStore = create((set) => ({
  currentFiles: [
    {
      path: 'Main.jsx',
      content: `export default function Preview() {
  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[400px]">
      <h2 className="text-3xl font-bold text-neon mb-4">Neural Synthesis Active</h2>
      <p className="text-gray-400 text-center max-w-xs">
        Edit the code to see real-time updates in the Architect AI workspace.
      </p>
    </div>
  );
}`
    },
    {
      path: 'styles.css',
      content: `.bg-scanlines {
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
  background-size: 100% 2px, 3px 100%;
}`
    }
  ],
  
  updateFileContent: (path, newContent) => set((state) => ({
    currentFiles: state.currentFiles.map(f => 
      f.path === path ? { ...f, content: newContent } : f
    )
  })),

  addFile: (path, content) => set((state) => ({
    currentFiles: [...state.currentFiles, { path, content }]
  }))
}));
