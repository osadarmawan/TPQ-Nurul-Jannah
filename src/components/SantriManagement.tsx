import React, { useState, useMemo, useEffect } from 'react';
import { 
    Users, 
    UserCheck, 
    UserPlus, 
    GraduationCap, 
    Search, 
    Filter, 
    Download, 
    MoreHorizontal, 
    Edit, 
    Trash2, 
    Eye,
    ChevronLeft,
    ChevronRight,
    ArrowUpDown,
    CheckSquare,
    Square,
    UserX,
    Printer,
    MessageSquare,
    History,
    ArrowUp,
    RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { UserRole } from '../types';
import { SantriModal, ConfirmModal, SantriDetailModal, SantriIDCardModal, SantriWAModal, SantriAcademicHistoryModal } from './Modals';
import { dbService } from '../services/dbService';

export const SantriManagement = ({ theme, role }: { theme: 'light' | 'dark', role: UserRole }) => {
    const [santriData, setSantriData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIds, setSelectedIds] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isIDCardOpen, setIsIDCardOpen] = useState(false);
    const [isWAOpen, setIsWAOpen] = useState(false);
    const [isAcademicHistoryOpen, setIsAcademicHistoryOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [selectedSantri, setSelectedSantri] = useState<any>(null);
    const [activeActionMenu, setActiveActionMenu] = useState<string | number | null>(null);

    // New state for filters and pagination
    const [statusFilter, setStatusFilter] = useState<string>('Semua');
    const [genderFilter, setGenderFilter] = useState<string>('Semua');
    const [itemsPerPage, setItemsPerPage] = useState<number | 'Semua'>(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [showScrollTop, setShowScrollTop] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const data = await dbService.read('Santri');
            setSantriData(data);
        } catch (error) {
            console.error('Failed to fetch santri:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const filteredData = useMemo(() => {
        return (santriData || []).filter(santri => {
            const searchLower = searchTerm.toLowerCase();
            const matchesSearch = 
                (santri.nama || '').toLowerCase().includes(searchLower) ||
                (String(santri.nis) || '').toLowerCase().includes(searchLower) ||
                (santri.ortu || '').toLowerCase().includes(searchLower);
            
            const matchesStatus = statusFilter === 'Semua' || santri.status === statusFilter;
            const matchesGender = genderFilter === 'Semua' || santri.gender === genderFilter;

            return matchesSearch && matchesStatus && matchesGender;
        });
    }, [santriData, searchTerm, statusFilter, genderFilter]);

    const paginatedData = useMemo(() => {
        if (itemsPerPage === 'Semua') return filteredData;
        const start = (currentPage - 1) * itemsPerPage;
        return filteredData.slice(start, start + itemsPerPage);
    }, [filteredData, currentPage, itemsPerPage]);

    const totalPages = itemsPerPage === 'Semua' ? 1 : Math.ceil(filteredData.length / itemsPerPage);

    const stats = [
        { label: 'Total Santri', value: santriData.length.toString(), icon: Users, color: 'bg-blue-500' },
        { label: 'Siswa Aktif', value: santriData.filter(s => s.status === 'Siswa').length.toString(), icon: UserCheck, color: 'bg-emerald-500' },
        { label: 'Calon Santri', value: santriData.filter(s => s.status === 'Calon').length.toString(), icon: UserPlus, color: 'bg-amber-500' },
        { label: 'Lulus Al-Quran', value: santriData.filter(s => s.jilid === 'Al-Quran').length.toString(), icon: GraduationCap, color: 'bg-purple-500' },
    ];

    const toggleSelectAll = () => {
        if (selectedIds.length === santriData.length && santriData.length > 0) {
            setSelectedIds([]);
        } else {
            setSelectedIds(santriData.map(s => s.id));
        }
    };

    const toggleSelect = (id: any) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(i => i !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const handleView = (santri: any) => {
        setSelectedSantri(santri);
        setIsDetailOpen(true);
    };

    const handleEdit = (santri: any) => {
        setModalMode('edit');
        setSelectedSantri(santri);
        setIsModalOpen(true);
    };

    const handleDelete = (santri: any) => {
        setSelectedSantri(santri);
        setIsConfirmOpen(true);
    };

    const handleModalSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            if (modalMode === 'add') {
                await dbService.create('Santri', data);
            } else {
                await dbService.update('Santri', data.id, data);
            }
            setIsModalOpen(false);
            fetchData();
        } catch (error) {
            alert('Gagal menyimpan data: ' + error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleConfirmDelete = async () => {
        if (!selectedSantri) return;
        try {
            await dbService.delete('Santri', selectedSantri.id);
            setIsConfirmOpen(false);
            fetchData();
        } catch (error) {
            alert('Gagal menghapus data: ' + error);
        }
    };

    return (
        <div className="space-y-8">
            {/* Stats Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center space-x-4"
                    >
                        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg", stat.color)}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Main Management Card */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
            >
                {/* Toolbar */}
                <div className="p-6 border-b border-gray-100 space-y-4">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex items-center space-x-4 flex-1">
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input 
                                    type="text"
                                    placeholder="Cari nama, NIS, atau nama orang tua..."
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#D4AF37]/50 outline-none transition-all"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="relative">
                                <button 
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                    className="p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                                >
                                    <Filter size={20} />
                                </button>
                                <AnimatePresence>
                                    {isFilterOpen && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 z-30 p-3"
                                        >
                                            <p className="text-[10px] font-bold text-gray-400 uppercase px-2 py-1 mb-1">Status</p>
                                            <div className="space-y-1">
                                                <button onClick={() => setStatusFilter('Semua')} className={cn("w-full text-left px-3 py-2 text-sm rounded-lg transition-colors", statusFilter === 'Semua' ? "bg-emerald-50 text-emerald-700 font-medium" : "text-gray-700 hover:bg-gray-50")}>Semua Status</button>
                                                <button onClick={() => setStatusFilter('Siswa')} className={cn("w-full text-left px-3 py-2 text-sm rounded-lg transition-colors", statusFilter === 'Siswa' ? "bg-emerald-50 text-emerald-700 font-medium" : "text-gray-700 hover:bg-gray-50")}>Siswa Aktif</button>
                                                <button onClick={() => setStatusFilter('Calon')} className={cn("w-full text-left px-3 py-2 text-sm rounded-lg transition-colors", statusFilter === 'Calon' ? "bg-emerald-50 text-emerald-700 font-medium" : "text-gray-700 hover:bg-gray-50")}>Calon Santri</button>
                                            </div>
                                            
                                            <div className="h-px bg-gray-100 my-2"></div>
                                            
                                            <p className="text-[10px] font-bold text-gray-400 uppercase px-2 py-1 mb-1">Gender</p>
                                            <div className="space-y-1">
                                                <button onClick={() => setGenderFilter('Semua')} className={cn("w-full text-left px-3 py-2 text-sm rounded-lg transition-colors", genderFilter === 'Semua' ? "bg-emerald-50 text-emerald-700 font-medium" : "text-gray-700 hover:bg-gray-50")}>Semua Gender</button>
                                                <button onClick={() => setGenderFilter('Laki-laki')} className={cn("w-full text-left px-3 py-2 text-sm rounded-lg transition-colors", genderFilter === 'Laki-laki' ? "bg-emerald-50 text-emerald-700 font-medium" : "text-gray-700 hover:bg-gray-50")}>Laki-laki</button>
                                                <button onClick={() => setGenderFilter('Perempuan')} className={cn("w-full text-left px-3 py-2 text-sm rounded-lg transition-colors", genderFilter === 'Perempuan' ? "bg-emerald-50 text-emerald-700 font-medium" : "text-gray-700 hover:bg-gray-50")}>Perempuan</button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <button 
                                onClick={fetchData}
                                className={cn(
                                    "p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors",
                                    isLoading && "animate-spin"
                                )}
                            >
                                <RefreshCw size={20} />
                            </button>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button className="flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                                <Download size={18} />
                                <span className="text-sm font-medium">Export</span>
                            </button>
                            {role === 'Admin' && (
                                <button 
                                    onClick={() => { setModalMode('add'); setSelectedSantri(null); setIsModalOpen(true); }}
                                    className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-[#064E3B] text-white font-medium hover:shadow-lg transition-all"
                                >
                                    <UserPlus size={18} />
                                    <span>Tambah Santri</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Bulk Actions Bar */}
                    <AnimatePresence>
                        {selectedIds.length > 0 && (
                            <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="bg-emerald-50 rounded-2xl p-4 flex items-center justify-between border border-emerald-100"
                            >
                                <div className="flex items-center space-x-3">
                                    <span className="text-sm font-bold text-[#064E3B]">{selectedIds.length} Santri Terpilih</span>
                                    <div className="h-4 w-px bg-emerald-200 mx-2"></div>
                                    <button className="text-sm font-medium text-emerald-700 hover:text-emerald-900 transition-colors">Naik Jilid</button>
                                    <button className="text-sm font-medium text-emerald-700 hover:text-emerald-900 transition-colors">Ubah Status</button>
                                    <button className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors">Hapus Massal</button>
                                </div>
                                <button onClick={() => setSelectedIds([])} className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Batalkan</button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Table */}
                <div className="overflow-x-auto min-h-[400px]">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 text-gray-400 text-[11px] uppercase tracking-widest font-bold border-b border-gray-100">
                                <th className="px-6 py-4 w-12">
                                    <button onClick={toggleSelectAll} className="text-gray-400 hover:text-[#064E3B] transition-colors">
                                        {selectedIds.length === santriData.length && santriData.length > 0 ? <CheckSquare size={18} /> : <Square size={18} />}
                                    </button>
                                </th>
                                <th className="px-6 py-4">
                                    <div className="flex items-center space-x-1 cursor-pointer hover:text-[#064E3B]">
                                        <span>Nama Santri</span>
                                        <ArrowUpDown size={12} />
                                    </div>
                                </th>
                                <th className="px-6 py-4">NIS</th>
                                <th className="px-6 py-4">Gender</th>
                                <th className="px-6 py-4">Jilid</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Orang Tua</th>
                                {role !== 'Tamu' && <th className="px-6 py-4 text-right">Aksi</th>}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {isLoading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="px-6 py-4"><div className="w-5 h-5 bg-gray-100 rounded"></div></td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-9 h-9 rounded-full bg-gray-100"></div>
                                                <div className="space-y-2">
                                                    <div className="w-24 h-3 bg-gray-100 rounded"></div>
                                                    <div className="w-16 h-2 bg-gray-50 rounded"></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td colSpan={6} className="px-6 py-4"><div className="w-full h-3 bg-gray-50 rounded"></div></td>
                                    </tr>
                                ))
                            ) : paginatedData.length > 0 ? (
                                paginatedData.map((santri) => (
                                    <tr key={santri.id} className={cn(
                                        "group transition-colors",
                                        selectedIds.includes(santri.id) ? "bg-emerald-50/30" : "hover:bg-gray-50/50"
                                    )}>
                                        <td className="px-6 py-4">
                                            <button onClick={() => toggleSelect(santri.id)} className={cn(
                                                "transition-colors",
                                                selectedIds.includes(santri.id) ? "text-[#064E3B]" : "text-gray-300 hover:text-gray-400"
                                            )}>
                                                {selectedIds.includes(santri.id) ? <CheckSquare size={18} /> : <Square size={18} />}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-[#064E3B] font-bold text-sm">
                                                    {(santri.nama || 'S').charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-800">{santri.nama}</p>
                                                    <p className="text-[10px] text-gray-400">Daftar: {santri.tglDaftar || '-'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-mono text-gray-500">{santri.nis}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{santri.gender}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs font-bold">
                                                {santri.jilid}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={cn(
                                                "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                                                santri.status === 'Siswa' 
                                                    ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                                                    : "bg-amber-50 text-amber-700 border-amber-100"
                                            )}>
                                                {santri.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{santri.ortu}</td>
                                        {role !== 'Tamu' && (
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end space-x-1">
                                                    <button 
                                                        onClick={() => handleView(santri)}
                                                        className="p-2 text-gray-400 hover:text-[#064E3B] hover:bg-emerald-50 rounded-lg transition-all"
                                                    >
                                                        <Eye size={16} />
                                                    </button>
                                                    {(role === 'Admin' || role === 'Pegawai') && (
                                                        <>
                                                            <button onClick={() => handleEdit(santri)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                                                                <Edit size={16} />
                                                            </button>
                                                            <button onClick={() => handleDelete(santri)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </>
                                                    )}
                                                    <div className="relative">
                                                        <button 
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setActiveActionMenu(activeActionMenu === santri.id ? null : santri.id);
                                                            }}
                                                            className={cn(
                                                                "p-2 rounded-lg transition-all",
                                                                activeActionMenu === santri.id ? "bg-gray-100 text-gray-900 shadow-inner" : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                                                            )}
                                                        >
                                                            <MoreHorizontal size={16} />
                                                        </button>
                                                        <AnimatePresence>
                                                            {activeActionMenu === santri.id && (
                                                                <motion.div 
                                                                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                                                    className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-2xl border border-gray-100 z-[50] p-1"
                                                                >
                                                                    <button 
                                                                        onClick={() => { setSelectedSantri(santri); setIsIDCardOpen(true); setActiveActionMenu(null); }}
                                                                        className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-emerald-50 rounded-lg transition-colors flex items-center space-x-2"
                                                                    >
                                                                        <Printer size={14} className="text-emerald-600" />
                                                                        <span>Cetak Kartu</span>
                                                                    </button>
                                                                    <button 
                                                                        onClick={() => { setSelectedSantri(santri); setIsWAOpen(true); setActiveActionMenu(null); }}
                                                                        className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-emerald-50 rounded-lg transition-colors flex items-center space-x-2"
                                                                    >
                                                                        <MessageSquare size={14} className="text-emerald-600" />
                                                                        <span>Kirim WA Ortu</span>
                                                                    </button>
                                                                    <button 
                                                                        onClick={() => { setSelectedSantri(santri); setIsAcademicHistoryOpen(true); setActiveActionMenu(null); }}
                                                                        className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-emerald-50 rounded-lg transition-colors flex items-center space-x-2"
                                                                    >
                                                                        <History size={14} className="text-emerald-600" />
                                                                        <span>Riwayat Akademik</span>
                                                                    </button>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={8} className="px-6 py-20 text-center">
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="flex flex-col items-center justify-center space-y-4"
                                        >
                                            <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
                                                <UserX size={40} />
                                            </div>
                                            <div>
                                                <p className="text-lg font-bold text-gray-800">Santri Tidak Ditemukan</p>
                                                <p className="text-sm text-gray-500">
                                                    {searchTerm ? `Tidak ada data yang cocok dengan "${searchTerm}"` : 'Belum ada data santri'}
                                                </p>
                                            </div>
                                            {searchTerm && (
                                                <button 
                                                    onClick={() => setSearchTerm('')}
                                                    className="px-4 py-2 text-sm font-medium text-[#064E3B] hover:bg-emerald-50 rounded-lg transition-colors"
                                                >
                                                    Bersihkan Pencarian
                                                </button>
                                            )}
                                        </motion.div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                        <p className="text-sm text-gray-500">
                            Menampilkan <span className="font-bold text-gray-800">
                                {filteredData.length > 0 ? `${itemsPerPage === 'Semua' ? 1 : (currentPage - 1) * (itemsPerPage as number) + 1}-${itemsPerPage === 'Semua' ? filteredData.length : Math.min(currentPage * (itemsPerPage as number), filteredData.length)}` : '0'}
                            </span> dari <span className="font-bold text-gray-800">{filteredData.length}</span> santri
                        </p>
                        <select 
                            value={itemsPerPage}
                            onChange={(e) => {
                                setItemsPerPage(e.target.value === 'Semua' ? 'Semua' : Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                        >
                            <option value={10}>10 per halaman</option>
                            <option value={50}>50 per halaman</option>
                            <option value={100}>100 per halaman</option>
                            <option value={500}>500 per halaman</option>
                            <option value="Semua">Semua</option>
                        </select>
                    </div>
                    
                    {itemsPerPage !== 'Semua' && totalPages > 1 && (
                        <div className="flex items-center space-x-2">
                            <button 
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="p-2 rounded-xl border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            
                            {/* Simple pagination display */}
                            <div className="flex items-center space-x-1">
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    // Show pages around current page
                                    let pageNum = i + 1;
                                    if (totalPages > 5 && currentPage > 3) {
                                        pageNum = currentPage - 2 + i;
                                        if (pageNum > totalPages) pageNum = totalPages - (4 - i);
                                    }
                                    
                                    return (
                                        <button 
                                            key={pageNum}
                                            onClick={() => setCurrentPage(pageNum)}
                                            className={cn(
                                                "w-10 h-10 rounded-xl text-sm font-bold transition-all",
                                                currentPage === pageNum 
                                                    ? "bg-[#064E3B] text-white shadow-lg shadow-emerald-900/20" 
                                                    : "text-gray-500 hover:bg-gray-50"
                                            )}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                            </div>

                            <button 
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-xl border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Scroll to Top Button */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        onClick={scrollToTop}
                        className="fixed bottom-8 right-8 p-4 bg-[#064E3B] text-white rounded-full shadow-2xl hover:bg-emerald-800 transition-colors z-50 flex items-center justify-center"
                    >
                        <ArrowUp size={24} />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Modals */}
            <SantriModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                mode={modalMode}
                initialData={selectedSantri}
                onSubmit={handleModalSubmit}
            />
            <SantriDetailModal 
                isOpen={isDetailOpen}
                onClose={() => setIsDetailOpen(false)}
                data={selectedSantri}
            />
            <ConfirmModal 
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Hapus Data Santri?"
                message={`Anda akan menghapus data ${selectedSantri?.nama}. Tindakan ini tidak dapat dibatalkan.`}
            />
            <SantriIDCardModal 
                isOpen={isIDCardOpen}
                onClose={() => setIsIDCardOpen(false)}
                data={selectedSantri}
            />
            <SantriWAModal 
                isOpen={isWAOpen}
                onClose={() => setIsWAOpen(false)}
                data={selectedSantri}
            />
            <SantriAcademicHistoryModal 
                isOpen={isAcademicHistoryOpen}
                onClose={() => setIsAcademicHistoryOpen(false)}
                data={selectedSantri}
            />
        </div>
    );
};

