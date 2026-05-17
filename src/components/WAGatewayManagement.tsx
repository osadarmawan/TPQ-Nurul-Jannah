import React, { useState } from 'react';
import { 
    MessageSquare, Smartphone, Wifi, WifiOff, QrCode, Send, 
    Users, History, CheckCircle2, XCircle, Clock, Search, Filter, RefreshCw,
    Battery, BatteryMedium, ShieldCheck, LogOut, AlertCircle, ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

const MOCK_HISTORY = [
    { id: 1, to: '081234567890', name: 'Budi Santoso (Ortu Ahmad)', type: 'Tagihan SPP', status: 'Terkirim', time: '10:30 WIB', date: '19 Mar 2026' },
    { id: 2, to: '081298765432', name: 'Siti Nurhaliza (Ortu Aminah)', type: 'Pengumuman', status: 'Terkirim', time: '09:15 WIB', date: '19 Mar 2026' },
    { id: 3, to: '085612349876', name: 'Doremi Fasolasido', type: 'Tagihan SPP', status: 'Gagal', time: '08:00 WIB', date: '19 Mar 2026' },
    { id: 4, to: '081122334455', name: 'Grup Wali Santri Jilid 4', type: 'Broadcast', status: 'Terkirim', time: '16:45 WIB', date: '18 Mar 2026' },
    { id: 5, to: '089988776655', name: 'Ustadz Mansur', type: 'Pesan Personal', status: 'Dibaca', time: '14:20 WIB', date: '18 Mar 2026' },
];

const TEMPLATES = [
    { id: 'tagihan', title: 'Tagihan SPP Bulanan', desc: 'Template tagihan otomatis dengan nominal', content: 'Assalamualaikum wr. wb.\n\nBapak/Ibu wali dari ananda {nama_santri}, kami informasikan bahwa tagihan SPP bulan ini sebesar {tagihan} telah terbit. Mohon segera melakukan pembayaran.\n\nTerima kasih.' },
    { id: 'tunggakan_berat', title: 'Peringatan Tunggakan > 2 Bulan', desc: 'Peringatan untuk tunggakan lama', content: 'Assalamualaikum wr. wb.\n\nBapak/Ibu wali dari ananda {nama_santri}, kami informasikan bahwa terdapat tunggakan SPP lebih dari 2 bulan sebesar {tagihan}. Mohon kerjasamanya untuk segera diselesaikan atau hubungi admin kami.\n\nTerima kasih.' },
    { id: 'lunas', title: 'Terima Kasih Pembayaran (Lunas)', desc: 'Ucapan terima kasih SPP lunas', content: 'Assalamualaikum wr. wb.\n\nBapak/Ibu wali dari ananda {nama_santri}, terima kasih. Pembayaran SPP bulan ini telah kami terima dan status ananda sudah LUNAS.\n\nSemoga rezeki Bapak/Ibu semakin berkah. Aamiin.' },
    { id: 'absensi', title: 'Laporan Absensi', desc: 'Pemberitahuan santri tidak hadir', content: 'Assalamualaikum wr. wb.\n\nBapak/Ibu wali dari ananda {nama_santri}, kami informasikan bahwa ananda hari ini tidak hadir di TPQ tanpa keterangan. Mohon konfirmasinya.\n\nTerima kasih.' },
    { id: 'libur', title: 'Pengumuman Libur', desc: 'Info libur nasional/kegiatan TPQ', content: 'Assalamualaikum wr. wb.\n\nPemberitahuan kepada seluruh wali santri, bahwa kegiatan belajar mengajar di TPQ diliburkan pada tanggal {tanggal_libur} dikarenakan {alasan_libur}. Kegiatan akan aktif kembali pada {tanggal_masuk}.\n\nTerima kasih.' },
    { id: 'selamat', title: 'Ucapan Selamat', desc: 'Kenaikan jilid / lulus Al-Quran', content: 'Alhamdulillah! Selamat kepada ananda {nama_santri} atas keberhasilannya naik ke {jilid}. Semoga semakin semangat belajarnya dan menjadi anak yang sholeh/sholehah. Aamiin.' },
    { id: 'rapat', title: 'Undangan Rapat Pengurus', desc: 'Undangan internal', content: 'Assalamualaikum wr. wb.\n\nKepada Yth. Ustadz/Ustadzah dan Pengurus TPQ,\nDiundang kehadirannya pada rapat evaluasi bulanan yang akan dilaksanakan pada:\nHari/Tanggal: {tanggal}\nWaktu: {waktu}\nTempat: {tempat}\n\nMohon kehadirannya tepat waktu. Terima kasih.' }
];

const getAutoTemplate = (group: string) => {
    if (group === 'Tunggakan SPP Bulan Ini') return TEMPLATES.find(t => t.id === 'tagihan')?.content || '';
    if (group === 'Tunggakan SPP > 2 Bulan') return TEMPLATES.find(t => t.id === 'tunggakan_berat')?.content || '';
    if (group === 'Lunas SPP Bulan Ini') return TEMPLATES.find(t => t.id === 'lunas')?.content || '';
    if (group.includes('Pengurus') || group.includes('Pengajar') || group.includes('Staf')) return TEMPLATES.find(t => t.id === 'rapat')?.content || '';
    if (group.includes('Jilid') || group.includes('Al-Quran')) return TEMPLATES.find(t => t.id === 'libur')?.content || '';
    return TEMPLATES[0].content;
};

export const WAGatewayManagement = ({ theme = 'light' }: { theme?: 'light' | 'dark' }) => {
    const isDark = theme === 'dark';
    const [isConnected, setIsConnected] = useState(true);
    const [activeTab, setActiveTab] = useState<'kirim' | 'riwayat'>('kirim');
    const [messageType, setMessageType] = useState<'personal' | 'broadcast'>('personal');
    const [isScanning, setIsScanning] = useState(false);
    
    // New states for functionality
    const [historyData, setHistoryData] = useState(MOCK_HISTORY);
    const [messageText, setMessageText] = useState('');
    const [recipient, setRecipient] = useState('');
    const [targetGroup, setTargetGroup] = useState('Semua Wali Santri');
    const [isSending, setIsSending] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showTemplateDropdown, setShowTemplateDropdown] = useState(false);
    const [toast, setToast] = useState<{show: boolean, type: 'success'|'error', message: string}>({show: false, type: 'success', message: ''});

    const showToast = (type: 'success'|'error', message: string) => {
        setToast({ show: true, type, message });
        setTimeout(() => setToast({ show: false, type: 'success', message: '' }), 3000);
    };

    const handleConnect = () => {
        setIsScanning(true);
        setTimeout(() => {
            setIsScanning(false);
            setIsConnected(true);
            showToast('success', 'Perangkat berhasil terhubung!');
        }, 3000);
    };

    const handleDisconnect = () => {
        setIsConnected(false);
        showToast('success', 'Perangkat berhasil diputuskan.');
    };

    const handleSendMessage = () => {
        if (!messageText.trim()) {
            showToast('error', 'Pesan tidak boleh kosong');
            return;
        }
        if (messageType === 'personal' && !recipient.trim()) {
            showToast('error', 'Nomor tujuan harus diisi');
            return;
        }

        setIsSending(true);
        setTimeout(() => {
            const newMessage = {
                id: Date.now(),
                to: messageType === 'personal' ? recipient : targetGroup,
                name: messageType === 'personal' ? (recipient.includes('08') ? 'Nomor Baru' : recipient) : targetGroup,
                type: messageType === 'personal' ? 'Pesan Personal' : 'Broadcast',
                status: 'Terkirim',
                time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
                date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
            };
            
            setHistoryData([newMessage, ...historyData]);
            setIsSending(false);
            setMessageText('');
            setRecipient('');
            showToast('success', 'Pesan berhasil dikirim!');
            setActiveTab('riwayat');
        }, 1500);
    };

    const filteredHistory = historyData.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const stats = {
        sent: historyData.filter(h => h.status === 'Terkirim' || h.status === 'Dibaca').length,
        failed: historyData.filter(h => h.status === 'Gagal').length
    };

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative">
                {/* Toast Notification */}
                <AnimatePresence>
                    {toast.show && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={cn(
                                "absolute top-0 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 z-50",
                                toast.type === 'success' 
                                    ? (isDark ? "bg-emerald-900/90 text-emerald-200 border border-emerald-800" : "bg-emerald-100 text-emerald-800 border border-emerald-200")
                                    : (isDark ? "bg-red-900/90 text-red-200 border border-red-800" : "bg-red-100 text-red-800 border border-red-200")
                            )}
                        >
                            {toast.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                            <span className="text-sm font-bold">{toast.message}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div>
                    <h2 className={cn(
                        "text-3xl font-bold tracking-tight transition-colors",
                        isDark ? "text-emerald-400" : "text-[#064E3B]"
                    )}>WhatsApp Gateway</h2>
                    <p className={cn(
                        "mt-1 transition-colors",
                        isDark ? "text-gray-400" : "text-gray-500"
                    )}>Pusat kendali notifikasi dan pesan otomatis via WhatsApp.</p>
                </div>
                <div className="flex items-center space-x-3">
                    <button 
                        onClick={() => setIsConnected(!isConnected)}
                        className={cn(
                            "flex items-center space-x-2 px-4 py-2.5 rounded-xl border transition-all font-medium text-sm",
                            isDark 
                                ? "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700" 
                                : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                        )}
                    >
                        <RefreshCw size={16} className={cn(isScanning && "animate-spin")} />
                        <span>Sinkronisasi Ulang</span>
                    </button>
                </div>
            </div>

            {/* Device Status Card */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                    "rounded-3xl p-6 md:p-8 shadow-sm border transition-all relative overflow-hidden",
                    isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
                )}
            >
                <div className={cn(
                    "absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -z-10 transition-colors opacity-50",
                    isConnected 
                        ? (isDark ? "bg-emerald-900/40" : "bg-emerald-100") 
                        : (isDark ? "bg-red-900/20" : "bg-red-50")
                )}></div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center space-x-6">
                        <div className={cn(
                            "w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg relative",
                            isConnected 
                                ? "bg-gradient-to-br from-[#25D366] to-emerald-600 text-white" 
                                : (isDark ? "bg-gray-700 text-gray-400" : "bg-gray-100 text-gray-400")
                        )}>
                            <Smartphone size={40} />
                            {isConnected && (
                                <span className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                                    <CheckCircle2 size={16} className="text-[#25D366]" />
                                </span>
                            )}
                        </div>
                        <div>
                            <div className="flex items-center space-x-3 mb-1">
                                <h3 className={cn(
                                    "text-xl font-bold transition-colors",
                                    isDark ? "text-gray-100" : "text-gray-900"
                                )}>Status Perangkat</h3>
                                <span className={cn(
                                    "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1 border",
                                    isConnected 
                                        ? (isDark ? "bg-emerald-900/30 text-emerald-400 border-emerald-800" : "bg-emerald-50 text-emerald-700 border-emerald-100")
                                        : (isDark ? "bg-red-900/30 text-red-400 border-red-800" : "bg-red-50 text-red-700 border-red-100")
                                )}>
                                    {isConnected ? <Wifi size={12} className="mr-1" /> : <WifiOff size={12} className="mr-1" />}
                                    {isConnected ? 'Terhubung' : 'Terputus'}
                                </span>
                            </div>
                            {isConnected ? (
                                <div className="space-y-1">
                                    <p className={cn("text-sm font-medium", isDark ? "text-gray-300" : "text-gray-600")}>
                                        Nomor Aktif: <span className="font-bold">+62 812-3456-7890</span>
                                    </p>
                                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                                        <span className="flex items-center"><ShieldCheck size={14} className="mr-1 text-blue-500" /> Enkripsi End-to-End</span>
                                    </div>
                                </div>
                            ) : (
                                <p className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-500")}>
                                    Perangkat tidak terhubung. Silakan scan QR Code untuk menghubungkan.
                                </p>
                            )}
                        </div>
                    </div>

                    {isConnected ? (
                        <button 
                            onClick={handleDisconnect}
                            className={cn(
                                "px-4 py-2 rounded-xl font-bold flex items-center space-x-2 transition-all border",
                                isDark 
                                    ? "bg-gray-800 border-gray-700 text-red-400 hover:bg-gray-700" 
                                    : "bg-white border-gray-200 text-red-500 hover:bg-red-50"
                            )}
                        >
                            <LogOut size={16} />
                            <span className="text-sm">Putuskan</span>
                        </button>
                    ) : (
                        <button 
                            onClick={handleConnect}
                            disabled={isScanning}
                            className={cn(
                                "px-6 py-3 rounded-xl font-bold flex items-center space-x-2 transition-all shadow-lg",
                                isDark 
                                    ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/40" 
                                    : "bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-green-500/20",
                                isScanning && "opacity-70 cursor-not-allowed"
                            )}
                        >
                            {isScanning ? (
                                <>
                                    <RefreshCw size={20} className="animate-spin" />
                                    <span>Memuat QR Code...</span>
                                </>
                            ) : (
                                <>
                                    <QrCode size={20} />
                                    <span>Scan QR Code</span>
                                </>
                            )}
                        </button>
                    )}
                </div>
            </motion.div>

            {/* Main Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Panel: Compose */}
                <div className={cn(
                    "lg:col-span-2 rounded-3xl shadow-sm border overflow-hidden transition-all flex flex-col",
                    isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
                )}>
                    <div className={cn(
                        "flex border-b transition-colors",
                        isDark ? "border-gray-700" : "border-gray-100"
                    )}>
                        <button 
                            onClick={() => setActiveTab('kirim')}
                            className={cn(
                                "flex-1 py-4 text-sm font-bold flex items-center justify-center space-x-2 transition-colors relative",
                                activeTab === 'kirim' 
                                    ? (isDark ? "text-emerald-400" : "text-[#064E3B]") 
                                    : (isDark ? "text-gray-500 hover:text-gray-300" : "text-gray-500 hover:text-gray-700")
                            )}
                        >
                            <Send size={18} />
                            <span>Kirim Pesan</span>
                            {activeTab === 'kirim' && (
                                <motion.div layoutId="activeTab" className={cn("absolute bottom-0 left-0 right-0 h-0.5", isDark ? "bg-emerald-400" : "bg-[#064E3B]")} />
                            )}
                        </button>
                        <button 
                            onClick={() => setActiveTab('riwayat')}
                            className={cn(
                                "flex-1 py-4 text-sm font-bold flex items-center justify-center space-x-2 transition-colors relative",
                                activeTab === 'riwayat' 
                                    ? (isDark ? "text-emerald-400" : "text-[#064E3B]") 
                                    : (isDark ? "text-gray-500 hover:text-gray-300" : "text-gray-500 hover:text-gray-700")
                            )}
                        >
                            <History size={18} />
                            <span>Riwayat Pesan</span>
                            {activeTab === 'riwayat' && (
                                <motion.div layoutId="activeTab" className={cn("absolute bottom-0 left-0 right-0 h-0.5", isDark ? "bg-emerald-400" : "bg-[#064E3B]")} />
                            )}
                        </button>
                    </div>

                    <div className="p-6 flex-1">
                        {activeTab === 'kirim' ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                                <div className="flex space-x-4 mb-6">
                                    <button 
                                        onClick={() => setMessageType('personal')}
                                        className={cn(
                                            "flex-1 py-3 rounded-xl border-2 font-bold text-sm flex items-center justify-center space-x-2 transition-all",
                                            messageType === 'personal'
                                                ? (isDark ? "border-emerald-500 bg-emerald-900/20 text-emerald-400" : "border-[#064E3B] bg-emerald-50 text-[#064E3B]")
                                                : (isDark ? "border-gray-700 text-gray-400 hover:border-gray-600" : "border-gray-100 text-gray-500 hover:border-gray-200")
                                        )}
                                    >
                                        <MessageSquare size={18} />
                                        <span>Pesan Personal</span>
                                    </button>
                                    <button 
                                        onClick={() => setMessageType('broadcast')}
                                        className={cn(
                                            "flex-1 py-3 rounded-xl border-2 font-bold text-sm flex items-center justify-center space-x-2 transition-all",
                                            messageType === 'broadcast'
                                                ? (isDark ? "border-emerald-500 bg-emerald-900/20 text-emerald-400" : "border-[#064E3B] bg-emerald-50 text-[#064E3B]")
                                                : (isDark ? "border-gray-700 text-gray-400 hover:border-gray-600" : "border-gray-100 text-gray-500 hover:border-gray-200")
                                        )}
                                    >
                                        <Users size={18} />
                                        <span>Broadcast Massal</span>
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label className={cn("text-xs font-bold uppercase tracking-wider", isDark ? "text-gray-400" : "text-gray-600")}>
                                            {messageType === 'personal' ? 'Nomor Tujuan / Nama Santri' : 'Grup Target'}
                                        </label>
                                        {messageType === 'personal' ? (
                                            <input 
                                                type="text" 
                                                value={recipient}
                                                onChange={(e) => setRecipient(e.target.value)}
                                                placeholder="Cari nama santri atau masukkan nomor WA (0812...)"
                                                className={cn(
                                                    "w-full px-4 py-3 rounded-xl border outline-none transition-all",
                                                    isDark 
                                                        ? "bg-gray-900 border-gray-700 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" 
                                                        : "bg-white border-gray-200 text-gray-900 focus:border-[#064E3B] focus:ring-1 focus:ring-[#064E3B]"
                                                )}
                                            />
                                        ) : (
                                            <select 
                                                value={targetGroup}
                                                onChange={(e) => setTargetGroup(e.target.value)}
                                                className={cn(
                                                "w-full px-4 py-3 rounded-xl border outline-none transition-all appearance-none",
                                                isDark 
                                                    ? "bg-gray-900 border-gray-700 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" 
                                                    : "bg-white border-gray-200 text-gray-900 focus:border-[#064E3B] focus:ring-1 focus:ring-[#064E3B]"
                                            )}>
                                                <optgroup label="Umum">
                                                    <option value="Semua Wali Santri">Semua Wali Santri (Aktif)</option>
                                                    <option value="Semua Santri & Alumni">Semua Santri & Alumni</option>
                                                </optgroup>
                                                <optgroup label="Berdasarkan Kelas/Jilid">
                                                    <option value="Wali Santri Jilid 1">Wali Santri Jilid 1</option>
                                                    <option value="Wali Santri Jilid 2">Wali Santri Jilid 2</option>
                                                    <option value="Wali Santri Jilid 3">Wali Santri Jilid 3</option>
                                                    <option value="Wali Santri Jilid 4">Wali Santri Jilid 4</option>
                                                    <option value="Wali Santri Jilid 5">Wali Santri Jilid 5</option>
                                                    <option value="Wali Santri Jilid 6">Wali Santri Jilid 6</option>
                                                    <option value="Wali Santri Al-Quran">Wali Santri Al-Quran</option>
                                                    <option value="Wali Santri Pegon/Kitab">Wali Santri Pegon/Kitab</option>
                                                </optgroup>
                                                <optgroup label="Berdasarkan Status Keuangan">
                                                    <option value="Tunggakan SPP Bulan Ini">Tunggakan SPP Bulan Ini</option>
                                                    <option value="Tunggakan SPP > 2 Bulan">Tunggakan SPP &gt; 2 Bulan</option>
                                                    <option value="Lunas SPP Bulan Ini">Lunas SPP Bulan Ini</option>
                                                </optgroup>
                                                <optgroup label="Internal Pegawai">
                                                    <option value="Semua Pengurus & Ustadz">Semua Pengurus & Ustadz</option>
                                                    <option value="Khusus Pengajar/Ustadz">Khusus Pengajar/Ustadz</option>
                                                    <option value="Khusus Staf Administrasi">Khusus Staf Administrasi</option>
                                                </optgroup>
                                            </select>
                                        )}
                                    </div>

                                    <div className="space-y-1.5">
                                        <div className="flex items-center justify-between relative">
                                            <label className={cn("text-xs font-bold uppercase tracking-wider", isDark ? "text-gray-400" : "text-gray-600")}>
                                                Isi Pesan
                                            </label>
                                            <div className="relative">
                                                <button 
                                                    onClick={() => setShowTemplateDropdown(!showTemplateDropdown)}
                                                    className={cn("text-xs font-bold hover:underline flex items-center space-x-1", isDark ? "text-emerald-400" : "text-[#064E3B]")}
                                                >
                                                    <span>Gunakan Template</span>
                                                    <ChevronDown size={14} />
                                                </button>

                                                <AnimatePresence>
                                                    {showTemplateDropdown && (
                                                        <>
                                                            <div className="fixed inset-0 z-40" onClick={() => setShowTemplateDropdown(false)}></div>
                                                            <motion.div 
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                exit={{ opacity: 0, y: 10 }}
                                                                className={cn(
                                                                    "absolute right-0 mt-2 w-72 rounded-xl shadow-xl border overflow-hidden z-50",
                                                                    isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
                                                                )}
                                                            >
                                                                <div className="max-h-64 overflow-y-auto">
                                                                    {messageType === 'broadcast' && (
                                                                        <button 
                                                                            onClick={() => {
                                                                                setMessageText(getAutoTemplate(targetGroup));
                                                                                setShowTemplateDropdown(false);
                                                                                showToast('success', 'Template otomatis diterapkan!');
                                                                            }}
                                                                            className={cn(
                                                                                "w-full text-left px-4 py-3 border-b transition-colors flex flex-col",
                                                                                isDark ? "border-gray-700 hover:bg-gray-700 bg-emerald-900/20" : "border-gray-100 hover:bg-emerald-50 bg-emerald-50/50"
                                                                            )}
                                                                        >
                                                                            <span className={cn("text-sm font-bold", isDark ? "text-emerald-400" : "text-emerald-700")}>✨ Template Otomatis</span>
                                                                            <span className={cn("text-[10px]", isDark ? "text-emerald-500/70" : "text-emerald-600/70")}>Sesuai grup: {targetGroup}</span>
                                                                        </button>
                                                                    )}
                                                                    {TEMPLATES.map((tpl) => (
                                                                        <button 
                                                                            key={tpl.id}
                                                                            onClick={() => {
                                                                                setMessageText(tpl.content);
                                                                                setShowTemplateDropdown(false);
                                                                                showToast('success', `Template '${tpl.title}' diterapkan!`);
                                                                            }}
                                                                            className={cn(
                                                                                "w-full text-left px-4 py-3 border-b last:border-0 transition-colors flex flex-col",
                                                                                isDark ? "border-gray-700 hover:bg-gray-700" : "border-gray-100 hover:bg-gray-50"
                                                                            )}
                                                                        >
                                                                            <span className={cn("text-sm font-bold", isDark ? "text-gray-200" : "text-gray-800")}>{tpl.title}</span>
                                                                            <span className={cn("text-[10px]", isDark ? "text-gray-500" : "text-gray-500")}>{tpl.desc}</span>
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </motion.div>
                                                        </>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                        <textarea 
                                            rows={6}
                                            value={messageText}
                                            onChange={(e) => setMessageText(e.target.value)}
                                            placeholder="Tulis pesan Anda di sini... (Gunakan *teks* untuk tebal, _teks_ untuk miring)"
                                            className={cn(
                                                "w-full px-4 py-3 rounded-xl border outline-none transition-all resize-none",
                                                isDark 
                                                    ? "bg-gray-900 border-gray-700 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" 
                                                    : "bg-white border-gray-200 text-gray-900 focus:border-[#064E3B] focus:ring-1 focus:ring-[#064E3B]"
                                            )}
                                        ></textarea>
                                        <p className={cn("text-[10px]", isDark ? "text-gray-500" : "text-gray-400")}>
                                            Variabel yang tersedia: {'{nama_santri}'}, {'{nama_ortu}'}, {'{jilid}'}, {'{tagihan}'}
                                        </p>
                                    </div>
                                </div>

                                <button 
                                    onClick={handleSendMessage}
                                    disabled={!isConnected || isSending}
                                    className={cn(
                                        "w-full py-3.5 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all shadow-lg",
                                        isConnected && !isSending
                                            ? (isDark ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/40" : "bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-green-500/20")
                                            : "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none border-none",
                                        isDark && (!isConnected || isSending) && "bg-gray-800 text-gray-600"
                                    )}
                                >
                                    {isSending ? (
                                        <>
                                            <RefreshCw size={18} className="animate-spin" />
                                            <span>Mengirim...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send size={18} />
                                            <span>{messageType === 'personal' ? 'Kirim Pesan Sekarang' : 'Mulai Broadcast'}</span>
                                        </>
                                    )}
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="relative flex-1 max-w-xs">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input 
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Cari riwayat..."
                                            className={cn(
                                                "w-full pl-9 pr-4 py-2 rounded-lg border text-sm outline-none transition-all",
                                                isDark ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-200"
                                            )}
                                        />
                                    </div>
                                    <button className={cn(
                                        "p-2 rounded-lg border transition-colors",
                                        isDark ? "bg-gray-900 border-gray-700 text-gray-400 hover:bg-gray-800" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                                    )}>
                                        <Filter size={18} />
                                    </button>
                                </div>
                                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                                    {filteredHistory.length > 0 ? filteredHistory.map((item) => (
                                        <div key={item.id} className={cn(
                                            "p-4 rounded-2xl border transition-colors",
                                            isDark ? "bg-gray-900/50 border-gray-700 hover:bg-gray-800" : "bg-gray-50 border-gray-100 hover:bg-white"
                                        )}>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className={cn(
                                                    "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border",
                                                    item.status === 'Terkirim' || item.status === 'Dibaca' 
                                                        ? (isDark ? "bg-emerald-900/30 text-emerald-400 border-emerald-800" : "bg-emerald-50 text-emerald-700 border-emerald-100")
                                                        : (isDark ? "bg-red-900/30 text-red-400 border-red-800" : "bg-red-50 text-red-700 border-red-100")
                                                )}>
                                                    {item.status}
                                                </span>
                                                <span className={cn("text-xs", isDark ? "text-gray-500" : "text-gray-400")}>{item.date} • {item.time}</span>
                                            </div>
                                            <p className={cn("text-sm font-bold mb-1", isDark ? "text-gray-200" : "text-gray-800")}>{item.name}</p>
                                            <div className="flex items-center justify-between">
                                                <p className={cn("text-xs font-mono", isDark ? "text-gray-400" : "text-gray-500")}>{item.to}</p>
                                                <span className={cn("text-[10px] font-bold uppercase", isDark ? "text-blue-400" : "text-blue-600")}>{item.type}</span>
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="text-center py-8">
                                            <p className={cn("text-sm", isDark ? "text-gray-500" : "text-gray-400")}>Tidak ada riwayat pesan ditemukan.</p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Right Panel: Stats & Templates */}
                <div className="space-y-6">
                    <div className={cn(
                        "rounded-3xl p-6 shadow-sm border transition-all",
                        isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
                    )}>
                        <h3 className={cn("text-sm font-bold uppercase tracking-widest mb-4", isDark ? "text-gray-400" : "text-gray-500")}>Statistik Hari Ini</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className={cn("p-4 rounded-2xl border", isDark ? "bg-emerald-900/20 border-emerald-900/30" : "bg-emerald-50 border-emerald-100")}>
                                <p className={cn("text-2xl font-black", isDark ? "text-emerald-400" : "text-emerald-700")}>{stats.sent}</p>
                                <p className={cn("text-[10px] font-bold uppercase mt-1", isDark ? "text-emerald-500/70" : "text-emerald-600/70")}>Pesan Terkirim</p>
                            </div>
                            <div className={cn("p-4 rounded-2xl border", isDark ? "bg-red-900/20 border-red-900/30" : "bg-red-50 border-red-100")}>
                                <p className={cn("text-2xl font-black", isDark ? "text-red-400" : "text-red-700")}>{stats.failed}</p>
                                <p className={cn("text-[10px] font-bold uppercase mt-1", isDark ? "text-red-500/70" : "text-red-600/70")}>Pesan Gagal</p>
                            </div>
                        </div>
                    </div>

                    <div className={cn(
                        "rounded-3xl p-6 shadow-sm border transition-all flex-1",
                        isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
                    )}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className={cn("text-sm font-bold uppercase tracking-widest", isDark ? "text-gray-400" : "text-gray-500")}>Template Cepat</h3>
                            <button className={cn("text-xs font-bold hover:underline", isDark ? "text-emerald-400" : "text-[#064E3B]")}>Kelola</button>
                        </div>
                        <div className="space-y-3">
                            {TEMPLATES.map((tpl, i) => (
                                <div 
                                    key={i} 
                                    onClick={() => {
                                        setMessageText(tpl.content);
                                        setActiveTab('kirim');
                                        showToast('success', 'Template berhasil dimuat');
                                    }}
                                    className={cn(
                                        "p-3 rounded-xl border transition-all cursor-pointer group",
                                        isDark ? "bg-gray-900/50 border-gray-700 hover:border-emerald-500/50" : "bg-gray-50 border-gray-100 hover:border-[#064E3B]/30 hover:bg-emerald-50/30"
                                    )}
                                >
                                    <p className={cn("text-sm font-bold mb-1 transition-colors", isDark ? "text-gray-300 group-hover:text-emerald-400" : "text-gray-700 group-hover:text-[#064E3B]")}>{tpl.title}</p>
                                    <p className={cn("text-[10px]", isDark ? "text-gray-500" : "text-gray-500")}>{tpl.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
