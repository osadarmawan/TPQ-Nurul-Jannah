/**
 * Database Service to communicate with Google Apps Script
 */

const GAS_URL = (import.meta as any).env.VITE_GAS_URL;

export type TableName = 'Santri' | 'Staff' | 'Finance' | 'Academic' | 'Development';

const checkConfig = () => {
  if (!GAS_URL) {
    throw new Error('Database URL (VITE_GAS_URL) belum dikonfigurasi. Silakan hubungi pengembang.');
  }
};

export const dbService = {
  async read(table: TableName) {
    try {
      checkConfig();
      const response = await fetch(GAS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({ action: 'read', table }),
      });
      const result = await response.json();
      if (result.status === 'success') {
        return result.data;
      }
      throw new Error(result.message);
    } catch (error: any) {
      console.error(`Error reading from ${table}:`, error);
      throw error;
    }
  },

  async create(table: TableName, payload: any) {
    try {
      checkConfig();
      const response = await fetch(GAS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({ action: 'create', table, payload }),
      });
      const result = await response.json();
      if (result.status === 'success') {
        return result.data;
      }
      throw new Error(result.message);
    } catch (error: any) {
      console.error(`Error creating in ${table}:`, error);
      throw error;
    }
  },

  async update(table: TableName, id: string | number, payload: any) {
    try {
      checkConfig();
      const response = await fetch(GAS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({ action: 'update', table, id, payload }),
      });
      const result = await response.json();
      if (result.status === 'success') {
        return result.data;
      }
      throw new Error(result.message);
    } catch (error: any) {
      console.error(`Error updating in ${table}:`, error);
      throw error;
    }
  },

  async delete(table: TableName, id: string | number) {
    try {
      checkConfig();
      const response = await fetch(GAS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({ action: 'delete', table, id }),
      });
      const result = await response.json();
      if (result.status === 'success') {
        return result.data;
      }
      throw new Error(result.message);
    } catch (error: any) {
      console.error(`Error deleting from ${table}:`, error);
      throw error;
    }
  },
};
