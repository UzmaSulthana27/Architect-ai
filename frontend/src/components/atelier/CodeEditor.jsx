import React from 'react';
import Editor from '@monaco-editor/react';
import { useStore } from '../../store/useStore';

export default function CodeEditor({ fileName }) {
  const { currentFiles, updateFileContent } = useStore();
  
  const file = currentFiles.find(f => f.path.includes(fileName)) || currentFiles[0];

  const handleEditorChange = (value) => {
    if (file) {
      updateFileContent(file.path, value);
    }
  };

  const language = fileName.endsWith('.css') ? 'css' : fileName.endsWith('.json') ? 'json' : 'javascript';

  return (
    <div className="w-full h-full">
      <Editor
        height="100%"
        defaultLanguage={language}
        theme="vs-dark"
        value={file?.content || '// Loading interface...'}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'JetBrains Mono', monospace",
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          readOnly: false,
          backgroundColor: '#0d1117',
          padding: { top: 20 }
        }}
      />
    </div>
  );
}
