/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { type ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Sidebar from './components/layout/Sidebar';
import TopBar from './components/layout/TopBar';
import BottomNav from './components/layout/BottomNav';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Records from './pages/Records';
import Agenda from './pages/Agenda';
import History from './pages/History';
import AdminApprovals from './pages/AdminApprovals';
import AdminUserList from './pages/AdminUserList';
import Telemedicine from './pages/Telemedicine';

function AppLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { user } = useAuth();
  const isLoginPage = location.pathname === '/login' || location.pathname === '/register' || !user;

  if (isLoginPage) {
    return <main className="w-full h-full">{children}</main>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 w-full relative">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/registros" element={<Records />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/historico" element={<History />} />
            <Route path="/admin/approvals" element={<AdminApprovals />} />
            <Route path="/admin/users" element={<AdminUserList />} />
            <Route path="/consulta" element={<Telemedicine />} />
            
            {/* Fallbacks for other nav items for demo purposes */}
            <Route path="/perfil" element={<div className="pt-32 px-6">Página de Perfil (Demo)</div>} />
            <Route path="/pacientes" element={<div className="pt-32 px-6">Lista de Pacientes (Demo Médico)</div>} />
            
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </AppLayout>
      </Router>
    </AuthProvider>
  );
}
