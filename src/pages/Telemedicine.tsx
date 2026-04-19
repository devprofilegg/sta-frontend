import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  PhoneOff, 
  MessageSquare, 
  UserPlus, 
  Maximize2, 
  Settings,
  X,
  Send,
  FileText
} from 'lucide-react';
import { useAuth } from '@/src/contexts/AuthContext';
import { cn } from '@/src/lib/utils';
import { useNavigate } from 'react-router-dom';

export default function Telemedicine() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'PuroHealth System', text: 'Conexão segura estabelecida. A chamada está sendo gravada.', type: 'system' },
    { id: 2, sender: user?.role === 'PATIENT' ? 'Dra. Sarah Jenkins' : 'Paciente Maria', text: 'Olá! Consegue me ouvir bem?', type: 'other' }
  ]);

  const handleEndCall = () => {
    if (confirm('Deseja encerrar esta consulta?')) {
      navigate('/dashboard');
    }
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: user?.name || 'Eu', text: message, type: 'me' }]);
    setMessage('');
  };

  return (
    <div className="fixed inset-0 bg-slate-950 z-[100] flex flex-col md:flex-row overflow-hidden">
      {/* Main Video Area */}
      <div className="flex-1 relative flex flex-col justify-center items-center bg-slate-900 group">
        
        {/* Remote Video (Full Screen) */}
        <div className="absolute inset-0 z-0">
          <img 
            src={user?.role === 'PATIENT' ? "https://picsum.photos/seed/doctor/1280/720" : "https://picsum.photos/seed/patient/1280/720"} 
            className="w-full h-full object-cover opacity-80"
            alt="Remote view"
            referrerPolicy="no-referrer"
          />
          {/* Mock Video Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
        </div>

        {/* Local Video (Floating) */}
        <motion.div 
          drag
          dragConstraints={{ left: 0, right: 300, top: 0, bottom: 500 }}
          className="absolute top-8 right-8 w-48 aspect-video md:w-64 bg-slate-800 rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl z-20 cursor-move"
        >
          {isCamOn ? (
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} 
              className="w-full h-full object-cover" 
              alt="My view"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-2">
               <VideoOff size={32} />
               <span className="text-[10px] uppercase font-black">Câmera Desativada</span>
            </div>
          )}
        </motion.div>

        {/* Top Info Bar */}
        <div className="absolute top-8 left-8 z-10 flex items-center gap-4">
           <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-3 border border-white/10">
              <div className="w-2 h-2 rounded-full bg-error animate-pulse" />
              <span className="text-white font-bold text-sm">EM CHAMADA • 12:45</span>
           </div>
           <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 hidden md:block">
              <span className="text-slate-300 text-sm font-medium">
                {user?.role === 'PATIENT' ? 'Dra. Sarah Jenkins • Cardiologia' : 'Maria Silva • Paciente'}
              </span>
           </div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 md:gap-4 bg-black/40 backdrop-blur-2xl px-4 md:px-8 py-4 md:py-6 rounded-3xl md:rounded-[2.5rem] border border-white/10 w-[90%] md:w-auto justify-center">
           <button 
             onClick={() => setIsMicOn(!isMicOn)}
             className={cn(
               "h-12 w-12 md:h-14 md:w-14 rounded-xl md:rounded-2xl flex items-center justify-center transition-all",
               isMicOn ? "bg-white/10 text-white hover:bg-white/20" : "bg-error text-white"
             )}
            >
              {isMicOn ? <Mic size={20} className="md:w-6 md:h-6" /> : <MicOff size={20} className="md:w-6 md:h-6" />}
           </button>
           <button 
             onClick={() => setIsCamOn(!isCamOn)}
             className={cn(
               "h-12 w-12 md:h-14 md:w-14 rounded-xl md:rounded-2xl flex items-center justify-center transition-all",
               isCamOn ? "bg-white/10 text-white hover:bg-white/20" : "bg-error text-white"
             )}
            >
              {isCamOn ? <Video size={20} className="md:w-6 md:h-6" /> : <VideoOff size={20} className="md:w-6 md:h-6" />}
           </button>
           <button 
             onClick={handleEndCall}
             className="h-12 md:h-14 px-4 md:px-8 bg-error text-white rounded-xl md:rounded-2xl flex items-center justify-center gap-2 font-black uppercase tracking-widest hover:bg-error/80 transition-all shadow-xl shadow-error/20"
           >
              <PhoneOff size={20} fill="currentColor" className="md:w-6 md:h-6" />
              <span className="hidden lg:inline text-xs">Encerrar</span>
           </button>
           <div className="hidden sm:block w-px h-10 bg-white/10 mx-2" />
           <button 
             onClick={() => { setShowChat(!showChat); setShowNotes(false); }}
             className={cn(
               "h-12 w-12 md:h-14 md:w-14 rounded-xl md:rounded-2xl flex items-center justify-center transition-all",
               showChat ? "bg-primary text-white" : "bg-white/10 text-white hover:bg-white/20"
             )}
            >
              <MessageSquare size={20} className="md:w-6 md:h-6" />
           </button>
           {user?.role === 'DOCTOR' && (
             <button 
                onClick={() => { setShowNotes(!showNotes); setShowChat(false); }}
                className={cn(
                  "h-12 w-12 md:h-14 md:w-14 rounded-xl md:rounded-2xl flex items-center justify-center transition-all",
                  showNotes ? "bg-primary text-white" : "bg-white/10 text-white hover:bg-white/20"
                )}
              >
                <FileText size={20} className="md:w-6 md:h-6" />
             </button>
           )}
           <button className="hidden sm:flex h-12 w-12 md:h-14 md:w-14 rounded-xl md:rounded-2xl items-center justify-center bg-white/10 text-white hover:bg-white/20 transition-all">
              <Settings size={20} className="md:w-6 md:h-6" />
           </button>
        </div>
      </div>

      {/* Right Sidebar (Chat or Notes) */}
      <AnimatePresence>
        {(showChat || showNotes) && (
          <motion.div 
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            className="w-full md:w-96 bg-white flex flex-col h-full relative z-30 shadow-[-12px_0px_32px_rgba(0,0,0,0.2)]"
          >
            <div className="p-6 border-b flex justify-between items-center bg-surface-container-low">
              <h3 className="font-headline font-bold text-lg text-on-surface">
                {showChat ? 'Chat da Consulta' : 'Anotações Médicas'}
              </h3>
              <button 
                onClick={() => { setShowChat(false); setShowNotes(false); }}
                className="p-2 hover:bg-surface-container-high rounded-xl transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {showChat ? (
              <>
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
                  {messages.map(msg => (
                    <div key={msg.id} className={cn(
                      "flex flex-col",
                      msg.type === 'me' ? "items-end" : msg.type === 'system' ? "items-center" : "items-start"
                    )}>
                      {msg.type !== 'system' && (
                        <span className="text-[10px] font-black text-slate-400 uppercase mb-1 ml-1">{msg.sender}</span>
                      )}
                      <div className={cn(
                        "max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed",
                        msg.type === 'me' ? "bg-primary text-white rounded-tr-none" : 
                        msg.type === 'system' ? "bg-slate-200 text-slate-500 italic text-[11px] py-1.5 px-3 rounded-full" : 
                        "bg-white text-slate-800 shadow-sm border border-slate-200 rounded-tl-none"
                      )}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
                <form onSubmit={sendMessage} className="p-6 bg-white border-t">
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Sua mensagem..."
                      className="flex-1 h-12 px-4 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-primary transition-all text-sm"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <button type="submit" className="h-12 w-12 bg-primary text-white rounded-xl flex items-center justify-center hover:opacity-90 transition-all">
                      <Send size={20} />
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex-1 p-6 space-y-6">
                <div>
                  <label className="block text-xs font-black uppercase text-slate-500 tracking-widest mb-2">Relato do Paciente</label>
                  <textarea 
                    className="w-full h-32 p-4 bg-slate-50 border-none rounded-2xl placeholder:italic text-sm focus:ring-2 focus:ring-primary"
                    placeholder="Descreva os sintomas relatados..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase text-slate-500 tracking-widest mb-2">Prescrição & Conduta</label>
                  <textarea 
                    className="w-full h-48 p-4 bg-slate-50 border-none rounded-2xl placeholder:italic text-sm focus:ring-2 focus:ring-primary"
                    placeholder="Instruções e medicamentos..."
                  />
                </div>
                <button className="w-full py-4 bg-secondary text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-secondary/20 hover:opacity-90 transition-all">
                   Salvar no Prontuário
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
