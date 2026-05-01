import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Atelier from "./pages/Atelier";
import Vault from "./pages/Vault";
import EngineRoom from "./pages/EngineRoom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Templates from "./pages/Templates";
import Learn from "./pages/Learn";
import NotFound from "./pages/NotFound";
import ToastContainer from "./components/ui/ToastContainer";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { CollaborationProvider } from "./context/CollaborationContext";


export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CollaborationProvider>
          <Router>
            <ToastContainer />
            <div className="h-screen w-screen bg-bg-primary text-text-primary selection:bg-neon/30 selection:text-neon flex flex-col overflow-hidden">
              <Navbar />

              {/* Neural Grid Overlay */}
              <div className="fixed inset-0 pointer-events-none neural-grid opacity-[0.4] z-0" />
              
              {/* Content Layer */}
              <main className="relative z-10 flex-1 flex flex-col h-full overflow-hidden pt-16">
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/templates" element={<Templates />} />
                    <Route path="/learn" element={<Learn />} />
                    
                    <Route 
                      path="/atelier" 
                      element={
                        <ProtectedRoute>
                          <Atelier />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/vault" 
                      element={
                        <ProtectedRoute>
                          <Vault />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/engine-room" 
                      element={
                        <ProtectedRoute>
                          <EngineRoom />
                        </ProtectedRoute>
                      } 
                    />
                    
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </AnimatePresence>
              </main>
            </div>
          </Router>
        </CollaborationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
