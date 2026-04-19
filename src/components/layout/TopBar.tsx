import { Search, Bell, Settings, Command } from 'lucide-react';
import { useAuth } from '@/src/contexts/AuthContext';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

export default function TopBar() {
  const { user } = useAuth();

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-72 z-50 transition-all duration-300">
      <div className="absolute inset-0 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-b border-surface-container-high" />
      
      <div className="relative flex justify-between items-center px-4 md:px-8 h-20 w-full max-w-screen-2xl mx-auto">
        {/* Left: Mobile Logo & Search */}
        <div className="flex items-center gap-4 md:gap-8 flex-1">
          <span className="text-xl md:text-2xl font-black text-primary tracking-tighter lg:hidden font-headline">TeleHealth</span>
          
          <div className="hidden md:flex items-center group max-w-md w-full relative">
            <div className="absolute left-4 text-on-surface-variant/40 group-focus-within:text-primary transition-colors pointer-events-none">
              <Search size={18} strokeWidth={2.5} />
            </div>
            <input 
              type="text" 
              placeholder="Buscar por prontuários, médicos ou exames..." 
              className="w-full h-11 pl-11 pr-12 bg-surface-container/40 border border-transparent focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 rounded-2xl text-sm font-medium transition-all placeholder:text-on-surface-variant/40"
            />
            <div className="absolute right-3 flex items-center gap-1 px-1.5 py-1 bg-surface-container-high rounded-lg border border-outline/10 pointer-events-none">
               <Command size={10} className="text-on-surface-variant/60" />
               <span className="text-[10px] font-black text-on-surface-variant/60">K</span>
            </div>
          </div>
        </div>

        {/* Right: Actions & Profile */}
        <div className="flex items-center gap-3 md:gap-6">
          <div className="hidden sm:flex items-center gap-3 pr-4 md:pr-6 border-r border-surface-container-high">
            <button className="flex items-center gap-2 px-4 py-2 bg-primary/5 text-primary rounded-xl text-xs font-black uppercase tracking-tight hover:bg-primary/10 transition-all">
               Fale Conosco
            </button>
            <div className="flex gap-1">
               <button className="p-2 md:p-2.5 rounded-xl hover:bg-surface-container-high text-on-surface-variant transition-all relative group">
                <Bell size={20} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-error rounded-full ring-2 ring-white" />
                <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-on-surface text-surface text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Notificações</span>
              </button>
              <button className="p-2 md:p-2.5 rounded-xl hover:bg-surface-container-high text-on-surface-variant transition-all group">
                <Settings size={20} />
              </button>
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 md:gap-3 pl-1.5 md:pl-2 py-1 pr-1 bg-surface-container-low hover:bg-surface-container-high border border-outline/5 rounded-2xl transition-all shadow-sm group"
          >
            <div className="text-right hidden xl:block px-2">
              <div className="text-sm font-bold text-on-surface leading-tight group-hover:text-primary transition-colors">{user?.name}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/70">
                {user?.role === 'PATIENT' ? 'Paciente Verificado' : user?.role === 'DOCTOR' ? 'Médico Residente' : 'Administrador'}
              </div>
            </div>
            <div className="h-8 md:h-10 w-8 md:w-10 rounded-xl overflow-hidden bg-primary/10 border-2 border-white shadow-sm transition-transform">
              <img 
                src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} 
                alt="Profile" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.button>
        </div>
      </div>
    </header>
  );
}
