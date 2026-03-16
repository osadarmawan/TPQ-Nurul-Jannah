import React from 'react';
import { 
    FileText, 
    Users, 
    BookOpen, 
    DollarSign, 
    TrendingUp, 
    Download, 
    Calendar,
    ChevronRight,
    PieChart,
    BarChart,
    Activity,
    Award
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export const ReportManagement = () => {
    const reportCards = [
        { 
            title: 'Laporan Santri', 
            desc: 'Data pertumbuhan, demografi, dan status keaktifan santri.',
            icon: Users,
            color: 'bg-blue-500',
            stats: 'Total 156 Santri'
        },
        { 
            title: 'Laporan Akademik', 
            desc: 'Rekapitulasi nilai, progress jilid, dan tingkat kelulusan.',
            icon: BookOpen,
            color: 'bg-emerald-500',
            stats: '85% Lulus Target'
        },
        { 
            title: 'Laporan Keuangan', 
            desc: 'Ringkasan pemasukan, pengeluaran, dan tunggakan SPP.',
            icon: DollarSign,
            color: 'bg-amber-500',
            stats: 'Saldo Rp 45.2M'
        },
        { 
            title: 'Laporan Pegawai', 
            desc: 'Kehadiran staf, kinerja pengajar, dan rekap payroll.',
            icon: Award,
            color: 'bg-purple-500',
            stats: '12 Staf Aktif'
        }
    ];

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-[#064E3B] tracking-tight">Pusat Laporan</h2>
                    <p className="text-gray-500 mt-1">Analisis data komprehensif untuk pengambilan keputusan yang lebih baik.</p>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="bg-white px-4 py-2 rounded-xl border border-gray-200 flex items-center space-x-2">
                        <Calendar size={18} className="text-gray-400" />
                        <span className="text-sm font-medium text-gray-600">Jan 2024 - Mar 2024</span>
                    </div>
                    <button className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-[#064E3B] text-white font-medium hover:shadow-lg transition-all shadow-emerald-900/20">
                        <Download size={18} />
                        <span>Download Semua</span>
                    </button>
                </div>
            </div>

            {/* Report Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reportCards.map((report, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-emerald-100 transition-all group cursor-pointer"
                    >
                        <div className="flex items-start justify-between mb-6">
                            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg", report.color)}>
                                <report.icon size={28} />
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
                                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase">Terupdate</span>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{report.title}</h3>
                        <p className="text-sm text-gray-500 mb-6 leading-relaxed">{report.desc}</p>
                        <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{report.stats}</span>
                            <div className="flex items-center text-[#064E3B] font-bold text-sm group-hover:translate-x-1 transition-transform">
                                <span>Buka Laporan</span>
                                <ChevronRight size={18} className="ml-1" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Analytics Summary */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center">
                        <Activity className="mr-2 text-[#D4AF37]" size={20} />
                        Ringkasan Performa TPQ
                    </h3>
                    <button className="text-sm font-bold text-emerald-600 hover:underline">Detail Analisis</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Pertumbuhan Santri</span>
                            <span className="text-sm font-bold text-emerald-600">+15%</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 w-[75%] rounded-full"></div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Tingkat Kelulusan</span>
                            <span className="text-sm font-bold text-blue-600">92%</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 w-[92%] rounded-full"></div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">Kesehatan Keuangan</span>
                            <span className="text-sm font-bold text-amber-600">Sangat Baik</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 w-[85%] rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Export Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white shadow-lg shadow-emerald-900/20">
                    <h4 className="font-bold mb-2">Cetak Rapor Santri</h4>
                    <p className="text-xs text-emerald-100 mb-4">Generate rapor untuk semua santri di semester ini.</p>
                    <button className="w-full py-2.5 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-bold transition-all">Mulai Generate</button>
                </div>
                <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-lg shadow-blue-900/20">
                    <h4 className="font-bold mb-2">Rekap Keuangan Bulanan</h4>
                    <p className="text-xs text-blue-100 mb-4">Download rekap pemasukan dan pengeluaran PDF.</p>
                    <button className="w-full py-2.5 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-bold transition-all">Download PDF</button>
                </div>
                <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-600 to-amber-800 text-white shadow-lg shadow-amber-900/20">
                    <h4 className="font-bold mb-2">Statistik Akademik</h4>
                    <p className="text-xs text-amber-100 mb-4">Export data progress santri ke format Excel.</p>
                    <button className="w-full py-2.5 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-bold transition-all">Export Excel</button>
                </div>
            </div>
        </div>
    );
};
