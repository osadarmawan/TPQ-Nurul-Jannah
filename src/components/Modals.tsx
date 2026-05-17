import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    X, Save, User, Hash, Users, BookOpen, AlertTriangle, 
    UserCircle, Mail, Phone, CheckCircle2, Calendar, 
    DollarSign, Printer, MessageSquare, Send, History, 
    TrendingUp, Award, Clock 
} from 'lucide-react';
import { cn } from '../lib/utils';

// --- SANTRI MODALS ---

interface SantriModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: 'add' | 'edit';
    initialData?: any;
    onSubmit: (data: any) => void;
}

export const SantriModal: React.FC<SantriModalProps> = ({ isOpen, onClose, mode, initialData, onSubmit }) => {
    const [formData, setFormData] = React.useState<any>({
        nama: '',
        nis: '',
        jilid: '1',
        ortu: '',
        whatsapp: '',
        gender: 'Laki-laki',
        status: 'Siswa'
    });

    React.useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                nama: '',
                nis: '',
                jilid: '1',
                ortu: '',
                whatsapp: '',
                gender: 'Laki-laki',
                status: 'Siswa'
            });
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
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
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />
                    <form 
                        onSubmit={handleSubmit}
                        className="contents"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#D4AF37]/20"
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-emerald-50 to-white">
                                <div>
                                    <h3 className="text-xl font-bold text-[#064E3B]">
                                        {mode === 'add' ? 'Tambah Santri Baru' : 'Edit Data Santri'}
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {mode === 'add' ? 'Lengkapi formulir untuk mendaftarkan santri baru.' : 'Perbarui informasi santri dengan teliti.'}
                                    </p>
                                </div>
                                <button type="button" onClick={onClose} className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Form Body */}
                            <div className="p-6 space-y-4">
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center">
                                            <User size={14} className="mr-1.5 text-[#D4AF37]" /> Nama Lengkap
                                        </label>
                                        <input 
                                            type="text" 
                                            value={formData.nama}
                                            onChange={(e) => setFormData({...formData, nama: e.target.value})}
                                            placeholder="Masukkan nama lengkap santri"
                                            required
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] outline-none transition-all"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center">
                                                <Hash size={14} className="mr-1.5 text-[#D4AF37]" /> NIS
                                            </label>
                                            <input 
                                                type="text" 
                                                value={formData.nis}
                                                onChange={(e) => setFormData({...formData, nis: e.target.value})}
                                                placeholder="2024xxx"
                                                required
                                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center">
                                                <BookOpen size={14} className="mr-1.5 text-[#D4AF37]" /> Jilid
                                            </label>
                                            <select 
                                                value={formData.jilid}
                                                onChange={(e) => setFormData({...formData, jilid: e.target.value})}
                                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] outline-none transition-all bg-white"
                                            >
                                                {[1,2,3,4,5,6].map(j => <option key={j} value={j}>Jilid {j}</option>)}
                                                <option value="Al-Quran">Al-Quran</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center">
                                            <Users size={14} className="mr-1.5 text-[#D4AF37]" /> Nama Orang Tua / Wali
                                        </label>
                                        <input 
                                            type="text" 
                                            value={formData.ortu}
                                            onChange={(e) => setFormData({...formData, ortu: e.target.value})}
                                            placeholder="Nama ayah atau ibu"
                                            required
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] outline-none transition-all"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center">
                                                <UserCircle size={14} className="mr-1.5 text-[#D4AF37]" /> Gender
                                            </label>
                                            <select 
                                                value={formData.gender}
                                                onChange={(e) => setFormData({...formData, gender: e.target.value})}
                                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] outline-none transition-all bg-white"
                                            >
                                                <option value="Laki-laki">Laki-laki</option>
                                                <option value="Perempuan">Perempuan</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center">
                                                <AlertTriangle size={14} className="mr-1.5 text-[#D4AF37]" /> Status
                                            </label>
                                            <select 
                                                value={formData.status}
                                                onChange={(e) => setFormData({...formData, status: e.target.value})}
                                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] outline-none transition-all bg-white"
                                            >
                                                <option value="Siswa">Siswa Aktif</option>
                                                <option value="Calon">Calon Santri</option>
                                                <option value="Lulus">Lulus</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center">
                                            <Phone size={14} className="mr-1.5 text-[#D4AF37]" /> Nomor WhatsApp
                                        </label>
                                        <input 
                                            type="tel" 
                                            value={formData.whatsapp}
                                            onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                                            placeholder="Contoh: 081234567890"
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] outline-none transition-all"
                                        />
                                        <p className="text-[10px] text-gray-400 mt-1">Gunakan format angka, contoh: 0812...</p>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-end space-x-3">
                                <button 
                                    type="button"
                                    onClick={onClose}
                                    className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
                                >
                                    Batal
                                </button>
                                <button 
                                    type="submit"
                                    className="px-6 py-2.5 bg-[#064E3B] text-white rounded-xl font-medium flex items-center shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/40 transition-all transform hover:-translate-y-0.5"
                                >
                                    <Save size={18} className="mr-2" />
                                    {mode === 'add' ? 'Simpan Data' : 'Perbarui Data'}
                                </button>
                            </div>
                        </motion.div>
                    </form>
                </div>
            )}
        </AnimatePresence>
    );
};

