import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  Upload, 
  Search, 
  Download, 
  Eye, 
  MoreVertical, 
  Plus, 
  Filter,
  User as UserIcon,
  Tag,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useAuth } from '@/src/contexts/AuthContext';
import Modal from '@/src/components/ui/Modal';
import MedicalRecordForm from '@/src/components/forms/MedicalRecordForm';
import PatientRequestForm from '@/src/components/forms/PatientRequestForm';

interface Record {
  id: string;
  patientName: string;
  doctorName: string;
  date: string;
  title: string;
  category: string;
  preview: string;
}

const mockRecords: Record[] = [
  { id: '1', patientName: 'Maria Silva', doctorName: 'Dra. Sarah Jenkins', date: '2024-03-15', title: 'Relatório Cardiologia', category: 'Exame', preview: 'Paciente apresenta ritmo sinusal normal...' },
  { id: '2', patientName: 'João Souza', doctorName: 'Dr. Paulo Dr.', date: '2024-02-10', title: 'Atestado Médico', category: 'Documento', preview: 'Repouso absoluto por 3 dias devido a...' },
  { id: '3', patientName: 'Maria Silva', doctorName: 'Dr. Paulo Dr.', date: '2024-01-20', title: 'Prescrição Diária', category: 'Receita', preview: 'Uso contínuo de medicação para pressão...' },
];

export default function Records() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const isDoctor = user?.role === 'DOCTOR';

  const filteredRecords = mockRecords.filter(r => {
    const matchesSearch = r.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (isDoctor) {
      return matchesSearch && (r.doctorName === user?.name || r.doctorName === 'Dr. Paulo Dr.');
    }
    return matchesSearch;
  });

  return (
    <div className="pt-24 px-4 md:px-6 max-w-screen-xl mx-auto pb-32">
      <header className="mb-8 md:mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-on-surface font-headline tracking-tight mb-2">
            {isDoctor ? 'Gestão de Prontuários' : 'Seus Registros'}
          </h1>
          <p className="text-on-surface-variant text-base md:text-lg font-medium">
            {isDoctor ? 'Acesse e organize os documentos clínicos de seus pacientes.' : 'Seus exames, laudos e documentos em um só lugar.'}
          </p>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-surface-container-high text-on-surface rounded-2xl font-bold text-sm hover:bg-surface-container-highest transition-all">
             <Upload size={18} /> {isDoctor ? 'Importar' : 'Enviar'}
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
          >
             <Plus size={18} /> {isDoctor ? 'Novo Laudo' : 'Solicitar'}
          </button>
        </div>
      </header>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={isDoctor ? "Emitir Novo Laudo" : "Solicitar Documento ou Exame"}
      >
        {isDoctor ? (
          <MedicalRecordForm type="LAUDO" onSuccess={() => setIsModalOpen(false)} />
        ) : (
          <PatientRequestForm onSuccess={() => setIsModalOpen(false)} />
        )}
      </Modal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Stats & Filters */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-surface-container-high">
            <h3 className="font-bold text-on-surface mb-4 flex items-center gap-2">
              <Filter size={18} /> Filtros Rápidos
            </h3>
            <div className="space-y-2">
              {['Exames', 'Receitas', 'Laudos', 'Atestados'].map(cat => (
                <button key={cat} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-primary/5 text-sm font-medium text-on-surface-variant hover:text-primary transition-all group">
                  <div className="flex items-center gap-3">
                    <Tag size={16} className="opacity-40 group-hover:opacity-100" />
                    {cat}
                  </div>
                  <span className="bg-surface-container px-2 py-0.5 rounded-lg text-[10px] font-black">12</span>
                </button>
              ))}
            </div>
          </div>

          {!isDoctor && (
             <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/20 text-primary rounded-xl">
                  <AlertCircle size={20} />
                </div>
                <h4 className="font-bold text-primary">Atenção</h4>
              </div>
              <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
                Você possui 3 documentos pendentes de assinatura digital. Acesse o portal Gov.br para validar.
              </p>
            </div>
          )}
        </aside>

        {/* Right Column: List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" size={20} />
            <input 
              type="text" 
              placeholder={isDoctor ? "Buscar por paciente ou título do laudo..." : "Buscar por título ou descrição..."}
              className="w-full h-14 pl-12 pr-4 bg-white border-0 rounded-2xl shadow-sm focus:ring-2 focus:ring-primary transition-all text-sm font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            {filteredRecords.map((record, idx) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white p-6 rounded-3xl shadow-sm border border-transparent hover:border-primary/10 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group"
              >
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 bg-surface-container-high rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <FileText size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface text-lg leading-tight mb-1">{record.title}</h4>
                    <div className="flex items-center gap-3 text-xs font-medium text-on-surface-variant">
                      <span className="flex items-center gap-1"><UserIcon size={12} /> {isDoctor ? record.patientName : record.doctorName}</span>
                      <span>•</span>
                      <span>{record.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                   <span className="hidden md:inline-block px-3 py-1 bg-surface-container rounded-full text-[10px] font-black uppercase tracking-wider text-on-surface-variant mr-4">
                      {record.category}
                   </span>
                   <button className="h-12 w-12 bg-surface-container-low hover:bg-surface-container-high rounded-xl flex items-center justify-center text-on-surface-variant hover:text-primary transition-all">
                      <Download size={20} />
                   </button>
                   <button className="h-12 w-12 bg-surface-container-low hover:bg-surface-container-high rounded-xl flex items-center justify-center text-on-surface-variant hover:text-primary transition-all">
                      <Eye size={20} />
                   </button>
                   <button className="h-12 w-12 bg-surface-container-low hover:bg-surface-container-high rounded-xl flex items-center justify-center text-on-surface-variant hover:text-primary transition-all">
                      <MoreVertical size={20} />
                   </button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredRecords.length === 0 && (
            <div className="text-center py-20 bg-surface-container-low rounded-[2.5rem] border-2 border-dashed border-outline-variant">
              <FileText size={48} className="mx-auto text-outline mb-4 opacity-20" />
              <p className="text-on-surface-variant font-medium">Nenhum registro encontrado para sua busca.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
