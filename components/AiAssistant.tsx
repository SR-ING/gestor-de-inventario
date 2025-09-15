import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Product } from '../types';
import { getInventoryInsightsStream, isAiAvailable } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { SendIcon } from './icons/SendIcon';

interface AiAssistantProps {
  products: Product[];
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

const AiAssistant: React.FC<AiAssistantProps> = ({ products }) => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendPrompt = useCallback(async () => {
    if (!prompt.trim() || isLoading) return;

    const userMessage: Message = { sender: 'user', text: prompt };
    setMessages(prev => [...prev, userMessage]);
    setPrompt('');
    setIsLoading(true);

    try {
      const stream = await getInventoryInsightsStream(prompt, products);
      let aiResponse = '';
      setMessages(prev => [...prev, { sender: 'ai', text: '' }]);

      for await (const chunk of stream) {
        const chunkText = chunk.text;
        aiResponse += chunkText;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { sender: 'ai', text: aiResponse };
          return newMessages;
        });
      }
    } catch (error: any) {
      console.error(error);
      const errorMessageText = error.message || 'Lo siento, ocurrió un error al contactar al asistente.';
      setMessages(prev => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage?.sender === 'ai') {
          // Replace the placeholder or partial message with the error
          newMessages[newMessages.length - 1] = { sender: 'ai', text: errorMessageText };
        } else {
          // If no AI message placeholder was added, add a new error message
          newMessages.push({ sender: 'ai', text: errorMessageText });
        }
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  }, [prompt, isLoading, products]);

  if (!isAiAvailable) {
    return (
      <div className="mt-8 bg-white dark:bg-slate-800 shadow-lg rounded-xl ring-1 ring-slate-900/5">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <SparklesIcon className="w-6 h-6 text-slate-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100">Asistente de IA</h2>
          </div>
          <div className="h-64 flex flex-col items-center justify-center text-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-600 dark:text-slate-300">Asistente no disponible</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                La clave de API para el asistente de IA no está configurada.
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                Por favor, configura la variable de entorno `API_KEY` en la configuración de tu proyecto en Vercel para habilitar esta función.
              </p>
          </div>
           <div className="mt-4 text-center text-xs text-slate-400">
             La aplicación principal de gestión de inventario seguirá funcionando normalmente.
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-white dark:bg-slate-800 shadow-lg rounded-xl ring-1 ring-slate-900/5">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <SparklesIcon className="w-6 h-6 text-primary-500" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100">Asistente de IA</h2>
        </div>
        <div 
          ref={chatContainerRef}
          className="h-64 overflow-y-auto p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg mb-4 border border-slate-200 dark:border-slate-700"
        >
          {messages.length === 0 && (
            <div className="h-full flex items-center justify-center text-slate-400 dark:text-slate-500">
              <p>Pregúntame algo sobre tu inventario, ej. "¿Qué productos tienen bajo stock?"</p>
            </div>
          )}
          <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xl px-4 py-2 rounded-xl ${msg.sender === 'user' ? 'bg-primary-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200'}`}>
                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && messages[messages.length-1]?.sender === 'user' && (
              <div className="flex gap-2.5 justify-start">
                  <div className="max-w-xl px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">Pensando...</span>
                        <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                      </div>
                  </div>
              </div>
          )}
          </div>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendPrompt()}
            placeholder="Genera una descripción para el producto con SKU..."
            className="flex-grow px-4 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            onClick={handleSendPrompt}
            disabled={isLoading || !prompt.trim()}
            className="flex-shrink-0 px-4 py-2 bg-primary-600 text-white font-semibold rounded-lg shadow-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-75 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;
