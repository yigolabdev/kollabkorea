
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Ready to take your brand to LA? Ask K-ASSIST anything about the platform. 🔴' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(input);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-80 md:w-96 bg-[#EDEBE4] border-2 border-black rounded-none overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            {/* Header */}
            <div className="bg-black text-[#EDEBE4] p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-[#EDEBE4] rounded-full animate-pulse" />
                <h3 className="font-semibold text-base tracking-[0.12em] uppercase">K-ASSIST AI</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-[#EDEBE4]/50 hover:text-[#EDEBE4]">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages */}
            <div ref={chatContainerRef} className="h-80 overflow-y-auto p-4 space-y-4 bg-[#EDEBE4]">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 text-base font-semibold tracking-wide ${
                      msg.role === 'user'
                        ? 'bg-black text-[#EDEBE4]'
                        : 'bg-[#EDEBE4] text-black border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#EDEBE4] border border-black p-2 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounce" style={{ animationDelay: '100ms' }} />
                    <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t-2 border-black bg-[#EDEBE4]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about expansion..."
                  className="flex-1 bg-transparent text-black placeholder-black/30 text-sm font-semibold uppercase focus:outline-none tracking-wide"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-black p-2 hover:opacity-80 transition-colors disabled:opacity-50"
                >
                  <Send className="w-5 h-5 text-[#EDEBE4]" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
      >
        {isOpen ? <X size={28} className="text-[#EDEBE4]" /> : <MessageCircle size={28} className="text-[#EDEBE4]" />}
      </motion.button>
    </div>
  );
};

export default AIChat;
