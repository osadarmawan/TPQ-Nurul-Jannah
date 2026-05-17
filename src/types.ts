export type UserRole = 'Admin' | 'Pegawai' | 'Tamu';

export interface UserInfo {
    name: string;
    role: UserRole;
}
