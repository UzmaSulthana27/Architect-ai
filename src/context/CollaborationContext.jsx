import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

const CollaborationContext = createContext(null);

export const CollaborationProvider = ({ children }) => {
  const { user } = useAuth();
  const [collaborators, setCollaborators] = useState({});
  const [comments, setComments] = useState([]);
  const [versions, setVersions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const channelRef = useRef(null);

  // Join a collaboration session
  const joinSession = async (sessionId) => {
    if (!supabase || !user) return;

    // If it's a new unique session request from Share button (handled in UI)
    // We just subscribe to the provided ID.
    
    // Cleanup previous channel
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
    }

    const channel = supabase.channel(`collaboration:${sessionId}`, {
      config: {
        presence: {
          key: user.id,
        },
      },
    });

    channel
      .on('presence', { event: 'sync' }, () => {
        const newState = channel.presenceState();
        const users = {};
        Object.keys(newState).forEach((key) => {
          users[key] = newState[key][0];
        });
        setCollaborators(users);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('User joined:', key, newPresences);
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        console.log('User left:', key, leftPresences);
      })
      .on('broadcast', { event: 'cursor-move' }, ({ payload }) => {
        setCollaborators((prev) => ({
          ...prev,
          [payload.userId]: {
            ...prev[payload.userId],
            cursor: payload.cursor,
            activeTab: payload.activeTab
          },
        }));
      })
      .on('broadcast', { event: 'code-update' }, ({ payload }) => {
        // Handle code updates from others
        window.dispatchEvent(new CustomEvent('neural-code-sync', { detail: payload }));
      })
      .on('broadcast', { event: 'comment-added' }, ({ payload }) => {
        setComments(prev => [...prev, payload]);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          const userColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
          await channel.track({
            userId: user.id,
            userName: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Architect',
            color: userColor,
            online_at: new Date().toISOString(),
          });
        }
      });

    channelRef.current = channel;
    setCurrentSession(sessionId);
    
    // Initial data fetch for comments and versions
    fetchComments(sessionId);
    fetchVersions(sessionId);
  };

  const fetchComments = async (sessionId) => {
    const { data } = await supabase
      .from('comments')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });
    if (data) setComments(data);
  };

  const fetchVersions = async (sessionId) => {
    const { data } = await supabase
      .from('versions')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: false });
    if (data) setVersions(data);
  };

  const broadcastCursor = (cursor, activeTab) => {
    if (channelRef.current && user) {
      channelRef.current.send({
        type: 'broadcast',
        event: 'cursor-move',
        payload: { userId: user.id, cursor, activeTab },
      });
    }
  };

  const broadcastCodeUpdate = (outputs, activeTab) => {
    if (channelRef.current && user) {
      channelRef.current.send({
        type: 'broadcast',
        event: 'code-update',
        payload: { userId: user.id, outputs, activeTab },
      });
    }
  };

  const addComment = async (comment) => {
    if (!currentSession || !user) return;
    
    const newComment = {
      ...comment,
      session_id: currentSession,
      user_id: user.id,
      user_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Architect',
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('comments')
      .insert([newComment])
      .select();

    if (!error && data) {
      channelRef.current.send({
        type: 'broadcast',
        event: 'comment-added',
        payload: data[0],
      });
      setComments(prev => [...prev, data[0]]);
    }
  };

  const saveVersion = async (outputs, message = "Auto-save") => {
    if (!currentSession || !user) return;

    const version = {
      session_id: currentSession,
      user_id: user.id,
      user_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Architect',
      outputs,
      message,
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('versions')
      .insert([version])
      .select();

    if (!error && data) {
      setVersions(prev => [data[0], ...prev]);
    }
  };

  const recordActivity = (action, item) => {
    if (channelRef.current && user) {
      channelRef.current.send({
        type: 'broadcast',
        event: 'activity',
        payload: { 
          user: user.user_metadata?.full_name || user.email?.split('@')[0],
          action, 
          item, 
          time: new Date().toISOString() 
        },
      });
    }
  };

  return (
    <CollaborationContext.Provider
      value={{
        collaborators,
        comments,
        versions,
        currentSession,
        joinSession,
        broadcastCursor,
        broadcastCodeUpdate,
        addComment,
        saveVersion,
        recordActivity,
      }}
    >
      {children}
    </CollaborationContext.Provider>
  );
};

export const useCollaboration = () => {
  const context = useContext(CollaborationContext);
  if (!context) {
    throw new Error('useCollaboration must be used within a CollaborationProvider');
  }
  return context;
};
