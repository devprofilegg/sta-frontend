import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  UserCheck, 
  UserX, 
  ShieldCheck, 
  Mail, 
  FileBadge, 
  ExternalLink,
  Search,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { DoctorApproval } from '@/src/types';

const mockApprovals: DoctorApproval[] = [
  {
    id: '1',
    name: 'Dr. Ricardo Silva',
    crm: '123456-SP',
    specialty: 'Neurologia',
    email: 'ricardo.silva@telehealth.com',
    status: 'PENDING'
  },
  {
    id: '2',
    name: 'Dra. Luísa Farias',
    crm: '789012-RJ',
    specialty: 'Psiquiatria',
    email: 'luisa.farias@telehealth.com',
    status: 'PENDING'
  },
  {
    id: '3',
    name: 'Dr. Marcos Oliveira',
    crm: '345678-MG',
    specialty: 'Dermatologia',
    email: 'marcos.oliveira@telehealth.com',
    status: 'PENDING'
  }
];

export default function AdminApprovals() {
  const [approvals, setApprovals] = useState(mockApprovals);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  const handleAction = (id: string, status: 'APPROVED' | 'REJECTED') => {
    const doctor = approvals.find(a => a.id === id);
    setApprovals(prev => prev.filter(a => a.id !== id));
    setNotification({
      message: `Médico ${doctor?.name} ${status === 'APPROVED' ? 'aprovado' : 'rejeitado'} com sucesso.`,
      type: status === 'APPROVED' ? 'success' : 'error'
    });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="pt-24 px-6 max-w-screen-xl mx-auto pb-32">
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary/10 text-primary rounded-xl">
            <ShieldCheck size={28} />
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-on-surface font-headline tracking-tight">Aprovações</h1>
        </div>
        <p className="text-on-surface-variant text-lg font-medium">Controle de credenciamento médico na plataforma.</p>
      </header>

      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className={cn(
            "mb-6 p-4 rounded-2xl flex items-center gap-3 font-bold text-sm",
            notification.type === 'success' ? "bg-secondary-container text-on-secondary-container" : "bg-error-container text-on-error-container"
          )}
        >
          {notification.type === 'success' ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
          {notification.message}
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {approvals.map((doc, idx) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-[2rem] p-8 shadow-sm border border-transparent hover:border-primary/10 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="h-16 w-16 bg-surface-container-high rounded-3xl flex items-center justify-center text-primary">
                    <UserCheck size={32} />
                  </div>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest">Pendente</span>
                </div>

                <h3 className="text-xl font-bold text-on-surface mb-1">{doc.name}</h3>
                <p className="text-primary font-bold text-sm mb-4">{doc.specialty}</p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
                    <FileBadge size={14} className="opacity-50" /> CRM: {doc.crm}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
                    <Mail size={14} className="opacity-50" /> {doc.email}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button className="w-full flex items-center justify-center gap-2 text-xs font-black uppercase tracking-tighter py-3 text-on-surface-variant hover:text-primary transition-all">
                  Ver currículo <ExternalLink size={14} />
                </button>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <button 
                    onClick={() => handleAction(doc.id, 'APPROVED')}
                    className="h-14 bg-secondary text-white rounded-2xl flex items-center justify-center hover:bg-secondary/90 transition-all shadow-md active:scale-95"
                  >
                    <UserCheck size={24} />
                  </button>
                  <button 
                    onClick={() => handleAction(doc.id, 'REJECTED')}
                    className="h-14 bg-error text-white rounded-2xl flex items-center justify-center hover:bg-error/90 transition-all shadow-md active:scale-95"
                  >
                    <UserX size={24} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {approvals.length === 0 && (
          <div className="col-span-full py-20 bg-surface-container-low rounded-[3rem] border-2 border-dashed border-outline-variant flex flex-col items-center justify-center text-center px-6">
            <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center text-secondary mb-4 shadow-sm">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-2xl font-bold text-on-surface mb-2">Tudo em dia!</h3>
            <p className="text-on-surface-variant font-medium max-w-xs">Não existem novos pedidos de credenciamento para revisar no momento.</p>
          </div>
        )}
      </div>
    </div>
  );
}
