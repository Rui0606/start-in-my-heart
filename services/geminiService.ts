import { GoogleGenAI } from "@google/genai";
import { PDF_CONTEXT } from "../constants";

export const askGeminiTutor = async (userQuestion: string): Promise<string> => {
  // 依據最新的開發規範，我們直接從 process.env 取得 API KEY
  // Please ensure your environment has the API_KEY variable set.
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.error("API Key is missing from process.env.API_KEY");
    return "API Key configuration is missing. Please check your environment settings.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: apiKey });
    
    // 使用 gemini-2.5-flash，這是目前速度最快且最具成本效益（有免費額度）的模型
    // Using gemini-2.5-flash for best performance and cost-efficiency
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
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
    return "Sorry, I'm having trouble connecting to the AI tutor right now. Please check your network or API key quota.";
  }
};