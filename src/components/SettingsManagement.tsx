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
    Loader2
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
                                <h3 className="text-lg font-bold text-gray-800 mb-6">Profil Lembaga</h3>
                                <div className="flex items-center space-x-6 mb-8">
                                    <div className="w-24 h-24 rounded-3xl bg-emerald-100 flex items-center justify-center text-emerald-600 border-4 border-white shadow-lg">
                                        <Globe size={40} />
                                    </div>
                                    <div>
                                        <button className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition-colors">Ganti Logo</button>
                                        <p className="text-[10px] text-gray-400 mt-2">Format: PNG, JPG. Maks 2MB.</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Nama TPQ</label>
                                        <input type="text" defaultValue="TPQ Nurul Jannah" className="w-full px-4 py-2.5 rounded-xl border border-gray-100 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Alamat Lengkap</label>
                                        <textarea className="w-full h-24 px-4 py-2.5 rounded-xl border border-gray-100 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all resize-none" defaultValue="Jl. Abimanyu 1 [Blok L], Perum. Puri Nirwana Residence"></textarea>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">RT</label>
                                            <input type="text" defaultValue="014" className="w-full px-4 py-2.5 rounded-xl border border-gray-100 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">RW</label>
                                            <input type="text" defaultValue="008" className="w-full px-4 py-2.5 rounded-xl border border-gray-100 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all" />
                                        </div>
                                        <div className="md:col-span-2 space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Desa / Kelurahan</label>
                                            <input type="text" defaultValue="Sukaraya" className="w-full px-4 py-2.5 rounded-xl border border-gray-100 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Kecamatan</label>
                                            <input type="text" defaultValue="Karang Bahagia" className="w-full px-4 py-2.5 rounded-xl border border-gray-100 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Kota / Kabupaten</label>
                                            <input type="text" defaultValue="Kab.Bekasi" className="w-full px-4 py-2.5 rounded-xl border border-gray-100 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Provinsi</label>
                                            <input type="text" defaultValue="Jawa Barat" className="w-full px-4 py-2.5 rounded-xl border border-gray-100 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Lembaga</label>
                                            <input type="email" defaultValue="" className="w-full px-4 py-2.5 rounded-xl border border-gray-100 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Telepon</label>
                                            <input type="text" defaultValue="" className="w-full px-4 py-2.5 rounded-xl border border-gray-100 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'database' && (
                            <div className="space-y-8">
                                <h3 className="text-lg font-bold text-gray-800 mb-6">Manajemen Data</h3>
                                <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                                            <Cloud size={24} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-blue-900">Backup Cloud Otomatis</p>
                                            <p className="text-xs text-blue-600">Terakhir dibackup: 2 jam yang lalu</p>
                                        </div>
                                    </div>
                                    <button className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors">Backup Sekarang</button>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-sm font-bold text-gray-700">Tindakan Berbahaya</h4>
                                    <div className="p-6 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-bold text-red-900">Reset Semua Data</p>
                                            <p className="text-xs text-red-600">Menghapus semua data santri, akademik, dan keuangan.</p>
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
