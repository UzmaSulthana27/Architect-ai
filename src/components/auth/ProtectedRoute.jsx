import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center space-y-4 bg-[#0b1326]">
        <Loader2 className="w-10 h-10 text-neon animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neon/40">Synchronizing Neural Link...</p>
      </div>
    );
  }

  if (!user) {
    // Redirect toward login but save the current location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
