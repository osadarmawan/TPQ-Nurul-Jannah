import React, { useState, useEffect, useMemo } from 'react';
import { 
    Building, 
    Hammer, 
    Calendar, 
    TrendingUp, 
    CheckCircle2, 
    Clock, 
    Plus,
    MoreVertical,
    ArrowUpRight,
    ArrowDownRight,
    Wallet,
    AlertCircle,
    FileText,
    Search,
    Filter,
    Download,
    PieChart,
    Loader2,
    XCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserRole } from '../types';
import { cn } from '../lib/utils';
import { dbService } from '../services/dbService';

interface DevelopmentManagementProps {
    theme?: 'light' | 'dark';
    role: UserRole;
}

const FINANCE_TRANSACTIONS = [
    { id: 1, date: '15 Mar 2026', description: 'Pembelian Semen & Pasir', project: 'Asrama Baru', category: 'Material', type: 'expense', amount: 15000000 },
    { id: 2, date: '10 Mar 2026', description: 'Pembayaran Termin 1', project: 'Asrama Baru', category: 'Jasa', type: 'expense', amount: 100000000 },
    { id: 3, date: '05 Mar 2026', description: 'Donasi Hamba Allah', project: 'Asrama Baru', category: 'Pemasukan', type: 'income', amount: 50000000 },
    { id: 4, date: '28 Feb 2026', description: 'Pelunasan Renovasi', project: 'Renovasi Kelas', category: 'Jasa', type: 'expense', amount: 45000000 },
];

const RECENT_REPORTS = [
    { id: 1, name: 'Laporan Progres Fisik - Asrama Baru (Maret)', type: 'PDF', date: '16 Mar 2026', size: '2.4 MB' },
    { id: 2, name: 'LPJ Renovasi Ruang Kelas Jilid 1-3', type: 'PDF', date: '01 Mar 2026', size: '5.1 MB' },
    { id: 3, name: 'Rekapitulasi Keuangan Pembangunan Q1 2026', type: 'Excel', date: '28 Feb 2026', size: '1.2 MB' },
];

import { DevelopmentModal } from './Modals';

