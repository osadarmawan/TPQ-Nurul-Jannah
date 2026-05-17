import React, { useState } from 'react';
import { 
    BookOpen, 
    TrendingUp, 
    Calendar, 
    Award, 
    Search, 
    Filter, 
    ChevronRight, 
    CheckCircle2, 
    Clock, 
    BarChart3,
    Plus,
    MoreVertical,
    ArrowUpRight,
    BookMarked,
    FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';

const PROGRESS_DATA = [
    { name: 'Jan', lulus: 12, aktif: 85 },
    { name: 'Feb', lulus: 18, aktif: 88 },
    { name: 'Mar', lulus: 15, aktif: 92 },
    { name: 'Apr', lulus: 22, aktif: 95 },
    { name: 'Mei', lulus: 30, aktif: 105 },
    { name: 'Jun', lulus: 25, aktif: 112 },
];

const JILID_STATS = [
    { name: 'Jilid 1', count: 25, color: '#3B82F6' },
    { name: 'Jilid 2', count: 20, color: '#10B981' },
    { name: 'Jilid 3', count: 18, color: '#F59E0B' },
    { name: 'Jilid 4', count: 15, color: '#EF4444' },
    { name: 'Jilid 5', count: 12, color: '#8B5CF6' },
    { name: 'Jilid 6', count: 10, color: '#EC4899' },
    { name: 'Al-Quran', count: 28, color: '#064E3B' },
];

const RECENT_ASSESSMENTS = [
    { id: 1, nama: 'Ahmad Fauzi', jilid: '4', materi: 'Surah Al-Mulk', nilai: 'A', tanggal: '14 Mar 2026', ustadz: 'Ustadz Mansur' },
    { id: 2, nama: 'Siti Aminah', jilid: '6', materi: 'Ghorib & Musykilat', nilai: 'B+', tanggal: '13 Mar 2026', ustadz: 'Ustadzah Fatimah' },
    { id: 3, nama: 'Budi Doremi', jilid: '1', materi: 'Halaman 15-20', nilai: 'A-', tanggal: '13 Mar 2026', ustadz: 'Ustadz Ali' },
    { id: 4, nama: 'Farah Quinn', jilid: 'Al-Quran', materi: 'Juz 25', nilai: 'A', tanggal: '12 Mar 2026', ustadz: 'Ustadzah Fatimah' },
];

import { UserRole } from '../types';

export const AcademicManagement = ({ theme, role }: { theme: 'light' | 'dark', role: UserRole }) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'kurikulum' | 'ujian'>('overview');

    const tabs = [
        { id: 'overview', label: 'Ikhtisar', icon: BarChart3 },
        { id: 'progress', label: 'Progress Santri', icon: TrendingUp },
        { id: 'kurikulum', label: 'Kurikulum', icon: BookMarked },
        { id: 'ujian', label: 'Jadwal Ujian', icon: Calendar },
    ];

    return (
        <div className="space-y-8 pb-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-[#064E3B] tracking-tight">Manajemen Akademik</h2>
                    <p className="text-gray-500 mt-1">Pantau perkembangan hafalan dan bacaan santri secara real-time.</p>
                </div>
                <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all">
                        <FileText size={18} />
                        <span className="text-sm font-medium">Laporan Akademik</span>
                    </button>
                    {(role === 'Admin' || role === 'Pegawai') && (
                        <button className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-[#064E3B] text-white font-medium hover:shadow-lg transition-all shadow-emerald-900/20">
                            <Plus size={18} />
                            <span>Input Nilai Baru</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center space-x-1 p-1 bg-gray-100/50 rounded-2xl w-fit border border-gray-200">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={cn(
                            "flex items-center space-x-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
                            activeTab === tab.id 
                                ? "bg-white text-[#064E3B] shadow-sm border border-gray-100" 
                                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                        )}
                    >
                        <tab.icon size={18} />
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                    <motion.div
                        key="overview"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-8"
                    >
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Chart Card */}
                            <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800">Tren Kelulusan Jilid</h3>
                                        <p className="text-sm text-gray-500">Data kelulusan santri per bulan</p>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-3 h-3 rounded-full bg-[#064E3B]"></div>
                                            <span className="text-xs font-medium text-gray-500">Lulus</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-3 h-3 rounded-full bg-emerald-200"></div>
                                            <span className="text-xs font-medium text-gray-500">Aktif</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={PROGRESS_DATA}>
                                            <defs>
                                                <linearGradient id="colorLulus" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#064E3B" stopOpacity={0.1}/>
                                                    <stop offset="95%" stopColor="#064E3B" stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                                            <XAxis 
                                                dataKey="name" 
                                                axisLine={false} 
                                                tickLine={false} 
                                                tick={{ fill: '#9CA3AF', fontSize: 12 }} 
                                                dy={10}
                                            />
                                            <YAxis 
                                                axisLine={false} 
                                                tickLine={false} 
                                                tick={{ fill: '#9CA3AF', fontSize: 12 }} 
                                            />
                                            <Tooltip 
                                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                            />
                                            <Area 
                                                type="monotone" 
                                                dataKey="lulus" 
                                                stroke="#064E3B" 
                                                strokeWidth={3}
                                                fillOpacity={1} 
                                                fill="url(#colorLulus)" 
                                            />
                                            <Line 
                                                type="monotone" 
                                                dataKey="aktif" 
                                                stroke="#A7F3D0" 
                                                strokeWidth={2}
                                                dot={false}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Distribution Card */}
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-800 mb-6">Distribusi Jilid</h3>
                                <div className="space-y-5">
                                    {JILID_STATS.map((jilid, i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="font-medium text-gray-600">{jilid.name}</span>
                                                <span className="font-bold text-gray-900">{jilid.count} Santri</span>
                                            </div>
                                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                                <motion.div 
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${(jilid.count / 30) * 100}%` }}
                                                    transition={{ duration: 1, delay: i * 0.1 }}
                                                    className="h-full rounded-full"
                                                    style={{ backgroundColor: jilid.color }}
                                                ></motion.div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full mt-8 py-3 text-sm font-bold text-[#064E3B] bg-emerald-50 rounded-2xl hover:bg-emerald-100 transition-colors">
                                    Lihat Detail Kurikulum
                                </button>
                            </div>
                        </div>

                        {/* Recent Assessments Table */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                <h3 className="text-lg font-bold text-gray-800">Penilaian Terbaru</h3>
                                <button className="text-sm font-bold text-[#064E3B] hover:underline">Lihat Semua</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50/50 text-gray-400 text-[11px] uppercase tracking-widest font-bold border-b border-gray-100">
                                            <th className="px-6 py-4">Santri</th>
                                            <th className="px-6 py-4">Jilid</th>
                                            <th className="px-6 py-4">Materi</th>
                                            <th className="px-6 py-4">Nilai</th>
                                            <th className="px-6 py-4">Ustadz/ah</th>
                                            <th className="px-6 py-4">Tanggal</th>
                                            {role !== 'Tamu' && <th className="px-6 py-4 text-right">Aksi</th>}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {RECENT_ASSESSMENTS.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-[#064E3B] font-bold text-xs">
                                                            {item.nama.charAt(0)}
                                                        </div>
                                                        <span className="text-sm font-bold text-gray-800">{item.nama}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="px-2 py-1 rounded-lg bg-gray-100 text-gray-600 text-xs font-bold">
                                                        {item.jilid}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{item.materi}</td>
                                                <td className="px-6 py-4">
                                                    <span className={cn(
                                                        "px-2.5 py-1 rounded-full text-xs font-bold",
                                                        item.nilai.startsWith('A') ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"
                                                    )}>
                                                        {item.nilai}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">{item.ustadz}</td>
                                                <td className="px-6 py-4 text-sm text-gray-400">{item.tanggal}</td>
                                                {role !== 'Tamu' && (
                                                    <td className="px-6 py-4 text-right">
                                                        <button className="p-2 text-gray-400 hover:text-[#064E3B] hover:bg-emerald-50 rounded-lg transition-colors">
                                                            <ArrowUpRight size={18} />
                                                        </button>
                                                    </td>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'progress' && (
                    <motion.div
                        key="progress"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex flex-col items-center justify-center p-20 bg-white rounded-3xl border border-dashed border-gray-200"
                    >
                        <TrendingUp size={48} className="text-gray-300 mb-4" />
                        <h3 className="text-xl font-bold text-gray-800">Modul Progress Santri</h3>
                        <p className="text-gray-500 max-w-md text-center mt-2">
                            Halaman ini akan menampilkan grafik perkembangan individual santri, target hafalan, dan pencapaian kompetensi.
                        </p>
                        <button className="mt-6 px-6 py-2.5 bg-[#064E3B] text-white rounded-xl font-medium">
                            Buka Dashboard Progress
                        </button>
                    </motion.div>
                )}

                {activeTab === 'kurikulum' && (
                    <motion.div
                        key="kurikulum"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {JILID_STATS.map((jilid, i) => (
                            <motion.div 
                                key={i}
                                whileHover={{ y: -5 }}
                                className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group cursor-pointer"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <BookMarked size={80} />
                                </div>
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: jilid.color }}>
                                        <BookOpen size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-800">{jilid.name}</h4>
                                        <p className="text-xs text-gray-500">Standar Kompetensi</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                                        <CheckCircle2 size={16} className="text-emerald-500" />
                                        <span>Pengenalan Huruf Hijaiyah</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                                        <CheckCircle2 size={16} className="text-emerald-500" />
                                        <span>Makharijul Huruf Dasar</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                                        <Clock size={16} className="text-amber-500" />
                                        <span>Target: 3-4 Bulan</span>
                                    </div>
                                </div>
                                <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">12 Materi Utama</span>
                                    <ChevronRight size={18} className="text-gray-300" />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {activeTab === 'ujian' && (
                    <motion.div
                        key="ujian"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center"
                    >
                        <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 mb-6">
                            <Calendar size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">Jadwal Ujian Munaqosyah</h3>
                        <p className="text-gray-500 max-w-md mt-2">
                            Belum ada jadwal ujian yang dibuat. Silakan buat jadwal ujian baru untuk santri yang sudah memenuhi target kurikulum.
                        </p>
                        <div className="flex items-center space-x-4 mt-8">
                            <button className="px-8 py-3 bg-[#064E3B] text-white rounded-2xl font-bold shadow-lg shadow-emerald-900/20">
                                Buat Jadwal Baru
                            </button>
                            <button className="px-8 py-3 border border-gray-200 text-gray-600 rounded-2xl font-bold hover:bg-gray-50">
                                Lihat Riwayat Ujian
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
