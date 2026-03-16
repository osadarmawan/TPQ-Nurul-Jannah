import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Bell, 
    Check, 
    Wallet, 
    BookOpen, 
    UserPlus, 
    AlertCircle,
    Clock
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Notification {
    id: number;
    title: string;
    description: string;
    time: string;
    type: 'keuangan' | 'akademik' | 'pendaftaran' | 'sistem';
    isRead: boolean;
}

const INITIAL_NOTIFICATIONS: Notification[] = [
    {
        id: 1,
        title: 'Pembayaran SPP Masuk',
        description: 'Ahmad Fauzi (Jilid 4) telah melunasi SPP bulan Maret.',
        time: '2 jam yang lalu',
        type: 'keuangan',
        isRead: false
    },
    {
        id: 2,
        title: 'Kenaikan Jilid',
        description: 'Siti Aminah berhasil naik ke Jilid 6 setelah ujian.',
        time: '5 jam yang lalu',
        type: 'akademik',
        isRead: false
    },
    {
        id: 3,
        title: 'Pendaftaran Santri Baru',
        description: 'Ada 3 calon santri baru menunggu verifikasi berkas.',
        time: '1 hari yang lalu',
        type: 'pendaftaran',
        isRead: true
    },
    {
        id: 4,
        title: 'Update Sistem Selesai',
        description: 'Fitur laporan otomatis sekarang sudah tersedia.',
        time: '2 hari yang lalu',
        type: 'sistem',
        isRead: true
    }
];

interface NotificationPopoverProps {
    isOpen: boolean;
    onClose: () => void;
    onViewAll: () => void;
    theme?: 'light' | 'dark';
}

export const NotificationPopover: React.FC<NotificationPopoverProps> = ({ isOpen, onClose, onViewAll, theme = 'light' }) => {
    const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);

    const isDark = theme === 'dark';
    const unreadCount = notifications.filter(n => !n.isRead).length;

    const handleMarkAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    };

    const handleNotificationClick = (id: number) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    };

    const getIcon = (type: Notification['type']) => {
        switch (type) {
            case 'keuangan': return <Wallet size={16} className={isDark ? "text-amber-400" : "text-amber-600"} />;
            case 'akademik': return <BookOpen size={16} className={isDark ? "text-emerald-400" : "text-emerald-600"} />;
            case 'pendaftaran': return <UserPlus size={16} className={isDark ? "text-blue-400" : "text-blue-600"} />;
            case 'sistem': return <AlertCircle size={16} className={isDark ? "text-purple-400" : "text-purple-600"} />;
        }
    };

    const getBgColor = (type: Notification['type']) => {
        switch (type) {
            case 'keuangan': return isDark ? 'bg-amber-900/30' : 'bg-amber-100/50';
            case 'akademik': return isDark ? 'bg-emerald-900/30' : 'bg-emerald-100/50';
            case 'pendaftaran': return isDark ? 'bg-blue-900/30' : 'bg-blue-100/50';
            case 'sistem': return isDark ? 'bg-purple-900/30' : 'bg-purple-100/50';
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop for closing */}
                    <div className="fixed inset-0 z-40" onClick={onClose} />
                    
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className={cn(
                            "absolute right-0 mt-2 w-96 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border z-50 overflow-hidden transition-all",
                            isDark 
                                ? "bg-gray-900/95 border-emerald-500/30" 
                                : "bg-white/95 border-[#D4AF37]/30"
                        )}
                    >
                        {/* Header */}
                        <div className={cn(
                            "p-4 border-b flex items-center justify-between transition-colors",
                            isDark 
                                ? "bg-gradient-to-r from-gray-950 to-gray-900 border-gray-800" 
                                : "bg-gradient-to-r from-gray-50 to-white border-gray-100"
                        )}>
                            <div className="flex items-center space-x-2">
                                <Bell size={18} className={isDark ? "text-emerald-400" : "text-[#064E3B]"} />
                                <h3 className={cn("font-bold transition-colors", isDark ? "text-emerald-400" : "text-[#064E3B]")}>Notifikasi</h3>
                                {unreadCount > 0 && (
                                    <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                                        {unreadCount} Baru
                                    </span>
                                )}
                            </div>
                            <button 
                                onClick={handleMarkAllAsRead}
                                className={cn(
                                    "text-xs font-medium transition-colors flex items-center",
                                    isDark ? "text-[#D4AF37] hover:text-emerald-400" : "text-[#D4AF37] hover:text-[#064E3B]"
                                )}
                            >
                                <Check size={14} className="mr-1" />
                                Tandai semua dibaca
                            </button>
                        </div>

                        {/* List */}
                        <div className="max-h-[400px] overflow-y-auto scrollbar-hide">
                            {notifications.length > 0 ? (
                                notifications.map((notif) => (
                                    <div 
                                        key={notif.id}
                                        onClick={() => handleNotificationClick(notif.id)}
                                        className={cn(
                                            "p-4 border-b transition-all cursor-pointer flex items-start space-x-3 relative group",
                                            isDark 
                                                ? (notif.isRead ? "border-gray-800 hover:bg-emerald-900/10" : "bg-emerald-900/10 border-gray-800")
                                                : (notif.isRead ? "border-gray-50 hover:bg-emerald-50/30" : "bg-emerald-50/10 border-gray-50")
                                        )}
                                    >
                                        {!notif.isRead && (
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D4AF37]" />
                                        )}
                                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm", getBgColor(notif.type))}>
                                            {getIcon(notif.type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={cn(
                                                "text-sm mb-0.5 transition-colors", 
                                                notif.isRead 
                                                    ? (isDark ? "text-gray-400" : "text-gray-700") 
                                                    : (isDark ? "text-emerald-400 font-semibold" : "text-[#064E3B] font-semibold")
                                            )}>
                                                {notif.title}
                                            </p>
                                            <p className={cn(
                                                "text-xs line-clamp-2 leading-relaxed transition-colors",
                                                isDark ? "text-gray-500" : "text-gray-500"
                                            )}>
                                                {notif.description}
                                            </p>
                                            <div className="flex items-center mt-2 text-[10px] text-gray-400">
                                                <Clock size={10} className="mr-1" />
                                                {notif.time}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-10 text-center">
                                    <Bell size={40} className="mx-auto text-gray-200 mb-3" />
                                    <p className="text-gray-400 text-sm">Tidak ada notifikasi baru</p>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <button 
                            onClick={() => {
                                onViewAll();
                                onClose();
                            }}
                            className={cn(
                                "w-full p-3 text-center text-sm font-medium transition-colors border-t",
                                isDark 
                                    ? "text-emerald-400 hover:bg-gray-800 border-gray-800 bg-gray-900/50" 
                                    : "text-[#064E3B] hover:bg-gray-50 border-gray-100 bg-gray-50/50"
                            )}
                        >
                            Lihat Semua Notifikasi
                        </button>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
