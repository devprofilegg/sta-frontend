import { Home, Calendar, History, FileText, User, ShieldCheck, Users } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { useAuth } from '@/src/contexts/AuthContext';

export default function BottomNav() {
  const location = useLocation();
  const { user } = useAuth();

  const patientItems = [
    { icon: Home, label: 'Início', href: '/dashboard' },
    { icon: Calendar, label: 'Agenda', href: '/agenda' },
    { icon: History, label: 'Histórico', href: '/historico' },
    { icon: FileText, label: 'Registros', href: '/registros' },
  ];

  const adminItems = [
    { icon: ShieldCheck, label: 'Aprovações', href: '/admin/approvals' },
    { icon: Users, label: 'Usuários', href: '/admin/users' },
  ];

  const doctorItems = [
    { icon: Home, label: 'Início', href: '/dashboard' },
    { icon: Calendar, label: 'Agenda', href: '/agenda' },
    { icon: History, label: 'Histórico', href: '/historico' },
    { icon: FileText, label: 'Registros', href: '/registros' },
  ];

  const activeItems = user?.role === 'ADMIN' ? adminItems : 
                      user?.role === 'DOCTOR' ? doctorItems : patientItems;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl z-50 rounded-t-3xl shadow-[0_-8px_24px_rgba(0,0,0,0.04)]">
      {activeItems.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex flex-col items-center justify-center px-6 py-2 transition-all tap-highlight-none active:scale-90 duration-150",
              isActive 
                ? "bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-100 rounded-2xl" 
                : "text-slate-500 dark:text-slate-400"
            )}
          >
            <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} fill={isActive ? "currentColor" : "none"} fillOpacity={0.2} />
            <span className="text-[12px] font-semibold mt-1">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
