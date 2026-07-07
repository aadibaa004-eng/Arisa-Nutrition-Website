import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, Navigate, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, FileText, Star, Image, MessageSquare,
  LogOut, Leaf, Menu, X, ChevronRight,
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

const navItems = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/blogs', icon: FileText, label: 'Blogs' },
  { to: '/admin/reviews', icon: Star, label: 'Reviews' },
  { to: '/admin/gallery', icon: Image, label: 'Gallery' },
  { to: '/admin/contacts', icon: MessageSquare, label: 'Contacts' },
];

const AdminLayout: React.FC = () => {
  const { admin, isLoading, logout, checkAuth } = useAdminAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Check auth status only when entering admin routes
    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-sage-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!admin) return <Navigate to="/admin/login" replace />;

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-sage-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Leaf className="w-4 h-4 text-sage-green" />
          </div>
          <div>
            <p className="text-gray-800 font-bold text-sm">Arisa Nutrition</p>
            <p className="text-gray-400 text-xs">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-sage-green text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
                {isActive && <ChevronRight className="w-3 h-3 ml-auto" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-sage-green/10 flex items-center justify-center text-sage-green font-bold text-xs flex-shrink-0">
            {admin.email.charAt(0).toUpperCase()}
          </div>
          <p className="text-gray-500 text-xs truncate">{admin.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col bg-white border-r border-gray-200 flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed inset-y-0 left-0 w-72 bg-white border-r border-gray-200 z-50 flex flex-col lg:hidden"
            >
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center gap-4 px-4 py-4 bg-white border-b border-gray-200">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-400 hover:text-gray-700"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-sage-green" />
            <span className="text-gray-800 font-bold text-sm">Arisa Nutrition Admin</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
