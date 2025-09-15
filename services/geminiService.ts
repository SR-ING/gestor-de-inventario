import { GoogleGenAI } from "@google/genai";
import { Product } from "../types";

// Fix: Per coding guidelines, the API key must be obtained exclusively from `process.env.API_KEY`.
// This change also resolves the TypeScript error "Property 'env' does not exist on type 'ImportMeta'".
const apiKey = process.env.API_KEY;

// Esta validación detiene la app si la clave no se encuentra, mostrando un error claro en la consola
// en lugar de una pantalla en blanco.
if (!apiKey) {
  throw new Error("La variable de entorno API_KEY no está definida. Por favor, configúrala en los ajustes de despliegue.");
}

const ai = new GoogleGenAI({ apiKey });

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
