const { app, BrowserWindow, Menu, globalShortcut, ipcMain, dialog } = require('electron');
const { menu, saveFile, loadFile } = require('./menu');
const fs = require('fs');
const { autoUpdater } = require('electron-updater');

let window;

app.on('ready', () => {
  window = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
    }
  });

  window.loadFile('index.html');

  // Habilitar DevTools para debugging
  window.webContents.openDevTools();

  // Configuración del menú personalizado
  Menu.setApplicationMenu(menu);

  // Registrar atajos de teclado
  globalShortcut.register('CmdOrCtrl+S', () => { saveFile(); });
  globalShortcut.register('CmdOrCtrl+O', () => { loadFile(); });

  // Configurar handlers de IPC para guardar archivos
  ipcMain.on('save', (event, content) => {
    const dialogWindow = BrowserWindow.getFocusedWindow();
    const options = {
      title: 'Guardar archivo markdown',
      filters: [
        { name: 'Markdown', extensions: ['md'] },
        { name: 'Texto', extensions: ['txt'] },
        { name: 'Todos', extensions: ['*'] }
      ]
    };

    dialog.showSaveDialog(dialogWindow, options).then(result => {
      if (!result.canceled && result.filePath) {
        try {
          fs.writeFileSync(result.filePath, content);
          console.log('Archivo guardado en:', result.filePath);
        } catch (err) {
          console.error('Error al guardar archivo:', err);
        }
      }
    });
  });

  // Configurar handlers de IPC para respuestas
  ipcMain.on('editor-reply', (event, arg) => {
    console.log(`Renderer dice: ${arg}`);
  });

  // Verificación de actualizaciones
  autoUpdater.checkForUpdatesAndNotify();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});