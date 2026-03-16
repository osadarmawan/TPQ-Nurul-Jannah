import { ID } from 'appwrite';
import { databases, APPWRITE_CONFIG } from '../lib/appwrite';

export interface SantriData {
    nama: string;
    nis: string;
    status: 'Calon' | 'Siswa';
    jilid: number;
    nama_ortu: string;
    foto?: string; // URL or File ID
    qr_code?: string; // URL or File ID
}

/**
 * Fungsi untuk menambahkan data Santri baru ke Appwrite Database.
 * @param data Data santri yang akan disimpan
 * @returns Response dari Appwrite
 */
export const createSantri = async (data: SantriData) => {
    try {
        const response = await databases.createDocument(
            APPWRITE_CONFIG.databaseId,
            APPWRITE_CONFIG.collections.santri,
            ID.unique(), // Auto-generate unique ID
            data
        );
        console.log('Santri berhasil ditambahkan:', response);
        return response;
    } catch (error) {
        console.error('Gagal menambahkan santri:', error);
        throw error;
    }
};

// Contoh fungsi lain untuk mengambil data
export const getSantriList = async () => {
    try {
        const response = await databases.listDocuments(
            APPWRITE_CONFIG.databaseId,
            APPWRITE_CONFIG.collections.santri
        );
        return response.documents;
    } catch (error) {
        console.error('Gagal mengambil data santri:', error);
        throw error;
    }
};
