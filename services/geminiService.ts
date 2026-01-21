
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { UnitData } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateManualPreview = async (unitA: UnitData, unitB: UnitData) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Compile a "Relationship Operating Manual" by scraping the underlying source code of these two units. 
    
    UNIT A (OPERATOR): Name: ${unitA.name}, Model: ${unitA.model}, Coordinates: ${unitA.location}
    UNIT B (SUBJECT): Name: ${unitB.name}, Model: ${unitB.model}, Coordinates: ${unitB.location}
    
    THE MANIFESTO: Human behavior isn't random; it is coded. You are scraping the universal backend (Planetary Geometry, Hexagram Physics, Genetic Codons) to extract instructions. Strip away all mysticism and "magic." You are a System Architect writing an industrial tech manual.
    
    TONE: Strictly industrial, mechanical, objective, and digital. Use terms like "Hardware", "Scraping", "Coordinates", "Instructions", "Mismatch", "Buffer", "Packet Loss", "Voltage", "Source Code", "Thermal Throttling", "Kernel Panic".
    
    STRUCTURE REQUIRED:
    1. Specifications (Hardware Overiew): Detail the geometric friction between their source codes. Frame the conflict as a hardware limitation, not a personality flaw.
    2. Procedures (Engagement Protocols): Step-by-step instructions for data transmission. How should Unit A initiate contact without causing Unit B's CPU to spike or thermal throttle?
    3. Troubleshooting (Patch Scripts): Specific mechanical "patches" for common errors (Silent Treatment, Yelling, Circular Logic) based on their unique coordinate data.
    
    Response must be valid JSON matching the schema.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          specifications: { type: Type.STRING },
          procedures: { type: Type.STRING },
          troubleshooting: { type: Type.STRING }
        },
        required: ["specifications", "procedures", "troubleshooting"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const playProxyVoice = async (text: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: `Say this in a neutral, calm, cold, mechanical robotic British voice: ${text}` }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: 'Charon' },
        },
      },
    },
  });

  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (base64Audio) {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    const audioData = atob(base64Audio);
    const arrayBuffer = new ArrayBuffer(audioData.length);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < audioData.length; i++) {
      view[i] = audioData.charCodeAt(i);
    }
    
    const dataInt16 = new Int16Array(view.buffer);
    const buffer = audioContext.createBuffer(1, dataInt16.length, 24000);
    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < dataInt16.length; i++) {
      channelData[i] = dataInt16[i] / 32768.0;
    }

    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start();
  }
};
