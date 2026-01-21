
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

export const generateManualPreview = async (subjectInfo: string) => {
  if (!API_KEY) throw new Error("API Key not found");
  
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Translate the following description of a difficult person into a mechanical "User Manual" summary. 
    Subject Info: ${subjectInfo}
    
    Structure the response into 3 specific sections:
    1. Specifications: How they run (core mechanics).
    2. Procedures: How to handle them (daily interactions).
    3. Troubleshooting: Exactly what to do when they glitch (conflict resolution).
    
    Tone: Industrial, mechanical, objective, devoid of fluff. Use terms like "input," "latency," "buffer," "thermal limit," "kinetic protocol."`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          specifications: { type: Type.STRING, description: "Technical specs of the person's behavior" },
          procedures: { type: Type.STRING, description: "Step-by-step operating procedures" },
          troubleshooting: { type: Type.STRING, description: "Conflict resolution steps" }
        },
        required: ["specifications", "procedures", "troubleshooting"]
      }
    }
  });

  return JSON.parse(response.text);
};
