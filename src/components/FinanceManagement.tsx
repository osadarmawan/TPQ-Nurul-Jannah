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
    ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
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
    { id: 1, date: '2024-03-14', desc: 'Pembayaran SPP - Ahmad Fauzi', cat: 'SPP Santri', type: 'income', amount: '150.000' },
    { id: 2, date: '2024-03-14', desc: 'Gaji Ustadz Mansur', cat: 'Gaji Pegawai', type: 'expense', amount: '3.500.000' },
    { id: 3, date: '2024-03-13', desc: 'Donasi Hamba Allah', cat: 'Donasi', type: 'income', amount: '1.000.000' },
    { id: 4, date: '2024-03-12', desc: 'Listrik & Air Maret', cat: 'Operasional', type: 'expense', amount: '450.000' },
    { id: 5, date: '2024-03-12', desc: 'Pembelian Buku Iqra', cat: 'Sarana', type: 'expense', amount: '750.000' },
];

export const FinanceManagement = () => {
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
                    <button className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-[#064E3B] text-white font-medium hover:shadow-lg transition-all shadow-emerald-900/20">
                        <Plus size={18} />
                        <span>Transaksi Baru</span>
                    </button>
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
                                <th className="px-6 py-4">Tanggal</th>
                                <th className="px-6 py-4">Deskripsi</th>
                                <th className="px-6 py-4">Kategori</th>
                                <th className="px-6 py-4">Jumlah</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {TRANSACTIONS.map((t) => (
                                <tr key={t.id} className="hover:bg-gray-50/50 transition-colors">
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
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <ArrowRight size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 bg-gray-50/50 text-center">
                    <button className="text-sm font-bold text-[#064E3B] hover:underline">Lihat Semua Transaksi</button>
                </div>
            </div>
        </div>
    );
};
