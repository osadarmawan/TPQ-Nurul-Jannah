import React, { useState } from 'react';
import { 
    Settings, 
    User, 
    Bell, 
    Shield, 
    Database, 
    Globe, 
    Mail, 
    Lock, 
    Save,
    Trash2,
    RefreshCw,
    Cloud,
    Smartphone,
    Monitor,
    CheckCircle2,
    Loader2,
    MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

interface SettingsManagementProps {
    theme?: 'light' | 'dark';
    onThemeChange?: (theme: 'light' | 'dark') => void;
}

export const SettingsManagement: React.FC<SettingsManagementProps> = ({ theme = 'light', onThemeChange }) => {
    const [activeTab, setActiveTab] = useState('umum');
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        // Simulate professional saving process
        setTimeout(() => {
            setIsSaving(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }, 1500);
    };

    const tabs = [
        { id: 'umum', label: 'Umum', icon: Settings },
        { id: 'profil', label: 'Profil TPQ', icon: Globe },
        { id: 'keamanan', label: 'Keamanan', icon: Shield },
        { id: 'notifikasi', label: 'Notifikasi', icon: Bell },
        { id: 'database', label: 'Database', icon: Database },
    ];

    return (
        <div className="space-y-8 pb-12">
            {/* Success Toast */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20, x: '-50%' }}
                        animate={{ opacity: 1, y: 20, x: '-50%' }}
                        exit={{ opacity: 0, y: -20, x: '-50%' }}
                        className="fixed top-4 left-1/2 z-[100] flex items-center space-x-3 px-6 py-3 bg-emerald-600 text-white rounded-2xl shadow-2xl shadow-emerald-900/20 border border-emerald-500/30"
                    >
                        <CheckCircle2 size={20} />
                        <span className="font-medium">Perubahan berhasil disimpan secara sempurna!</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className={cn(
                        "text-3xl font-bold tracking-tight transition-colors",
                        theme === 'dark' ? "text-emerald-400" : "text-[#064E3B]"
                    )}>Pengaturan Sistem</h2>
                    <p className="text-gray-500 mt-1">Konfigurasi aplikasi, profil lembaga, dan manajemen keamanan.</p>
                </div>
                <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className={cn(
                        "flex items-center space-x-2 px-6 py-2.5 rounded-xl text-white font-medium transition-all shadow-lg relative overflow-hidden group",
                        isSaving ? "bg-emerald-800 cursor-not-allowed" : "bg-[#064E3B] hover:bg-emerald-800 shadow-emerald-900/20"
                    )}
                >
                    {isSaving ? (
                        <Loader2 size={18} className="animate-spin" />
                    ) : (
                        <Save size={18} className="group-hover:scale-110 transition-transform" />
                    )}
                    <span>{isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Tabs */}
                <div className="lg:col-span-1 space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "w-full flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all font-medium text-sm",
                                activeTab === tab.id 
                                    ? theme === 'dark'
                                        ? "bg-emerald-900/20 text-emerald-400 shadow-sm border border-emerald-800/30"
                                        : "bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-100" 
                                    : theme === 'dark'
                                        ? "text-gray-500 hover:bg-zinc-900"
                                        : "text-gray-500 hover:bg-gray-50"
                            )}
                        >
                            <tab.icon size={18} />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="lg:col-span-3">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={cn(
                            "rounded-3xl p-8 shadow-sm border transition-all duration-500",
                            theme === 'dark'
                                ? "bg-zinc-900/50 border-emerald-900/10"
                                : "bg-white border-gray-100"
                        )}
                    >
                        {activeTab === 'umum' && (
                            <div className="space-y-8">
                                <div>
                                    <h3 className={cn(
                                        "text-lg font-bold mb-6 transition-colors",
                                        theme === 'dark' ? "text-emerald-400" : "text-gray-800"
                                    )}>Pengaturan Umum</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Nama Aplikasi</label>
                                            <input type="text" defaultValue="SIMAS TPQ Nurul Jannah" className={cn(
                                                "w-full px-4 py-2.5 rounded-xl border outline-none transition-all",
                                                theme === 'dark'
                                                    ? "bg-zinc-900 border-zinc-800 text-gray-300 focus:ring-emerald-500/20 focus:border-emerald-500/50"
                                                    : "bg-white border-gray-100 focus:ring-emerald-500/20 focus:border-emerald-500"
                                            )} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tahun Akademik Aktif</label>
                                            <select className={cn(
                                                "w-full px-4 py-2.5 rounded-xl border outline-none transition-all",
                                                theme === 'dark'
                                                    ? "bg-zinc-900 border-zinc-800 text-gray-300 focus:ring-emerald-500/20 focus:border-emerald-500/50"
                                                    : "bg-white border-gray-100 focus:ring-emerald-500/20 focus:border-emerald-500"
                                            )}>
                                                <option>2023/2024 - Genap</option>
                                                <option>2023/2024 - Ganjil</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Bahasa</label>
                                            <select className={cn(
                                                "w-full px-4 py-2.5 rounded-xl border outline-none transition-all",
                                                theme === 'dark'
                                                    ? "bg-zinc-900 border-zinc-800 text-gray-300 focus:ring-emerald-500/20 focus:border-emerald-500/50"
                                                    : "bg-white border-gray-100 focus:ring-emerald-500/20 focus:border-emerald-500"
                                            )}>
                                                <option>Bahasa Indonesia</option>
                                                <option>English</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Zona Waktu</label>
                                            <select className={cn(
                                                "w-full px-4 py-2.5 rounded-xl border outline-none transition-all",
                                                theme === 'dark'
                                                    ? "bg-zinc-900 border-zinc-800 text-gray-300 focus:ring-emerald-500/20 focus:border-emerald-500/50"
                                                    : "bg-white border-gray-100 focus:ring-emerald-500/20 focus:border-emerald-500"
                                            )}>
                                                <option>Asia/Jakarta (WIB)</option>
                                                <option>Asia/Makassar (WITA)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className={cn(
                                    "pt-8 border-t transition-colors",
                                    theme === 'dark' ? "border-zinc-800" : "border-gray-50"
                                )}>
                                    <h3 className={cn(
                                        "text-lg font-bold mb-6 transition-colors",
                                        theme === 'dark' ? "text-emerald-400" : "text-gray-800"
                                    )}>Tampilan</h3>
                                    <div className="flex items-center space-x-4">
                                        <button 
                                            onClick={() => onThemeChange?.('light')}
                                            className={cn(
                                                "flex-1 p-4 rounded-2xl border-2 flex flex-col items-center space-y-2 transition-all",
                                                theme === 'light'
                                                    ? "border-emerald-500 bg-emerald-50 shadow-lg shadow-emerald-500/10"
                                                    : "border-transparent bg-zinc-900 hover:bg-zinc-800"
                                            )}
                                        >
                                            <Monitor size={24} className={theme === 'light' ? "text-emerald-600" : "text-gray-500"} />
                                            <span className={cn(
                                                "text-xs font-bold",
                                                theme === 'light' ? "text-emerald-700" : "text-gray-500"
                                            )}>Light Mode</span>
                                        </button>
                                        <button 
                                            onClick={() => onThemeChange?.('dark')}
                                            className={cn(
                                                "flex-1 p-4 rounded-2xl border-2 flex flex-col items-center space-y-2 transition-all",
                                                theme === 'dark'
                                                    ? "border-emerald-500 bg-emerald-900/20 shadow-lg shadow-emerald-500/10"
                                                    : "border-transparent bg-gray-50 hover:bg-gray-100"
                                            )}
                                        >
                                            <Smartphone size={24} className={theme === 'dark' ? "text-emerald-400" : "text-gray-400"} />
                                            <span className={cn(
                                                "text-xs font-bold",
                                                theme === 'dark' ? "text-emerald-400" : "text-gray-500"
                                            )}>Dark Mode</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'profil' && (
                            <div className="space-y-8">
                                <h3 className={cn("text-lg font-bold mb-6", theme === 'dark' ? "text-emerald-400" : "text-gray-800")}>Profil Lembaga</h3>
                                <div className="flex items-center space-x-6 mb-8">
                                    <div className={cn("w-24 h-24 rounded-3xl flex items-center justify-center border-4 shadow-lg", theme === 'dark' ? "bg-emerald-900/30 text-emerald-400 border-zinc-800" : "bg-emerald-100 text-emerald-600 border-white")}>
                                        <Globe size={40} />
                                    </div>
                                    <div>
                                        <button className={cn("px-4 py-2 text-xs font-bold rounded-lg transition-colors", theme === 'dark' ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-emerald-600 hover:bg-emerald-700 text-white")}>Ganti Logo</button>
                                        <p className={cn("text-[10px] mt-2", theme === 'dark' ? "text-gray-500" : "text-gray-400")}>Format: PNG, JPG. Maks 2MB.</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-6">
                                    <div className="space-y-2">
                                        <label className={cn("text-xs font-bold uppercase tracking-widest", theme === 'dark' ? "text-gray-400" : "text-gray-400")}>Nama TPQ</label>
                                        <input type="text" defaultValue="TPQ Nurul Jannah" className={cn("w-full px-4 py-2.5 rounded-xl border outline-none transition-all", theme === 'dark' ? "bg-zinc-900 border-zinc-800 text-gray-300 focus:ring-emerald-500/20 focus:border-emerald-500/50" : "bg-white border-gray-100 focus:ring-emerald-500/20 focus:border-emerald-500")} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className={cn("text-xs font-bold uppercase tracking-widest", theme === 'dark' ? "text-gray-400" : "text-gray-400")}>Alamat Lengkap</label>
                                        <textarea className={cn("w-full h-24 px-4 py-2.5 rounded-xl border outline-none transition-all resize-none", theme === 'dark' ? "bg-zinc-900 border-zinc-800 text-gray-300 focus:ring-emerald-500/20 focus:border-emerald-500/50" : "bg-white border-gray-100 focus:ring-emerald-500/20 focus:border-emerald-500")} defaultValue="Jl. Abimanyu 1 [Blok L], Perum. Puri Nirwana Residence"></textarea>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                        <div className="space-y-2">
                                            <label className={cn("text-xs font-bold uppercase tracking-widest", theme === 'dark' ? "text-gray-400" : "text-gray-400")}>RT</label>
                                            <input type="text" defaultValue="014" className={cn("w-full px-4 py-2.5 rounded-xl border outline-none transition-all", theme === 'dark' ? "bg-zinc-900 border-zinc-800 text-gray-300 focus:ring-emerald-500/20 focus:border-emerald-500/50" : "bg-white border-gray-100 focus:ring-emerald-500/20 focus:border-emerald-500")} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className={cn("text-xs font-bold uppercase tracking-widest", theme === 'dark' ? "text-gray-400" : "text-gray-400")}>RW</label>
                                            <input type="text" defaultValue="008" className={cn("w-full px-4 py-2.5 rounded-xl border outline-none transition-all", theme === 'dark' ? "bg-zinc-900 border-zinc-800 text-gray-300 focus:ring-emerald-500/20 focus:border-emerald-500/50" : "bg-white border-gray-100 focus:ring-emerald-500/20 focus:border-emerald-500")} />
                                        </div>
                                        <div className="md:col-span-2 space-y-2">
                                            <label className={cn("text-xs font-bold uppercase tracking-widest", theme === 'dark' ? "text-gray-400" : "text-gray-400")}>Desa / Kelurahan</label>
                                            <input type="text" defaultValue="Sukaraya" className={cn("w-full px-4 py-2.5 rounded-xl border outline-none transition-all", theme === 'dark' ? "bg-zinc-900 border-zinc-800 text-gray-300 focus:ring-emerald-500/20 focus:border-emerald-500/50" : "bg-white border-gray-100 focus:ring-emerald-500/20 focus:border-emerald-500")} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <label className={cn("text-xs font-bold uppercase tracking-widest", theme === 'dark' ? "text-gray-400" : "text-gray-400")}>Kecamatan</label>
                                            <input type="text" defaultValue="Karang Bahagia" className={cn("w-full px-4 py-2.5 rounded-xl border outline-none transition-all", theme === 'dark' ? "bg-zinc-900 border-zinc-800 text-gray-300 focus:ring-emerald-500/20 focus:border-emerald-500/50" : "bg-white border-gray-100 focus:ring-emerald-500/20 focus:border-emerald-500")} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className={cn("text-xs font-bold uppercase tracking-widest", theme === 'dark' ? "text-gray-400" : "text-gray-400")}>Kota / Kabupaten</label>
                                            <input type="text" defaultValue="Kab.Bekasi" className={cn("w-full px-4 py-2.5 rounded-xl border outline-none transition-all", theme === 'dark' ? "bg-zinc-900 border-zinc-800 text-gray-300 focus:ring-emerald-500/20 focus:border-emerald-500/50" : "bg-white border-gray-100 focus:ring-emerald-500/20 focus:border-emerald-500")} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className={cn("text-xs font-bold uppercase tracking-widest", theme === 'dark' ? "text-gray-400" : "text-gray-400")}>Provinsi</label>
                                            <input type="text" defaultValue="Jawa Barat" className={cn("w-full px-4 py-2.5 rounded-xl border outline-none transition-all", theme === 'dark' ? "bg-zinc-900 border-zinc-800 text-gray-300 focus:ring-emerald-500/20 focus:border-emerald-500/50" : "bg-white border-gray-100 focus:ring-emerald-500/20 focus:border-emerald-500")} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className={cn("text-xs font-bold uppercase tracking-widest", theme === 'dark' ? "text-gray-400" : "text-gray-400")}>Email Lembaga</label>
                                            <input type="email" defaultValue="" className={cn("w-full px-4 py-2.5 rounded-xl border outline-none transition-all", theme === 'dark' ? "bg-zinc-900 border-zinc-800 text-gray-300 focus:ring-emerald-500/20 focus:border-emerald-500/50" : "bg-white border-gray-100 focus:ring-emerald-500/20 focus:border-emerald-500")} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className={cn("text-xs font-bold uppercase tracking-widest", theme === 'dark' ? "text-gray-400" : "text-gray-400")}>Telepon</label>
                                            <input type="text" defaultValue="" className={cn("w-full px-4 py-2.5 rounded-xl border outline-none transition-all", theme === 'dark' ? "bg-zinc-900 border-zinc-800 text-gray-300 focus:ring-emerald-500/20 focus:border-emerald-500/50" : "bg-white border-gray-100 focus:ring-emerald-500/20 focus:border-emerald-500")} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'keamanan' && (
                            <div className="space-y-8">
                                <h3 className={cn("text-lg font-bold mb-6", theme === 'dark' ? "text-emerald-400" : "text-gray-800")}>Keamanan Akun & Sistem</h3>
                                
                                <div className="space-y-6">
                                    <h4 className={cn("text-sm font-bold uppercase tracking-widest", theme === 'dark' ? "text-gray-400" : "text-gray-500")}>Ubah Kata Sandi</h4>
                                    <div className="grid grid-cols-1 gap-6">
                                        <div className="space-y-2">
                                            <label className={cn("text-xs font-bold uppercase tracking-widest", theme === 'dark' ? "text-gray-400" : "text-gray-500")}>Kata Sandi Saat Ini</label>
                                            <div className="relative">
                                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                <input type="password" placeholder="••••••••" className={cn(
                                                    "w-full pl-12 pr-4 py-2.5 rounded-xl border outline-none transition-all",
                                                    theme === 'dark' ? "bg-zinc-900 border-zinc-800 text-gray-300 focus:ring-emerald-500/20 focus:border-emerald-500/50" : "bg-white border-gray-100 focus:ring-emerald-500/20 focus:border-emerald-500"
                                                )} />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className={cn("text-xs font-bold uppercase tracking-widest", theme === 'dark' ? "text-gray-400" : "text-gray-500")}>Kata Sandi Baru</label>
                                                <div className="relative">
                                                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                    <input type="password" placeholder="••••••••" className={cn(
                                                        "w-full pl-12 pr-4 py-2.5 rounded-xl border outline-none transition-all",
                                                        theme === 'dark' ? "bg-zinc-900 border-zinc-800 text-gray-300 focus:ring-emerald-500/20 focus:border-emerald-500/50" : "bg-white border-gray-100 focus:ring-emerald-500/20 focus:border-emerald-500"
                                                    )} />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className={cn("text-xs font-bold uppercase tracking-widest", theme === 'dark' ? "text-gray-400" : "text-gray-500")}>Konfirmasi Kata Sandi Baru</label>
                                                <div className="relative">
                                                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                    <input type="password" placeholder="••••••••" className={cn(
                                                        "w-full pl-12 pr-4 py-2.5 rounded-xl border outline-none transition-all",
                                                        theme === 'dark' ? "bg-zinc-900 border-zinc-800 text-gray-300 focus:ring-emerald-500/20 focus:border-emerald-500/50" : "bg-white border-gray-100 focus:ring-emerald-500/20 focus:border-emerald-500"
                                                    )} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={cn("pt-8 border-t", theme === 'dark' ? "border-zinc-800" : "border-gray-50")}>
                                    <h4 className={cn("text-sm font-bold uppercase tracking-widest mb-6", theme === 'dark' ? "text-gray-400" : "text-gray-500")}>Autentikasi Dua Faktor (2FA)</h4>
                                    <div className={cn("p-6 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4", theme === 'dark' ? "bg-zinc-900/50 border-zinc-800" : "bg-gray-50 border-gray-100")}>
                                        <div>
                                            <p className={cn("text-sm font-bold", theme === 'dark' ? "text-gray-200" : "text-gray-800")}>Amankan akun Anda dengan 2FA</p>
                                            <p className={cn("text-xs mt-1", theme === 'dark' ? "text-gray-400" : "text-gray-500")}>Tambahkan lapisan keamanan ekstra menggunakan aplikasi authenticator seperti Google Authenticator.</p>
                                        </div>
                                        <button className={cn("px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap", theme === 'dark' ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-[#064E3B] hover:bg-emerald-800 text-white")}>
                                            Aktifkan 2FA
                                        </button>
                                    </div>
                                </div>

                                <div className={cn("pt-8 border-t", theme === 'dark' ? "border-zinc-800" : "border-gray-50")}>
                                    <h4 className={cn("text-sm font-bold uppercase tracking-widest mb-6", theme === 'dark' ? "text-gray-400" : "text-gray-500")}>Sesi Aktif</h4>
                                    <div className="space-y-4">
                                        {[
                                            { device: 'MacBook Pro - Chrome', location: 'Bekasi, Indonesia', time: 'Sedang aktif', current: true },
                                            { device: 'iPhone 13 - Safari', location: 'Jakarta, Indonesia', time: '2 jam yang lalu', current: false }
                                        ].map((session, i) => (
                                            <div key={i} className={cn("p-4 rounded-xl border flex items-center justify-between", theme === 'dark' ? "bg-zinc-900 border-zinc-800" : "bg-white border-gray-100")}>
                                                <div className="flex items-center space-x-4">
                                                    <div className={cn("p-2 rounded-lg", theme === 'dark' ? "bg-zinc-800 text-gray-400" : "bg-gray-50 text-gray-500")}>
                                                        {session.device.includes('iPhone') ? <Smartphone size={20} /> : <Monitor size={20} />}
                                                    </div>
                                                    <div>
                                                        <p className={cn("text-sm font-bold", theme === 'dark' ? "text-gray-200" : "text-gray-800")}>{session.device}</p>
                                                        <p className={cn("text-xs", theme === 'dark' ? "text-gray-400" : "text-gray-500")}>{session.location} • {session.time}</p>
                                                    </div>
                                                </div>
                                                {session.current ? (
                                                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase rounded-full">Saat Ini</span>
                                                ) : (
                                                    <button className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors">Logout</button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifikasi' && (
                            <div className="space-y-8">
                                <h3 className={cn("text-lg font-bold mb-6", theme === 'dark' ? "text-emerald-400" : "text-gray-800")}>Preferensi Notifikasi</h3>
                                
                                <div className="space-y-6">
                                    <div className={cn("p-6 rounded-2xl border", theme === 'dark' ? "bg-zinc-900/50 border-zinc-800" : "bg-white border-gray-100")}>
                                        <div className="flex items-center space-x-3 mb-6">
                                            <div className={cn("p-2 rounded-lg", theme === 'dark' ? "bg-emerald-900/30 text-emerald-400" : "bg-emerald-50 text-emerald-600")}>
                                                <MessageSquare size={20} />
                                            </div>
                                            <h4 className={cn("text-sm font-bold uppercase tracking-widest", theme === 'dark' ? "text-gray-300" : "text-gray-700")}>Notifikasi WhatsApp</h4>
                                        </div>
                                        <div className="space-y-4">
                                            {[
                                                { label: 'Pengingat Pembayaran SPP', desc: 'Kirim pesan otomatis H-3 sebelum jatuh tempo', defaultChecked: true },
                                                { label: 'Laporan Kehadiran Santri', desc: 'Kirim rekap kehadiran mingguan ke orang tua', defaultChecked: true },
                                                { label: 'Pengumuman Lembaga', desc: 'Broadcast informasi penting ke semua wali santri', defaultChecked: true }
                                            ].map((item, i) => (
                                                <label key={i} className="flex items-start space-x-3 cursor-pointer group">
                                                    <div className="relative flex items-center justify-center mt-1">
                                                        <input type="checkbox" defaultChecked={item.defaultChecked} className="peer sr-only" />
                                                        <div className={cn("w-10 h-5 rounded-full transition-colors peer-checked:bg-emerald-500", theme === 'dark' ? "bg-zinc-700" : "bg-gray-200")}></div>
                                                        <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                                                    </div>
                                                    <div>
                                                        <p className={cn("text-sm font-bold", theme === 'dark' ? "text-gray-200" : "text-gray-800")}>{item.label}</p>
                                                        <p className={cn("text-xs", theme === 'dark' ? "text-gray-400" : "text-gray-500")}>{item.desc}</p>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className={cn("p-6 rounded-2xl border", theme === 'dark' ? "bg-zinc-900/50 border-zinc-800" : "bg-white border-gray-100")}>
                                        <div className="flex items-center space-x-3 mb-6">
                                            <div className={cn("p-2 rounded-lg", theme === 'dark' ? "bg-blue-900/30 text-blue-400" : "bg-blue-50 text-blue-600")}>
                                                <Mail size={20} />
                                            </div>
                                            <h4 className={cn("text-sm font-bold uppercase tracking-widest", theme === 'dark' ? "text-gray-300" : "text-gray-700")}>Notifikasi Email</h4>
                                        </div>
                                        <div className="space-y-4">
                                            {[
                                                { label: 'Laporan Keuangan Bulanan', desc: 'Kirim rekap keuangan ke email admin', defaultChecked: true },
                                                { label: 'Aktivitas Login Baru', desc: 'Peringatan jika ada login dari perangkat baru', defaultChecked: true },
                                                { label: 'Backup Database', desc: 'Laporan status backup otomatis', defaultChecked: false }
                                            ].map((item, i) => (
                                                <label key={i} className="flex items-start space-x-3 cursor-pointer group">
                                                    <div className="relative flex items-center justify-center mt-1">
                                                        <input type="checkbox" defaultChecked={item.defaultChecked} className="peer sr-only" />
                                                        <div className={cn("w-10 h-5 rounded-full transition-colors peer-checked:bg-blue-500", theme === 'dark' ? "bg-zinc-700" : "bg-gray-200")}></div>
                                                        <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                                                    </div>
                                                    <div>
                                                        <p className={cn("text-sm font-bold", theme === 'dark' ? "text-gray-200" : "text-gray-800")}>{item.label}</p>
                                                        <p className={cn("text-xs", theme === 'dark' ? "text-gray-400" : "text-gray-500")}>{item.desc}</p>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'database' && (
                            <div className="space-y-8">
                                <h3 className={cn("text-lg font-bold mb-6", theme === 'dark' ? "text-emerald-400" : "text-gray-800")}>Manajemen Data</h3>
                                <div className={cn("p-6 rounded-2xl border flex items-center justify-between", theme === 'dark' ? "bg-blue-900/10 border-blue-900/30" : "bg-blue-50 border-blue-100")}>
                                    <div className="flex items-center space-x-4">
                                        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", theme === 'dark' ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-600")}>
                                            <Cloud size={24} />
                                        </div>
                                        <div>
                                            <p className={cn("text-sm font-bold", theme === 'dark' ? "text-blue-400" : "text-blue-900")}>Backup Cloud Otomatis</p>
                                            <p className={cn("text-xs", theme === 'dark' ? "text-blue-500/70" : "text-blue-600")}>Terakhir dibackup: 2 jam yang lalu</p>
                                        </div>
                                    </div>
                                    <button className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors">Backup Sekarang</button>
                                </div>

                                <div className="space-y-4">
                                    <h4 className={cn("text-sm font-bold", theme === 'dark' ? "text-gray-400" : "text-gray-700")}>Tindakan Berbahaya</h4>
                                    <div className={cn("p-6 rounded-2xl border flex items-center justify-between", theme === 'dark' ? "bg-red-900/10 border-red-900/30" : "bg-red-50 border-red-100")}>
                                        <div>
                                            <p className={cn("text-sm font-bold", theme === 'dark' ? "text-red-400" : "text-red-900")}>Reset Semua Data</p>
                                            <p className={cn("text-xs", theme === 'dark' ? "text-red-500/70" : "text-red-600")}>Menghapus semua data santri, akademik, dan keuangan.</p>
                                        </div>
                                        <button className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2">
                                            <Trash2 size={14} />
                                            <span>Reset Data</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
