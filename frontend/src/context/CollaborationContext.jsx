import React, { createContext, useContext, useState } from 'react';

const CollaborationContext = createContext({});

export const CollaborationProvider = ({ children }) => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [syncedLayers, setSyncedLayers] = useState([]);

  const broadcastChange = (change) => {
    // Placeholder for real-time collaboration logic via Supabase Realtime or WebSockets
    console.log('Broadcasting neural shift:', change);
  };

  return (
    <CollaborationContext.Provider value={{ activeUsers, syncedLayers, broadcastChange }}>
      {children}
    </CollaborationContext.Provider>
  );
};

export const useCollaboration = () => useContext(CollaborationContext);
