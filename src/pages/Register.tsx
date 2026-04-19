import { useState, FormEvent } from 'react';
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Accessibility, 
  User as UserIcon, 
  Stethoscope, 
  ArrowLeft,
  Calendar,
  ShieldAlert,
  Hash,
  Briefcase,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import { UserRole } from '@/src/types';
import { cn } from '@/src/lib/utils';

export default function Register() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole>('PATIENT');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.main 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden rounded-[2.5rem] shadow-[0px_32px_80px_rgba(0,0,0,0.08)] bg-white"
      >
        {/* Left Section: Visual & Value Prop */}
        <section className="hidden lg:flex lg:col-span-6 relative overflow-hidden flex-col justify-between p-12 bg-slate-50">
           <div className="z-10">
              <Link to="/login" className="inline-flex items-center gap-2 text-primary font-bold text-sm group">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                Voltar para Login
              </Link>
           </div>
           
           <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-primary rounded-2xl shadow-lg shadow-primary/20">
                  <Accessibility className="text-white" size={32} />
                </div>
                <h1 className="font-headline font-black text-3xl tracking-tighter text-on-surface">TeleHealth</h1>
              </div>
              
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="h-12 w-12 rounded-2xl bg-white border border-outline/10 flex items-center justify-center shrink-0 shadow-sm">
                    <ShieldAlert size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-on-surface mb-1">Segurança de Dados</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed font-medium">Seus dados médicos são criptografados e protegidos seguindo os mais altos padrões de bioética.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="h-12 w-12 rounded-2xl bg-white border border-outline/10 flex items-center justify-center shrink-0 shadow-sm">
                    <Video size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-on-surface mb-1">Telemedicina HD</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed font-medium">Consultas em alta definição com chat integrado e histórico em tempo real.</p>
                  </div>
                </div>
              </div>
           </div>

           <div className="relative z-10 pt-12 border-t border-outline/10 mt-12 flex items-center justify-between">
              <div className="flex -space-x-4">
                {[1,2,3,4].map(i => (
                  <img 
                    key={i}
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`}
                    className="h-10 w-10 rounded-full border-2 border-slate-50 ring-2 ring-white"
                    alt="user"
                  />
                ))}
              </div>
              <p className="text-[11px] font-black uppercase tracking-widest text-on-surface-variant/60">+ de 10k usuários ativos</p>
           </div>

           {/* Decorative Background Element */}
           <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </section>

        {/* Right Section: Form */}
        <section className="lg:col-span-6 flex flex-col justify-center px-8 py-12 md:px-16 overflow-y-auto max-h-screen">
          <div className="mb-10">
            <h3 className="font-headline text-3xl font-black text-on-surface mb-3 tracking-tight">Crie sua conta</h3>
            <p className="text-on-surface-variant font-medium">Comece sua jornada para uma saúde mais inteligente.</p>
          </div>

          {/* Role Selector */}
          <div className="flex gap-2 p-1.5 bg-surface-container-low rounded-2xl mb-10 w-fit">
            {(['PATIENT', 'DOCTOR'] as const).map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setSelectedRole(role)}
                className={cn(
                  "flex items-center gap-3 px-6 py-3 rounded-xl transition-all font-bold text-sm",
                  selectedRole === role 
                    ? "bg-white text-primary shadow-sm ring-1 ring-black/5" 
                    : "text-on-surface-variant hover:text-on-surface"
                )}
              >
                {role === 'PATIENT' ? <UserIcon size={18} /> : <Stethoscope size={18} />}
                {role === 'PATIENT' ? 'Sou Paciente' : 'Sou Médico'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-on-surface-variant/70 ml-1">Nome Completo</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-all">
                    <UserIcon size={18} />
                  </span>
                  <input placeholder="Ex: Maria Silva" className="w-full h-14 pl-12 bg-surface-container-low border-none rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all font-medium text-sm" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-on-surface-variant/70 ml-1">E-mail</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-all">
                    <Mail size={18} />
                  </span>
                  <input type="email" placeholder="seu@email.com" className="w-full h-14 pl-12 bg-surface-container-low border-none rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all font-medium text-sm" />
                </div>
              </div>
            </div>

            {selectedRole === 'PATIENT' ? (
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-on-surface-variant/70 ml-1">Data de Nascimento</label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-all">
                    <Calendar size={18} />
                  </span>
                  <input type="date" className="w-full h-14 pl-12 bg-surface-container-low border-none rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all font-medium text-sm" />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-on-surface-variant/70 ml-1">CRM</label>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-all">
                      <Hash size={18} />
                    </span>
                    <input placeholder="000000-UF" className="w-full h-14 pl-12 bg-surface-container-low border-none rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all font-medium text-sm" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-on-surface-variant/70 ml-1">Especialidade</label>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-all">
                      <Briefcase size={18} />
                    </span>
                    <select className="w-full h-14 pl-12 bg-surface-container-low border-none rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all font-medium text-sm appearance-none">
                       <option>Cardiologia</option>
                       <option>Clínica Geral</option>
                       <option>Dermatologia</option>
                       <option>Pediatria</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-on-surface-variant/70 ml-1">Senha de Acesso</label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-all">
                  <Lock size={18} />
                </span>
                <input type="password" placeholder="••••••••" className="w-full h-14 pl-12 bg-surface-container-low border-none rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all font-medium text-sm" />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full h-16 bg-primary text-on-primary font-black uppercase tracking-widest text-sm rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 mt-4",
                isLoading && "opacity-70 cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Criar Conta de {selectedRole === 'PATIENT' ? 'Paciente' : 'Médico'}
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <p className="text-center mt-8 text-sm font-medium text-on-surface-variant">
            Já tem uma conta? <Link to="/login" className="text-primary font-black hover:underline underline-offset-4">Fazer Login</Link>
          </p>
        </section>
      </motion.main>

      {/* Success Modal */}
      <AnimatePresence>
        {isSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 max-w-md w-full text-center shadow-2xl relative overflow-hidden"
            >
               <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-primary animate-gradient-x" />
               <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary scale-110">
                 <CheckCircle2 size={40} className="md:w-12 md:h-12" strokeWidth={2.5} />
               </div>
               <h3 className="font-headline text-2xl md:text-3xl font-black text-on-surface mb-3 md:mb-4 leading-tight">Conta criada com sucesso!</h3>
               <p className="text-on-surface-variant font-medium mb-6 md:mb-8 text-sm md:text-base leading-relaxed">
                 {selectedRole === 'PATIENT' 
                   ? 'Agora você já pode acessar seu painel e agendar sua primeira consulta.' 
                   : 'Suas informações foram enviadas para revisão. Você receberá um e-mail em até 24h com a liberação do acesso.'
                 }
               </p>
               <button 
                  onClick={() => navigate('/login')}
                  className="w-full py-4 md:py-5 bg-primary text-on-primary font-black uppercase tracking-widest text-xs md:text-sm rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary-container transition-all"
               >
                 Acessar Minha Conta
               </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Simple Video Icon fallback for local usage
function Video({ size, className }: { size: number, className: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m22 8-6 4 6 4V8Z" />
      <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
    </svg>
  );
}
