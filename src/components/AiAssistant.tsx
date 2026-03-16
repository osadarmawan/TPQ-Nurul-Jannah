import React, { useState } from 'react';
import { Bot, X, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export const AiAssistant = ({ theme = 'light' }: { theme?: 'light' | 'dark' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Assalamu\'alaikum. Saya Asisten AI SIMAS. Ada yang bisa saya bantu terkait data santri atau laporan?' }
    ]);
    const [input, setInput] = useState('');

    const isDark = theme === 'dark';

    const handleSend = () => {
        if (!input.trim()) return;
        
        setMessages([...messages, { role: 'user', content: input }]);
        setInput('');
        
        // Mock AI response
        setTimeout(() => {
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: 'Berdasarkan data terbaru, rata-rata progress hafalan santri bulan ini meningkat 15%. Apakah Anda ingin melihat laporan detailnya?' 
            }]);
        }, 1000);
    };

    return (
        <>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className={cn(
                    "fixed bottom-8 right-8 w-16 h-16 rounded-full flex items-center justify-center text-[#D4AF37] z-50 border-2 group transition-all",
                    isDark 
                        ? "bg-gradient-to-br from-emerald-900 to-gray-900 shadow-[0_8px_30px_rgba(0,0,0,0.6)] border-emerald-500/30" 
                        : "bg-gradient-to-br from-[#064E3B] to-emerald-800 shadow-[0_8px_30px_rgba(6,78,59,0.4)] border-[#D4AF37]/30"
                )}
            >
                <Bot size={32} className="group-hover:animate-pulse" />
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">1</span>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className={cn(
                            "fixed bottom-28 right-8 w-96 backdrop-blur-2xl rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] border z-50 overflow-hidden flex flex-col transition-all",
                            isDark 
                                ? "bg-gray-900/95 border-emerald-500/30" 
                                : "bg-white/95 border-[#D4AF37]/30"
                        )}
                        style={{ height: '500px' }}
                    >
                        <div className={cn(
                            "p-5 flex justify-between items-center border-b transition-colors",
                            isDark 
                                ? "bg-gradient-to-r from-emerald-950 to-gray-950 border-emerald-500/20" 
                                : "bg-gradient-to-r from-[#064E3B] to-emerald-900 border-[#D4AF37]/20"
                        )}>
                            <div className="flex items-center space-x-3">
                                <div className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center border transition-colors",
                                    isDark ? "bg-white/5 border-emerald-500/50" : "bg-white/10 border-[#D4AF37]/50"
                                )}>
                                    <Sparkles size={20} className="text-[#D4AF37]" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold">SIMAS AI</h3>
                                    <p className="text-emerald-200/70 text-xs">Powered by Gemini</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-emerald-200 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10">
                                <X size={20} />
                            </button>
                        </div>

                        <div className={cn(
                            "flex-1 p-5 overflow-y-auto space-y-4 transition-colors",
                            isDark ? "bg-gray-950/50" : "bg-gray-50/50"
                        )}>
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={cn(
                                        "max-w-[80%] p-3.5 rounded-2xl text-sm shadow-sm transition-all",
                                        msg.role === 'user' 
                                            ? (isDark ? 'bg-emerald-700 text-white rounded-tr-sm' : 'bg-[#064E3B] text-white rounded-tr-sm')
                                            : (isDark ? 'bg-gray-800 border border-gray-700 text-gray-200 rounded-tl-sm' : 'bg-white border border-gray-100 text-gray-700 rounded-tl-sm')
                                    )}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={cn(
                            "p-4 border-t transition-colors",
                            isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"
                        )}>
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Tanya seputar data santri..."
                                    className={cn(
                                        "w-full pl-4 pr-12 py-3 border rounded-2xl focus:outline-none transition-all text-sm",
                                        isDark 
                                            ? "bg-gray-800 border-gray-700 text-white focus:ring-emerald-500/20 focus:border-emerald-500/50" 
                                            : "bg-gray-50 border-gray-200 text-gray-900 focus:ring-[#064E3B]/20 focus:border-[#064E3B]/50"
                                    )}
                                />
                                <button 
                                    onClick={handleSend}
                                    className={cn(
                                        "absolute right-2 w-10 h-10 text-white rounded-xl flex items-center justify-center transition-colors shadow-sm",
                                        isDark ? "bg-emerald-600 hover:bg-emerald-500" : "bg-[#064E3B] hover:bg-emerald-800"
                                    )}
                                >
                                    <Send size={16} className="ml-1" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
