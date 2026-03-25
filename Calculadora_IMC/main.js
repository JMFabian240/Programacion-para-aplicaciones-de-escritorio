    const { app, BrowserWindow, ipcMain, dialog } = require('electron');
    const path = require('path');
    const fs = require('fs');

    // Ruta del archivo de datos
    const dataFile = path.join(app.getPath('userData'), 'registros_imc.json');

    function createWindow() {
    const win = new BrowserWindow({
        width: 900,
        height: 700,
        minWidth: 750,
        minHeight: 600,
        webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js')
        },
        frame: false,
        backgroundColor: '#0d0d0d'
    });

    win.loadFile('index.html');
    }

    app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
    });

    app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
    });

    // ── IPC Handlers ──────────────────────────────────────────────

    // Leer registros
    ipcMain.handle('get-records', () => {
    try {
        if (!fs.existsSync(dataFile)) return [];
        const data = fs.readFileSync(dataFile, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
    });

    // Guardar nuevo registro
    ipcMain.handle('save-record', (_, record) => {
    try {
        let records = [];
        if (fs.existsSync(dataFile)) {
        records = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
        }
        records.unshift(record); // más reciente primero
        fs.writeFileSync(dataFile, JSON.stringify(records, null, 2), 'utf-8');
        return { success: true };
    } catch (e) {
        return { success: false, error: e.message };
    }
    });

    // Eliminar registro por id
    ipcMain.handle('delete-record', (_, id) => {
    try {
        let records = [];
        if (fs.existsSync(dataFile)) {
        records = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
        }
        records = records.filter(r => r.id !== id);
        fs.writeFileSync(dataFile, JSON.stringify(records, null, 2), 'utf-8');
        return { success: true };
    } catch (e) {
        return { success: false, error: e.message };
    }
    });

    // Exportar a CSV
    ipcMain.handle('export-csv', async () => {
    try {
        const { filePath } = await dialog.showSaveDialog({
        title: 'Exportar registros IMC',
        defaultPath: `registros_imc_${new Date().toISOString().split('T')[0]}.csv`,
        filters: [{ name: 'CSV', extensions: ['csv'] }]
        });
        if (!filePath) return { success: false, cancelled: true };

        let records = [];
        if (fs.existsSync(dataFile)) {
        records = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
        }

        const header = 'Nombre,Peso (kg),Altura (cm),IMC,Clasificación,Fecha\n';
        const rows = records.map(r =>
        `"${r.nombre}",${r.peso},${r.altura},${r.imc},"${r.clasificacion}","${r.fecha}"`
        ).join('\n');

        fs.writeFileSync(filePath, header + rows, 'utf-8');
        return { success: true, path: filePath };
    } catch (e) {
        return { success: false, error: e.message };
    }
    });

    // Cerrar / minimizar ventana
    ipcMain.on('window-close', () => app.quit());
    ipcMain.on('window-minimize', (e) => BrowserWindow.fromWebContents(e.sender).minimize());