export const DevelopmentManagement: React.FC<DevelopmentManagementProps> = ({ theme = 'light', role }) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'finances' | 'reports'>('overview');
    const [projects, setProjects] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<any>(null);

    const fetchProjects = async () => {
        try {
            setIsLoading(true);
            const data = await dbService.read('Development');
            setProjects(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching projects:', err);
            setError('Gagal memuat data pembangunan.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (formData: any) => {
        setIsLoading(true);
        try {
            if (selectedProject) {
                await dbService.update('Development', selectedProject.id, formData);
            } else {
                await dbService.create('Development', { ...formData, id: Date.now() });
            }
            setIsModalOpen(false);
            setSelectedProject(null);
            fetchProjects();
        } catch (err) {
            console.error('Failed to save development data:', err);
            alert('Gagal menyimpan data pembangunan: ' + err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const tabs = [
        { id: 'overview', label: 'Ikhtisar', icon: Building },
        { id: 'projects', label: 'Daftar Proyek', icon: Hammer },
        { id: 'finances', label: 'Keuangan', icon: Wallet },
        { id: 'reports', label: 'Laporan', icon: FileText },
    ];

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
    };

    return (
        <div className="space-y-8 pb-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className={cn("text-3xl font-bold tracking-tight transition-colors", theme === 'dark' ? "text-emerald-400" : "text-[#064E3B]")}>
                        Manajemen Pembangunan
                    </h2>
                    <p className={cn("mt-1 transition-colors", theme === 'dark' ? "text-gray-400" : "text-gray-500")}>
                        Pantau progres proyek pembangunan, renovasi, dan anggaran infrastruktur TPQ.
                    </p>
                </div>
                <div className="flex items-center space-x-3">
                    <button className={cn(
                        "flex items-center space-x-2 px-4 py-2.5 rounded-xl border transition-all",
                        theme === 'dark' 
                            ? "border-emerald-900/30 text-gray-300 hover:bg-emerald-900/20" 
                            : "border-gray-200 text-gray-600 hover:bg-gray-50"
                    )}>
                        <FileText size={18} />
                        <span className="text-sm font-medium">Unduh Laporan</span>
                    </button>
                    {role === 'Admin' && (
                        <button 
                            onClick={() => {
                                setSelectedProject(null);
                                setIsModalOpen(true);
                            }}
                            className={cn(
                                "flex items-center space-x-2 px-6 py-2.5 rounded-xl font-medium transition-all shadow-lg",
                                theme === 'dark'
                                    ? "bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-900/20"
                                    : "bg-[#064E3B] text-white hover:bg-emerald-800 shadow-emerald-900/20"
                            )}
                        >
                            <Plus size={18} />
                            <span>Proyek Baru</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className={cn(
                "flex items-center space-x-1 p-1 rounded-2xl w-fit border transition-colors",
                theme === 'dark' ? "bg-zinc-900/50 border-emerald-900/20" : "bg-gray-100/50 border-gray-200"
            )}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={cn(
                            "flex items-center space-x-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
                            activeTab === tab.id 
                                ? theme === 'dark'
                                    ? "bg-emerald-900/40 text-emerald-400 shadow-sm border border-emerald-800/50"
                                    : "bg-white text-[#064E3B] shadow-sm border border-gray-100" 
                                : theme === 'dark'
                                    ? "text-gray-500 hover:text-gray-300 hover:bg-zinc-800/50"
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
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className={cn(
                                "p-6 rounded-3xl border transition-all",
                                theme === 'dark' ? "bg-zinc-900/50 border-emerald-900/20" : "bg-white border-gray-100 shadow-sm"
                            )}>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className={cn("text-sm font-medium", theme === 'dark' ? "text-gray-400" : "text-gray-500")}>Total Anggaran Aktif</h3>
                                    <div className={cn("p-2 rounded-lg", theme === 'dark' ? "bg-emerald-900/30 text-emerald-400" : "bg-emerald-50 text-[#064E3B]")}>
                                        <Wallet size={20} />
                                    </div>
                                </div>
                                <p className={cn("text-3xl font-bold", theme === 'dark' ? "text-gray-100" : "text-gray-900")}>{formatCurrency(725000000)}</p>
                                <div className="mt-4 flex items-center text-sm">
                                    <TrendingUp size={16} className="text-emerald-500 mr-1" />
                                    <span className="text-emerald-500 font-medium">+12.5%</span>
                                    <span className={cn("ml-2", theme === 'dark' ? "text-gray-500" : "text-gray-400")}>dari tahun lalu</span>
                                </div>
                            </div>

                            <div className={cn(
                                "p-6 rounded-3xl border transition-all",
                                theme === 'dark' ? "bg-zinc-900/50 border-emerald-900/20" : "bg-white border-gray-100 shadow-sm"
                            )}>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className={cn("text-sm font-medium", theme === 'dark' ? "text-gray-400" : "text-gray-500")}>Proyek Berjalan</h3>
                                    <div className={cn("p-2 rounded-lg", theme === 'dark' ? "bg-blue-900/30 text-blue-400" : "bg-blue-50 text-blue-600")}>
                                        <Hammer size={20} />
                                    </div>
                                </div>
                                <p className={cn("text-3xl font-bold", theme === 'dark' ? "text-gray-100" : "text-gray-900")}>3 Proyek</p>
                                <div className="mt-4 flex items-center text-sm">
                                    <span className={cn("font-medium", theme === 'dark' ? "text-gray-300" : "text-gray-600")}>1 Selesai, 1 Perencanaan</span>
                                </div>
                            </div>

                            <div className={cn(
                                "p-6 rounded-3xl border transition-all",
                                theme === 'dark' ? "bg-zinc-900/50 border-emerald-900/20" : "bg-white border-gray-100 shadow-sm"
                            )}>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className={cn("text-sm font-medium", theme === 'dark' ? "text-gray-400" : "text-gray-500")}>Dana Terserap</h3>
                                    <div className={cn("p-2 rounded-lg", theme === 'dark' ? "bg-amber-900/30 text-amber-400" : "bg-amber-50 text-amber-600")}>
                                        <TrendingUp size={20} />
                                    </div>
                                </div>
                                <p className={cn("text-3xl font-bold", theme === 'dark' ? "text-gray-100" : "text-gray-900")}>{formatCurrency(477500000)}</p>
                                <div className="mt-4 w-full bg-gray-200 rounded-full h-1.5 dark:bg-zinc-800">
                                    <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                                </div>
                                <p className={cn("text-xs mt-2", theme === 'dark' ? "text-gray-500" : "text-gray-400")}>65% dari total anggaran</p>
                            </div>
                        </div>

                        {/* Projects List */}
                        <div className={cn(
                            "rounded-3xl border overflow-hidden transition-all",
                            theme === 'dark' ? "bg-zinc-900/50 border-emerald-900/20" : "bg-white border-gray-100 shadow-sm"
                        )}>
                            <div className={cn(
                                "p-6 border-b flex items-center justify-between",
                                theme === 'dark' ? "border-emerald-900/20" : "border-gray-100"
                            )}>
                                <h3 className={cn("text-lg font-bold", theme === 'dark' ? "text-gray-100" : "text-gray-800")}>Status Proyek Terkini</h3>
                                <button className={cn(
                                    "text-sm font-bold hover:underline",
                                    theme === 'dark' ? "text-emerald-400" : "text-[#064E3B]"
                                )}>Lihat Semua</button>
                            </div>
                            <div className="p-6 space-y-6">
                                {isLoading && projects.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center p-12 text-center">
                                        <Loader2 size={32} className="text-emerald-500 animate-spin mb-3" />
                                        <p className="text-sm text-gray-500 font-medium">Memuat data pembangunan...</p>
                                    </div>
                                ) : error ? (
                                    <div className="flex flex-col items-center justify-center p-12 text-center">
                                        <XCircle size={32} className="text-red-500 mb-3" />
                                        <p className="text-red-600 font-bold mb-1 text-sm">Terjadi Kesalahan</p>
                                        <button 
                                            onClick={fetchProjects}
                                            className="mt-4 px-4 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-medium"
                                        >
                                            Coba Lagi
                                        </button>
                                    </div>
                                ) : projects.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center p-12 text-center">
                                        <Building size={32} className="text-gray-300 mb-3" />
                                        <p className="text-sm text-gray-500 font-medium">Belum ada data proyek pembangunan.</p>
                                    </div>
                                ) : (
                                    projects.slice(0, 3).map((project) => (
                                        <div key={project.id} className={cn(
                                            "p-5 rounded-2xl border transition-all hover:shadow-md",
                                            theme === 'dark' 
                                                ? "bg-black/20 border-emerald-900/20 hover:border-emerald-500/30" 
                                                : "bg-gray-50/50 border-gray-100 hover:border-emerald-200"
                                        )}>
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                                <div>
                                                    <div className="flex items-center space-x-3 mb-1">
                                                        <h4 className={cn("text-lg font-bold", theme === 'dark' ? "text-gray-200" : "text-gray-800")}>{project.name}</h4>
                                                        <span className={cn(
                                                            "px-2.5 py-1 rounded-full text-xs font-bold",
                                                            project.status === 'Completed' ? (theme === 'dark' ? "bg-emerald-900/30 text-emerald-400" : "bg-emerald-100 text-emerald-700") :
                                                            project.status === 'In Progress' ? (theme === 'dark' ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-700") :
                                                            (theme === 'dark' ? "bg-amber-900/30 text-amber-400" : "bg-amber-100 text-amber-700")
                                                        )}>
                                                            {project.status}
                                                        </span>
                                                    </div>
                                                    <p className={cn("text-sm", theme === 'dark' ? "text-gray-500" : "text-gray-500")}>Pelaksana: {project.contractor}</p>
                                                </div>
                                                <div className="flex items-center space-x-4 text-sm">
                                                    <div className="flex flex-col items-end">
                                                        <span className={cn("font-medium", theme === 'dark' ? "text-gray-400" : "text-gray-500")}>Anggaran</span>
                                                        <span className={cn("font-bold", theme === 'dark' ? "text-gray-200" : "text-gray-900")}>{formatCurrency(project.budget)}</span>
                                                    </div>
                                                    <button className={cn(
                                                        "p-2 rounded-lg transition-colors",
                                                        theme === 'dark' ? "text-gray-400 hover:text-emerald-400 hover:bg-emerald-900/20" : "text-gray-400 hover:text-[#064E3B] hover:bg-emerald-50"
                                                    )}>
                                                        <ArrowUpRight size={20} />
                                                    </button>
                                                </div>
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className={cn("font-medium", theme === 'dark' ? "text-gray-400" : "text-gray-600")}>Progress: {project.progress}%</span>
                                                    <span className={cn("font-medium", theme === 'dark' ? "text-gray-400" : "text-gray-600")}>{project.startDate} - {project.endDate}</span>
                                                </div>
                                                <div className={cn("h-2 w-full rounded-full overflow-hidden", theme === 'dark' ? "bg-zinc-800" : "bg-gray-200")}>
                                                    <motion.div 
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${project.progress}%` }}
                                                        transition={{ duration: 1, delay: 0.2 }}
                                                        className={cn(
                                                            "h-full rounded-full",
                                                            project.progress === 100 ? "bg-emerald-500" : "bg-blue-500"
                                                        )}
                                                    ></motion.div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'projects' && (
                    <motion.div
                        key="projects"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input 
                                    type="text" 
                                    placeholder="Cari proyek..." 
                                    className={cn(
                                        "w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all",
                                        theme === 'dark' ? "bg-zinc-900/50 border-emerald-900/20 text-gray-200 placeholder-gray-500" : "bg-white border-gray-200 text-gray-800"
                                    )}
                                />
                            </div>
                            <div className="flex items-center space-x-3">
                                <button className={cn(
                                    "flex items-center space-x-2 px-4 py-2.5 rounded-xl border transition-all",
                                    theme === 'dark' ? "border-emerald-900/30 text-gray-300 hover:bg-emerald-900/20" : "border-gray-200 text-gray-600 hover:bg-gray-50"
                                )}>
                                    <Filter size={18} />
                                    <span className="text-sm font-medium">Filter</span>
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {isLoading && projects.length === 0 ? (
                                <div className="col-span-2 flex flex-col items-center justify-center p-20">
                                    <Loader2 size={40} className="text-emerald-500 animate-spin mb-4" />
                                    <p className="text-gray-500 font-medium">Memuat data proyek...</p>
                                </div>
                            ) : error ? (
                                <div className="col-span-2 flex flex-col items-center justify-center p-20 text-center">
                                    <XCircle size={40} className="text-red-500 mb-4" />
                                    <p className="text-red-600 font-bold mb-2">Terjadi Kesalahan</p>
                                    <button 
                                        onClick={fetchProjects}
                                        className="mt-6 px-6 py-2 bg-emerald-600 text-white rounded-xl font-medium"
                                    >
                                        Coba Lagi
                                    </button>
                                </div>
                            ) : projects.map((project) => (
                                <div key={project.id} className={cn(
                                    "p-6 rounded-3xl border transition-all hover:shadow-md",
                                    theme === 'dark' ? "bg-zinc-900/50 border-emerald-900/20 hover:border-emerald-500/30" : "bg-white border-gray-100 hover:border-emerald-200"
                                )}>
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className={cn(
                                                "inline-block px-2.5 py-1 rounded-full text-xs font-bold mb-3",
                                                project.status === 'Completed' ? (theme === 'dark' ? "bg-emerald-900/30 text-emerald-400" : "bg-emerald-100 text-emerald-700") :
                                                project.status === 'In Progress' ? (theme === 'dark' ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-700") :
                                                (theme === 'dark' ? "bg-amber-900/30 text-amber-400" : "bg-amber-100 text-amber-700")
                                            )}>
                                                {project.status}
                                            </span>
                                            <h4 className={cn("text-xl font-bold mb-1", theme === 'dark' ? "text-gray-100" : "text-gray-800")}>{project.name}</h4>
                                            <p className={cn("text-sm", theme === 'dark' ? "text-gray-400" : "text-gray-500")}>Pelaksana: {project.contractor}</p>
                                        </div>
                                        {role !== 'Tamu' && (
                                            <button className={cn("p-2 rounded-lg transition-colors", theme === 'dark' ? "text-gray-400 hover:bg-zinc-800" : "text-gray-400 hover:bg-gray-100")}>
                                                <MoreVertical size={20} />
                                            </button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className={cn("p-3 rounded-xl", theme === 'dark' ? "bg-zinc-800/50" : "bg-gray-50")}>
                                            <p className={cn("text-xs mb-1", theme === 'dark' ? "text-gray-500" : "text-gray-500")}>Anggaran</p>
                                            <p className={cn("font-bold", theme === 'dark' ? "text-gray-200" : "text-gray-800")}>{formatCurrency(project.budget)}</p>
                                        </div>
                                        <div className={cn("p-3 rounded-xl", theme === 'dark' ? "bg-zinc-800/50" : "bg-gray-50")}>
                                            <p className={cn("text-xs mb-1", theme === 'dark' ? "text-gray-500" : "text-gray-500")}>Terserap</p>
                                            <p className={cn("font-bold", theme === 'dark' ? "text-gray-200" : "text-gray-800")}>{formatCurrency(project.spent)}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2 mb-6">
                                        <div className="flex justify-between text-sm">
                                            <span className={cn("font-medium", theme === 'dark' ? "text-gray-300" : "text-gray-700")}>Progress Fisik</span>
                                            <span className={cn("font-bold", theme === 'dark' ? "text-emerald-400" : "text-[#064E3B]")}>{project.progress}%</span>
                                        </div>
                                        <div className={cn("h-2 w-full rounded-full overflow-hidden", theme === 'dark' ? "bg-zinc-800" : "bg-gray-200")}>
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: `${project.progress}%` }}
                                                transition={{ duration: 1 }}
                                                className={cn("h-full rounded-full", project.progress === 100 ? "bg-emerald-500" : "bg-blue-500")}
                                            ></motion.div>
                                        </div>
                                    </div>

                                    <div className={cn("flex items-center justify-between pt-4 border-t", theme === 'dark' ? "border-emerald-900/20" : "border-gray-100")}>
                                        <div className="flex items-center space-x-2 text-sm">
                                            <Calendar size={16} className={theme === 'dark' ? "text-gray-500" : "text-gray-400"} />
                                            <span className={theme === 'dark' ? "text-gray-400" : "text-gray-600"}>{project.startDate} - {project.endDate}</span>
                                        </div>
                                        <button className={cn("text-sm font-bold hover:underline", theme === 'dark' ? "text-emerald-400" : "text-[#064E3B]")}>
                                            Detail Proyek
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {activeTab === 'finances' && (
                    <motion.div
                        key="finances"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        {/* Finance Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className={cn("p-6 rounded-3xl border", theme === 'dark' ? "bg-zinc-900/50 border-emerald-900/20" : "bg-white border-gray-100 shadow-sm")}>
                                <p className={cn("text-sm font-medium mb-2", theme === 'dark' ? "text-gray-400" : "text-gray-500")}>Total Pemasukan Proyek</p>
                                <p className={cn("text-2xl font-bold", theme === 'dark' ? "text-emerald-400" : "text-[#064E3B]")}>{formatCurrency(850000000)}</p>
                            </div>
                            <div className={cn("p-6 rounded-3xl border", theme === 'dark' ? "bg-zinc-900/50 border-emerald-900/20" : "bg-white border-gray-100 shadow-sm")}>
                                <p className={cn("text-sm font-medium mb-2", theme === 'dark' ? "text-gray-400" : "text-gray-500")}>Total Pengeluaran</p>
                                <p className={cn("text-2xl font-bold", theme === 'dark' ? "text-rose-400" : "text-rose-600")}>{formatCurrency(477500000)}</p>
                            </div>
                            <div className={cn("p-6 rounded-3xl border", theme === 'dark' ? "bg-zinc-900/50 border-emerald-900/20" : "bg-white border-gray-100 shadow-sm")}>
                                <p className={cn("text-sm font-medium mb-2", theme === 'dark' ? "text-gray-400" : "text-gray-500")}>Saldo Tersedia</p>
                                <p className={cn("text-2xl font-bold", theme === 'dark' ? "text-gray-100" : "text-gray-900")}>{formatCurrency(372500000)}</p>
                            </div>
                        </div>

                        {/* Transactions Table */}
                        <div className={cn("rounded-3xl border overflow-hidden", theme === 'dark' ? "bg-zinc-900/50 border-emerald-900/20" : "bg-white border-gray-100 shadow-sm")}>
                            <div className={cn("p-6 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4", theme === 'dark' ? "border-emerald-900/20" : "border-gray-100")}>
                                <h3 className={cn("text-lg font-bold", theme === 'dark' ? "text-gray-100" : "text-gray-800")}>Riwayat Transaksi</h3>
                                <button className={cn(
                                    "flex items-center justify-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all",
                                    theme === 'dark' ? "bg-emerald-900/40 text-emerald-400 hover:bg-emerald-900/60" : "bg-emerald-50 text-[#064E3B] hover:bg-emerald-100"
                                )}>
                                    <Plus size={18} />
                                    <span>Catat Transaksi</span>
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className={cn("text-[11px] uppercase tracking-widest font-bold border-b", theme === 'dark' ? "bg-zinc-900/50 text-gray-500 border-emerald-900/20" : "bg-gray-50/50 text-gray-400 border-gray-100")}>
                                            <th className="px-6 py-4">Tanggal</th>
                                            <th className="px-6 py-4">Deskripsi</th>
                                            <th className="px-6 py-4">Proyek</th>
                                            <th className="px-6 py-4">Kategori</th>
                                            <th className="px-6 py-4 text-right">Jumlah</th>
                                        </tr>
                                    </thead>
                                    <tbody className={cn("divide-y", theme === 'dark' ? "divide-emerald-900/20" : "divide-gray-50")}>
                                        {FINANCE_TRANSACTIONS.map((trx) => (
                                            <tr key={trx.id} className={cn("transition-colors", theme === 'dark' ? "hover:bg-zinc-800/30" : "hover:bg-gray-50/50")}>
                                                <td className={cn("px-6 py-4 text-sm", theme === 'dark' ? "text-gray-400" : "text-gray-500")}>{trx.date}</td>
                                                <td className="px-6 py-4">
                                                    <p className={cn("text-sm font-bold", theme === 'dark' ? "text-gray-200" : "text-gray-800")}>{trx.description}</p>
                                                </td>
                                                <td className={cn("px-6 py-4 text-sm", theme === 'dark' ? "text-gray-400" : "text-gray-600")}>{trx.project}</td>
                                                <td className="px-6 py-4">
                                                    <span className={cn(
                                                        "px-2.5 py-1 rounded-lg text-xs font-bold",
                                                        theme === 'dark' ? "bg-zinc-800 text-gray-300" : "bg-gray-100 text-gray-600"
                                                    )}>
                                                        {trx.category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end space-x-2">
                                                        {trx.type === 'income' ? (
                                                            <ArrowDownRight size={16} className="text-emerald-500" />
                                                        ) : (
                                                            <ArrowUpRight size={16} className="text-rose-500" />
                                                        )}
                                                        <span className={cn(
                                                            "text-sm font-bold",
                                                            trx.type === 'income' 
                                                                ? (theme === 'dark' ? "text-emerald-400" : "text-emerald-600")
                                                                : (theme === 'dark' ? "text-rose-400" : "text-rose-600")
                                                        )}>
                                                            {trx.type === 'income' ? '+' : '-'}{formatCurrency(trx.amount)}
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                )}
                
                {activeTab === 'reports' && (
                    <motion.div
                        key="reports"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { title: 'Laporan Progres Fisik', desc: 'Dokumentasi & persentase pembangunan', icon: Building, color: 'blue' },
                                { title: 'Laporan Keuangan', desc: 'Rekapitulasi RAB & realisasi anggaran', icon: PieChart, color: 'emerald' },
                                { title: 'Laporan Evaluasi', desc: 'Analisis kendala & rekomendasi', icon: AlertCircle, color: 'amber' }
                            ].map((report, i) => (
                                <div key={i} className={cn(
                                    "p-6 rounded-3xl border transition-all hover:shadow-md cursor-pointer group",
                                    theme === 'dark' ? "bg-zinc-900/50 border-emerald-900/20 hover:border-emerald-500/30" : "bg-white border-gray-100 hover:border-emerald-200"
                                )}>
                                    <div className={cn(
                                        "w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110",
                                        report.color === 'blue' ? (theme === 'dark' ? "bg-blue-900/30 text-blue-400" : "bg-blue-50 text-blue-600") :
                                        report.color === 'emerald' ? (theme === 'dark' ? "bg-emerald-900/30 text-emerald-400" : "bg-emerald-50 text-emerald-600") :
                                        (theme === 'dark' ? "bg-amber-900/30 text-amber-400" : "bg-amber-50 text-amber-600")
                                    )}>
                                        <report.icon size={24} />
                                    </div>
                                    <h4 className={cn("text-lg font-bold mb-2", theme === 'dark' ? "text-gray-100" : "text-gray-800")}>{report.title}</h4>
                                    <p className={cn("text-sm mb-4", theme === 'dark' ? "text-gray-400" : "text-gray-500")}>{report.desc}</p>
                                    <button className={cn("text-sm font-bold flex items-center space-x-1", theme === 'dark' ? "text-emerald-400" : "text-[#064E3B]")}>
                                        <span>Buat Laporan</span>
                                        <ArrowUpRight size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className={cn("rounded-3xl border overflow-hidden", theme === 'dark' ? "bg-zinc-900/50 border-emerald-900/20" : "bg-white border-gray-100 shadow-sm")}>
                            <div className={cn("p-6 border-b", theme === 'dark' ? "border-emerald-900/20" : "border-gray-100")}>
                                <h3 className={cn("text-lg font-bold", theme === 'dark' ? "text-gray-100" : "text-gray-800")}>Dokumen Tersimpan</h3>
                            </div>
                            <div className={cn("divide-y", theme === 'dark' ? "divide-emerald-900/20" : "divide-gray-50")}>
                                {RECENT_REPORTS.map((doc) => (
                                    <div key={doc.id} className={cn("p-4 sm:p-6 flex items-center justify-between transition-colors", theme === 'dark' ? "hover:bg-zinc-800/30" : "hover:bg-gray-50/50")}>
                                        <div className="flex items-center space-x-4">
                                            <div className={cn("p-3 rounded-xl", theme === 'dark' ? "bg-zinc-800 text-gray-400" : "bg-gray-100 text-gray-500")}>
                                                <FileText size={24} />
                                            </div>
                                            <div>
                                                <h4 className={cn("text-sm sm:text-base font-bold", theme === 'dark' ? "text-gray-200" : "text-gray-800")}>{doc.name}</h4>
                                                <div className="flex items-center space-x-3 mt-1 text-xs sm:text-sm">
                                                    <span className={cn("font-medium", theme === 'dark' ? "text-emerald-400" : "text-[#064E3B]")}>{doc.type}</span>
                                                    <span className={theme === 'dark' ? "text-gray-600" : "text-gray-300"}>•</span>
                                                    <span className={theme === 'dark' ? "text-gray-400" : "text-gray-500"}>{doc.size}</span>
                                                    <span className={theme === 'dark' ? "text-gray-600" : "text-gray-300"}>•</span>
                                                    <span className={theme === 'dark' ? "text-gray-400" : "text-gray-500"}>{doc.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className={cn("p-2 rounded-lg transition-colors", theme === 'dark' ? "text-gray-400 hover:text-emerald-400 hover:bg-emerald-900/20" : "text-gray-400 hover:text-[#064E3B] hover:bg-emerald-50")}>
                                            <Download size={20} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <DevelopmentModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                initialData={selectedProject}
                mode={selectedProject ? 'edit' : 'add'}
            />
        </div>
    );
};
