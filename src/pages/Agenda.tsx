import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  MoreVertical, 
  XCircle, 
  CheckCircle2,
  Filter,
  Plus,
  ChevronRight,
  User as UserIcon,
  Search,
  ChevronLeft,
  CalendarCheck
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Appointment, User, AvailabilitySlot } from '@/src/types';
import { useAuth } from '@/src/contexts/AuthContext';

const mockAppointments: Appointment[] = [
  { id: '1', patientId: 'p1', doctorId: 'd1', doctorName: 'Dra. Sarah Jenkins', patientName: 'Paciente Teste', date: '2026-04-20', time: '09:30', type: 'Consulta', status: 'CONFIRMED' },
  { id: '2', patientId: 'p1', doctorId: 'd2', doctorName: 'Dr. Carlos Mendes', patientName: 'Paciente Teste', date: '2026-04-22', time: '14:30', type: 'Retorno', status: 'PENDING' },
];

const mockDoctors: User[] = [
  { id: 'd1', name: 'Dra. Sarah Jenkins', email: 'sarah@telehealth.com', role: 'DOCTOR', specialty: 'Cardiologia', avatar: 'https://picsum.photos/seed/doc1/100/100' },
  { id: 'd2', name: 'Dr. Carlos Mendes', email: 'carlos@telehealth.com', role: 'DOCTOR', specialty: 'Pediatria', avatar: 'https://picsum.photos/seed/doc2/100/100' },
  { id: 'd3', name: 'Dra. Elena Rodriguez', email: 'elena@telehealth.com', role: 'DOCTOR', specialty: 'Dermatologia', avatar: 'https://picsum.photos/seed/doc3/100/100' },
];

const mockSlots: AvailabilitySlot[] = [
  { id: 's1', doctorId: 'd1', date: '2026-04-20', time: '08:00', isBooked: false },
  { id: 's2', doctorId: 'd1', date: '2026-04-20', time: '09:00', isBooked: true },
  { id: 's3', doctorId: 'd1', date: '2026-04-20', time: '10:00', isBooked: false },
  { id: 's4', doctorId: 'd1', date: '2026-04-21', time: '09:00', isBooked: false },
  { id: 's5', doctorId: 'd1', date: '2026-04-21', time: '11:00', isBooked: false },
];

