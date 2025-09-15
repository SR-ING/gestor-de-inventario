
import { GoogleGenAI } from "@google/genai";
import { Product } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // A more user-friendly error could be shown in the UI
  console.error("API_KEY is not defined. Please check your environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const getInventoryInsightsStream = async (prompt: string, inventory: Product[]) => {
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
