import React from 'react';
import { 
    LayoutDashboard, 
    Users, 
    UserCircle, 
    BookOpen, 
    Wallet, 
    Building,
    FileText, 
    Settings,
    LogOut
} from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
    activeMenu: string;
    setActiveMenu: (menu: string) => void;
    role: 'Admin' | 'Ustadz' | 'Orang Tua';
    theme?: 'light' | 'dark';
}

export const Sidebar: React.FC<SidebarProps> = ({ activeMenu, setActiveMenu, role, theme = 'light' }) => {
    const menus = [
        { name: 'Beranda', icon: LayoutDashboard, roles: ['Admin', 'Ustadz', 'Orang Tua'] },
        { name: 'Data Santri', icon: Users, roles: ['Admin'] },
        { name: 'Pegawai', icon: UserCircle, roles: ['Admin'] },
        { name: 'Akademik', icon: BookOpen, roles: ['Admin', 'Ustadz'] },
        { name: 'Keuangan', icon: Wallet, roles: ['Admin'] },
        { name: 'Pembangunan', icon: Building, roles: ['Admin'] },
        { name: 'Laporan', icon: FileText, roles: ['Admin', 'Orang Tua'] },
        { name: 'Pengaturan', icon: Settings, roles: ['Admin'] },
    ];

    const filteredMenus = menus.filter(menu => menu.roles.includes(role));

    return (
        <div className={cn(
            "w-64 h-screen flex flex-col shadow-2xl fixed left-0 top-0 transition-all duration-500 z-50",
            theme === 'dark' 
                ? "bg-black border-r border-emerald-900/30 text-gray-300" 
                : "bg-[#064E3B] border-r border-[#D4AF37]/30 text-white"
        )}>
            <div className={cn(
                "p-6 border-b flex items-center justify-center transition-colors",
                theme === 'dark' ? "border-emerald-900/20" : "border-[#D4AF37]/20"
            )}>
                <div className="text-center">
                    <h1 className={cn(
                        "text-2xl font-bold tracking-wider uppercase transition-colors",
                        theme === 'dark' ? "text-emerald-400" : "text-[#D4AF37]"
                    )}>SIMAS</h1>
                    <p className={cn(
                        "text-xs mt-1 transition-colors",
                        theme === 'dark' ? "text-emerald-500/60" : "text-emerald-100/70"
                    )}>TPQ Nurul Jannah</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2 scrollbar-hide">
                {filteredMenus.map((menu) => (
                    <button
                        key={menu.name}
                        onClick={() => setActiveMenu(menu.name)}
                        className={cn(
                            "w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300",
                            activeMenu === menu.name 
                                ? theme === 'dark'
                                    ? "bg-emerald-900/20 border-l-4 border-emerald-500 text-emerald-400 font-medium shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]"
                                    : "bg-gradient-to-r from-[#D4AF37]/20 to-transparent border-l-4 border-[#D4AF37] text-[#D4AF37] font-medium shadow-[inset_0_0_20px_rgba(212,175,55,0.1)]" 
                                : theme === 'dark'
                                    ? "text-gray-500 hover:bg-emerald-900/10 hover:text-emerald-300"
                                    : "text-emerald-100/80 hover:bg-white/5 hover:text-white"
                        )}
                    >
                        <menu.icon size={20} className={cn(
                            "transition-colors",
                            activeMenu === menu.name 
                                ? theme === 'dark' ? "text-emerald-400" : "text-[#D4AF37]" 
                                : theme === 'dark' ? "text-gray-700" : "text-emerald-100/60"
                        )} />
                        <span>{menu.name}</span>
                    </button>
                ))}
            </div>

            <div className={cn(
                "p-4 border-t transition-colors",
                theme === 'dark' ? "border-emerald-900/20" : "border-[#D4AF37]/20"
            )}>
                <div className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-xl border mb-4 transition-all",
                    theme === 'dark'
                        ? "bg-zinc-900/50 border-emerald-900/20"
                        : "bg-black/20 border-[#D4AF37]/10"
                )}>
                    <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors",
                        theme === 'dark'
                            ? "bg-emerald-600 text-white"
                            : "bg-[#D4AF37] text-[#064E3B]"
                    )}>
                        {role.charAt(0)}
                    </div>
                    <div className="flex-1 text-left">
                        <p className={cn(
                            "text-sm font-medium transition-colors",
                            theme === 'dark' ? "text-gray-300" : "text-white"
                        )}>{role}</p>
                        <p className={cn(
                            "text-xs transition-colors",
                            theme === 'dark' ? "text-emerald-500/40" : "text-emerald-100/60"
                        )}>Active Session</p>
                    </div>
                </div>
                <button className={cn(
                    "w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors",
                    theme === 'dark' ? "text-gray-600 hover:text-red-400 hover:bg-red-400/5" : "text-emerald-100/60 hover:text-red-400 hover:bg-red-400/10"
                )}>
                    <LogOut size={18} />
                    <span className="text-sm">Keluar</span>
                </button>
            </div>
        </div>
    );
};
