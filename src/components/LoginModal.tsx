import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, User, Eye, EyeOff, LogIn, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin: (role: 'Admin' | 'Pegawai', username: string) => void;
    theme?: 'light' | 'dark';
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin, theme = 'light' }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (username === 'admin' && password === 'logik@123') {
            onLogin('Admin', 'Administrator');
            onClose();
        } else if (username === 'pegawai' && password === 'pegawai123') {
            onLogin('Pegawai', 'Pegawai Pelaksana');
            onClose();
        } else {
            setError('Username atau password salah');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className={cn(
                            "relative w-full max-w-md rounded-3xl shadow-2xl overflow-hidden overflow-y-auto border",
                            theme === 'dark' ? "bg-zinc-900 border-emerald-900/30" : "bg-white border-[#D4AF37]/20"
                        )}
                    >
                        <div className={cn(
                            "p-6 h-full flex flex-col",
                            theme === 'dark' ? "text-gray-100" : "text-gray-800"
                        )}>
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center space-x-3">
                                    <div className={cn(
                                        "w-10 h-10 rounded-xl flex items-center justify-center",
                                        theme === 'dark' ? "bg-emerald-900/30 text-emerald-400" : "bg-emerald-50 text-[#064E3B]"
                                    )}>
                                        <ShieldCheck size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold">Login Sistem</h2>
                                        <p className="text-xs text-gray-500">Masuk untuk akses fungsionalitas penuh</p>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className={cn(
                                        "p-2 rounded-xl transition-colors",
                                        theme === 'dark' ? "hover:bg-zinc-800 text-gray-500" : "hover:bg-gray-100 text-gray-400"
                                    )}
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-1.5 ml-1">Username</label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                            <User size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder="Masukkan username"
                                            className={cn(
                                                "w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition-all",
                                                theme === 'dark'
                                                    ? "bg-zinc-800 border-zinc-700 text-white focus:ring-emerald-500/20 focus:border-emerald-500"
                                                    : "bg-gray-50 border-gray-200 text-gray-900 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37]"
                                            )}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-1.5 ml-1">Password</label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                            <Lock size={18} />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Masukkan password"
                                            className={cn(
                                                "w-full pl-10 pr-12 py-3 rounded-xl border outline-none transition-all",
                                                theme === 'dark'
                                                    ? "bg-zinc-800 border-zinc-700 text-white focus:ring-emerald-500/20 focus:border-emerald-500"
                                                    : "bg-gray-50 border-gray-200 text-gray-900 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37]"
                                            )}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                {error && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-500 text-xs font-medium bg-red-500/10 p-2 rounded-lg border border-red-500/20"
                                    >
                                        {error}
                                    </motion.p>
                                )}

                                <button
                                    type="submit"
                                    className={cn(
                                        "w-full py-3 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all shadow-lg active:scale-95",
                                        theme === 'dark'
                                            ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/40"
                                            : "bg-[#064E3B] hover:bg-emerald-800 text-white shadow-emerald-900/20"
                                    )}
                                >
                                    <LogIn size={20} />
                                    <span>Login Sekarang</span>
                                </button>
                            </form>

                            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-zinc-800 text-center">
                                <p className="text-xs text-gray-500 leading-relaxed">
                                    Login khusus Admin atau Pengurus TPQ. <br />
                                    Jika Anda lupa kredensial, silakan hubungi tim IT.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
