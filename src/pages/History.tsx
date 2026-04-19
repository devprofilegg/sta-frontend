import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Calendar, 
  Filter, 
  Download, 
  History as HistoryIcon,
  MessageSquare,
  CheckCircle2,
  FileText,
  User as UserIcon,
  Plus
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useAuth } from '@/src/contexts/AuthContext';
import Modal from '@/src/components/ui/Modal';
import MedicalRecordForm from '@/src/components/forms/MedicalRecordForm';

interface HistoryItem {
  id: string;
  doctor: string;
  patient: string;
  specialty: string;
  date: string;
  type: string;
  outcome: string;
  hasAttachment: boolean;
}

const mockHistory: HistoryItem[] = [
  {
    id: '1',
    doctor: 'Dr. Michael Chen',
    patient: 'Paciente Maria Silva',
    specialty: 'Clínica Geral',
    date: '2024-03-15',
    type: 'Consulta de Rotina',
    outcome: 'Prescrição de Vitamina D e acompanhamento em 6 meses.',
    hasAttachment: true
  },
  {
    id: '2',
    doctor: 'Dra. Sarah Jenkins',
    patient: 'Paciente João Souza',
    specialty: 'Cardiologia',
    date: '2024-01-10',
    type: 'Revisão de Lab',
    outcome: 'Níveis hormonais estáveis. Manter medicação atual.',
    hasAttachment: true
  },
  {
    id: '3',
    doctor: 'Dr. Paulo Dr.',
    patient: 'Paciente Maria Silva',
    specialty: 'Dermatologia',
    date: '2023-11-22',
    type: 'Checkup',
    outcome: 'Eletrocardiograma normal. Recomendado exercícios aeróbicos.',
    hasAttachment: true
  }
];

export default function History() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isDoctor = user?.role === 'DOCTOR';

  const filteredHistory = mockHistory.filter(item => {
    const searchMatch = (
      item.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // If doctor, only show their consultations. If patient, only show their (mock logic)
    if (isDoctor) {
       return searchMatch && (item.doctor === user?.name || item.doctor === 'Dr. Michael Chen'); // Mock showing some
    }
    return searchMatch;
  });

  return (
    <div className="pt-24 px-4 md:px-6 max-w-screen-xl mx-auto pb-32">
      <header className="mb-8 md:mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-on-surface font-headline tracking-tight mb-2">
            {isDoctor ? 'Seus Atendimentos' : 'Seu Histórico'}
          </h1>
          <p className="text-on-surface-variant text-base md:text-lg font-medium">
            {isDoctor ? 'Gerencie o histórico de consultas realizadas por você.' : 'Relembre seus atendimentos e diagnósticos passados.'}
          </p>
        </div>
        
        {isDoctor && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
          >
             <Plus size={18} /> Novo Registro
          </button>
        )}
      </header>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Novo Registro de Atendimento"
      >
        <MedicalRecordForm type="REGISTRO" onSuccess={() => setIsModalOpen(false)} />
      </Modal>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" size={20} />
          <input 
            type="text" 
            placeholder={isDoctor ? "Buscar por paciente, data ou diagnóstico..." : "Buscar por médico, especialidade ou diagnóstico..."}
            className="w-full h-14 pl-12 pr-4 bg-white border-0 rounded-2xl shadow-sm focus:ring-2 focus:ring-primary transition-all text-sm font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="h-14 px-6 bg-white rounded-2xl shadow-sm font-bold text-sm flex items-center justify-center gap-2 text-on-surface-variant hover:text-primary transition-all">
          <Filter size={18} /> Filtros
        </button>
      </div>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-surface-container-high hidden md:block" />

        <div className="space-y-8">
          {filteredHistory.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative pl-0 md:pl-20"
            >
              <div className="absolute left-7 top-6 w-3 h-3 bg-primary rounded-full border-4 border-surface ring-4 ring-surface-container-high hidden md:block" />

              <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-transparent hover:border-primary/5 transition-all group">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 bg-surface-container-low text-on-surface-variant rounded-full text-xs font-bold flex items-center gap-1.5">
                        <Calendar size={12} /> {new Date(item.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                      </span>
                      <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-black uppercase tracking-wider">
                        {item.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mb-1">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <UserIcon size={16} />
                      </div>
                      <h3 className="text-2xl font-bold text-on-surface">
                        {isDoctor ? item.patient : item.doctor}
                      </h3>
                    </div>
                    <p className="text-primary font-bold text-sm mb-4 ml-11">{isDoctor ? 'Paciente Registrado' : item.specialty}</p>
                    
                    <div className="bg-surface-container-low p-5 rounded-2xl border-l-4 border-primary/40 ml-11">
                      <p className="text-sm italic text-on-surface-variant leading-relaxed">
                        "{item.outcome}"
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 shrink-0 md:pt-4">
                    {item.hasAttachment && (
                      <button className="flex items-center gap-2 px-6 py-3 bg-primary/5 text-primary rounded-xl text-xs font-black uppercase hover:bg-primary/10 transition-all">
                        <Download size={16} /> {isDoctor ? 'Ver Exames' : 'Ver Prescrição'}
                      </button>
                    )}
                    <button className="flex items-center gap-2 px-6 py-3 bg-surface-container text-on-surface-variant rounded-xl text-xs font-black uppercase hover:bg-surface-container-high transition-all">
                      <MessageSquare size={16} /> Ver Chat
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-surface-container text-on-surface-variant rounded-xl text-xs font-black uppercase hover:bg-surface-container-high transition-all">
                      <FileText size={16} /> {isDoctor ? 'Editar Nota' : 'Detalhes'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredHistory.length === 0 && (
          <div className="text-center py-24">
            <HistoryIcon size={64} className="mx-auto text-outline mb-4 opacity-10" />
            <p className="text-on-surface-variant font-medium text-lg">Nenhum registro encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
}
