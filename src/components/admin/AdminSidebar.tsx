import { Link, useLocation } from 'react-router-dom';
import { 
  ShieldAlert, 
  LayoutDashboard, 
  Users, 
  ShieldCheck, 
  Building2, 
  BarChart3,
  Activity, 
  Settings, 
  LogOut,
  ClipboardList
} from 'lucide-react';
import { motion } from 'framer-motion';

const AdminSidebar = ({ onLogout }: { onLogout: () => void }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '#', icon: LayoutDashboard, disabled: true },
    { name: 'Users', path: '/admin', icon: Users, disabled: false },
    { name: 'Quiz Results', path: '/admin/quiz-results', icon: ClipboardList, disabled: false },
    { name: 'Departments', path: '#', icon: Building2, disabled: true },
    { name: 'Reports', path: '#', icon: BarChart3, disabled: true },
    { name: 'Activity Logs', path: '#', icon: Activity, disabled: true },
    { name: 'Settings', path: '#', icon: Settings, disabled: true },
  ];

  return (
    <div className="w-64 bg-[#111827] text-white flex flex-col h-screen sticky top-0 left-0 border-r border-white/10 shadow-xl overflow-y-auto">
      {/* Logo/Title */}
      <div className="p-6 flex items-center gap-3 border-b border-white/5">
        <ShieldAlert className="text-[#3b82f6] w-8 h-8" />
        <span className="text-xl font-bold tracking-wide">Admin Panel</span>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path && !item.disabled;
          return (
            <Link
              key={item.name}
              to={item.disabled ? '#' : item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden group ${
                isActive 
                  ? 'bg-[#2563eb] text-white font-medium shadow-[0_4px_12px_rgba(37,99,235,0.3)]' 
                  : item.disabled
                    ? 'text-white/40 cursor-not-allowed'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              {isActive && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute inset-0 bg-[#2563eb] z-0"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <div className="relative z-10 flex items-center gap-3 w-full">
                <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : item.disabled ? 'text-white/40' : 'text-white/70 group-hover:text-white'}`} />
                <span>{item.name}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-white/5">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl text-white/70 hover:bg-white/5 hover:text-white transition-all duration-300"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
