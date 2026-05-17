import React, { useState } from 'react';
import { 
    DollarSign, 
    TrendingUp, 
    TrendingDown, 
    Wallet, 
    Plus, 
    Search, 
    Filter, 
    Download, 
    ArrowUpRight, 
    ArrowDownRight,
    Calendar,
    PieChart as PieChartIcon,
    BarChart3,
    CreditCard,
    ArrowRight,
    X,
    Printer,
    MessageSquare,
    FileText,
    CheckCircle2,
    User,
    Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';

const MOCK_FINANCE_DATA = [
    { name: 'Jan', income: 4500000, expense: 3200000 },
    { name: 'Feb', income: 5200000, expense: 3500000 },
    { name: 'Mar', income: 4800000, expense: 3800000 },
    { name: 'Apr', income: 6100000, expense: 4000000 },
    { name: 'May', income: 5500000, expense: 3900000 },
    { name: 'Jun', income: 6700000, expense: 4200000 },
];

const CATEGORY_DATA = [
    { name: 'SPP Santri', value: 65, color: '#059669' },
    { name: 'Donasi', value: 20, color: '#10B981' },
    { name: 'Pendaftaran', value: 15, color: '#34D399' },
];

const TRANSACTIONS = [
    { id: 1, trxId: 'TRX-20240314-001', date: '2024-03-14', time: '09:30 WIB', desc: 'Pembayaran SPP - Ahmad Fauzi', cat: 'SPP Santri', type: 'income', amount: '150.000', method: 'Transfer BSI', cashier: 'Siti Aminah' },
    { id: 2, trxId: 'TRX-20240314-002', date: '2024-03-14', time: '13:15 WIB', desc: 'Gaji Ustadz Mansur', cat: 'Gaji Pegawai', type: 'expense', amount: '3.500.000', method: 'Transfer BNI', cashier: 'Siti Aminah' },
    { id: 3, trxId: 'TRX-20240313-001', date: '2024-03-13', time: '10:00 WIB', desc: 'Donasi Hamba Allah', cat: 'Donasi', type: 'income', amount: '1.000.000', method: 'Tunai', cashier: 'Ustadz Mansur' },
    { id: 4, trxId: 'TRX-20240312-001', date: '2024-03-12', time: '08:45 WIB', desc: 'Listrik & Air Maret', cat: 'Operasional', type: 'expense', amount: '450.000', method: 'Transfer Mandiri', cashier: 'Siti Aminah' },
    { id: 5, trxId: 'TRX-20240312-002', date: '2024-03-12', time: '11:20 WIB', desc: 'Pembelian Buku Iqra', cat: 'Sarana', type: 'expense', amount: '750.000', method: 'Tunai', cashier: 'Siti Aminah' },
];

import { UserRole } from '../types';

export const FinanceManagement = ({ theme, role }: { theme: 'light' | 'dark', role: UserRole }) => {
    const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedTransactionIds, setSelectedTransactionIds] = useState<number[]>([]);

    const handleViewDetail = (transaction: any) => {
        setSelectedTransaction(transaction);
        setIsDetailModalOpen(true);
    };

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedTransactionIds(TRANSACTIONS.map(t => t.id));
        } else {
            setSelectedTransactionIds([]);
        }
    };

    const handleSelectTransaction = (id: number) => {
        setSelectedTransactionIds(prev => 
            prev.includes(id) ? prev.filter(trxId => trxId !== id) : [...prev, id]
        );
    };

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-[#064E3B] tracking-tight">Manajemen Keuangan</h2>
                    <p className="text-gray-500 mt-1">Pantau arus kas, pemasukan SPP, dan pengeluaran operasional.</p>
                </div>
                <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all">
                        <Download size={18} />
                        <span className="text-sm font-medium">Ekspor Laporan</span>
                    </button>
                    {role === 'Admin' && (
                        <button className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-[#064E3B] text-white font-medium hover:shadow-lg transition-all shadow-emerald-900/20">
                            <Plus size={18} />
                            <span>Transaksi Baru</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Wallet size={80} className="text-emerald-600" />
                    </div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Saldo Utama</p>
                    <h3 className="text-3xl font-bold text-gray-900">Rp 45.280.000</h3>
                    <div className="mt-4 flex items-center text-emerald-600 text-xs font-bold">
                        <ArrowUpRight size={14} className="mr-1" />
                        <span>+12.5% dari bulan lalu</span>
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <TrendingUp size={80} className="text-blue-600" />
                    </div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Pemasukan (Mar)</p>
                    <h3 className="text-3xl font-bold text-gray-900">Rp 8.450.000</h3>
                    <div className="mt-4 flex items-center text-blue-600 text-xs font-bold">
                        <ArrowUpRight size={14} className="mr-1" />
                        <span>Target: 85% tercapai</span>
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <TrendingDown size={80} className="text-red-600" />
                    </div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Pengeluaran (Mar)</p>
                    <h3 className="text-3xl font-bold text-gray-900">Rp 5.120.000</h3>
                    <div className="mt-4 flex items-center text-red-600 text-xs font-bold">
                        <ArrowDownRight size={14} className="mr-1" />
                        <span>-2.4% efisiensi biaya</span>
                    </div>
                </motion.div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-lg font-bold text-gray-800 flex items-center">
                            <BarChart3 className="mr-2 text-[#D4AF37]" size={20} />
                            Tren Arus Kas (6 Bulan Terakhir)
                        </h3>
                        <select className="text-xs font-bold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg outline-none border-none">
                            <option>Tahun 2024</option>
                            <option>Tahun 2023</option>
                        </select>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={MOCK_FINANCE_DATA}>
                                <defs>
                                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} tickFormatter={(value) => `Rp ${value/1000000}M`} />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value: any) => [`Rp ${value.toLocaleString()}`, '']}
                                />
                                <Area type="monotone" dataKey="income" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                                <Area type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={3} fillOpacity={0} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-8 flex items-center">
                        <PieChartIcon className="mr-2 text-[#D4AF37]" size={20} />
                        Sumber Pemasukan
                    </h3>
                    <div className="h-[200px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={CATEGORY_DATA}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {CATEGORY_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-2xl font-bold text-gray-800">100%</span>
                            <span className="text-[10px] text-gray-400 font-bold uppercase">Total</span>
                        </div>
                    </div>
                    <div className="mt-8 space-y-3">
                        {CATEGORY_DATA.map((item, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-sm text-gray-600">{item.name}</span>
                                </div>
                                <span className="text-sm font-bold text-gray-800">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-800">Transaksi Terakhir</h3>
                    <div className="flex items-center space-x-2">
                        <AnimatePresence>
                            {selectedTransactionIds.length > 0 && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="flex items-center space-x-2 mr-2"
                                >
                                    <span className="text-sm font-medium px-2 text-emerald-700">
                                        {selectedTransactionIds.length} dipilih
                                    </span>
                                    <button className="p-2 rounded-xl border bg-white border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center space-x-2 transition-all">
                                        <Printer size={16} />
                                        <span className="text-sm font-medium hidden sm:inline">Cetak</span>
                                    </button>
                                    <button className="p-2 rounded-xl border bg-red-50 border-red-100 text-red-600 hover:bg-red-100 flex items-center space-x-2 transition-all">
                                        <Trash2 size={16} />
                                        <span className="text-sm font-medium hidden sm:inline">Hapus</span>
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input 
                                type="text"
                                placeholder="Cari transaksi..."
                                className="pl-9 pr-4 py-2 rounded-xl border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                            />
                        </div>
                        <button className="p-2 rounded-xl border border-gray-100 text-gray-400 hover:bg-gray-50">
                            <Filter size={18} />
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                <th className="px-6 py-4 w-12">
                                    <input 
                                        type="checkbox" 
                                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 transition-all cursor-pointer"
                                        checked={TRANSACTIONS.length > 0 && selectedTransactionIds.length === TRANSACTIONS.length}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                                <th className="px-6 py-4">Tanggal</th>
                                <th className="px-6 py-4">Deskripsi</th>
                                <th className="px-6 py-4">Kategori</th>
                                <th className="px-6 py-4">Jumlah</th>
                                {role !== 'Tamu' && <th className="px-6 py-4 text-right">Aksi</th>}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {TRANSACTIONS.map((t) => (
                                <tr key={t.id} className={cn(
                                    "transition-colors",
                                    selectedTransactionIds.includes(t.id) ? "bg-emerald-50/50" : "hover:bg-gray-50/50"
                                )}>
                                    <td className="px-6 py-4">
                                        <input 
                                            type="checkbox" 
                                            className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 transition-all cursor-pointer"
                                            checked={selectedTransactionIds.includes(t.id)}
                                            onChange={() => handleSelectTransaction(t.id)}
                                        />
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{t.date}</td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-bold text-gray-800">{t.desc}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 rounded-full bg-gray-100 text-[10px] font-bold text-gray-600 uppercase">
                                            {t.cat}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className={cn(
                                            "flex items-center font-bold text-sm",
                                            t.type === 'income' ? "text-emerald-600" : "text-red-600"
                                        )}>
                                            {t.type === 'income' ? '+' : '-'} Rp {t.amount}
                                        </div>
                                    </td>
                                    {role !== 'Tamu' && (
                                        <td className="px-6 py-4 text-right">
                                            <button 
                                                onClick={() => handleViewDetail(t)}
                                                className="p-2 rounded-lg text-gray-400 hover:text-[#064E3B] hover:bg-emerald-50 transition-all"
                                            >
                                                <ArrowRight size={18} />
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 bg-gray-50/50 text-center">
                    <button className="text-sm font-bold text-[#064E3B] hover:underline">Lihat Semua Transaksi</button>
                </div>
            </div>

            {/* Transaction Detail Modal */}
            <AnimatePresence>
                {isDetailModalOpen && selectedTransaction && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsDetailModalOpen(false)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            {/* Modal Header */}
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 sticky top-0 z-10">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                                        <FileText size={20} className="text-[#064E3B]" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">Detail Transaksi</h3>
                                        <p className="text-xs font-mono text-gray-500 mt-0.5">{selectedTransaction.trxId}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setIsDetailModalOpen(false)} 
                                    className="p-2 hover:bg-gray-200 text-gray-400 hover:text-gray-600 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-8 overflow-y-auto flex-1">
                                {/* Amount Section */}
                                <div className="text-center mb-8">
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Total Nominal</p>
                                    <h2 className={cn(
                                        "text-4xl font-black tracking-tight",
                                        selectedTransaction.type === 'income' ? "text-emerald-600" : "text-red-600"
                                    )}>
                                        {selectedTransaction.type === 'income' ? '+' : '-'} Rp {selectedTransaction.amount}
                                    </h2>
                                    <div className="inline-flex items-center space-x-1.5 mt-4 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100">
                                        <CheckCircle2 size={14} className="text-emerald-600" />
                                        <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Berhasil</span>
                                    </div>
                                </div>

                                <div className="h-px w-full bg-dashed border-t border-dashed border-gray-200 mb-8"></div>

                                {/* Details Grid */}
                                <div className="space-y-5">
                                    <div className="flex justify-between items-start">
                                        <span className="text-sm text-gray-500 font-medium">Kategori</span>
                                        <span className="px-3 py-1 rounded-lg bg-gray-100 text-xs font-bold text-gray-700 uppercase tracking-wider">
                                            {selectedTransaction.cat}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <span className="text-sm text-gray-500 font-medium">Deskripsi</span>
                                        <span className="text-sm font-bold text-gray-900 text-right max-w-[60%]">
                                            {selectedTransaction.desc}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <span className="text-sm text-gray-500 font-medium">Tanggal & Waktu</span>
                                        <div className="text-right">
                                            <span className="text-sm font-bold text-gray-900 block">{selectedTransaction.date}</span>
                                            <span className="text-xs text-gray-500">{selectedTransaction.time}</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <span className="text-sm text-gray-500 font-medium">Metode Pembayaran</span>
                                        <div className="flex items-center space-x-2">
                                            <CreditCard size={14} className="text-gray-400" />
                                            <span className="text-sm font-bold text-gray-900">{selectedTransaction.method}</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <span className="text-sm text-gray-500 font-medium">Dicatat Oleh</span>
                                        <div className="flex items-center space-x-2">
                                            <User size={14} className="text-gray-400" />
                                            <span className="text-sm font-bold text-gray-900">{selectedTransaction.cashier}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="h-px w-full bg-dashed border-t border-dashed border-gray-200 my-8"></div>

                                {/* Attachment Placeholder */}
                                <div>
                                    <span className="text-sm text-gray-500 font-medium block mb-3">Bukti Transaksi</span>
                                    <div className="w-full h-24 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:border-gray-300 transition-colors cursor-pointer">
                                        <div className="flex flex-col items-center">
                                            <FileText size={24} className="mb-2" />
                                            <span className="text-xs font-bold uppercase tracking-widest">Lihat Lampiran</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-6 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row gap-3">
                                <button className="flex-1 py-3.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors shadow-sm">
                                    <Printer size={18} />
                                    <span>Cetak Kwitansi</span>
                                </button>
                                <button className="flex-1 py-3.5 bg-[#25D366] text-white rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-[#20bd5a] transition-colors shadow-lg shadow-green-500/20">
                                    <MessageSquare size={18} />
                                    <span>Kirim via WA</span>
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};
