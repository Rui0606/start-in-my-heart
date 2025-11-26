import { GoogleGenAI } from "@google/genai";
import { PDF_CONTEXT } from "../constants";

export const askGeminiTutor = async (userQuestion: string): Promise<string> => {
  if (!import.meta.env.VITE_API_KEY) {
   return "API Key is missing...";
}

  try {
    const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash-001',
      contents: userQuestion,
      config: {
        systemInstruction: `You are a kind, educational tutor specializing in Autism Spectrum Disorder. 
        Answer the user's question using ONLY the following context derived from a specific educational document.
        If the answer is not in the context, politely say you can only answer based on the provided material.
        Keep answers concise (under 100 words) and encouraging.
        
        CONTEXT:
        ${PDF_CONTEXT}`,
      },
    });

    return response.text || "I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the AI tutor right now.";
  }
};
