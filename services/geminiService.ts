import { GoogleGenAI } from "@google/genai";
import { Product } from "../types";

const API_KEY = (typeof process !== 'undefined' && process.env && process.env.API_KEY)
  ? process.env.API_KEY
  : undefined;

let ai: GoogleGenAI | null = null;

if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
  console.warn("API_KEY is not defined. AI features will be disabled. Make sure to set it in your Vercel environment variables.");
}

export const isAiAvailable = !!ai;

export const getInventoryInsightsStream = async (prompt: string, inventory: Product[]) => {
  if (!ai) {
    throw new Error("El Asistente de IA no está configurado. Por favor, asegúrese de que la API_KEY está configurada en las variables de entorno de Vercel.");
  }

  const model = "gemini-2.5-flash";
  
  const systemInstruction = `Eres un asistente experto en gestión de inventarios. Se te proporcionarán datos de inventario en formato JSON y una pregunta del usuario. Tu tarea es analizar los datos y responder a la pregunta de manera concisa y útil. Si el usuario pide generar algo, como una descripción de producto, hazlo de forma creativa y profesional. Siempre responde en español.

  Aquí están los datos de inventario actuales:
  ${JSON.stringify(inventory, null, 2)}
  `;

  try {
    const response = await ai.models.generateContentStream({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
      },
    });
    return response;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("No se pudo obtener una respuesta del asistente de IA.");
  }
};
