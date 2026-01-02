
import React from 'react';
import { Brain, Heart, Users, Shield, MessageCircle, Star } from 'lucide-react';
import { Service, Testimonial } from './types';

export const getLocalizedServices = (lang: string): Service[] => {
  const data = {
    es: [
      { id: '1', title: 'Terapia Individual', description: 'Espacio personalizado para trabajar en tu crecimiento personal, ansiedad y depresión.', icon: 'brain' },
      { id: '2', title: 'Terapia de Pareja', description: 'Fortalece la comunicación y reconstruye la conexión emocional con tu compañero/a.', icon: 'heart' },
      { id: '3', title: 'Terapia Juvenil', description: 'Apoyo especializado para adolescentes en sus etapas de desarrollo.', icon: 'users' },
      { id: '4', title: 'Manejo del Estrés', description: 'Técnicas prácticas y mindfulness para recuperar la calma diaria.', icon: 'shield' }
    ],
    en: [
      { id: '1', title: 'Individual Therapy', description: 'Personalized space to work on personal growth, anxiety, and depression.', icon: 'brain' },
      { id: '2', title: 'Couple Therapy', description: 'Strengthen communication and rebuild emotional connection with your partner.', icon: 'heart' },
      { id: '3', title: 'Youth Therapy', description: 'Specialized support for adolescents during their developmental stages.', icon: 'users' },
      { id: '4', title: 'Stress Management', description: 'Practical techniques and mindfulness to regain daily calm.', icon: 'shield' }
    ],
    de: [
      { id: '1', title: 'Einzeltherapie', description: 'Ein persönlicher Raum, um an persönlichem Wachstum, Angstzuständen und Depressionen zu arbeiten.', icon: 'brain' },
      { id: '2', title: 'Paartherapie', description: 'Stärken Sie die Kommunikation und bauen Sie die emotionale Verbindung zu Ihrem Partner wieder auf.', icon: 'heart' },
      { id: '3', title: 'Jugendtherapie', description: 'Spezialisierte Unterstützung für Jugendliche in ihren Entwicklungsphasen.', icon: 'users' },
      { id: '4', title: 'Stressmanagement', description: 'Praktische Techniken und Achtsamkeit, um die tägliche Ruhe wiederzufinden.', icon: 'shield' }
    ]
  };
  return data[lang as keyof typeof data] || data.es;
};

export const getLocalizedTestimonials = (lang: string): Testimonial[] => {
  const data = {
    es: [
      { id: '1', name: 'Ana García', role: 'Terapia Individual', content: 'Encontrar este espacio fue un punto de inflexión. Me sentí escuchada desde el primer día.', avatar: 'https://i.pravatar.cc/150?u=10' },
      { id: '2', name: 'Carlos Ruiz', role: 'Terapia de Pareja', content: 'Las herramientas que aprendimos salvaron nuestra relación. La comunicación ahora es fluida.', avatar: 'https://i.pravatar.cc/150?u=11' }
    ],
    en: [
      { id: '1', name: 'Ana García', role: 'Individual Therapy', content: 'Finding this space was a turning point. I felt heard from day one.', avatar: 'https://i.pravatar.cc/150?u=10' },
      { id: '2', name: 'Carlos Ruiz', role: 'Couple Therapy', content: 'The tools we learned saved our relationship. Communication is fluid now.', avatar: 'https://i.pravatar.cc/150?u=11' }
    ],
    de: [
      { id: '1', name: 'Ana García', role: 'Einzeltherapie', content: 'Diesen Raum zu finden, war ein Wendepunkt. Ich fühlte mich vom ersten Tag an gehört.', avatar: 'https://i.pravatar.cc/150?u=10' },
      { id: '2', name: 'Carlos Ruiz', role: 'Paartherapie', content: 'Die Werkzeuge, die wir gelernt haben, haben unsere Beziehung gerettet. Die Kommunikation fließt jetzt.', avatar: 'https://i.pravatar.cc/150?u=11' }
    ]
  };
  return data[lang as keyof typeof data] || data.es;
};

export const getIcon = (name: string) => {
  switch (name) {
    case 'brain': return <Brain className="w-6 h-6" />;
    case 'heart': return <Heart className="w-6 h-6" />;
    case 'users': return <Users className="w-6 h-6" />;
    case 'shield': return <Shield className="w-6 h-6" />;
    case 'message': return <MessageCircle className="w-6 h-6" />;
    case 'star': return <Star className="w-6 h-6" />;
    default: return <Brain className="w-6 h-6" />;
  }
};
