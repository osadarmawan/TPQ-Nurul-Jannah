/**
 * BACKEND TPQ DIGITAL - GOOGLE APPS SCRIPT
 * Database: Google Sheets
 * 
 * CARA PENGGUNAAN:
 * 1. Buka Google Sheets baru.
 * 2. Klik Menu 'Extensions' -> 'Apps Script'.
 * 3. Hapus semua kode yang ada dan paste kode ini.
 * 4. Klik 'Deploy' -> 'New Deployment'.
 * 5. Pilih Type: 'Web App'.
 * 6. Execute as: 'Me'.
 * 7. Who has access: 'Anyone'.
 * 8. Copy Web App URL untuk dimasukkan ke variabel lingkungan Vercel / React App.
 */

const CONFIG = {
  // Nama-nama sheet yang akan otomatis dibuat
  SHEETS: {
    SANTRI: 'Santri',
    STAFF: 'Staff',
    FINANCE: 'Finance',
    ACADEMIC: 'Academic',
    DEVELOPMENT: 'Development'
  },
  // Definisi Header untuk tiap sheet
  HEADERS: {
    Santri: ['id', 'nama', 'nis', 'status', 'jilid', 'ortu', 'gender', 'tglDaftar', 'createdAt'],
    Staff: ['id', 'nama', 'nip', 'role', 'status', 'email', 'phone', 'joinDate', 'salary', 'createdAt'],
    Finance: ['id', 'trxId', 'date', 'time', 'desc', 'cat', 'type', 'amount', 'method', 'cashier', 'createdAt'],
    Academic: ['id', 'nama', 'jilid', 'materi', 'nilai', 'tanggal', 'ustadz', 'createdAt'],
    Development: ['id', 'name', 'status', 'progress', 'budget', 'spent', 'date', 'contractor', 'createdAt']
  }
};

/**
 * Handle POST Requests
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action; // 'read', 'create', 'update', 'delete'
    const table = data.table;   // e.g., 'Santri'
    
    // Inisialisasi Database jika belum ada
    initDatabase();

    let result;
    switch (action) {
      case 'read':
        result = readData(table);
        break;
      case 'create':
        result = createData(table, data.payload);
        break;
      case 'update':
        result = updateData(table, data.id, data.payload);
        break;
      case 'delete':
        result = deleteData(table, data.id);
        break;
      default:
        throw new Error('Action tidak dikenal');
    }

    return responseSuccess(result);
  } catch (error) {
    return responseError(error.toString());
  }
}

/**
 * Inisialisasi Sheet dan Header jika belum exist
 */
function initDatabase() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  Object.keys(CONFIG.HEADERS).forEach(sheetName => {
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      sheet.appendRow(CONFIG.HEADERS[sheetName]);
      // Format header: Bold dan Background Hijau
      sheet.getRange(1, 1, 1, CONFIG.HEADERS[sheetName].length)
           .setFontWeight('bold')
           .setBackground('#064E3B')
           .setFontColor('white');
    }
  });
}

/**
 * READ: Mengambil semua data dari sheet tertentu
 */
function readData(tableName) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(tableName);
  const values = sheet.getDataRange().getValues();
  const headers = values[0];
  const data = [];

  for (let i = 1; i < values.length; i++) {
    let obj = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = values[i][j];
    }
    data.push(obj);
  }
  return data;
}

/**
 * CREATE: Menambah data baru
 */
function createData(tableName, payload) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(tableName);
  const headers = CONFIG.HEADERS[tableName];
  
  // Generate ID jika tidak ada
  if (!payload.id) payload.id = Utilities.getUuid();
  payload.createdAt = new Date().toISOString();

  const row = headers.map(header => payload[header] || '');
  sheet.appendRow(row);
  return payload;
}

/**
 * UPDATE: Memperbarui data berdasarkan ID
 */
function updateData(tableName, id, payload) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(tableName);
  const values = sheet.getDataRange().getValues();
  const headers = values[0];
  
  for (let i = 1; i < values.length; i++) {
    if (values[i][0] == id) {
      // Loop tiap header untuk update kolom yang sesuai
      headers.forEach((header, index) => {
        if (payload[header] !== undefined) {
          sheet.getRange(i + 1, index + 1).setValue(payload[header]);
        }
      });
      return { status: 'updated', id: id };
    }
  }
  throw new Error('Data dengan ID ' + id + ' tidak ditemukan');
}

/**
 * DELETE: Menghapus data berdasarkan ID
 */
function deleteData(tableName, id) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(tableName);
  const values = sheet.getDataRange().getValues();
  
  for (let i = 1; i < values.length; i++) {
    if (values[i][0] == id) {
      sheet.deleteRow(i + 1);
      return { status: 'deleted', id: id };
    }
  }
  throw new Error('Data dengan ID ' + id + ' tidak ditemukan');
}

/**
 * Helpers untuk Response JSON
 */
function responseSuccess(data) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    data: data
  })).setMimeType(ContentService.MimeType.JSON);
}

function responseError(message) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'error',
    message: message
  })).setMimeType(ContentService.MimeType.JSON);
}