export const SantriDetailModal: React.FC<{ isOpen: boolean; onClose: () => void; data: any }> = ({ isOpen, onClose, data }) => {
    if (!data) return null;

    const infoItems = [
        { label: 'Nama Lengkap', value: data.nama, icon: User },
        { label: 'NIS', value: data.nis, icon: Hash },
        { label: 'Status', value: data.status, icon: UserCircle },
        { label: 'Jilid', value: data.jilid, icon: BookOpen },
        { label: 'Orang Tua', value: data.ortu, icon: Users },
        { label: 'No. WhatsApp', value: data.whatsapp || '-', icon: Phone },
        { label: 'Gender', value: data.gender, icon: User },
        { label: 'Tanggal Daftar', value: data.tglDaftar, icon: Save },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#D4AF37]/20"
                    >
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-emerald-50 to-white">
                            <h3 className="text-xl font-bold text-[#064E3B]">Detail Profil Santri</h3>
                            <button onClick={onClose} className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-8">
                            <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center text-[#064E3B] text-3xl font-bold mx-auto mb-6 border-4 border-white shadow-lg">
                                {data.nama.charAt(0)}
                            </div>
                            <div className="space-y-4">
                                {infoItems.map((item, i) => (
                                    <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                                        <div className="flex items-center text-gray-400">
                                            <item.icon size={16} className="mr-2" />
                                            <span className="text-xs font-medium uppercase tracking-wider">{item.label}</span>
                                        </div>
                                        <span className="text-sm font-bold text-gray-800">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-6 bg-gray-50 border-t border-gray-100">
                            <button 
                                onClick={onClose}
                                className="w-full py-3 bg-[#064E3B] text-white rounded-xl font-bold hover:bg-emerald-900 transition-colors"
                            >
                                Tutup
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export const SantriIDCardModal: React.FC<{ isOpen: boolean; onClose: () => void; data: any }> = ({ isOpen, onClose, data }) => {
    if (!data) return null;
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-full max-w-sm bg-gray-100 rounded-[2.5rem] shadow-2xl p-8 border border-white/20">
                        <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-200 aspect-[2/3] flex flex-col relative">
                            {/* Card Header */}
                            <div className="h-28 bg-gradient-to-br from-[#064E3B] to-emerald-900 flex flex-col items-center justify-center text-white p-4 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                                <h5 className="text-xl font-black tracking-[0.2em] mb-1">SIMAS</h5>
                                <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-80">TPQ Nurul Jannah</p>
                            </div>
                            
                            {/* Card Body */}
                            <div className="flex-1 flex flex-col items-center pt-10 px-6 text-center">
                                <div className="w-32 h-32 rounded-3xl bg-emerald-50 border-4 border-white shadow-xl mb-6 flex items-center justify-center text-5xl font-black text-[#064E3B] transform -rotate-3">
                                    {data.nama.charAt(0)}
                                </div>
                                <h4 className="text-xl font-black text-gray-900 leading-tight mb-1">{data.nama}</h4>
                                <div className="px-4 py-1 bg-emerald-100 rounded-full">
                                    <p className="text-[10px] text-[#064E3B] font-black uppercase tracking-widest">Santri {data.jilid === 'Al-Quran' ? 'Al-Quran' : `Jilid ${data.jilid}`}</p>
                                </div>
                                
                                <div className="mt-10 w-full space-y-3">
                                    <div className="flex justify-between items-center text-[11px] border-b border-gray-100 pb-2">
                                        <span className="text-gray-400 font-bold uppercase tracking-tighter">Nomor Induk</span>
                                        <span className="font-mono font-black text-gray-800">{data.nis}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[11px] border-b border-gray-100 pb-2">
                                        <span className="text-gray-400 font-bold uppercase tracking-tighter">Masa Berlaku</span>
                                        <span className="font-black text-gray-800">2026/2027</span>
                                    </div>
                                </div>
                                
                                {/* QR Code Placeholder */}
                                <div className="mt-auto mb-8 w-20 h-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center">
                                    <Hash size={40} className="text-gray-200" />
                                </div>
                            </div>
                            
                            {/* Card Footer */}
                            <div className="h-3 bg-gradient-to-r from-[#D4AF37] via-yellow-200 to-[#D4AF37]"></div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="mt-8 flex space-x-4">
                            <button onClick={onClose} className="flex-1 py-4 text-gray-500 font-black uppercase tracking-widest text-xs">Batal</button>
                            <button className="flex-1 py-4 bg-[#064E3B] text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center space-x-2 shadow-xl shadow-emerald-900/30 hover:shadow-emerald-900/50 transition-all transform hover:-translate-y-1">
                                <Printer size={16} />
                                <span>Cetak</span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export const SantriWAModal: React.FC<{ isOpen: boolean; onClose: () => void; data: any }> = ({ isOpen, onClose, data }) => {
    if (!data) return null;
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
                    <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-emerald-100">
                        <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gradient-to-br from-emerald-50 to-white">
                            <div>
                                <h3 className="text-2xl font-black text-emerald-900">Kirim WhatsApp</h3>
                                <p className="text-xs text-emerald-600 font-bold mt-1 uppercase tracking-widest">Orang Tua: {data.ortu}</p>
                            </div>
                            <button onClick={onClose} className="p-3 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-2xl transition-all"><X size={24} /></button>
                        </div>
                        
                        <div className="p-8 space-y-6">
                            <div className="flex items-center space-x-4 p-4 rounded-3xl bg-gray-50 border border-gray-100">
                                <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-black text-xl">{data.nama.charAt(0)}</div>
                                <div>
                                    <p className="text-lg font-black text-gray-900">{data.nama}</p>
                                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">NIS: {data.nis}</p>
                                </div>
                            </div>
                            
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Pilih Template Pesan</label>
                                <div className="grid grid-cols-1 gap-2">
                                    {[
                                        { id: 'absensi', label: 'Laporan Kehadiran', icon: CheckCircle2 },
                                        { id: 'pembayaran', label: 'Tagihan SPP', icon: DollarSign },
                                        { id: 'progress', label: 'Progress Hafalan', icon: TrendingUp },
                                        { id: 'pengumuman', label: 'Pengumuman Umum', icon: MessageSquare },
                                    ].map((t) => (
                                        <button key={t.id} className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:border-emerald-500 hover:bg-emerald-50 transition-all group">
                                            <div className="flex items-center space-x-3">
                                                <t.icon size={18} className="text-emerald-600" />
                                                <span className="text-sm font-bold text-gray-700 group-hover:text-emerald-900">{t.label}</span>
                                            </div>
                                            <Send size={14} className="text-gray-300 group-hover:text-emerald-500" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Preview Pesan</label>
                                <textarea 
                                    className="w-full h-32 p-5 rounded-3xl border border-gray-200 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all resize-none text-sm leading-relaxed text-gray-700"
                                    placeholder="Tulis pesan kustom di sini..."
                                    defaultValue={`Assalamu'alaikum Bapak/Ibu ${data.ortu}, menginfokan perkembangan ananda ${data.nama}...`}
                                ></textarea>
                            </div>
                        </div>
                        
                        <div className="p-8 bg-gray-50 border-t border-gray-100">
                            <button className="w-full py-5 bg-[#25D366] text-white rounded-[1.5rem] font-black uppercase tracking-widest text-sm flex items-center justify-center space-x-3 shadow-xl shadow-green-500/20 hover:shadow-green-500/40 transition-all transform hover:-translate-y-1">
                                <MessageSquare size={20} />
                                <span>Kirim via WhatsApp</span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export const SantriAcademicHistoryModal: React.FC<{ isOpen: boolean; onClose: () => void; data: any }> = ({ isOpen, onClose, data }) => {
    if (!data) return null;
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
                    <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-emerald-100 flex flex-col max-h-[90vh]">
                        {/* Header */}
                        <div className="p-8 border-b border-gray-100 bg-gradient-to-br from-emerald-50 to-white flex items-center justify-between sticky top-0 z-10">
                            <div className="flex items-center space-x-5">
                                <div className="w-16 h-16 rounded-2xl bg-[#064E3B] flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-emerald-900/20">
                                    {data.nama.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-gray-900">{data.nama}</h3>
                                    <div className="flex items-center space-x-3 mt-1">
                                        <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">NIS: {data.nis}</span>
                                        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Jilid {data.jilid}</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-3 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-2xl transition-all"><X size={24} /></button>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-8">
                            {/* Summary Stats */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="p-5 rounded-3xl bg-blue-50 border border-blue-100">
                                    <div className="flex items-center space-x-2 text-blue-600 mb-2">
                                        <Clock size={16} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Kehadiran</span>
                                    </div>
                                    <p className="text-2xl font-black text-blue-900">98%</p>
                                    <p className="text-[10px] font-bold text-blue-600/60 mt-1">Sangat Baik</p>
                                </div>
                                <div className="p-5 rounded-3xl bg-emerald-50 border border-emerald-100">
                                    <div className="flex items-center space-x-2 text-emerald-600 mb-2">
                                        <TrendingUp size={16} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Progress</span>
                                    </div>
                                    <p className="text-2xl font-black text-emerald-900">+12</p>
                                    <p className="text-[10px] font-bold text-emerald-600/60 mt-1">Halaman/Bulan</p>
                                </div>
                                <div className="p-5 rounded-3xl bg-amber-50 border border-amber-100">
                                    <div className="flex items-center space-x-2 text-amber-600 mb-2">
                                        <Award size={16} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Prestasi</span>
                                    </div>
                                    <p className="text-2xl font-black text-amber-900">3</p>
                                    <p className="text-[10px] font-bold text-amber-600/60 mt-1">Sertifikat</p>
                                </div>
                            </div>
                            
                            {/* Timeline */}
                            <div className="space-y-6">
                                <h4 className="text-sm font-black text-gray-800 flex items-center uppercase tracking-[0.2em]">
                                    <History size={18} className="mr-3 text-[#D4AF37]" />
                                    Riwayat Kenaikan Jilid
                                </h4>
                                <div className="space-y-4 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                                    {[
                                        { date: '15 Jan 2024', from: 'Jilid 3', to: 'Jilid 4', status: 'Lulus Munaqosyah', score: '92' },
                                        { date: '10 Okt 2023', from: 'Jilid 2', to: 'Jilid 3', status: 'Lulus Munaqosyah', score: '88' },
                                        { date: '05 Jun 2023', from: 'Jilid 1', to: 'Jilid 2', status: 'Lulus Munaqosyah', score: '85' },
                                    ].map((h, i) => (
                                        <div key={i} className="relative pl-14 group">
                                            <div className="absolute left-4 top-1 w-4 h-4 rounded-full bg-white border-4 border-emerald-500 z-10 group-hover:scale-125 transition-transform"></div>
                                            <div className="p-5 rounded-3xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{h.date}</span>
                                                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-full uppercase tracking-tighter">Skor: {h.score}</span>
                                                </div>
                                                <p className="text-sm font-black text-gray-800">Naik ke <span className="text-emerald-600">{h.to}</span></p>
                                                <p className="text-xs text-gray-500 mt-1 font-medium">{h.status}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        {/* Footer */}
                        <div className="p-8 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                            <button className="text-sm font-black text-emerald-600 hover:underline uppercase tracking-widest">Cetak Rapor Digital</button>
                            <button onClick={onClose} className="px-8 py-4 bg-[#064E3B] text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-emerald-900/20">Tutup</button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

// --- STAFF MODALS ---

interface StaffModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: 'add' | 'edit';
    initialData?: any;
    onSubmit: (data: any) => void;
}

export const StaffModal: React.FC<StaffModalProps> = ({ isOpen, onClose, mode, initialData, onSubmit }) => {
    const [formData, setFormData] = React.useState<any>({
        nama: '',
        nip: '',
        role: 'Pengajar Jilid 1-6',
        status: 'Aktif',
        email: '',
        phone: '',
        salary: ''
    });

    React.useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                nama: '',
                nip: '',
                role: 'Pengajar Jilid 1-6',
                status: 'Aktif',
                email: '',
                phone: '',
                salary: ''
            });
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
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
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />
                    <form onSubmit={handleSubmit} className="contents">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#D4AF37]/20"
                        >
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-50 to-white">
                                <div>
                                    <h3 className="text-xl font-bold text-blue-900">
                                        {mode === 'add' ? 'Tambah Pegawai Baru' : 'Edit Data Pegawai'}
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {mode === 'add' ? 'Lengkapi data ustadz atau staf administrasi.' : 'Perbarui informasi kepegawaian.'}
                                    </p>
                                </div>
                                <button type="button" onClick={onClose} className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center">
                                            <User size={14} className="mr-1.5 text-blue-500" /> Nama Lengkap
                                        </label>
                                        <input 
                                            type="text" 
                                            value={formData.nama}
                                            onChange={(e) => setFormData({...formData, nama: e.target.value})}
                                            placeholder="Contoh: Ustadz Ahmad"
                                            required
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center">
                                                <Hash size={14} className="mr-1.5 text-blue-500" /> NIP / ID
                                            </label>
                                            <input 
                                                type="text" 
                                                value={formData.nip}
                                                onChange={(e) => setFormData({...formData, nip: e.target.value})}
                                                placeholder="TPQ-xxx"
                                                required
                                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center">
                                                <Save size={14} className="mr-1.5 text-blue-500" /> Jabatan
                                            </label>
                                            <select 
                                                value={formData.role}
                                                onChange={(e) => setFormData({...formData, role: e.target.value})}
                                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all bg-white"
                                            >
                                                <option value="Kepala TPQ">Kepala TPQ</option>
                                                <option value="Pengajar Al-Quran">Pengajar Al-Quran</option>
                                                <option value="Pengajar Jilid 1-6">Pengajar Jilid 1-6</option>
                                                <option value="Administrasi">Administrasi</option>
                                                <option value="Kebersihan">Kebersihan</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center">
                                                <Mail size={14} className="mr-1.5 text-blue-500" /> Email
                                            </label>
                                            <input 
                                                type="email" 
                                                value={formData.email}
                                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                placeholder="email@tpq.com"
                                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center">
                                                <Phone size={14} className="mr-1.5 text-blue-500" /> No. Telepon
                                            </label>
                                            <input 
                                                type="text" 
                                                value={formData.phone}
                                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                                placeholder="0812xxx"
                                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center">
                                                <Save size={14} className="mr-1.5 text-blue-500" /> Gaji Pokok (Rp)
                                            </label>
                                            <input 
                                                type="text" 
                                                value={formData.salary}
                                                onChange={(e) => setFormData({...formData, salary: e.target.value})}
                                                placeholder="Contoh: 2500000"
                                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center">
                                                <Save size={14} className="mr-1.5 text-blue-500" /> Status
                                            </label>
                                            <select 
                                                value={formData.status}
                                                onChange={(e) => setFormData({...formData, status: e.target.value})}
                                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all bg-white"
                                            >
                                                <option value="Aktif">Aktif</option>
                                                <option value="Cuti">Cuti</option>
                                                <option value="Resign">Resign</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-end space-x-3">
                                <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors">Batal</button>
                                <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium flex items-center shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 transition-all transform hover:-translate-y-0.5">
                                    <Save size={18} className="mr-2" />
                                    {mode === 'add' ? 'Simpan Pegawai' : 'Perbarui Pegawai'}
                                </button>
                            </div>
                        </motion.div>
                    </form>
                </div>
            )}
        </AnimatePresence>
    );
};

export const PayrollModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#D4AF37]/20"
                    >
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-emerald-50 to-white">
                            <div>
                                <h3 className="text-xl font-bold text-[#064E3B]">Manajemen Payroll</h3>
                                <p className="text-xs text-gray-500 mt-1">Kelola penggajian dan tunjangan staf bulan Maret 2026.</p>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                                    <p className="text-[10px] font-bold text-emerald-600 uppercase">Total Payroll</p>
                                    <p className="text-lg font-bold text-emerald-900">Rp 32.4M</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                                    <p className="text-[10px] font-bold text-blue-600 uppercase">Dibayarkan</p>
                                    <p className="text-lg font-bold text-blue-900">Rp 24.5M</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100">
                                    <p className="text-[10px] font-bold text-amber-600 uppercase">Tertunda</p>
                                    <p className="text-lg font-bold text-amber-900">Rp 7.9M</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h4 className="text-sm font-bold text-gray-700">Daftar Pembayaran</h4>
                                <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2">
                                    {[
                                        { name: 'Ustadz Mansur', amount: '3.500.000', status: 'Lunas' },
                                        { name: 'Ustadzah Fatimah', amount: '2.800.000', status: 'Lunas' },
                                        { name: 'Ustadz Ali', amount: '2.500.000', status: 'Pending' },
                                        { name: 'Siti Aminah', amount: '2.200.000', status: 'Lunas' },
                                    ].map((p, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">{p.name.charAt(0)}</div>
                                                <span className="text-sm font-medium text-gray-800">{p.name}</span>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <span className="text-sm font-bold text-gray-700">Rp {p.amount}</span>
                                                <span className={cn(
                                                    "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase",
                                                    p.status === 'Lunas' ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                                                )}>{p.status}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                            <button className="text-sm font-bold text-blue-600 hover:underline">Download Slip Gaji Massal</button>
                            <div className="flex space-x-3">
                                <button onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors">Tutup</button>
                                <button className="px-6 py-2.5 bg-[#064E3B] text-white rounded-xl font-bold shadow-lg shadow-emerald-900/20">Proses Semua Gaji</button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export const StaffProfileModal: React.FC<{ isOpen: boolean; onClose: () => void; data: any }> = ({ isOpen, onClose, data }) => {
    if (!data) return null;
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
                    <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-blue-100">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-50 to-white">
                            <h3 className="text-xl font-bold text-blue-900">Profil Lengkap Pegawai</h3>
                            <button onClick={onClose} className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-colors"><X size={20} /></button>
                        </div>
                        <div className="p-8 text-center">
                            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-3xl font-bold mx-auto mb-4 border-4 border-white shadow-lg">
                                {data.nama.charAt(0)}
                            </div>
                            <h4 className="text-xl font-bold text-gray-900">{data.nama}</h4>
                            <p className="text-sm text-blue-600 font-medium mb-6">{data.role}</p>
                            
                            <div className="grid grid-cols-1 gap-3 text-left">
                                {[
                                    { label: 'NIP', value: data.nip, icon: Hash },
                                    { label: 'Email', value: data.email, icon: Mail },
                                    { label: 'Telepon', value: data.phone, icon: Phone },
                                    { label: 'Status', value: data.status, icon: CheckCircle2 },
                                    { label: 'Tgl Bergabung', value: data.joinDate, icon: Calendar },
                                    { label: 'Gaji Pokok', value: `Rp ${data.salary}`, icon: DollarSign },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                                        <div className="flex items-center text-gray-500">
                                            <item.icon size={14} className="mr-2" />
                                            <span className="text-xs font-medium uppercase tracking-wider">{item.label}</span>
                                        </div>
                                        <span className="text-sm font-bold text-gray-800">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-6 bg-gray-50 border-t border-gray-100">
                            <button onClick={onClose} className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">Tutup Profil</button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export const StaffIDCardModal: React.FC<{ isOpen: boolean; onClose: () => void; data: any }> = ({ isOpen, onClose, data }) => {
    if (!data) return null;
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-full max-w-sm bg-gray-100 rounded-[2rem] shadow-2xl p-8 border border-white/20">
                        <div className="bg-white rounded-[1.5rem] shadow-xl overflow-hidden border border-gray-200 aspect-[2/3] flex flex-col relative">
                            <div className="h-24 bg-[#064E3B] flex flex-col items-center justify-center text-white p-4">
                                <h5 className="text-lg font-bold tracking-widest">SIMAS</h5>
                                <p className="text-[8px] uppercase tracking-widest opacity-70">TPQ Nurul Jannah</p>
                            </div>
                            <div className="flex-1 flex flex-col items-center pt-8 px-6 text-center">
                                <div className="w-28 h-28 rounded-2xl bg-gray-100 border-4 border-white shadow-md mb-4 flex items-center justify-center text-4xl font-bold text-[#064E3B]">
                                    {data.nama.charAt(0)}
                                </div>
                                <h4 className="text-lg font-bold text-gray-900 leading-tight">{data.nama}</h4>
                                <p className="text-xs text-emerald-600 font-bold uppercase tracking-widest mt-1">{data.role}</p>
                                
                                <div className="mt-8 w-full space-y-2">
                                    <div className="flex justify-between text-[10px] border-b border-gray-100 pb-1">
                                        <span className="text-gray-400">NIP</span>
                                        <span className="font-mono font-bold text-gray-800">{data.nip}</span>
                                    </div>
                                    <div className="flex justify-between text-[10px] border-b border-gray-100 pb-1">
                                        <span className="text-gray-400">VALID UNTIL</span>
                                        <span className="font-bold text-gray-800">12/2026</span>
                                    </div>
                                </div>
                                
                                <div className="mt-auto mb-6 w-16 h-16 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                                    <Hash size={32} className="text-gray-300" />
                                </div>
                            </div>
                            <div className="h-2 bg-[#D4AF37]"></div>
                        </div>
                        <div className="mt-6 flex space-x-3">
                            <button onClick={onClose} className="flex-1 py-3 text-gray-500 font-bold">Batal</button>
                            <button className="flex-1 py-3 bg-[#064E3B] text-white rounded-xl font-bold flex items-center justify-center space-x-2 shadow-lg shadow-emerald-900/20">
                                <Printer size={18} />
                                <span>Cetak Sekarang</span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export const StaffMessageModal: React.FC<{ isOpen: boolean; onClose: () => void; data: any }> = ({ isOpen, onClose, data }) => {
    if (!data) return null;
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
                    <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-emerald-50">
                            <h3 className="text-xl font-bold text-emerald-900">Kirim Pesan</h3>
                            <button onClick={onClose} className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-colors"><X size={20} /></button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-center space-x-3 p-3 rounded-2xl bg-gray-50 border border-gray-100">
                                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">{data.nama.charAt(0)}</div>
                                <div>
                                    <p className="text-sm font-bold text-gray-800">{data.nama}</p>
                                    <p className="text-xs text-gray-500">{data.phone}</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Pesan Anda</label>
                                <textarea className="w-full h-32 p-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all resize-none" placeholder="Tulis pesan untuk ustadz/ah..."></textarea>
                            </div>
                        </div>
                        <div className="p-6 bg-gray-50 border-t border-gray-100 flex space-x-3">
                            <button className="flex-1 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold flex items-center justify-center space-x-2">
                                <Mail size={18} className="text-red-500" />
                                <span>Email</span>
                            </button>
                            <button className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-bold flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/20">
                                <MessageSquare size={18} />
                                <span>WhatsApp</span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8 text-center border border-red-100"
                    >
                        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle size={40} className="text-red-500" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                            {message}
                        </p>
                        <div className="flex flex-col space-y-3">
                            <button 
                                onClick={onConfirm}
                                className="w-full py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
                            >
                                Ya, Hapus Sekarang
                            </button>
                            <button 
                                onClick={onClose}
                                className="w-full py-3 text-gray-500 font-medium hover:text-gray-700 transition-colors"
                            >
                                Batalkan
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

// --- FINANCE MODAL ---
export const FinanceModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    initialData?: any;
    mode: 'add' | 'edit';
}> = ({ isOpen, onClose, onSubmit, initialData, mode }) => {
    const [formData, setFormData] = React.useState({
        tanggal: new Date().toISOString().split('T')[0],
        deskripsi: '',
        kategori: 'Pemasukan',
        tipe: 'Pemasukan',
        jumlah: 0,
        metode: 'Tunai'
    });

    React.useEffect(() => {
        if (initialData) setFormData(initialData);
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
                    <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-100">
                        <form onSubmit={handleSubmit}>
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-emerald-50">
                                <h3 className="text-xl font-bold text-emerald-900">{mode === 'add' ? 'Catat Transaksi Baru' : 'Edit Transaksi'}</h3>
                                <button type="button" onClick={onClose} className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-colors"><X size={20} /></button>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-600 uppercase">Deskripsi</label>
                                    <input type="text" value={formData.deskripsi} onChange={e => setFormData({...formData, deskripsi: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none" required />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-600 uppercase">Tipe</label>
                                        <select value={formData.tipe} onChange={e => setFormData({...formData, tipe: e.target.value as any, kategori: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none">
                                            <option value="Pemasukan">Pemasukan</option>
                                            <option value="Pengeluaran">Pengeluaran</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-600 uppercase">Jumlah</label>
                                        <input type="number" value={formData.jumlah} onChange={e => setFormData({...formData, jumlah: Number(e.target.value)})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none" required />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-600 uppercase">Tanggal</label>
                                    <input type="date" value={formData.tanggal} onChange={e => setFormData({...formData, tanggal: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none" required />
                                </div>
                            </div>
                            <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end space-x-3">
                                <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-gray-600">Batal</button>
                                <button type="submit" className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-bold shadow-lg">Simpan</button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

// --- ACADEMIC MODAL ---
export const AcademicModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    initialData?: any;
    mode: 'add' | 'edit';
}> = ({ isOpen, onClose, onSubmit, initialData, mode }) => {
    const [formData, setFormData] = React.useState({
        nama: '',
        jilid: 'Jilid 1',
        materi: '',
        nilai: 'A',
        ustadz: '',
        tanggal: new Date().toISOString().split('T')[0]
    });

    React.useEffect(() => {
        if (initialData) setFormData(initialData);
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
                    <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
                        <form onSubmit={handleSubmit}>
                            <div className="p-6 border-b border-gray-100 bg-blue-50">
                                <h3 className="text-xl font-bold text-blue-900">{mode === 'add' ? 'Input Nilai Baru' : 'Edit Nilai'}</h3>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-600 uppercase">Nama Santri</label>
                                    <input type="text" value={formData.nama} onChange={e => setFormData({...formData, nama: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200" required />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-600 uppercase">Jilid</label>
                                        <select value={formData.jilid} onChange={e => setFormData({...formData, jilid: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200">
                                            {[1,2,3,4,5,6].map(j => <option key={j} value={`Jilid ${j}`}>Jilid {j}</option>)}
                                            <option value="Al-Quran">Al-Quran</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-600 uppercase">Nilai</label>
                                        <select value={formData.nilai} onChange={e => setFormData({...formData, nilai: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200">
                                            {['A', 'A-', 'B+', 'B', 'B-', 'C'].map(n => <option key={n} value={n}>{n}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-600 uppercase">Materi</label>
                                    <input type="text" value={formData.materi} onChange={e => setFormData({...formData, materi: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200" required />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-600 uppercase">Ustadz/ah</label>
                                    <input type="text" value={formData.ustadz} onChange={e => setFormData({...formData, ustadz: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200" required />
                                </div>
                            </div>
                            <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end space-x-3">
                                <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-gray-600">Batal</button>
                                <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg">Simpan Nilai</button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

// --- DEVELOPMENT MODAL ---
export const DevelopmentModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    initialData?: any;
    mode: 'add' | 'edit';
}> = ({ isOpen, onClose, onSubmit, initialData, mode }) => {
    const [formData, setFormData] = React.useState({
        name: '',
        status: 'In Progress',
        progress: 0,
        budget: 0,
        spent: 0,
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        contractor: '',
        priority: 'Medium'
    });

    React.useEffect(() => {
        if (initialData) setFormData(initialData);
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
                    <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-100">
                        <form onSubmit={handleSubmit}>
                            <div className="p-6 border-b border-gray-100 bg-amber-50">
                                <h3 className="text-xl font-bold text-amber-900">{mode === 'add' ? 'Tambah Proyek Pembangunan' : 'Edit Proyek'}</h3>
                            </div>
                            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-600 uppercase">Nama Proyek</label>
                                    <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200" required />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-600 uppercase">Status</label>
                                        <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200">
                                            <option value="Planning">Planning</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-600 uppercase">Prioritas</label>
                                        <select value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200">
                                            <option value="High">High</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Low">Low</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-600 uppercase">Anggaran (Rp)</label>
                                        <input type="number" value={formData.budget} onChange={e => setFormData({...formData, budget: Number(e.target.value)})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200" required />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-600 uppercase">Progress (%)</label>
                                        <input type="number" min="0" max="100" value={formData.progress} onChange={e => setFormData({...formData, progress: Number(e.target.value)})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200" required />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-600 uppercase">Pelaksana</label>
                                    <input type="text" value={formData.contractor} onChange={e => setFormData({...formData, contractor: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200" required />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-600 uppercase">Tgl Mulai</label>
                                        <input type="date" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200" required />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-600 uppercase">Tgl Selesai</label>
                                        <input type="date" value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200" />
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end space-x-3">
                                <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-gray-600">Batal</button>
                                <button type="submit" className="px-6 py-2.5 bg-amber-600 text-white rounded-xl font-bold shadow-lg">Simpan Proyek</button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
