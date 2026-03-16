import React from 'react';
import { Users, BookOpen, Wallet, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

import { cn } from '../lib/utils';

interface DashboardStatsProps {
    theme?: 'light' | 'dark';
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ theme = 'light' }) => {
    const stats = [
        { title: 'Total Santri', value: '452', icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        { title: 'Pegawai Aktif', value: '24', icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { title: 'Pemasukan Bulan Ini', value: 'Rp 12.5M', icon: Wallet, color: 'text-[#D4AF37]', bg: 'bg-[#D4AF37]/10' },
        { title: 'Tingkat Kelulusan', value: '98%', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={cn(
                        "relative overflow-hidden rounded-2xl backdrop-blur-xl border shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 group transition-all duration-500",
                        theme === 'dark'
                            ? "bg-zinc-900/50 border-emerald-900/20 hover:shadow-[0_8px_30px_rgba(16,185,129,0.1)]"
                            : "bg-white/80 border-[#D4AF37]/30 hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)]"
                    )}
                >
                    <div className={cn(
                        "absolute -right-4 -top-4 w-24 h-24 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500",
                        theme === 'dark' ? "bg-emerald-900/20" : "bg-[#D4AF37]/20"
                    )}></div>
                    <div className="flex items-center justify-between relative z-10">
                        <div>
                            <p className={cn(
                                "text-sm font-medium mb-1 transition-colors",
                                theme === 'dark' ? "text-gray-500" : "text-gray-500"
                            )}>{stat.title}</p>
                            <h3 className={cn(
                                "text-3xl font-bold transition-colors",
                                theme === 'dark' ? "text-emerald-400" : "text-[#064E3B]"
                            )}>{stat.value}</h3>
                        </div>
                        <div className={cn(
                            `w-14 h-14 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color} shadow-inner transition-all`,
                            theme === 'dark' ? "border border-emerald-900/30" : ""
                        )}>
                            <stat.icon size={28} strokeWidth={1.5} />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <span className="text-emerald-500 font-medium flex items-center">
                            <TrendingUp size={14} className="mr-1" />
                            +2.5%
                        </span>
                        <span className={cn(
                            "ml-2 transition-colors",
                            theme === 'dark' ? "text-gray-600" : "text-gray-400"
                        )}>dari bulan lalu</span>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};
