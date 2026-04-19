import { cn } from '@/src/lib/utils';
import { 
  LayoutDashboard, 
  Calendar, 
  History, 
  FileText, 
  Video, 
  ShieldCheck,
  LogOut,
  Users
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/src/contexts/AuthContext';

export default function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = {
    PATIENT: [
      { icon: LayoutDashboard, label: 'Painel', href: '/dashboard' },
      { icon: Calendar, label: 'Agenda', href: '/agenda' },
      { icon: History, label: 'Histórico', href: '/historico' },
      { icon: FileText, label: 'Registros', href: '/registros' },
      { icon: Video, label: 'Consulta', href: '/consulta' },
    ],
    DOCTOR: [
      { icon: LayoutDashboard, label: 'Resumo', href: '/dashboard' },
      { icon: Calendar, label: 'Agenda', href: '/agenda' },
      { icon: History, label: 'Histórico', href: '/historico' },
      { icon: FileText, label: 'Prontuários', href: '/registros' },
      { icon: Video, label: 'Telemedicina', href: '/consulta' },
    ],
    ADMIN: [
      { icon: ShieldCheck, label: 'Aprovações', href: '/admin/approvals' },
      { icon: Users, label: 'Usuários', href: '/admin/users' },
    ]
  };

  const activeNav = user ? navItems[user.role] : [];

  return (
    <aside className="hidden lg:flex flex-col h-screen sticky top-0 p-4 bg-slate-50 dark:bg-slate-950 w-72 transition-all duration-300 ease-in-out">
      <div className="mb-8 px-4 pt-4">
        <div className="text-2xl font-black text-primary tracking-tighter font-headline">TeleHealth</div>
        <div className="text-sm font-medium text-slate-500 mt-1">
          {user?.role === 'PATIENT' ? 'Portal do Paciente' : user?.role === 'DOCTOR' ? 'Portal do Médico' : 'Central Admin'}
        </div>
        {user?.role === 'PATIENT' && (
          <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Estado de Saúde: Estável</span>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-2">
        {activeNav.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out",
                isActive 
                  ? "bg-white dark:bg-slate-800 text-primary dark:text-blue-300 font-bold shadow-sm" 
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
              )}
            >
              <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-2 px-2">
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 text-error hover:bg-error-container/20 rounded-xl transition-all font-bold text-sm"
        >
          <LogOut size={20} />
          Sair
        </button>
        
        {user?.role === 'PATIENT' && (
           <div className="p-4 bg-primary rounded-3xl text-on-primary mt-4">
            <p className="text-xs font-bold mb-3 opacity-80">Precisa de ajuda médica?</p>
            <button className="w-full py-3 bg-white text-primary font-bold rounded-2xl text-sm transition-transform active:scale-95 cursor-pointer">
              Marcar Consulta
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
