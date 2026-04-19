import type { FormEvent } from 'react';
import { Mail, Lock, Eye, ArrowRight, Accessibility, User as UserIcon, ShieldCheck, Stethoscope } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/src/contexts/AuthContext';
import { useState } from 'react';
import { UserRole } from '@/src/types';
import { cn } from '@/src/lib/utils';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>('PATIENT');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login(selectedRole);
    if (selectedRole === 'ADMIN') {
      navigate('/admin/approvals');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden rounded-3xl shadow-[0px_12px_32px_rgba(26,28,30,0.06)] bg-surface-container-lowest"
      >
        {/* Left Section: Visual Anchor */}
        <section className="hidden lg:flex lg:col-span-7 relative overflow-hidden min-h-[700px] flex-col justify-end p-12">
          <div className="absolute inset-0 z-0">
            <img 
              alt="Healthcare professional" 
              className="w-full h-full object-cover" 
              src="https://picsum.photos/seed/medical/1200/1000" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
          </div>
          
          <div className="relative z-10 text-on-primary max-w-md">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl">
                <Accessibility className="text-white" size={32} />
              </div>
              <h1 className="font-headline font-extrabold text-3xl tracking-tighter">TeleHealth</h1>
            </div>
            <h2 className="font-headline text-5xl font-bold leading-tight mb-4">Cuidado que abraça, onde quer que você esteja.</h2>
            <p className="font-body text-lg text-primary-fixed leading-relaxed opacity-90">Sua saúde não pode esperar. Acesse consultas, exames e seu histórico médico com segurança e elegância.</p>
          </div>
        </section>

        {/* Right Section: Login Form */}
        <section className="lg:col-span-5 flex flex-col justify-center px-8 py-16 md:px-16 bg-surface-container-lowest">
          <div className="lg:hidden flex items-center gap-2 mb-12">
            <Accessibility className="text-primary" size={32} />
            <span className="font-headline font-extrabold text-2xl tracking-tighter text-primary">TeleHealth</span>
          </div>

          <div className="mb-10">
            <h3 className="font-headline text-3xl font-bold text-on-surface mb-2">Bem-vindo de volta</h3>
            <p className="text-on-surface-variant text-lg">Escolha seu perfil para entrar na plataforma.</p>
          </div>

          {/* Role Selector */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {(['PATIENT', 'DOCTOR', 'ADMIN'] as const).map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setSelectedRole(role)}
                className={cn(
                  "flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all gap-2",
                  selectedRole === role 
                    ? "border-primary bg-primary/5 text-primary" 
                    : "border-surface-container-high hover:border-outline-variant text-on-surface-variant"
                )}
              >
                {role === 'PATIENT' && <UserIcon size={24} />}
                {role === 'DOCTOR' && <Stethoscope size={24} />}
                {role === 'ADMIN' && <ShieldCheck size={24} />}
                <span className="text-[10px] font-black uppercase tracking-tighter">
                  {role === 'PATIENT' ? 'Paciente' : role === 'DOCTOR' ? 'Médico' : 'Admin'}
                </span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 opacity-50 pointer-events-none">
              <label className="block text-sm font-semibold text-on-surface-variant ml-1" htmlFor="email">Endereço de E-mail</label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                  <Mail size={18} />
                </span>
                <input 
                  className="w-full h-14 pl-12 pr-4 bg-surface-container-highest border-0 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white transition-all placeholder:text-outline" 
                  id="email" 
                  name="email" 
                  value="demo@telehealth.com"
                  readOnly
                  type="email" 
                />
              </div>
            </div>

            <div className="space-y-2 opacity-50 pointer-events-none">
              <label className="block text-sm font-semibold text-on-surface-variant ml-1" htmlFor="password">Senha</label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                  <Lock size={18} />
                </span>
                <input 
                  className="w-full h-14 pl-12 pr-12 bg-surface-container-highest border-0 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white transition-all placeholder:text-outline" 
                  id="password" 
                  name="password" 
                  value="••••••••"
                  readOnly
                  type="password" 
                />
              </div>
            </div>

            <button 
              className="w-full h-14 bg-primary text-on-primary font-bold text-lg rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-2 group" 
              type="submit"
            >
              Entrar como {selectedRole === 'PATIENT' ? 'Paciente' : selectedRole === 'DOCTOR' ? 'Médico' : 'Administrador'}
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-2">
            <p className="text-sm font-medium text-on-surface-variant">Não tem uma conta?</p>
            <Link to="/register" className="text-sm font-black text-primary hover:underline underline-offset-4">Criar conta</Link>
          </div>

          <div className="mt-8 flex items-center gap-4 p-4 rounded-2xl bg-surface-container-low border-l-4 border-primary/20">
            <Accessibility className="text-primary flex-shrink-0" size={24} />
            <p className="text-xs text-on-surface-variant leading-relaxed">
              O administrador tem acesso exclusivo à gestão de credenciamento.
            </p>
          </div>
        </section>
      </motion.main>
    </div>
  );
}
