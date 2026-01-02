
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { getGeminiResponse } from '../services/geminiService';
import { useLanguage } from '../App';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const AIAssistant: React.FC = () => {
  const { lang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reiniciar mensajes iniciales cuando cambia el idioma si el chat está vacío
  useEffect(() => {
    setMessages([{ role: 'model', text: t.ai.welcome }]);
  }, [lang]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const response = await getGeminiResponse(userMsg, history, lang);
    
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-teal-600 hover:bg-teal-500 text-white p-5 rounded-full shadow-2xl transition-all transform hover:scale-110 flex items-center justify-center group"
        >
          <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        </button>
      )}

      {isOpen && (
        <div className="bg-slate-900 rounded-[2rem] shadow-2xl w-80 md:w-96 overflow-hidden flex flex-col border border-slate-800 animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="bg-slate-800 p-5 text-white flex justify-between items-center border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
                <MessageCircle className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <span className="block font-bold text-sm">{t.ai.title}</span>
                <span className="block text-[10px] text-teal-400 uppercase font-bold tracking-widest">{t.ai.badge}</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="bg-slate-900 hover:bg-slate-700 p-2 rounded-xl transition-colors border border-slate-700">
              <X className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          <div 
            ref={scrollRef}
            className="h-96 overflow-y-auto p-6 space-y-5 bg-slate-950/50"
          >
            {messages.map((m, idx) => (
              <div 
                key={idx} 
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] p-4 rounded-[1.5rem] text-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-teal-600 text-white rounded-tr-none shadow-lg shadow-teal-900/20' 
                    : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none shadow-sm'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 p-4 rounded-[1.5rem] rounded-tl-none border border-slate-700 shadow-sm">
                  <Loader2 className="w-4 h-4 animate-spin text-teal-400" />
                </div>
              </div>
            )}
          </div>

          <div className="p-5 bg-slate-900 border-t border-slate-800">
            <div className="relative flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t.ai.placeholder}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-2xl px-5 py-3 text-sm text-white focus:ring-2 focus:ring-teal-500 outline-none"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="bg-teal-600 hover:bg-teal-500 text-white p-3 rounded-xl transition-all shadow-lg shadow-teal-900/40 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-slate-600 text-center mt-3 uppercase font-bold tracking-tighter">{t.ai.footer}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
