import React from 'react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export const DailyReportPrint = () => {
    const today = new Date();
    const formattedDate = format(today, 'EEEE, dd MMMM yyyy', { locale: id });

    return (
        <div className="hidden print:block print:w-full p-8 bg-white text-black min-h-screen">
            {/* Header Laporan */}
            <div className="text-center border-b-4 border-double border-gray-800 pb-6 mb-8">
                <h1 className="text-2xl font-bold uppercase tracking-widest">TPQ Musholla Nurul Jannah</h1>
                <p className="text-sm mt-1">Jl. Pendidikan No. 123, Kota Santri, Jawa Barat 40123</p>
                <p className="text-sm">Telp: (022) 1234567 | Email: info@tpqnuruljannah.com</p>
                <h2 className="text-xl font-bold mt-6 underline">LAPORAN HARIAN OPERASIONAL</h2>
                <p className="text-sm font-medium mt-2">Tanggal: {formattedDate}</p>
            </div>

            {/* Ringkasan Kehadiran */}
            <div className="mb-8">
                <h3 className="text-lg font-bold mb-3 border-b border-gray-300 pb-1">1. Ringkasan Kehadiran Santri</h3>
                <table className="w-full text-sm border-collapse border border-gray-400">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-400 py-2 px-4 text-left">Kelas / Jilid</th>
                            <th className="border border-gray-400 py-2 px-4 text-center">Hadir</th>
                            <th className="border border-gray-400 py-2 px-4 text-center">Izin</th>
                            <th className="border border-gray-400 py-2 px-4 text-center">Sakit</th>
                            <th className="border border-gray-400 py-2 px-4 text-center">Alpa</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-400 py-2 px-4">Jilid 1 - 3</td>
                            <td className="border border-gray-400 py-2 px-4 text-center">45</td>
                            <td className="border border-gray-400 py-2 px-4 text-center">2</td>
                            <td className="border border-gray-400 py-2 px-4 text-center">1</td>
                            <td className="border border-gray-400 py-2 px-4 text-center">0</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 py-2 px-4">Jilid 4 - 6</td>
                            <td className="border border-gray-400 py-2 px-4 text-center">38</td>
                            <td className="border border-gray-400 py-2 px-4 text-center">0</td>
                            <td className="border border-gray-400 py-2 px-4 text-center">2</td>
                            <td className="border border-gray-400 py-2 px-4 text-center">1</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 py-2 px-4">Al-Quran</td>
                            <td className="border border-gray-400 py-2 px-4 text-center">24</td>
                            <td className="border border-gray-400 py-2 px-4 text-center">1</td>
                            <td className="border border-gray-400 py-2 px-4 text-center">0</td>
                            <td className="border border-gray-400 py-2 px-4 text-center">0</td>
                        </tr>
                        <tr className="font-bold bg-gray-50">
                            <td className="border border-gray-400 py-2 px-4 text-right">Total</td>
                            <td className="border border-gray-400 py-2 px-4 text-center">107</td>
                            <td className="border border-gray-400 py-2 px-4 text-center">3</td>
                            <td className="border border-gray-400 py-2 px-4 text-center">3</td>
                            <td className="border border-gray-400 py-2 px-4 text-center">1</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Ringkasan Keuangan */}
            <div className="mb-8">
                <h3 className="text-lg font-bold mb-3 border-b border-gray-300 pb-1">2. Ringkasan Penerimaan Keuangan (SPP & Infaq)</h3>
                <table className="w-full text-sm border-collapse border border-gray-400">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-400 py-2 px-4 text-left">No. Kwitansi</th>
                            <th className="border border-gray-400 py-2 px-4 text-left">Nama Santri</th>
                            <th className="border border-gray-400 py-2 px-4 text-left">Keterangan</th>
                            <th className="border border-gray-400 py-2 px-4 text-right">Nominal (Rp)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-400 py-2 px-4">INV-260322-001</td>
                            <td className="border border-gray-400 py-2 px-4">Ahmad Maulana</td>
                            <td className="border border-gray-400 py-2 px-4">SPP Bulan Maret</td>
                            <td className="border border-gray-400 py-2 px-4 text-right">50.000</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 py-2 px-4">INV-260322-002</td>
                            <td className="border border-gray-400 py-2 px-4">Siti Aminah</td>
                            <td className="border border-gray-400 py-2 px-4">SPP Bulan Maret + Infaq</td>
                            <td className="border border-gray-400 py-2 px-4 text-right">75.000</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-400 py-2 px-4">INV-260322-003</td>
                            <td className="border border-gray-400 py-2 px-4">Budi Santoso</td>
                            <td className="border border-gray-400 py-2 px-4">Pendaftaran Santri Baru</td>
                            <td className="border border-gray-400 py-2 px-4 text-right">150.000</td>
                        </tr>
                        <tr className="font-bold bg-gray-50">
                            <td colSpan={3} className="border border-gray-400 py-2 px-4 text-right">Total Penerimaan Hari Ini</td>
                            <td className="border border-gray-400 py-2 px-4 text-right">275.000</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Ringkasan WA Gateway */}
            <div className="mb-12">
                <h3 className="text-lg font-bold mb-3 border-b border-gray-300 pb-1">3. Log Sistem & Notifikasi (WA Gateway)</h3>
                <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Pesan Broadcast Tagihan SPP terkirim ke 45 Wali Santri.</li>
                    <li>Notifikasi Absensi terkirim ke 4 Wali Santri.</li>
                    <li>Status Koneksi Server WA: <span className="font-bold text-green-600">Terhubung</span></li>
                </ul>
            </div>

            {/* Tanda Tangan */}
            <div className="flex justify-end mt-16">
                <div className="text-center w-64">
                    <p className="text-sm mb-16">Kota Santri, {format(today, 'dd MMMM yyyy', { locale: id })}</p>
                    <p className="text-sm font-bold underline">Ustadz Ahmad, S.Pd.I</p>
                    <p className="text-xs mt-1">Kepala TPQ Nurul Jannah</p>
                </div>
            </div>
        </div>
    );
};
