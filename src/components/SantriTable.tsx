import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Edit, Trash2, BookOpen, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SantriModal, ConfirmModal } from './Modals';

const MOCK_DATA = [
    { id: 1, nama: 'Ahmad Fauzi', nis: '2023001', status: 'Siswa', jilid: 4, ortu: 'Budi Santoso' },
    { id: 2, nama: 'Siti Aminah', nis: '2023002', status: 'Siswa', jilid: 6, ortu: 'Siti Nurhaliza' },
    { id: 3, nama: 'Budi Doremi', nis: '2024001', status: 'Calon', jilid: 1, ortu: 'Doremi Fasolasido' },
    { id: 4, nama: 'Cici Paramida', nis: '2023003', status: 'Siswa', jilid: 5, ortu: 'Paramida Sari' },
    { id: 5, nama: 'Dedi Corbuzier', nis: '2024002', status: 'Calon', jilid: 1, ortu: 'Corbuzier' },
];

import { UserRole } from '../types';
import { cn } from '../lib/utils';

interface SantriTableProps {
    theme?: 'light' | 'dark';
    role: UserRole;
}

export const SantriTable: React.FC<SantriTableProps> = ({ theme = 'light', role }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [selectedSantri, setSelectedSantri] = useState<any>(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const filteredData = MOCK_DATA.filter(item => 
        item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nis.includes(searchTerm)
    );

    const handleAdd = () => {
        setModalMode('add');
        setSelectedSantri(null);
        setIsModalOpen(true);
    };

    const handleEdit = (santri: any) => {
        setModalMode('edit');
        setSelectedSantri(santri);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (santri: any) => {
        setSelectedSantri(santri);
        setIsConfirmOpen(true);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={cn(
                "backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border overflow-hidden transition-all duration-500",
                theme === 'dark'
                    ? "bg-zinc-900/50 border-emerald-900/10"
                    : "bg-white/90 border-[#D4AF37]/20"
            )}
        >
            <div className={cn(
                "p-6 border-b flex flex-col sm:flex-row justify-between items-center gap-4 transition-colors",
                theme === 'dark'
                    ? "border-emerald-900/10 bg-gradient-to-r from-zinc-900 to-black"
                    : "border-[#D4AF37]/10 bg-gradient-to-r from-white to-[#f8f9fa]"
            )}>
                <h2 className={cn(
                    "text-xl font-bold flex items-center transition-colors",
                    theme === 'dark' ? "text-emerald-400" : "text-[#064E3B]"
                )}>
                    <span className={cn(
                        "w-2 h-8 rounded-full mr-3 transition-colors",
                        theme === 'dark' ? "bg-emerald-500" : "bg-[#D4AF37]"
                    )}></span>
                    Data Santri Terbaru
                </h2>
                <div className="flex items-center space-x-3 w-full sm:w-auto">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Cari nama atau NIS..." 
                            className={cn(
                                "w-full pl-10 pr-4 py-2.5 rounded-xl border outline-none transition-all shadow-sm",
                                theme === 'dark'
                                    ? "bg-zinc-900 border-zinc-800 text-gray-300 focus:ring-emerald-500/20 focus:border-emerald-500/50"
                                    : "bg-white border-gray-200 focus:ring-[#D4AF37]/50 focus:border-transparent"
                            )}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <button 
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className={cn(
                                "p-2.5 rounded-xl border transition-colors shadow-sm flex items-center",
                                theme === 'dark'
                                    ? "bg-zinc-900 border-zinc-800 text-gray-400 hover:text-emerald-400 hover:bg-zinc-800"
                                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-[#064E3B]"
                            )}
                        >
                            <Filter size={18} />
                        </button>
                        
                        <AnimatePresence>
                            {isFilterOpen && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className={cn(
                                        "absolute right-0 mt-2 w-48 rounded-2xl shadow-xl border z-20 p-2",
                                        theme === 'dark'
                                            ? "bg-zinc-900 border-zinc-800"
                                            : "bg-white border-gray-100"
                                    )}
                                >
                                    <p className="text-[10px] font-bold text-gray-400 uppercase px-3 py-2">Filter Status</p>
                                    <button className={cn(
                                        "w-full text-left px-3 py-2 text-sm rounded-lg transition-colors",
                                        theme === 'dark' ? "text-gray-300 hover:bg-emerald-900/20" : "text-gray-700 hover:bg-emerald-50"
                                    )}>Semua Status</button>
                                    <button className={cn(
                                        "w-full text-left px-3 py-2 text-sm rounded-lg transition-colors",
                                        theme === 'dark' ? "text-gray-300 hover:bg-emerald-900/20" : "text-gray-700 hover:bg-emerald-50"
                                    )}>Siswa Aktif</button>
                                    <button className={cn(
                                        "w-full text-left px-3 py-2 text-sm rounded-lg transition-colors",
                                        theme === 'dark' ? "text-gray-300 hover:bg-emerald-900/20" : "text-gray-700 hover:bg-emerald-50"
                                    )}>Calon Santri</button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    {(role === 'Admin' || role === 'Pegawai') && (
                        <button 
                            onClick={handleAdd}
                            className={cn(
                                "px-5 py-2.5 rounded-xl font-medium transition-all transform hover:-translate-y-0.5",
                                theme === 'dark'
                                    ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20"
                                    : "bg-gradient-to-r from-[#064E3B] to-emerald-800 text-white hover:shadow-lg hover:shadow-emerald-900/20"
                            )}
                        >
                            + Tambah Santri
                        </button>
                    )}
                </div>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className={cn(
                            "text-sm uppercase tracking-wider border-b transition-colors",
                            theme === 'dark'
                                ? "bg-black/20 text-gray-500 border-emerald-900/10"
                                : "bg-gray-50/50 text-gray-500 border-gray-100"
                        )}>
                            <th className="px-6 py-4 font-medium">Nama Santri</th>
                            <th className="px-6 py-4 font-medium">NIS</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium">Jilid</th>
                            <th className="px-6 py-4 font-medium">Nama Ortu</th>
                            {role !== 'Tamu' && <th className="px-6 py-4 font-medium text-right">Aksi</th>}
                        </tr>
                    </thead>
                    <tbody className={cn(
                        "divide-y transition-colors",
                        theme === 'dark' ? "divide-emerald-900/10" : "divide-gray-100"
                    )}>
                        {filteredData.map((item, index) => (
                            <motion.tr 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 * index }}
                                key={item.id} 
                                className={cn(
                                    "transition-colors group",
                                    theme === 'dark' ? "hover:bg-emerald-900/5" : "hover:bg-emerald-50/30"
                                )}
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center font-bold mr-3 shadow-sm border transition-all",
                                            theme === 'dark'
                                                ? "bg-emerald-900/30 text-emerald-400 border-emerald-800/20"
                                                : "bg-gradient-to-br from-emerald-100 to-emerald-50 text-[#064E3B] border-emerald-200/50"
                                        )}>
                                            {item.nama.charAt(0)}
                                        </div>
                                        <span className={cn(
                                            "font-medium transition-colors",
                                            theme === 'dark' ? "text-gray-300 group-hover:text-emerald-400" : "text-gray-800 group-hover:text-[#064E3B]"
                                        )}>{item.nama}</span>
                                    </div>
                                </td>
                                <td className={cn(
                                    "px-6 py-4 font-mono text-sm transition-colors",
                                    theme === 'dark' ? "text-gray-500" : "text-gray-600"
                                )}>{item.nis}</td>
                                <td className="px-6 py-4">
                                    <span className={cn(
                                        "px-3 py-1 rounded-full text-xs font-medium border transition-colors",
                                        item.status === 'Siswa' 
                                            ? theme === 'dark'
                                                ? 'bg-emerald-900/20 text-emerald-400 border-emerald-800/30'
                                                : 'bg-emerald-100/50 text-emerald-700 border-emerald-200' 
                                            : theme === 'dark'
                                                ? 'bg-amber-900/20 text-amber-400 border-amber-800/30'
                                                : 'bg-amber-100/50 text-amber-700 border-amber-200'
                                    )}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <BookOpen size={14} className={cn(
                                            "mr-1.5 transition-colors",
                                            theme === 'dark' ? "text-emerald-500" : "text-[#D4AF37]"
                                        )} />
                                        <span className={cn(
                                            "font-medium transition-colors",
                                            theme === 'dark' ? "text-gray-400" : "text-gray-700"
                                        )}>Jilid {item.jilid}</span>
                                    </div>
                                </td>
                                <td className={cn(
                                    "px-6 py-4 transition-colors",
                                    theme === 'dark' ? "text-gray-500" : "text-gray-600"
                                )}>{item.ortu}</td>
                                {role !== 'Tamu' && (
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {(role === 'Admin' || role === 'Pegawai') && (
                                                <>
                                                    <button 
                                                        onClick={() => handleEdit(item)}
                                                        className={cn(
                                                            "p-1.5 rounded-lg transition-colors",
                                                            theme === 'dark' ? "text-blue-400 hover:bg-blue-900/20" : "text-blue-600 hover:bg-blue-50"
                                                        )}
                                                    >
                                                        <Edit size={16} />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDeleteClick(item)}
                                                        className={cn(
                                                            "p-1.5 rounded-lg transition-colors",
                                                            theme === 'dark' ? "text-red-400 hover:bg-red-900/20" : "text-red-600 hover:bg-red-50"
                                                        )}
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </>
                                            )}
                                            <button className={cn(
                                                "p-1.5 rounded-lg transition-colors",
                                                theme === 'dark' ? "text-gray-600 hover:text-gray-400 hover:bg-zinc-800" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                                            )}>
                                                <MoreVertical size={16} />
                                            </button>
                                        </div>
                                    </td>
                                )}
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className={cn(
                "p-4 border-t flex items-center justify-between text-sm transition-colors",
                theme === 'dark'
                    ? "border-emerald-900/10 text-gray-500 bg-black/20"
                    : "border-gray-100 text-gray-500 bg-gray-50/30"
            )}>
                <span>Menampilkan 1 hingga {filteredData.length} dari {MOCK_DATA.length} entri</span>
                <div className="flex space-x-1">
                    <button className={cn(
                        "px-3 py-1 rounded-md border transition-colors disabled:opacity-50",
                        theme === 'dark' ? "border-zinc-800 hover:bg-zinc-800" : "border-gray-200 hover:bg-gray-50"
                    )}>Seb</button>
                    <button className={cn(
                        "px-3 py-1 rounded-md text-white shadow-sm transition-colors",
                        theme === 'dark' ? "bg-emerald-600" : "bg-[#064E3B]"
                    )}>1</button>
                    <button className={cn(
                        "px-3 py-1 rounded-md border transition-colors",
                        theme === 'dark' ? "border-zinc-800 hover:bg-zinc-800" : "border-gray-200 hover:bg-gray-50"
                    )}>2</button>
                    <button className={cn(
                        "px-3 py-1 rounded-md border transition-colors",
                        theme === 'dark' ? "border-zinc-800 hover:bg-zinc-800" : "border-gray-200 hover:bg-gray-50"
                    )}>Sel</button>
                </div>
            </div>

            {/* Modals */}
            <SantriModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                mode={modalMode}
                initialData={selectedSantri}
            />
            <ConfirmModal 
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={() => setIsConfirmOpen(false)}
                title="Hapus Data Santri?"
                message={`Anda akan menghapus data ${selectedSantri?.nama}. Tindakan ini tidak dapat dibatalkan.`}
            />
        </motion.div>
    );
};
