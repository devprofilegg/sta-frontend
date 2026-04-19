import React, { useState } from 'react';
import { HelpCircle, Send, Stethoscope, FileText, Info } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface RequestFormProps {
  onSuccess: () => void;
}

export default function PatientRequestForm({ onSuccess }: RequestFormProps) {
  const [selectedType, setSelectedType] = useState<'EXAM' | 'DOC' | 'MED'>('EXAM');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess();
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <label className="text-xs font-black uppercase text-on-surface-variant tracking-widest ml-1">O que você precisa?</label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'EXAM', label: 'Exame', icon: Stethoscope },
            { id: 'DOC', label: 'Laudo/Atestado', icon: FileText },
            { id: 'MED', label: 'Receita', icon: HelpCircle },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedType(item.id as any)}
              className={cn(
                "flex flex-col items-center justify-center p-5 rounded-3xl border-2 transition-all gap-3 bg-surface-container-low hover:bg-white",
                selectedType === item.id 
                  ? "border-primary text-primary bg-white shadow-md ring-4 ring-primary/5" 
                  : "border-transparent text-on-surface-variant"
              )}
            >
              <item.icon size={24} />
              <span className="text-[10px] font-black uppercase tracking-tight">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase text-on-surface-variant tracking-widest ml-1">Para qual especialidade?</label>
          <select className="w-full h-14 px-6 bg-surface-container-low border-none rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all font-medium text-sm appearance-none">
             <option>Clínica Geral</option>
             <option>Cardiologia</option>
             <option>Dermatologia</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black uppercase text-on-surface-variant tracking-widest ml-1">Motivo da Solicitação</label>
          <textarea 
            rows={4}
            className="w-full p-6 bg-surface-container-low border-none rounded-3xl focus:ring-4 focus:ring-primary/10 transition-all font-medium text-sm resize-none"
            placeholder="Explique brevemente por que você precisa deste documento/exame..."
            required
          ></textarea>
        </div>
      </div>

      <div className="p-5 bg-secondary/5 rounded-3xl border border-secondary/10 flex items-start gap-4">
        <div className="p-2 bg-secondary/20 text-secondary rounded-xl shrink-0">
          <Info size={20} />
        </div>
        <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
          Sua solicitação será enviada para a triagem médica. Você receberá uma notificação assim que o documento estiver disponível ou caso tenhamos dúvidas.
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
            Enviar Solicitação
            <Send size={18} />
          </>
        )}
      </button>
    </form>
  );
}
