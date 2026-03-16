import React, { useState, useMemo } from 'react';
import { 
    UserCircle, 
    ShieldCheck, 
    Briefcase, 
    Calendar, 
    Search, 
    Filter, 
    Plus, 
    MoreHorizontal, 
    Edit, 
    Trash2, 
    Mail, 
    Phone,
    Award,
    Clock,
    DollarSign,
    ChevronLeft,
    ChevronRight,
    ArrowUpDown,
    CheckCircle2,
    XCircle,
    User,
    Printer,
    MessageSquare,
    Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { StaffModal, PayrollModal, ConfirmModal, StaffProfileModal, StaffIDCardModal, StaffMessageModal } from './Modals';

const STAFF_DATA = [
    { id: 1, nama: 'Ustadz Mansur', nip: 'TPQ-001', role: 'Kepala TPQ', status: 'Aktif', email: 'mansur@tpq.com', phone: '0812-3456-7890', joinDate: '2020-01-10', salary: '3.500.000' },
    { id: 2, nama: 'Ustadzah Fatimah', nip: 'TPQ-002', role: 'Pengajar Jilid 6', status: 'Aktif', email: 'fatimah@tpq.com', phone: '0812-3456-7891', joinDate: '2021-05-15', salary: '2.800.000' },
    { id: 3, nama: 'Ustadz Ali', nip: 'TPQ-003', role: 'Pengajar Jilid 1', status: 'Aktif', email: 'ali@tpq.com', phone: '0812-3456-7892', joinDate: '2022-03-20', salary: '2.500.000' },
    { id: 4, nama: 'Siti Aminah', nip: 'TPQ-004', role: 'Administrasi', status: 'Aktif', email: 'siti@tpq.com', phone: '0812-3456-7893', joinDate: '2023-01-05', salary: '2.200.000' },
    { id: 5, nama: 'Ustadz Yusuf', nip: 'TPQ-005', role: 'Pengajar Al-Quran', status: 'Cuti', email: 'yusuf@tpq.com', phone: '0812-3456-7894', joinDate: '2021-11-12', salary: '2.800.000' },
    { id: 6, nama: 'Ustadzah Maryam', nip: 'TPQ-006', role: 'Pengajar Jilid 4', status: 'Aktif', email: 'maryam@tpq.com', phone: '0812-3456-7895', joinDate: '2023-06-01', salary: '2.500.000' },
];

export const StaffManagement = ({ theme = 'light' }: { theme?: 'light' | 'dark' }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
    const [isPayrollModalOpen, setIsPayrollModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isIDCardModalOpen, setIsIDCardModalOpen] = useState(false);
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
    const [staffModalMode, setStaffModalMode] = useState<'add' | 'edit'>('add');
    const [selectedStaff, setSelectedStaff] = useState<any>(null);
    const [activeActionMenu, setActiveActionMenu] = useState<number | null>(null);

    const isDark = theme === 'dark';

    const stats = [
        { label: 'Total Pegawai', value: '12', icon: UserCircle, color: 'bg-blue-500' },
        { label: 'Ustadz/ah', value: '9', icon: Award, color: 'bg-emerald-500' },
        { label: 'Administrasi', value: '2', icon: Briefcase, color: 'bg-amber-500' },
        { label: 'Hadir Hari Ini', value: '10', icon: CheckCircle2, color: 'bg-purple-500' },
    ];

    const filteredStaff = useMemo(() => {
        return STAFF_DATA.filter(staff => {
            const searchLower = searchTerm.toLowerCase();
            return (
                staff.nama.toLowerCase().includes(searchLower) ||
                staff.nip.toLowerCase().includes(searchLower) ||
                staff.role.toLowerCase().includes(searchLower)
            );
        });
    }, [searchTerm]);

    const handleEdit = (staff: any) => {
        setStaffModalMode('edit');
        setSelectedStaff(staff);
        setIsStaffModalOpen(true);
    };

    const handleDelete = (staff: any) => {
        setSelectedStaff(staff);
        setIsConfirmOpen(true);
    };

    return (
        <div className="space-y-8 pb-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className={cn(
                        "text-3xl font-bold tracking-tight transition-colors",
                        isDark ? "text-emerald-400" : "text-[#064E3B]"
                    )}>Manajemen Pegawai</h2>
                    <p className={cn(
                        "mt-1 transition-colors",
                        isDark ? "text-gray-400" : "text-gray-500"
                    )}>Kelola data ustadz, pengajar, dan staf administrasi TPQ.</p>
                </div>
                <div className="flex items-center space-x-3">
                    <button className={cn(
                        "flex items-center space-x-2 px-4 py-2.5 rounded-xl border transition-all",
                        isDark 
                            ? "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700" 
                            : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                    )}>
                        <Clock size={18} />
                        <span className="text-sm font-medium">Presensi Staf</span>
                    </button>
                    <button 
                        onClick={() => { setStaffModalMode('add'); setSelectedStaff(null); setIsStaffModalOpen(true); }}
                        className={cn(
                            "flex items-center space-x-2 px-6 py-2.5 rounded-xl text-white font-medium transition-all shadow-lg",
                            isDark 
                                ? "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/40" 
                                : "bg-[#064E3B] hover:bg-[#053F30] shadow-emerald-900/20"
                        )}
                    >
                        <Plus size={18} />
                        <span>Tambah Pegawai</span>
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={cn(
                            "rounded-3xl p-6 shadow-sm border transition-all flex items-center space-x-4",
                            isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
                        )}
                    >
                        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg", stat.color)}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className={cn(
                                "text-sm font-medium transition-colors",
                                isDark ? "text-gray-400" : "text-gray-500"
                            )}>{stat.label}</p>
                            <p className={cn(
                                "text-2xl font-bold transition-colors",
                                isDark ? "text-white" : "text-gray-900"
                            )}>{stat.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Main Content Card */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                    "rounded-3xl shadow-sm border overflow-hidden transition-all",
                    isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
                )}
            >
                {/* Toolbar */}
                <div className={cn(
                    "p-6 border-b flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition-colors",
                    isDark ? "border-gray-700" : "border-gray-100"
                )}>
                    <div className="flex items-center space-x-4 flex-1">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                                type="text"
                                placeholder="Cari nama, NIP, atau jabatan..."
                                className={cn(
                                    "w-full pl-10 pr-4 py-2.5 rounded-xl border outline-none transition-all",
                                    isDark 
                                        ? "bg-gray-900 border-gray-700 text-white focus:ring-emerald-500/30" 
                                        : "bg-white border-gray-200 text-gray-900 focus:ring-[#D4AF37]/50"
                                )}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <button 
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className={cn(
                                    "p-2.5 rounded-xl border transition-colors",
                                    isDark 
                                        ? "bg-gray-900 border-gray-700 text-gray-400 hover:bg-gray-700" 
                                        : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                                )}
                            >
                                <Filter size={20} />
                            </button>
                            <AnimatePresence>
                                {isFilterOpen && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className={cn(
                                            "absolute left-0 mt-2 w-56 rounded-2xl shadow-xl border z-30 p-3 transition-colors",
                                            isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
                                        )}
                                    >
                                        <p className="text-[10px] font-bold text-gray-400 uppercase px-2 py-1 mb-2 tracking-widest">Filter Pegawai</p>
                                        <div className="space-y-1">
                                            <button className={cn(
                                                "w-full text-left px-3 py-2 text-sm rounded-lg transition-colors",
                                                isDark ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-blue-50"
                                            )}>Semua Jabatan</button>
                                            <button className={cn(
                                                "w-full text-left px-3 py-2 text-sm rounded-lg transition-colors",
                                                isDark ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-blue-50"
                                            )}>Ustadz / Pengajar</button>
                                            <button className={cn(
                                                "w-full text-left px-3 py-2 text-sm rounded-lg transition-colors",
                                                isDark ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-blue-50"
                                            )}>Staf Administrasi</button>
                                            <div className={cn("h-px my-2", isDark ? "bg-gray-700" : "bg-gray-100")}></div>
                                            <button className={cn(
                                                "w-full text-left px-3 py-2 text-sm rounded-lg transition-colors",
                                                isDark ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-blue-50"
                                            )}>Status: Aktif</button>
                                            <button className={cn(
                                                "w-full text-left px-3 py-2 text-sm rounded-lg transition-colors",
                                                isDark ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-blue-50"
                                            )}>Status: Cuti</button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button 
                            onClick={() => setIsPayrollModalOpen(true)}
                            className={cn(
                                "flex items-center space-x-2 px-4 py-2.5 rounded-xl border transition-colors",
                                isDark 
                                    ? "bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-700" 
                                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                            )}
                        >
                            <DollarSign size={18} />
                            <span className="text-sm font-medium">Payroll</span>
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className={cn(
                                "text-[11px] uppercase tracking-widest font-bold border-b transition-colors",
                                isDark 
                                    ? "bg-gray-900/50 text-gray-500 border-gray-700" 
                                    : "bg-gray-50/50 text-gray-400 border-gray-100"
                            )}>
                                <th className="px-6 py-4">Pegawai</th>
                                <th className="px-6 py-4">NIP</th>
                                <th className="px-6 py-4">Jabatan</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Kontak</th>
                                <th className="px-6 py-4">Gaji Pokok</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className={cn(
                            "divide-y transition-colors",
                            isDark ? "divide-gray-700" : "divide-gray-50"
                        )}>
                            {filteredStaff.map((staff) => (
                                <tr key={staff.id} className={cn(
                                    "transition-colors group",
                                    isDark ? "hover:bg-gray-700/30" : "hover:bg-gray-50/50"
                                )}>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className={cn(
                                                "w-10 h-10 rounded-full flex items-center justify-center font-bold",
                                                isDark ? "bg-emerald-900/50 text-emerald-400" : "bg-emerald-100 text-[#064E3B]"
                                            )}>
                                                {staff.nama.charAt(0)}
                                            </div>
                                            <div>
                                                <p className={cn(
                                                    "text-sm font-bold transition-colors",
                                                    isDark ? "text-gray-200" : "text-gray-800"
                                                )}>{staff.nama}</p>
                                                <p className="text-[10px] text-gray-400">Bergabung: {staff.joinDate}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={cn(
                                        "px-6 py-4 text-sm font-mono transition-colors",
                                        isDark ? "text-gray-400" : "text-gray-500"
                                    )}>{staff.nip}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            <ShieldCheck size={14} className="text-blue-500" />
                                            <span className={cn(
                                                "text-sm transition-colors",
                                                isDark ? "text-gray-300" : "text-gray-600"
                                            )}>{staff.role}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                                            staff.status === 'Aktif' 
                                                ? (isDark ? "bg-emerald-900/30 text-emerald-400 border-emerald-800" : "bg-emerald-50 text-emerald-700 border-emerald-100")
                                                : (isDark ? "bg-amber-900/30 text-amber-400 border-amber-800" : "bg-amber-50 text-amber-700 border-amber-100")
                                        )}>
                                            {staff.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                                                <Mail size={12} />
                                                <span>{staff.email}</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                                                <Phone size={12} />
                                                <span>{staff.phone}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={cn(
                                        "px-6 py-4 text-sm font-bold transition-colors",
                                        isDark ? "text-gray-200" : "text-gray-700"
                                    )}>Rp {staff.salary}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-1">
                                            <button 
                                                onClick={() => handleEdit(staff)}
                                                className={cn(
                                                    "p-2 rounded-lg transition-all",
                                                    isDark ? "text-gray-400 hover:text-blue-400 hover:bg-blue-900/30" : "text-gray-400 hover:text-blue-600 hover:bg-blue-50"
                                                )}
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(staff)}
                                                className={cn(
                                                    "p-2 rounded-lg transition-all",
                                                    isDark ? "text-gray-400 hover:text-red-400 hover:bg-red-900/30" : "text-gray-400 hover:text-red-600 hover:bg-red-50"
                                                )}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                            <div className="relative">
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setActiveActionMenu(activeActionMenu === staff.id ? null : staff.id);
                                                    }}
                                                    className={cn(
                                                        "p-2 rounded-lg transition-all",
                                                        activeActionMenu === staff.id 
                                                            ? (isDark ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900 shadow-inner") 
                                                            : (isDark ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700" : "text-gray-400 hover:text-gray-600 hover:bg-gray-100")
                                                    )}
                                                >
                                                    <MoreHorizontal size={16} />
                                                </button>
                                                <AnimatePresence>
                                                    {activeActionMenu === staff.id && (
                                                        <motion.div 
                                                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                                            className={cn(
                                                                "absolute right-0 mt-2 w-44 rounded-xl shadow-2xl border z-[50] p-1 transition-colors",
                                                                isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
                                                            )}
                                                        >
                                                            <button 
                                                                onClick={() => { setSelectedStaff(staff); setIsProfileModalOpen(true); setActiveActionMenu(null); }}
                                                                className={cn(
                                                                    "w-full flex items-center space-x-2 px-3 py-2 text-xs rounded-lg transition-colors",
                                                                    isDark ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-blue-50"
                                                                )}
                                                            >
                                                                <Eye size={14} className="text-blue-600" />
                                                                <span>Lihat Profil</span>
                                                            </button>
                                                            <button 
                                                                onClick={() => { setSelectedStaff(staff); setIsIDCardModalOpen(true); setActiveActionMenu(null); }}
                                                                className={cn(
                                                                    "w-full flex items-center space-x-2 px-3 py-2 text-xs rounded-lg transition-colors",
                                                                    isDark ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-blue-50"
                                                                )}
                                                            >
                                                                <Printer size={14} className="text-blue-600" />
                                                                <span>Cetak ID Card</span>
                                                            </button>
                                                            <button 
                                                                onClick={() => { setSelectedStaff(staff); setIsMessageModalOpen(true); setActiveActionMenu(null); }}
                                                                className={cn(
                                                                    "w-full flex items-center space-x-2 px-3 py-2 text-xs rounded-lg transition-colors",
                                                                    isDark ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-blue-50"
                                                                )}
                                                            >
                                                                <MessageSquare size={14} className="text-blue-600" />
                                                                <span>Kirim Pesan</span>
                                                            </button>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className={cn(
                    "p-6 border-t flex items-center justify-between transition-colors",
                    isDark ? "border-gray-700" : "border-gray-100"
                )}>
                    <p className={cn(
                        "text-sm transition-colors",
                        isDark ? "text-gray-400" : "text-gray-500"
                    )}>
                        Menampilkan <span className={cn("font-bold transition-colors", isDark ? "text-gray-200" : "text-gray-800")}>1-{filteredStaff.length}</span> dari <span className={cn("font-bold transition-colors", isDark ? "text-gray-200" : "text-gray-800")}>{filteredStaff.length}</span> pegawai
                    </p>
                    <div className="flex items-center space-x-2">
                        <button className={cn(
                            "p-2 rounded-xl border transition-colors",
                            isDark 
                                ? "bg-gray-900 border-gray-700 text-gray-500 hover:bg-gray-700" 
                                : "bg-white border-gray-200 text-gray-400 hover:bg-gray-50"
                        )}>
                            <ChevronLeft size={20} />
                        </button>
                        <button className={cn(
                            "w-10 h-10 rounded-xl text-sm font-bold shadow-lg transition-all",
                            isDark 
                                ? "bg-emerald-600 text-white shadow-emerald-900/40" 
                                : "bg-[#064E3B] text-white shadow-emerald-900/20"
                        )}>1</button>
                        <button className={cn(
                            "p-2 rounded-xl border transition-colors",
                            isDark 
                                ? "bg-gray-900 border-gray-700 text-gray-500 hover:bg-gray-700" 
                                : "bg-white border-gray-200 text-gray-400 hover:bg-gray-50"
                        )}>
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Attendance Summary (Professional Feature) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className={cn(
                    "rounded-3xl p-8 shadow-sm border transition-all",
                    isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
                )}>
                    <h3 className={cn(
                        "text-lg font-bold mb-6 flex items-center transition-colors",
                        isDark ? "text-gray-200" : "text-gray-800"
                    )}>
                        <Calendar className="mr-2 text-[#D4AF37]" size={20} />
                        Jadwal Piket Hari Ini
                    </h3>
                    <div className="space-y-4">
                        {[
                            { time: '08:00 - 10:00', name: 'Ustadz Mansur', task: 'Monitoring Pagi' },
                            { time: '13:00 - 15:00', name: 'Ustadzah Fatimah', task: 'Persiapan Kelas' },
                            { time: '16:00 - 18:00', name: 'Ustadz Ali', task: 'Piket Kebersihan' },
                        ].map((item, i) => (
                            <div key={i} className={cn(
                                "flex items-center justify-between p-4 rounded-2xl border transition-all",
                                isDark ? "bg-gray-900 border-gray-700" : "bg-gray-50 border-gray-100"
                            )}>
                                <div className="flex items-center space-x-4">
                                    <div className={cn(
                                        "w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-sm transition-colors",
                                        isDark ? "bg-gray-800 text-emerald-400" : "bg-white text-[#064E3B]"
                                    )}>
                                        {i + 1}
                                    </div>
                                    <div>
                                        <p className={cn(
                                            "text-sm font-bold transition-colors",
                                            isDark ? "text-gray-200" : "text-gray-800"
                                        )}>{item.name}</p>
                                        <p className="text-xs text-gray-500">{item.task}</p>
                                    </div>
                                </div>
                                <span className={cn(
                                    "text-xs font-bold px-3 py-1 rounded-full transition-colors",
                                    isDark ? "bg-emerald-900/30 text-emerald-400" : "bg-emerald-50 text-emerald-700"
                                )}>{item.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={cn(
                    "rounded-3xl p-8 shadow-sm border transition-all",
                    isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
                )}>
                    <h3 className={cn(
                        "text-lg font-bold mb-6 flex items-center transition-colors",
                        isDark ? "text-gray-200" : "text-gray-800"
                    )}>
                        <DollarSign className="mr-2 text-[#D4AF37]" size={20} />
                        Ringkasan Penggajian
                    </h3>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <span className={cn("text-sm transition-colors", isDark ? "text-gray-400" : "text-gray-500")}>Total Gaji Bulan Ini</span>
                            <span className={cn("text-lg font-bold transition-colors", isDark ? "text-white" : "text-gray-900")}>Rp 32.400.000</span>
                        </div>
                        <div className={cn("h-2 w-full rounded-full overflow-hidden transition-colors", isDark ? "bg-gray-700" : "bg-gray-100")}>
                            <div className="h-full bg-emerald-500 w-3/4 rounded-full"></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className={cn(
                                "p-4 rounded-2xl border transition-all",
                                isDark ? "bg-blue-900/20 border-blue-900/30" : "bg-blue-50 border-blue-100"
                            )}>
                                <p className={cn("text-[10px] font-bold uppercase transition-colors", isDark ? "text-blue-400" : "text-blue-400")}>Sudah Dibayar</p>
                                <p className={cn("text-sm font-bold transition-colors", isDark ? "text-blue-300" : "text-blue-700")}>8 Pegawai</p>
                            </div>
                            <div className={cn(
                                "p-4 rounded-2xl border transition-all",
                                isDark ? "bg-amber-900/20 border-amber-900/30" : "bg-amber-50 border-amber-100"
                            )}>
                                <p className={cn("text-[10px] font-bold uppercase transition-colors", isDark ? "text-amber-400" : "text-amber-400")}>Belum Dibayar</p>
                                <p className={cn("text-sm font-bold transition-colors", isDark ? "text-amber-300" : "text-amber-700")}>4 Pegawai</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setIsPayrollModalOpen(true)}
                            className={cn(
                                "w-full py-3 text-white rounded-2xl font-bold hover:shadow-lg transition-all",
                                isDark ? "bg-emerald-600 hover:bg-emerald-500" : "bg-[#064E3B] hover:bg-[#053F30]"
                            )}
                        >
                            Kelola Payroll
                        </button>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <StaffModal 
                isOpen={isStaffModalOpen}
                onClose={() => setIsStaffModalOpen(false)}
                mode={staffModalMode}
                initialData={selectedStaff}
            />
            <PayrollModal 
                isOpen={isPayrollModalOpen}
                onClose={() => setIsPayrollModalOpen(false)}
            />
            <ConfirmModal 
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={() => setIsConfirmOpen(false)}
                title="Hapus Data Pegawai?"
                message={`Anda akan menghapus data ${selectedStaff?.nama}. Tindakan ini tidak dapat dibatalkan.`}
            />
            <StaffProfileModal 
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
                data={selectedStaff}
            />
            <StaffIDCardModal 
                isOpen={isIDCardModalOpen}
                onClose={() => setIsIDCardModalOpen(false)}
                data={selectedStaff}
            />
            <StaffMessageModal 
                isOpen={isMessageModalOpen}
                onClose={() => setIsMessageModalOpen(false)}
                data={selectedStaff}
            />
        </div>
    );
};
