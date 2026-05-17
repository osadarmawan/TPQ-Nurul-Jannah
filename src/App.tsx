import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardStats } from './components/DashboardStats';
import { SantriTable } from './components/SantriTable';
import { AiAssistant } from './components/AiAssistant';
import { NotificationPopover } from './components/NotificationPopover';
import { SantriManagement } from './components/SantriManagement';
import { AcademicManagement } from './components/AcademicManagement';
import { StaffManagement } from './components/StaffManagement';
import { FinanceManagement } from './components/FinanceManagement';
import { DevelopmentManagement } from './components/DevelopmentManagement';
import { ReportManagement } from './components/ReportManagement';
import { SettingsManagement } from './components/SettingsManagement';
import { WAGatewayManagement } from './components/WAGatewayManagement';
import { DailyReportPrint } from './components/DailyReportPrint';
import { LoginModal } from './components/LoginModal';
import { UserRole, UserInfo } from './types';
import { Bell, Search, UserCircle, FileText, BookOpen, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from './lib/utils';

export default function App() {
    const [activeMenu, setActiveMenu] = useState('Beranda');
    const [user, setUser] = useState<UserInfo>({ name: 'Tamu', role: 'Tamu' });
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const toggleTheme = (newTheme: 'light' | 'dark') => {
        setTheme(newTheme);
    };

    const handleLogin = (role: UserRole, name: string) => {
        setUser({ role, name });
    };

    const handleLogout = () => {
        setUser({ role: 'Tamu', name: 'Tamu' });
        setActiveMenu('Beranda');
    };

    return (
        <div className={cn(
            "min-h-screen font-sans flex print:block transition-colors duration-500 print:overflow-visible overflow-hidden",
            theme === 'dark' ? "bg-[#0a0a0a] text-gray-100 dark" : "bg-[#f8f9fa] text-gray-800"
        )}>
            {/* Sidebar */}
            <Sidebar 
                activeMenu={activeMenu} 
                setActiveMenu={setActiveMenu} 
                user={user} 
                theme={theme} 
                handleLogout={handleLogout}
                openLoginModal={() => setIsLoginModalOpen(true)}
            />

            {/* Main Content */}
            <div className="flex-1 ml-64 flex flex-col h-screen overflow-hidden print:hidden">
                {/* Topbar */}
                <header className={cn(
                    "h-20 backdrop-blur-md border-b flex items-center justify-between px-8 z-50 sticky top-0 shadow-sm transition-all duration-500",
                    theme === 'dark' 
                        ? "bg-black/60 border-emerald-900/30" 
                        : "bg-white/80 border-[#D4AF37]/20"
                )}>
                    <div className="flex items-center space-x-4">
                        <h2 className={cn(
                            "text-2xl font-bold tracking-tight transition-colors",
                            theme === 'dark' ? "text-emerald-400" : "text-[#064E3B]"
                        )}>{activeMenu}</h2>
                        <div className={cn(
                            "hidden md:flex items-center space-x-2 text-sm px-3 py-1.5 rounded-full border transition-all",
                            theme === 'dark' 
                                ? "text-emerald-300 bg-emerald-900/20 border-emerald-800/30" 
                                : "text-gray-500 bg-gray-100 border-gray-200"
                        )}>
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span>Sistem Online</span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="relative">
                            <button 
                                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                                className={cn(
                                    "p-2.5 rounded-full transition-all relative",
                                    theme === 'dark'
                                        ? "text-gray-400 hover:text-emerald-400 hover:bg-emerald-900/20"
                                        : "text-gray-400 hover:text-[#064E3B] hover:bg-emerald-50"
                                )}
                            >
                                <Bell size={22} />
                                <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                            </button>
                            <NotificationPopover 
                                isOpen={isNotificationOpen} 
                                onClose={() => setIsNotificationOpen(false)} 
                                onViewAll={() => setActiveMenu('Laporan')}
                                theme={theme}
                            />
                        </div>
                        
                        <div 
                            onClick={user.role === 'Tamu' ? () => setIsLoginModalOpen(true) : undefined}
                            className={cn(
                            "flex items-center space-x-3 pl-6 border-l group transition-colors",
                            user.role === 'Tamu' ? "cursor-pointer" : "cursor-default",
                            theme === 'dark' ? "border-zinc-800" : "border-gray-200"
                        )}>
                            <div className="text-right hidden md:block">
                                <p className={cn(
                                    "text-sm font-semibold transition-colors",
                                    theme === 'dark' ? "text-gray-200 group-hover:text-emerald-400" : "text-gray-800 group-hover:text-[#064E3B]"
                                )}>{user.name}</p>
                                <p className="text-xs text-gray-500">{user.role === 'Tamu' ? 'Viewer' : user.role === 'Admin' ? 'Administrator' : 'Staff'}</p>
                            </div>
                            <div className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center shadow-md border-2 transition-all",
                                user.role === 'Tamu' 
                                    ? theme === 'dark' ? "bg-zinc-800 text-gray-500" : "bg-gray-100 text-gray-400"
                                    : theme === 'dark'
                                        ? "bg-gradient-to-br from-emerald-600 to-emerald-900 text-emerald-100 border-zinc-800 group-hover:border-emerald-500"
                                        : "bg-gradient-to-br from-[#064E3B] to-emerald-800 text-[#D4AF37] border-white group-hover:border-[#D4AF37]/50"
                            )}>
                                {user.role === 'Tamu' ? <LogIn size={20} /> : <UserCircle size={24} />}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Scrollable Area */}
                <main className="flex-1 overflow-y-auto p-8 relative">
                    {/* Decorative Background Elements */}
                    <div className={cn(
                        "absolute top-0 left-0 w-full h-64 -z-10 transition-all duration-700",
                        theme === 'dark' ? "bg-gradient-to-b from-emerald-900/10 to-transparent" : "bg-gradient-to-b from-emerald-50/50 to-transparent"
                    )}></div>
                    <div className={cn(
                        "absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl -z-10 transition-all duration-700",
                        theme === 'dark' ? "bg-emerald-500/5" : "bg-[#D4AF37]/5"
                    )}></div>
                    <div className={cn(
                        "absolute bottom-20 left-20 w-64 h-64 rounded-full blur-3xl -z-10 transition-all duration-700",
                        theme === 'dark' ? "bg-emerald-900/10" : "bg-[#064E3B]/5"
                    )}></div>

                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="max-w-7xl mx-auto"
                    >
                        {activeMenu === 'Beranda' && (
                            <>
                                {/* Welcome Banner */}
                                <div className={cn(
                                    "mb-8 flex flex-col md:flex-row justify-between items-start md:items-center rounded-3xl p-8 text-white shadow-xl relative overflow-hidden border transition-all duration-500",
                                    theme === 'dark'
                                        ? "bg-gradient-to-r from-zinc-900 to-black border-emerald-900/30"
                                        : "bg-gradient-to-r from-[#064E3B] to-emerald-900 border-[#D4AF37]/30"
                                )}>
                                    <div className="absolute right-0 top-0 w-64 h-full bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10"></div>
                                    <div className={cn(
                                        "absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl transition-colors",
                                        theme === 'dark' ? "bg-emerald-500/10" : "bg-[#D4AF37]/20"
                                    )}></div>
                                    
                                    <div className="relative z-10">
                                        <h1 className={cn(
                                            "text-3xl font-bold mb-2 text-transparent bg-clip-text transition-all",
                                            theme === 'dark' ? "bg-gradient-to-r from-white to-emerald-400" : "bg-gradient-to-r from-white to-emerald-200"
                                        )}>
                                            Assalamu'alaikum, Ahmad!
                                        </h1>
                                        <p className={cn(
                                            "text-sm max-w-md leading-relaxed transition-colors",
                                            theme === 'dark' ? "text-gray-400" : "text-emerald-100/80"
                                        )}>
                                            Berikut adalah ringkasan aktivitas TPQ Musholla Nurul Jannah hari ini. Semoga hari Anda penuh berkah.
                                        </p>
                                    </div>
                                    
                                    <div className="mt-6 md:mt-0 relative z-10">
                                        <button 
                                            onClick={() => window.print()}
                                            className={cn(
                                            "px-6 py-3 backdrop-blur-md border rounded-xl text-white font-medium transition-all flex items-center shadow-lg",
                                            theme === 'dark' ? "bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/30" : "bg-white/10 hover:bg-white/20 border-white/20"
                                        )}>
                                            <FileText size={18} className={cn("mr-2", theme === 'dark' ? "text-emerald-400" : "text-[#D4AF37]")} />
                                            Cetak Laporan Harian
                                        </button>
                                    </div>
                                </div>

                                <DashboardStats theme={theme} />
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    <div className="lg:col-span-2">
                                        <SantriTable theme={theme} role={user.role} />
                                    </div>
                                    <div className="space-y-8">
                                        {/* Quick Actions or Notifications can go here */}
                                        <motion.div 
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: 0.6 }}
                                            className={cn(
                                                "backdrop-blur-xl rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border transition-all",
                                                theme === 'dark'
                                                    ? "bg-zinc-900/50 border-emerald-900/20"
                                                    : "bg-white/90 border-[#D4AF37]/20"
                                            )}
                                        >
                                            <h3 className={cn(
                                                "text-lg font-bold mb-4 flex items-center transition-colors",
                                                theme === 'dark' ? "text-emerald-400" : "text-[#064E3B]"
                                            )}>
                                                <span className={cn("w-1.5 h-6 rounded-full mr-2", theme === 'dark' ? "bg-emerald-500" : "bg-[#D4AF37]")}></span>
                                                Aktivitas Terbaru
                                            </h3>
                                            <div className="space-y-4">
                                                {[1, 2, 3].map((i) => (
                                                    <div key={i} className={cn(
                                                        "flex items-start space-x-3 p-3 rounded-xl transition-colors cursor-pointer border",
                                                        theme === 'dark'
                                                            ? "hover:bg-emerald-900/10 border-transparent hover:border-emerald-900/20"
                                                            : "hover:bg-gray-50 border-transparent hover:border-gray-100"
                                                    )}>
                                                        <div className={cn("w-2 h-2 mt-2 rounded-full", theme === 'dark' ? "bg-emerald-500" : "bg-[#D4AF37]")}></div>
                                                        <div>
                                                            <p className={cn("text-sm font-medium transition-colors", theme === 'dark' ? "text-gray-300" : "text-gray-800")}>Pembayaran SPP Lunas</p>
                                                            <p className="text-xs text-gray-500 mt-0.5">Ahmad Fauzi (Jilid 4) - 2 jam yang lalu</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            {user.role !== 'Tamu' && (
                                                <button 
                                                    onClick={() => setActiveMenu('Laporan')}
                                                    className={cn(
                                                        "w-full mt-4 py-2 text-sm font-medium rounded-lg transition-colors",
                                                        theme === 'dark' ? "text-emerald-400 hover:bg-emerald-900/20" : "text-[#064E3B] hover:bg-emerald-50"
                                                    )}
                                                >
                                                    Lihat Semua Aktivitas
                                                </button>
                                            )}
                                        </motion.div>
                                    </div>
                                </div>
                            </>
                        )}
 
                        {activeMenu === 'Data Santri' && <SantriManagement theme={theme} role={user.role} />}
                        {activeMenu === 'Akademik' && <AcademicManagement theme={theme} role={user.role} />}
                        {activeMenu === 'Pegawai' && <StaffManagement theme={theme} role={user.role} />}
                        {activeMenu === 'Keuangan' && <FinanceManagement theme={theme} role={user.role} />}
                        {activeMenu === 'Pembangunan' && <DevelopmentManagement theme={theme} role={user.role} />}
                        {activeMenu === 'Laporan' && <ReportManagement theme={theme} role={user.role} />}
                        {activeMenu === 'WA Gateway' && user.role === 'Admin' && <WAGatewayManagement theme={theme} />}
                        {activeMenu === 'Pengaturan' && user.role === 'Admin' && <SettingsManagement theme={theme} onThemeChange={toggleTheme} />}

                        {activeMenu !== 'Beranda' && activeMenu !== 'Data Santri' && activeMenu !== 'Akademik' && activeMenu !== 'Pegawai' && activeMenu !== 'Keuangan' && activeMenu !== 'Pembangunan' && activeMenu !== 'Laporan' && activeMenu !== 'WA Gateway' && activeMenu !== 'Pengaturan' && (
                            <div className={cn(
                                "flex items-center justify-center h-64 backdrop-blur-sm rounded-3xl border border-dashed transition-all",
                                theme === 'dark' ? "bg-zinc-900/30 border-zinc-800" : "bg-white/50 border-gray-300"
                            )}>
                                <div className="text-center text-gray-500">
                                    <BookOpen size={48} className={cn("mx-auto mb-4 transition-colors", theme === 'dark' ? "text-zinc-700" : "text-gray-300")} />
                                    <p className="text-lg font-medium">Halaman {activeMenu} sedang dalam pengembangan</p>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </main>
            </div>

            {/* AI Assistant FAB */}
            <div className="print:hidden">
                <AiAssistant theme={theme} />
            </div>

            {/* Login Modal */}
            <LoginModal 
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                onLogin={handleLogin}
                theme={theme}
            />

            {/* Komponen Cetak Laporan Harian (Hanya muncul saat print) */}
            <DailyReportPrint />
        </div>
    );
}
