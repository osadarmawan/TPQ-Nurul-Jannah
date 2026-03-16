import { Client, Databases, Storage, Account } from 'appwrite';

// Initialize the Appwrite client
const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite Endpoint
    .setProject('YOUR_PROJECT_ID'); // Replace with your project ID

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Database and Collection IDs
export const APPWRITE_CONFIG = {
    databaseId: 'simas_db_id',
    collections: {
        santri: 'santri_collection_id',
        pegawai: 'pegawai_collection_id',
        akademik: 'akademik_collection_id',
        keuangan: 'keuangan_collection_id',
        laporan: 'laporan_collection_id',
    },
    buckets: {
        fotoSantri: 'foto_santri_bucket_id',
        buktiBayar: 'bukti_bayar_bucket_id',
    }
};

export default client;
