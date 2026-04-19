import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Stethoscope, 
  Search, 
  Mail, 
  MoreVertical, 
  UserPlus, 
  Shield, 
  User as UserIcon,
  Filter
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { User } from '@/src/types';

const mockUsers: User[] = [
  { id: '1', name: 'Dr. Sarah Jenkins', email: 'sarah.j@telehealth.com', role: 'DOCTOR', specialty: 'Cardiologia', avatar: 'https://picsum.photos/seed/doc1/100/100' },
  { id: '2', name: 'Dr. Carlos Mendes', email: 'carlos.m@telehealth.com', role: 'DOCTOR', specialty: 'Pediatria', avatar: 'https://picsum.photos/seed/doc2/100/100' },
  { id: '3', name: 'Paciente Maria Silva', email: 'maria@email.com', role: 'PATIENT', avatar: 'https://picsum.photos/seed/pat1/100/100' },
  { id: '4', name: 'Paciente João Souza', email: 'joao@email.com', role: 'PATIENT', avatar: 'https://picsum.photos/seed/pat2/100/100' },
  { id: '5', name: 'Admin Principal', email: 'admin@telehealth.com', role: 'ADMIN', avatar: 'https://picsum.photos/seed/admin/100/100' },
];

export default function AdminUserList() {
  const [users] = useState<User[]>(mockUsers);
  const [filter, setFilter] = useState<'ALL' | 'DOCTOR' | 'PATIENT'>('ALL');
  const [search, setSearch] = useState('');

  const filtered = users.filter(u => {
    const matchesFilter = filter === 'ALL' || u.role === filter;
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="pt-24 px-6 max-w-screen-xl mx-auto pb-32">
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 text-primary rounded-xl">
              <Users size={28} />
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-on-surface font-headline tracking-tight">Gestão de Usuários</h1>
          </div>
          <p className="text-on-surface-variant text-lg font-medium">Visualize e gerencie todos os usuários cadastrados.</p>
        </div>

        <div className="flex gap-2 bg-surface-container-high p-1 rounded-2xl">
          {(['ALL', 'DOCTOR', 'PATIENT'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-5 py-2 rounded-xl text-xs font-bold transition-all",
                filter === f ? "bg-white text-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              {f === 'ALL' ? 'Todos' : f === 'DOCTOR' ? 'Médicos' : 'Pacientes'}
            </button>
          ))}
        </div>
      </header>

      {/* Search Bar */}
      <div className="mb-8 relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" size={20} />
        <input 
          type="text" 
          placeholder="Buscar usuário por nome ou e-mail..."
          className="w-full h-14 pl-12 pr-4 bg-white border-0 rounded-2xl shadow-sm focus:ring-2 focus:ring-primary transition-all text-sm font-medium"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden border border-surface-container-high">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-on-surface-variant border-b border-surface-container-high">Usuário</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-on-surface-variant border-b border-surface-container-high">Cargo</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-on-surface-variant border-b border-surface-container-high">E-mail</th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-on-surface-variant border-b border-surface-container-high text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, idx) => (
                <motion.tr 
                  key={u.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group hover:bg-primary/5 transition-colors"
                >
                  <td className="px-6 py-4 border-b border-surface-container-high">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full overflow-hidden bg-surface-container-high flex-shrink-0">
                        <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <div className="font-bold text-on-surface">{u.name}</div>
                        {u.role === 'DOCTOR' && <div className="text-[10px] text-primary font-black uppercase">{u.specialty}</div>}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 border-b border-surface-container-high">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                      u.role === 'ADMIN' ? "bg-error-container text-on-error-container" :
                      u.role === 'DOCTOR' ? "bg-primary-container text-on-primary-container" :
                      "bg-secondary-container text-on-secondary-container"
                    )}>
                      {u.role === 'ADMIN' ? 'Admin' : u.role === 'DOCTOR' ? 'Médico' : 'Paciente'}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b border-surface-container-high text-sm text-on-surface-variant font-medium">
                    {u.email}
                  </td>
                  <td className="px-6 py-4 border-b border-surface-container-high text-right">
                    <button className="p-2 rounded-xl text-on-surface-variant hover:bg-white hover:text-primary transition-all">
                      <MoreVertical size={20} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <UserIcon size={48} className="mx-auto text-outline mb-4 opacity-20" />
            <p className="text-on-surface-variant font-medium">Nenhum usuário encontrado.</p>
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <button className="flex items-center gap-2 px-8 py-4 bg-primary text-on-primary rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
          <UserPlus size={20} /> Convidar Novo Usuário
        </button>
      </div>
    </div>
  );
}
