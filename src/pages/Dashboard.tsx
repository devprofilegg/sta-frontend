import { motion } from 'motion/react';
import { 
  AlarmClock, 
  ArrowRight, 
  Video, 
  Search, 
  FolderHeart, 
  BellRing, 
  ExternalLink,
  Users,
  ShieldCheck,
  Stethoscope,
  PieChart,
  Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/src/contexts/AuthContext';
import { cn } from '@/src/lib/utils';

export default function Dashboard() {
  const { user } = useAuth();
  const isDoctor = user?.role === 'DOCTOR';
  const isAdmin = user?.role === 'ADMIN';

  return (
    <div className="pt-24 px-6 max-w-screen-2xl mx-auto pb-32">
      {/* Welcome Section */}
      <motion.section 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8 md:mb-10"
      >
        <h1 className="font-headline text-3xl md:text-4xl lg:text-5xl font-extrabold text-on-surface tracking-tight mb-2">
          {isDoctor ? `Dr. ${user?.name?.split(' ')[0]}` : isAdmin ? 'Painel Administrativo' : `Olá, ${user?.name?.split(' ')[0]}`}
        </h1>
        <p className="text-base md:text-lg text-on-surface-variant font-medium max-w-2xl leading-relaxed">
          {isDoctor 
            ? 'Você tem 8 consultas agendadas para hoje. O primeiro paciente chega em 15 minutos.' 
            : isAdmin 
              ? 'Existem 3 novas solicitações de credenciamento médico pendentes de revisão.' 
              : 'Você tem uma consulta agendada para daqui a 2 horas. Tudo parece em ordem para o seu atendimento hoje.'
          }
        </p>
      </motion.section>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
        
        {/* Main Action Card (Upcoming Appt for Patient/Doctor, Stats for Admin) */}
        {!isAdmin ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="col-span-12 md:col-span-8 bg-surface-container-lowest rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 relative overflow-hidden group shadow-sm border border-transparent hover:border-primary/5 active:scale-[0.99] transition-all"
          >
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-6 md:mb-8">
                  <AlarmClock size={14} fill="currentColor" fillOpacity={0.2} />
                  {isDoctor ? 'Próximo Atendimento' : 'Sua Próxima Consulta'}
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl flex-shrink-0 ring-4 ring-white">
                    <img 
                      className="w-full h-full object-cover" 
                      src={isDoctor ? "https://picsum.photos/seed/pat1/300/300" : "https://picsum.photos/seed/doc1/300/300"} 
                      alt="User" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-black text-on-surface mb-1">
                      {isDoctor ? 'Maria Silva' : 'Dr. Carlos Mendes'}
                    </h3>
                    <p className="text-on-surface-variant font-medium mb-5 md:mb-6 text-base md:text-lg">
                      {isDoctor ? 'Paciente Registrado • Primeira Consulta' : 'Cardiologia • Hospital Central'}
                    </p>
                    <div className="flex flex-wrap gap-2 md:gap-4">
                      <div className="flex items-center gap-2 bg-surface-container px-3 md:px-4 py-2 md:py-2.5 rounded-xl md:rounded-2xl border border-outline/5">
                        <Calendar size={16} className="text-primary md:w-[18px]" />
                        <span className="text-xs md:text-sm font-bold text-on-surface">Hoje, 14:30</span>
                      </div>
                      <div className="flex items-center gap-2 bg-surface-container px-3 md:px-4 py-2 md:py-2.5 rounded-xl md:rounded-2xl border border-outline/5">
                        <Video size={16} className="text-primary md:w-[18px]" />
                        <span className="text-xs md:text-sm font-bold text-on-surface">Telemedicina</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 md:gap-4">
                <Link to="/consulta" className="w-full sm:w-auto px-10 py-4 md:py-5 bg-primary text-on-primary font-black uppercase tracking-tighter rounded-xl md:rounded-2xl shadow-[0px_12px_32px_rgba(0,71,141,0.2)] hover:bg-primary-container hover:shadow-[0px_12px_48px_rgba(0,71,141,0.3)] transition-all flex items-center justify-center gap-3 group text-sm">
                  Entrar na Chamada
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
                <button className="w-full sm:w-auto px-8 py-4 md:py-5 bg-surface-container-high text-on-surface font-bold rounded-xl md:rounded-2xl hover:bg-surface-container-highest transition-all text-sm">
                  {isDoctor ? 'Ver Prontuário' : 'Reagendar'}
                </button>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-primary/10 to-transparent rounded-full -mr-32 -mt-32 blur-3xl" />
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="col-span-12 md:col-span-8 bg-primary text-on-primary rounded-[2.5rem] p-10 flex flex-col md:flex-row gap-8 items-center justify-between"
          >
             <div className="space-y-6">
                <h3 className="text-3xl font-black font-headline">Sistema Saudável</h3>
                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-white/10 p-4 rounded-3xl backdrop-blur-md">
                      <div className="text-4xl font-black mb-1">1,240</div>
                      <div className="text-xs font-bold uppercase tracking-widest opacity-70">Pacientes</div>
                   </div>
                   <div className="bg-white/10 p-4 rounded-3xl backdrop-blur-md">
                      <div className="text-4xl font-black mb-1">86</div>
                      <div className="text-xs font-bold uppercase tracking-widest opacity-70">Médicos</div>
                   </div>
                </div>
                <button className="w-full py-4 bg-white text-primary rounded-2xl font-black uppercase tracking-tight shadow-xl">
                    Gerar Relatório Completo
                </button>
             </div>
             <div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center border-8 border-white/5 animate-spin-slow">
                <PieChart size={80} className="text-white opacity-40" />
             </div>
          </motion.div>
        )}

        {/* Quick Actions (Right Strip) */}
        <div className="col-span-12 md:col-span-4 grid grid-cols-1 gap-6">
          <Link to={isAdmin ? "/admin/approvals" : isDoctor ? "/agenda" : "/agenda"}>
            <motion.div 
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={cn(
                "p-8 rounded-[2rem] flex flex-col justify-between group transition-all h-full aspect-square md:aspect-auto",
                isAdmin ? "bg-secondary-container text-on-secondary-container" : isDoctor ? "bg-primary-container text-on-primary-container" : "bg-secondary-container text-on-secondary-container"
              )}
            >
              <div className="w-16 h-16 bg-white/40 rounded-[1.5rem] flex items-center justify-center mb-6 shadow-sm border border-white/20">
                {isAdmin ? <ShieldCheck size={32} /> : isDoctor ? <Calendar size={32} /> : <Search size={32} />}
              </div>
              <div>
                <h4 className="text-2xl font-black mb-1 tracking-tight">
                  {isAdmin ? 'Novos Médicos' : isDoctor ? 'Minha Agenda' : 'Buscar Médicos'}
                </h4>
                <p className="text-sm font-medium opacity-70 leading-relaxed font-body">
                  {isAdmin ? 'Validar credenciais de recém-cadastrados.' : isDoctor ? 'Gerencie seus horários e consultas.' : 'Encontre especialistas perto de você.'}
                </p>
              </div>
            </motion.div>
          </Link>

          <Link to={isAdmin ? "/admin/users" : isDoctor ? "/registros" : "/registros"}>
            <motion.div 
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={cn(
                "p-8 rounded-[2rem] flex flex-col justify-between group transition-all h-full aspect-square md:aspect-auto",
                isAdmin ? "bg-primary-container text-on-primary-container" : isDoctor ? "bg-secondary-container text-on-secondary-container" : "bg-primary-container text-on-primary-container"
              )}
            >
              <div className="w-16 h-16 bg-white/20 rounded-[1.5rem] flex items-center justify-center mb-6 shadow-sm border border-white/10">
                {isAdmin ? <Users size={32} /> : isDoctor ? <FolderHeart size={32} /> : <FolderHeart size={32} />}
              </div>
              <div>
                <h4 className="text-2xl font-black mb-1 tracking-tight font-headline">
                  {isAdmin ? 'Lista de Usuários' : isDoctor ? 'Prontuários' : 'Meus Exames'}
                </h4>
                <p className="text-sm font-medium opacity-70 font-body">
                  {isAdmin ? 'Gestão completa de pacientes e doutores.' : isDoctor ? 'Acesse o histórico clínico dos pacientes.' : 'Acesse seus registros médicos.'}
                </p>
              </div>
            </motion.div>
          </Link>
        </div>

        {/* Health Reminders / Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="col-span-12 md:col-span-4 bg-surface-container-low rounded-[2.5rem] p-8 border border-outline/5"
        >
          <h4 className="font-black text-on-surface mb-8 flex items-center gap-3 text-lg font-headline">
            <BellRing size={24} className="text-primary" />
            {isDoctor ? 'Tarefas Pendentes' : isAdmin ? 'Logs do Sistema' : 'Lembretes'}
          </h4>
          <div className="space-y-8">
            <div className="flex gap-5 group">
              <div className="w-2 h-auto bg-primary rounded-full group-hover:scale-y-110 transition-transform origin-top" />
              <div>
                <p className="text-sm font-black text-on-surface mb-1 tracking-tight uppercase tracking-widest text-[10px] text-primary">Urgente</p>
                <p className="font-bold text-on-surface leading-tight text-sm">
                   {isDoctor ? 'Validar laudo - Maria Silva' : isAdmin ? 'Backup do banco de dados' : 'Medicamento Diário'}
                </p>
                <p className="text-xs text-on-surface-variant leading-relaxed mt-1">
                  {isDoctor ? 'Exame de sangue pendente de revisão.' : isAdmin ? 'Último backup realizado há 12h.' : 'Anti-hipertensivo após o almoço.'}
                </p>
              </div>
            </div>
            <div className="flex gap-5 group">
              <div className="w-2 h-auto bg-secondary rounded-full group-hover:scale-y-110 transition-transform origin-top" />
              <div>
                <p className="text-sm font-black text-on-surface mb-1 tracking-tight uppercase tracking-widest text-[10px] text-secondary">Atenção</p>
                <p className="font-bold text-on-surface leading-tight text-sm">
                   {isDoctor ? 'Reunião de Equipe' : isAdmin ? '3 Novos Tickets' : 'Hidratação'}
                </p>
                <p className="text-xs text-on-surface-variant leading-relaxed mt-1">
                  {isDoctor ? 'Discussão de casos complexos às 17:00.' : isAdmin ? 'Relatos de falha no login mobile.' : 'Beba pelo menos 2L de água hoje.'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Informative Section (Articles or Admin Actions) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="col-span-12 md:col-span-8 bg-surface-container-lowest rounded-[2.5rem] overflow-hidden flex flex-col sm:flex-row shadow-sm hover:shadow-md transition-shadow group border border-outline/5"
        >
          <div className="w-full sm:w-2/5 h-64 sm:h-auto relative overflow-hidden">
            <img 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
              src={isDoctor ? "https://picsum.photos/seed/medtech/800/800" : isAdmin ? "https://picsum.photos/seed/server/800/800" : "https://picsum.photos/seed/yoga/800/800"} 
              alt="Contextual" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase text-primary tracking-widest border border-primary/20">
                {isDoctor ? 'Medicina Moderna' : isAdmin ? 'Infraestrutura' : 'Dica de Saúde'}
              </span>
            </div>
          </div>
          <div className="p-10 flex-1 flex flex-col justify-center">
            <h4 className="text-3xl font-black text-on-surface mb-4 leading-[1.1] tracking-tighter font-headline">
              {isDoctor ? 'Novas tecnologias em diagnóstico por imagem' : isAdmin ? 'Otimização de rede para baixa latência na videochamada' : 'A importância do sono para sua recuperação'}
            </h4>
            <p className="text-on-surface-variant font-medium text-sm mb-8 leading-relaxed">
              {isDoctor ? 'Confira como o auxílio da IA está reduzindo o tempo de triagem em exames complexos.' : isAdmin ? 'Configurações recomendadas para o servidor de sinalização WebRTC.' : 'Dormir bem pode reduzir drasticamente a inflamação vascular e melhorar sua saúde geral.'}
            </p>
            <a className="text-primary font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:gap-4 transition-all group" href="#">
              {isAdmin ? 'Ver documentação' : 'Ler artigo completo'}
              <ArrowRight size={18} />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
