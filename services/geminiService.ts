
import { GoogleGenAI } from "@google/genai";

export const getGeminiResponse = async (prompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[], lang: string = 'es') => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstructions = {
    es: `Eres un asistente virtual empático y profesional de "Mente Serena", un centro de psicología. 
        Responde siempre en ESPAÑOL. Brinda apoyo emocional inicial y guía hacia servicios adecuados. 
        NO des diagnósticos. En emergencias, sugiere llamar al 911.`,
    en: `You are an empathetic and professional virtual assistant from "Mente Serena", a psychology center. 
        Always respond in ENGLISH. Provide initial emotional support and guide users to appropriate services. 
        DO NOT provide medical diagnoses. In emergencies, suggest calling 911.`,
    de: `Sie sind ein einfühlsamer und professioneller virtueller Assistent von "Mente Serena", einem Psychologiezentrum. 
        Antworten Sie immer auf DEUTSCH. Bieten Sie erste emotionale Unterstützung und leiten Sie Benutzer zu geeigneten Diensten. 
        Geben Sie KEINE medizinischen Diagnosen. Schlagen Sie in Notfällen vor, die 911 (oder den örtlichen Notruf) anzurufen.`
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({ role: h.role, parts: h.parts })),
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: systemInstructions[lang as keyof typeof systemInstructions] || systemInstructions.es,
        temperature: 0.7,
        topP: 0.9,
      },
    });

    return response.text || "Error processing request.";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Error connecting to assistant.";
  }
};
