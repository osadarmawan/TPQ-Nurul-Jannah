import React from 'react';
import { 
    ArrowLeft, Download, Users, BookOpen, DollarSign, Award, 
    TrendingUp, Activity, Printer, FileText, CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell, Legend, LineChart, Line
} from 'recharts';

const COLORS = ['#059669', '#3B82F6', '#F59E0B', '#8B5CF6', '#EC4899', '#14B8A6'];

export const SantriReportView = ({ onBack, theme = 'light' }: { onBack: () => void, theme?: 'light' | 'dark' }) => {
    const isDark = theme === 'dark';
    
    const genderData = [
        { name: 'Laki-laki', value: 85 },
        { name: 'Perempuan', value: 71 },
    ];

    const jilidData = [
        { name: 'Jilid 1', santri: 45 },
        { name: 'Jilid 2', santri: 32 },
        { name: 'Jilid 3', santri: 28 },
        { name: 'Jilid 4', santri: 20 },
        { name: 'Jilid 5', santri: 15 },
        { name: 'Jilid 6', santri: 10 },
        { name: 'Al-Quran', santri: 6 },
    ];

    const trendData = [
        { month: 'Jan', baru: 12, lulus: 2 },
        { month: 'Feb', baru: 15, lulus: 3 },
        { month: 'Mar', baru: 8, lulus: 5 },
        { month: 'Apr', baru: 20, lulus: 1 },
        { month: 'May', baru: 10, lulus: 8 },
        { month: 'Jun', baru: 25, lulus: 12 },
    ];

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button onClick={onBack} className={cn("p-2 rounded-xl border transition-colors", isDark ? "border-gray-700 hover:bg-gray-800 text-gray-300" : "border-gray-200 hover:bg-gray-50 text-gray-600")}>
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h2 className={cn("text-2xl font-bold", isDark ? "text-emerald-400" : "text-[#064E3B]")}>Laporan Data Santri</h2>
                        <p className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-500")}>Statistik dan demografi santri TPQ Nurul Jannah</p>
                    </div>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-[#064E3B] text-white rounded-xl hover:bg-emerald-800 transition-colors shadow-lg shadow-emerald-900/20">
                    <Download size={18} />
                    <span className="text-sm font-medium">Export PDF</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={cn("p-6 rounded-3xl border shadow-sm", isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100")}>
                    <h3 className={cn("text-lg font-bold mb-6", isDark ? "text-gray-200" : "text-gray-800")}>Distribusi Gender</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={genderData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                    {genderData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className={cn("p-6 rounded-3xl border shadow-sm md:col-span-2", isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100")}>
                    <h3 className={cn("text-lg font-bold mb-6", isDark ? "text-gray-200" : "text-gray-800")}>Distribusi per Jilid</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={jilidData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#374151' : '#E5E7EB'} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: isDark ? '#9CA3AF' : '#6B7280', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: isDark ? '#9CA3AF' : '#6B7280', fontSize: 12 }} />
                                <Tooltip cursor={{ fill: isDark ? '#374151' : '#F3F4F6' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Bar dataKey="santri" fill="#059669" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className={cn("p-6 rounded-3xl border shadow-sm md:col-span-3", isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100")}>
                    <h3 className={cn("text-lg font-bold mb-6", isDark ? "text-gray-200" : "text-gray-800")}>Tren Pendaftaran & Kelulusan</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={trendData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#374151' : '#E5E7EB'} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: isDark ? '#9CA3AF' : '#6B7280', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: isDark ? '#9CA3AF' : '#6B7280', fontSize: 12 }} />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Legend />
                                <Line type="monotone" dataKey="baru" name="Santri Baru" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                <Line type="monotone" dataKey="lulus" name="Lulus/Khatam" stroke="#059669" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export const AcademicReportView = ({ onBack, theme = 'light' }: { onBack: () => void, theme?: 'light' | 'dark' }) => {
    const isDark = theme === 'dark';
    
    const scoreData = [
        { name: 'Jilid 1', avg: 85, target: 75 },
        { name: 'Jilid 2', avg: 82, target: 75 },
        { name: 'Jilid 3', avg: 78, target: 75 },
        { name: 'Jilid 4', avg: 80, target: 75 },
        { name: 'Jilid 5', avg: 86, target: 75 },
        { name: 'Jilid 6', avg: 88, target: 75 },
        { name: 'Al-Quran', avg: 92, target: 80 },
    ];

    const passRateData = [
        { month: 'Jan', rate: 85 },
        { month: 'Feb', rate: 88 },
        { month: 'Mar', rate: 82 },
        { month: 'Apr', rate: 90 },
        { month: 'May', rate: 95 },
        { month: 'Jun', rate: 92 },
    ];

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button onClick={onBack} className={cn("p-2 rounded-xl border transition-colors", isDark ? "border-gray-700 hover:bg-gray-800 text-gray-300" : "border-gray-200 hover:bg-gray-50 text-gray-600")}>
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h2 className={cn("text-2xl font-bold", isDark ? "text-emerald-400" : "text-[#064E3B]")}>Laporan Akademik</h2>
                        <p className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-500")}>Rekapitulasi nilai dan tingkat kelulusan santri</p>
                    </div>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-[#064E3B] text-white rounded-xl hover:bg-emerald-800 transition-colors shadow-lg shadow-emerald-900/20">
                    <Download size={18} />
                    <span className="text-sm font-medium">Export Excel</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={cn("p-6 rounded-3xl border shadow-sm", isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100")}>
                    <h3 className={cn("text-lg font-bold mb-6", isDark ? "text-gray-200" : "text-gray-800")}>Rata-rata Nilai per Jilid</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={scoreData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#374151' : '#E5E7EB'} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: isDark ? '#9CA3AF' : '#6B7280', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} domain={[0, 100]} tick={{ fill: isDark ? '#9CA3AF' : '#6B7280', fontSize: 12 }} />
                                <Tooltip cursor={{ fill: isDark ? '#374151' : '#F3F4F6' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Legend />
                                <Bar dataKey="avg" name="Rata-rata Nilai" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="target" name="Target KKM" fill="#9CA3AF" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className={cn("p-6 rounded-3xl border shadow-sm", isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100")}>
                    <h3 className={cn("text-lg font-bold mb-6", isDark ? "text-gray-200" : "text-gray-800")}>Tren Tingkat Kelulusan (%)</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={passRateData}>
                                <defs>
                                    <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#059669" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#374151' : '#E5E7EB'} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: isDark ? '#9CA3AF' : '#6B7280', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} domain={[0, 100]} tick={{ fill: isDark ? '#9CA3AF' : '#6B7280', fontSize: 12 }} />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Area type="monotone" dataKey="rate" name="Tingkat Kelulusan" stroke="#059669" strokeWidth={3} fillOpacity={1} fill="url(#colorRate)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export const FinanceReportView = ({ onBack, theme = 'light' }: { onBack: () => void, theme?: 'light' | 'dark' }) => {
    const isDark = theme === 'dark';
    
    const financeData = [
        { month: 'Jan', income: 4500000, expense: 3200000 },
        { month: 'Feb', income: 5200000, expense: 3500000 },
        { month: 'Mar', income: 4800000, expense: 3800000 },
        { month: 'Apr', income: 6100000, expense: 4000000 },
        { month: 'May', income: 5500000, expense: 3900000 },
        { month: 'Jun', income: 6700000, expense: 4200000 },
    ];

    const expenseBreakdown = [
        { name: 'Gaji Pegawai', value: 15000000 },
        { name: 'Operasional', value: 4500000 },
        { name: 'Sarana', value: 2000000 },
        { name: 'Lain-lain', value: 1100000 },
    ];

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button onClick={onBack} className={cn("p-2 rounded-xl border transition-colors", isDark ? "border-gray-700 hover:bg-gray-800 text-gray-300" : "border-gray-200 hover:bg-gray-50 text-gray-600")}>
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h2 className={cn("text-2xl font-bold", isDark ? "text-emerald-400" : "text-[#064E3B]")}>Laporan Keuangan</h2>
                        <p className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-500")}>Ringkasan arus kas dan pengeluaran</p>
                    </div>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-[#064E3B] text-white rounded-xl hover:bg-emerald-800 transition-colors shadow-lg shadow-emerald-900/20">
                    <Download size={18} />
                    <span className="text-sm font-medium">Export PDF</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={cn("p-6 rounded-3xl border shadow-sm md:col-span-2", isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100")}>
                    <h3 className={cn("text-lg font-bold mb-6", isDark ? "text-gray-200" : "text-gray-800")}>Arus Kas (6 Bulan Terakhir)</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={financeData}>
                                <defs>
                                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#059669" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#374151' : '#E5E7EB'} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: isDark ? '#9CA3AF' : '#6B7280', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `Rp ${value/1000000}M`} tick={{ fill: isDark ? '#9CA3AF' : '#6B7280', fontSize: 12 }} />
                                <Tooltip formatter={(value: number) => `Rp ${value.toLocaleString('id-ID')}`} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Legend />
                                <Area type="monotone" dataKey="income" name="Pemasukan" stroke="#059669" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                                <Area type="monotone" dataKey="expense" name="Pengeluaran" stroke="#EF4444" strokeWidth={3} fillOpacity={1} fill="url(#colorExpense)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className={cn("p-6 rounded-3xl border shadow-sm", isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100")}>
                    <h3 className={cn("text-lg font-bold mb-6", isDark ? "text-gray-200" : "text-gray-800")}>Distribusi Pengeluaran</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={expenseBreakdown} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                    {expenseBreakdown.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value: number) => `Rp ${value.toLocaleString('id-ID')}`} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export const StaffReportView = ({ onBack, theme = 'light' }: { onBack: () => void, theme?: 'light' | 'dark' }) => {
    const isDark = theme === 'dark';
    
    const roleData = [
        { name: 'Pengajar', value: 9 },
        { name: 'Administrasi', value: 2 },
        { name: 'Kepala TPQ', value: 1 },
    ];

    const attendanceData = [
        { name: 'Senin', hadir: 12, izin: 0, sakit: 0 },
        { name: 'Selasa', hadir: 11, izin: 1, sakit: 0 },
        { name: 'Rabu', hadir: 12, izin: 0, sakit: 0 },
        { name: 'Kamis', hadir: 10, izin: 1, sakit: 1 },
        { name: 'Jumat', hadir: 12, izin: 0, sakit: 0 },
    ];

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button onClick={onBack} className={cn("p-2 rounded-xl border transition-colors", isDark ? "border-gray-700 hover:bg-gray-800 text-gray-300" : "border-gray-200 hover:bg-gray-50 text-gray-600")}>
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h2 className={cn("text-2xl font-bold", isDark ? "text-emerald-400" : "text-[#064E3B]")}>Laporan Pegawai</h2>
                        <p className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-500")}>Kehadiran dan kinerja staf pengajar</p>
                    </div>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-[#064E3B] text-white rounded-xl hover:bg-emerald-800 transition-colors shadow-lg shadow-emerald-900/20">
                    <Download size={18} />
                    <span className="text-sm font-medium">Export PDF</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={cn("p-6 rounded-3xl border shadow-sm", isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100")}>
                    <h3 className={cn("text-lg font-bold mb-6", isDark ? "text-gray-200" : "text-gray-800")}>Komposisi Pegawai</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={roleData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                    {roleData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className={cn("p-6 rounded-3xl border shadow-sm md:col-span-2", isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100")}>
                    <h3 className={cn("text-lg font-bold mb-6", isDark ? "text-gray-200" : "text-gray-800")}>Kehadiran Mingguan</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={attendanceData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#374151' : '#E5E7EB'} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: isDark ? '#9CA3AF' : '#6B7280', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: isDark ? '#9CA3AF' : '#6B7280', fontSize: 12 }} />
                                <Tooltip cursor={{ fill: isDark ? '#374151' : '#F3F4F6' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Legend />
                                <Bar dataKey="hadir" name="Hadir" stackId="a" fill="#059669" radius={[0, 0, 0, 0]} />
                                <Bar dataKey="izin" name="Izin" stackId="a" fill="#F59E0B" radius={[0, 0, 0, 0]} />
                                <Bar dataKey="sakit" name="Sakit" stackId="a" fill="#EF4444" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