export default function Agenda() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState(mockAppointments);
  const [activeTab, setActiveTab] = useState<'SCHEDULE' | 'BOOKING' | 'AVAILABILITY'>(user?.role === 'PATIENT' ? 'SCHEDULE' : 'SCHEDULE');
  
  // Patient Booking State
  const [selectedDoctor, setSelectedDoctor] = useState<User | null>(null);
  const [searchDoctor, setSearchDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  // Doctor Availability State
  const [availability, setAvailability] = useState<AvailabilitySlot[]>(mockSlots);

  const filteredDoctors = mockDoctors.filter(d => 
    d.name.toLowerCase().includes(searchDoctor.toLowerCase()) || 
    d.specialty?.toLowerCase().includes(searchDoctor.toLowerCase())
  );

  const slotsForSelected = availability.filter(s => 
    s.doctorId === (selectedDoctor?.id || user?.id) && s.date === selectedDate
  );

  const cancelAppointment = (id: string) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'CANCELED' } : a));
  };

  const handleAddAvailability = (time: string) => {
    const newSlot: AvailabilitySlot = {
      id: Math.random().toString(),
      doctorId: user?.id || '',
      date: selectedDate,
      time: time,
      isBooked: false
    };
    setAvailability([...availability, newSlot]);
  };

  const handleBook = (slot: AvailabilitySlot) => {
    const newApp: Appointment = {
      id: Math.random().toString(),
      patientId: user?.id || '',
      patientName: user?.name || '',
      doctorId: selectedDoctor?.id || '',
      doctorName: selectedDoctor?.name || '',
      date: slot.date,
      time: slot.time,
      type: 'Consulta',
      status: 'PENDING'
    };
    setAppointments([newApp, ...appointments]);
    setActiveTab('SCHEDULE');
    setSelectedDoctor(null);
  };

  return (
    <div className="pt-24 px-6 max-w-screen-xl mx-auto pb-32">
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl lg:text-5xl font-black text-on-surface font-headline tracking-tight mb-2">
            {user?.role === 'PATIENT' ? 'Sua Agenda' : 'Consultas'}
          </h1>
          <p className="text-on-surface-variant text-lg font-medium">
            {user?.role === 'PATIENT' ? 'Gerencie seus compromissos e marque novas consultas.' : 'Acompanhe seu cronograma e defina sua disponibilidade.'}
          </p>
        </div>
        
        <div className="flex bg-surface-container-high p-1 rounded-2xl self-start">
          <button
            onClick={() => setActiveTab('SCHEDULE')}
            className={cn(
              "px-5 py-2 rounded-xl text-xs font-bold transition-all",
              activeTab === 'SCHEDULE' ? "bg-white text-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"
            )}
          >
            Ver Horários
          </button>
          {user?.role === 'PATIENT' ? (
            <button
              onClick={() => setActiveTab('BOOKING')}
              className={cn(
                "px-5 py-2 rounded-xl text-xs font-bold transition-all ml-1",
                activeTab === 'BOOKING' ? "bg-white text-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              Marcar Consulta
            </button>
          ) : (
            <button
              onClick={() => setActiveTab('AVAILABILITY')}
              className={cn(
                "px-5 py-2 rounded-xl text-xs font-bold transition-all ml-1",
                activeTab === 'AVAILABILITY' ? "bg-white text-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              Minha Disponibilidade
            </button>
          )}
        </div>
      </header>

      <AnimatePresence mode="wait">
        {activeTab === 'SCHEDULE' && (
          <motion.div 
            key="schedule"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {appointments.filter(a => a.status !== 'CANCELED').map((app, idx) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-6 shadow-sm border border-transparent hover:border-primary/5 group"
              >
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <div className="flex flex-col items-center justify-center w-20 h-20 bg-primary-fixed text-primary rounded-2xl shrink-0">
                    <span className="text-xs font-black uppercase tracking-widest">{new Date(app.date).toLocaleDateString('pt-BR', { month: 'short' })}</span>
                    <span className="text-2xl font-black">{new Date(app.date).getDate() + 1}</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container rounded text-[10px] font-black uppercase tracking-wider">
                        {app.type}
                      </span>
                      <span className="text-xs text-on-surface-variant font-medium flex items-center gap-1">
                        <Clock size={12} /> {app.time}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-on-surface">
                      {user?.role === 'PATIENT' ? app.doctorName : app.patientName}
                    </h3>
                    <p className="text-sm text-on-surface-variant flex items-center gap-1 mt-1">
                      <MapPin size={14} /> {user?.role === 'PATIENT' ? 'Teleconsulta • Vídeo' : 'Clínica Health • Sala 04'}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => cancelAppointment(app.id)} className="px-6 py-3 bg-error-container text-on-error-container rounded-2xl text-sm font-bold flex items-center gap-2 hover:bg-error-container/80 transition-all">
                      <XCircle size={18} /> Cancelar
                    </button>
                    <button className="h-12 w-12 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-all">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'BOOKING' && (
          <motion.div 
            key="booking"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {!selectedDoctor ? (
              <div className="space-y-6">
                <div className="relative group mb-8">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" size={20} />
                  <input 
                    type="text" 
                    placeholder="Buscar médico por nome ou especialidade..."
                    className="w-full h-14 pl-12 pr-4 bg-white border-0 rounded-2xl shadow-sm focus:ring-2 focus:ring-primary transition-all text-sm font-medium"
                    value={searchDoctor}
                    onChange={(e) => setSearchDoctor(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDoctors.map((doc) => (
                    <button 
                      key={doc.id}
                      onClick={() => setSelectedDoctor(doc)}
                      className="bg-white p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-all border-2 border-transparent hover:border-primary text-left"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <img src={doc.avatar} className="h-16 w-16 rounded-2xl object-cover" referrerPolicy="no-referrer" />
                        <div>
                          <h4 className="font-bold text-lg">{doc.name}</h4>
                          <p className="text-primary font-bold text-xs uppercase tracking-widest">{doc.specialty}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-on-surface-variant text-sm font-medium">
                        <span>Horários hoje</span>
                        <ChevronRight size={18} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-[2.5rem] p-8 shadow-sm">
                <button onClick={() => setSelectedDoctor(null)} className="flex items-center gap-2 text-primary font-bold text-sm mb-6 hover:opacity-70">
                  <ChevronLeft size={18} /> Voltar para lista
                </button>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3">
                     <img src={selectedDoctor.avatar} className="w-full aspect-square rounded-3xl object-cover mb-4" referrerPolicy="no-referrer" />
                     <h3 className="text-2xl font-bold">{selectedDoctor.name}</h3>
                     <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">{selectedDoctor.specialty}</p>
                     <p className="text-on-surface-variant text-sm leading-relaxed">Especialista em cuidados preventivos e diagnósticos avançados. Mais de 10 anos de experiência.</p>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-on-surface mb-6 flex items-center gap-2">
                       <CalendarIcon size={20} /> Selecione o Horário Disponível
                    </h4>
                    
                    <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none snap-x">
                      {[0,1,2,3,4,5,6].map(offset => {
                        const date = new Date();
                        date.setDate(date.getDate() + offset);
                        const iso = date.toISOString().split('T')[0];
                        const isActive = selectedDate === iso;
                        return (
                          <button
                            key={iso}
                            onClick={() => setSelectedDate(iso)}
                            className={cn(
                              "flex flex-col items-center py-3 px-4 min-w-[70px] rounded-2xl transition-all snap-start",
                              isActive ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant"
                            )}
                          >
                            <span className="text-[10px] font-bold uppercase">{date.toLocaleDateString('pt-BR', { weekday: 'short' })}</span>
                            <span className="text-lg font-black">{date.getDate()}</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {slotsForSelected.map(slot => (
                        <button
                          key={slot.id}
                          disabled={slot.isBooked}
                          onClick={() => handleBook(slot)}
                          className={cn(
                            "h-14 rounded-2xl font-bold text-sm transition-all flex items-center justify-center border-2",
                            slot.isBooked 
                              ? "bg-surface-container-high text-outline-variant border-transparent cursor-not-allowed" 
                              : "bg-primary/5 text-primary border-primary/20 hover:bg-primary hover:text-white hover:border-transparent active:scale-95"
                          )}
                        >
                          {slot.time}
                        </button>
                      ))}
                      {slotsForSelected.length === 0 && (
                        <p className="col-span-full py-10 text-center text-on-surface-variant italic font-medium">Sem horários para este dia.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'AVAILABILITY' && (
           <motion.div 
            key="availability"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[2.5rem] p-8 shadow-sm"
          >
            <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
              <div>
                <h3 className="text-2xl font-bold text-on-surface">Definir Disponibilidade</h3>
                <p className="text-on-surface-variant font-medium">Adicione horários em que você está livre para atender.</p>
              </div>
              <div className="flex items-center gap-2 bg-surface-container px-4 py-2 rounded-2xl">
                 <CalendarIcon size={18} className="text-primary" />
                 <input 
                  type="date" 
                  className="bg-transparent border-none focus:ring-0 text-sm font-bold"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                 />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map(time => {
                const isAdded = availability.some(s => s.doctorId === user?.id && s.date === selectedDate && s.time === time);
                return (
                  <button
                    key={time}
                    onClick={() => !isAdded && handleAddAvailability(time)}
                    className={cn(
                      "h-14 rounded-2xl font-black text-sm transition-all border-2 flex items-center justify-center gap-2",
                      isAdded 
                        ? "bg-secondary text-white border-transparent cursor-default" 
                        : "bg-surface-container text-on-surface-variant border-transparent hover:border-primary/40 active:scale-95"
                    )}
                  >
                    {time} {isAdded && <CalendarCheck size={16} />}
                  </button>
                );
              })}
            </div>
            
            <div className="mt-12 p-6 bg-primary/5 rounded-3xl border border-primary/10">
               <h4 className="font-bold text-primary mb-2">Dica do sistema</h4>
               <p className="text-sm text-on-surface-variant font-medium">Os horários marcados em verde já estão visíveis para os pacientes. Clique em horários cinzas para habilitar novas vagas.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
