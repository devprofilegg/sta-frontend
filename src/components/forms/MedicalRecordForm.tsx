import React, { useState } from 'react';
import { FileText, Send, User, Calendar, Tag, AlertCircle } from 'lucide-react';

interface RecordFormProps {
  type: 'LAUDO' | 'REGISTRO';
  onSuccess: (data: any) => void;
}

export default function MedicalRecordForm({ type, onSuccess }: RecordFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess({});
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase text-on-surface-variant tracking-widest ml-1">Paciente</label>
          <div className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
              <User size={18} />
            </span>
            <select className="w-full h-14 pl-12 bg-surface-container-low border-none rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all font-medium text-sm appearance-none">
               <option>Maria Silva</option>
               <option>João Souza</option>
               <option>Ana Clara</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black uppercase text-on-surface-variant tracking-widest ml-1">Data do {type === 'LAUDO' ? 'Exame' : 'Atendimento'}</label>
          <div className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
              <Calendar size={18} />
            </span>
            <input type="date" className="w-full h-14 pl-12 bg-surface-container-low border-none rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all font-medium text-sm" required />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-black uppercase text-on-surface-variant tracking-widest ml-1">Título do Documento</label>
        <div className="relative group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
            <Tag size={18} />
          </span>
          <input 
            placeholder={type === 'LAUDO' ? "Ex: Eletrocardiograma Repouso" : "Ex: Consulta Retorno Hipertensão"} 
            className="w-full h-14 pl-12 bg-surface-container-low border-none rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all font-medium text-sm" 
            required 
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-black uppercase text-on-surface-variant tracking-widest ml-1">Descrição / Diagnóstico</label>
        <textarea 
          rows={5}
          className="w-full p-4 bg-surface-container-low border-none rounded-3xl focus:ring-4 focus:ring-primary/10 transition-all font-medium text-sm resize-none"
          placeholder="Descreva detalhadamente o quadro e conclusões..."
          required
        ></textarea>
      </div>

      <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 flex items-start gap-3">
        <AlertCircle size={20} className="text-primary shrink-0 mt-0.5" />
        <p className="text-[11px] text-on-surface-variant font-medium leading-relaxed italic">
          Ao salvar, este documento será assinado digitalmente com seu CRM e ficará disponível no histórico do paciente imediatamente.
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full h-16 bg-primary text-on-primary font-black uppercase tracking-widest text-sm rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3"
      >
        {isLoading ? (
          <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            Finalizar {type === 'LAUDO' ? 'Laudo' : 'Registro'}
            <Send size={18} />
          </>
        )}
      </button>
    </form>
  );
}
