
import React, { useState, createContext, useContext } from 'react';
import { getLocalizedServices, getLocalizedTestimonials, getIcon } from './constants';
import AIAssistant from './components/AIAssistant';
import { translations } from './locales';
import { Calendar, Phone, Mail, MapPin, Instagram, Facebook, Linkedin, ArrowRight, Star, Globe } from 'lucide-react';

type Language = 'es' | 'en' | 'de';
interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};

const AppContent: React.FC = () => {
  const { lang, setLang, t } = useLanguage();
  const services = getLocalizedServices(lang);
  const testimonials = getLocalizedTestimonials(lang);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-950 text-slate-200">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center shadow-lg shadow-teal-500/20">
                <span className="text-slate-950 font-bold text-xl">M</span>
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">Mente Serena</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-6 text-slate-400 font-medium mr-4 border-r border-slate-800 pr-8">
                <a href="#inicio" className="hover:text-teal-400 transition-colors">{t.nav.home}</a>
                <a href="#servicios" className="hover:text-teal-400 transition-colors">{t.nav.services}</a>
                <a href="#sobre-mi" className="hover:text-teal-400 transition-colors">{t.nav.about}</a>
              </div>
              
              <div className="flex items-center gap-2 mr-6 bg-slate-900/50 p-1 rounded-full border border-slate-800">
                {(['es', 'en', 'de'] as Language[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      lang === l ? 'bg-teal-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>

              <a href="#contacto" className="bg-teal-600 text-white px-6 py-2 rounded-full hover:bg-teal-500 transition-all shadow-lg shadow-teal-600/20 text-sm font-bold">
                {t.nav.appointment}
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section id="inicio" className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute top-0 right-0 -z-10 w-2/3 h-full bg-gradient-to-l from-teal-900/20 to-transparent rounded-bl-[100px] hidden lg:block" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-teal-400 text-sm font-semibold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                  </span>
                  {t.hero.badge}
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.1]">
                  {t.hero.title}<span className="text-teal-400 italic">{t.hero.titleItalic}</span>{t.hero.titleEnd}
                </h1>
                <p className="text-xl text-slate-400 max-w-lg leading-relaxed">
                  {t.hero.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="#contacto" className="px-8 py-4 bg-teal-600 text-white rounded-full font-bold hover:bg-teal-500 transition-all shadow-xl shadow-teal-600/30 flex items-center gap-2 group">
                    {t.hero.cta} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a href="#servicios" className="px-8 py-4 border-2 border-slate-800 text-slate-300 rounded-full font-bold hover:border-teal-500 hover:text-teal-400 transition-all bg-slate-900/50">
                    {t.hero.ctaSecondary}
                  </a>
                </div>
                <div className="text-sm text-slate-500">
                  <span className="font-bold text-slate-300">{t.hero.impact}</span>
                </div>
              </div>
              <div className="relative animate-in fade-in slide-in-from-right-8 duration-700">
                <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-800">
                  <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800" alt="Therapy" className="w-full h-auto object-cover grayscale-[20%]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-slate-900 p-6 rounded-2xl shadow-2xl z-20 hidden md:block border border-slate-800">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-teal-500/10 rounded-full flex items-center justify-center text-teal-400">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">{t.hero.availability}</div>
                      <div className="text-lg font-bold text-white">{t.hero.today}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="servicios" className="py-24 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">{t.services.title}</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              {t.services.subtitle}
            </p>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div key={service.id} className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-teal-500/50 transition-all group">
                <div className="w-14 h-14 bg-teal-500/10 rounded-2xl flex items-center justify-center text-teal-400 mb-6 group-hover:bg-teal-500 group-hover:text-slate-950 transition-all duration-300">
                  {getIcon(service.icon)}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{service.description}</p>
                <button className="text-teal-400 font-bold text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                  {t.services.cta} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="sobre-mi" className="py-24 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative group">
                <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800" alt="Doctor" className="rounded-3xl shadow-2xl relative z-10 border border-slate-800" />
              </div>
              <div className="space-y-6">
                <span className="text-teal-400 font-bold uppercase tracking-widest text-sm">{t.about.badge}</span>
                <h2 className="text-4xl font-bold text-white">Dra. Elena Valenzuela</h2>
                <p className="text-lg text-slate-400 leading-relaxed italic">{t.about.quote}</p>
                <p className="text-slate-400">{t.about.description}</p>
                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-800">
                  <div>
                    <div className="text-3xl font-bold text-white mb-1">12+</div>
                    <div className="text-teal-400 text-sm">{t.about.years}</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white mb-1">2,000+</div>
                    <div className="text-teal-400 text-sm">{t.about.sessions}</div>
                  </div>
                </div>
                <div className="pt-4">
                  <a href="#contacto" className="inline-block px-8 py-4 bg-slate-900 border border-slate-800 text-white rounded-full font-bold hover:bg-slate-800 transition-all">
                    {t.about.cta}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-slate-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">{t.testimonials.title}</h2>
            <p className="text-slate-400">{t.testimonials.subtitle}</p>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-slate-900 p-10 rounded-[2rem] shadow-xl border border-slate-800 relative">
                <div className="flex gap-1 text-teal-500 mb-6">
                  {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-xl text-slate-300 italic mb-8 leading-relaxed">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full border-2 border-teal-500/20" />
                  <div>
                    <div className="font-bold text-white">{t.name}</div>
                    <div className="text-sm text-slate-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contacto" className="py-24 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-900 rounded-[3rem] overflow-hidden border border-slate-800">
              <div className="grid lg:grid-cols-2">
                <div className="p-12 lg:p-20 space-y-12">
                  <div>
                    <h2 className="text-4xl font-bold text-white mb-6">{t.contact.title}</h2>
                    <p className="text-slate-400 text-lg">{t.contact.subtitle}</p>
                  </div>
                  <div className="space-y-8">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-teal-400 border border-slate-700">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div className="text-lg font-semibold text-white">+52 (55) 1234-5678</div>
                    </div>
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-teal-400 border border-slate-700">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div className="text-lg font-semibold text-white">hola@menteserena.com</div>
                    </div>
                  </div>
                </div>
                <div className="p-8 lg:p-16 bg-slate-800/50 backdrop-blur-sm m-4 lg:m-12 rounded-3xl border border-slate-700/50">
                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-300">{t.contact.form.name}</label>
                        <input type="text" placeholder={t.contact.form.namePlaceholder} className="w-full px-5 py-4 rounded-2xl bg-slate-900 border border-slate-700 text-white outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-300">{t.contact.form.email}</label>
                        <input type="email" placeholder="email@domain.com" className="w-full px-5 py-4 rounded-2xl bg-slate-900 border border-slate-700 text-white outline-none" />
                      </div>
                      <button type="submit" className="w-full py-5 bg-teal-600 text-white rounded-2xl font-bold hover:bg-teal-500 transition-all shadow-xl">
                        {t.contact.form.submit}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 text-slate-500 py-10 border-t border-slate-900 text-center text-xs">
        <p>&copy; {new Date().getFullYear()} Mente Serena Psicología.</p>
      </footer>

      <AIAssistant />
    </div>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('es');
  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <AppContent />
    </LanguageContext.Provider>
  );
};

export default App;
