const { app, Menu, shell, ipcMain, BrowserWindow, globalShortcut, dialog } = require('electron');
const fs = require('fs');

function saveFile() {
    const window = BrowserWindow.getFocusedWindow();
    window.webContents.send('editor-event', 'save');
}

function loadFile() {
    const window = BrowserWindow.getFocusedWindow();
    const options = {
        title: 'Pick a markdown file',
        filters: [
            { name: 'Markdown files', extensions: ['md'] },
            { name: 'Text files', extensions: ['txt'] }
        ]
    };

    dialog.showOpenDialog(window, options).then(result => {
        if (!result.canceled && result.filePaths.length > 0) {
            const content = fs.readFileSync(result.filePaths[0]).toString();
            window.webContents.send('load', content);
        }
    });
}

const template = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Open',
                accelerator: 'CmdOrCtrl+O',
                click() { loadFile(); }
            },
            {
                label: 'Save',
                accelerator: 'CmdOrCtrl+S',
                click() { saveFile(); }
            },
            { type: 'separator' },
            { role: 'quit' }
        ]
    },
    {
        label: 'Format',
        submenu: [
            {
                label: 'Toggle Bold',
                click() {
                    const window = BrowserWindow.getFocusedWindow();
                    window.webContents.send('editor-event', 'toggle-bold');
                }
            }
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'About Editor Component',
                click() { shell.openExternal('https://simplemde.com/'); }
            }
        ]
    }
];

if (process.platform === 'darwin' || process.platform === 'win32') {
    template.unshift({
        label: app.getName(),
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'quit' }
        ]
    });
}

if (process.env.DEBUG) {
    template.push({
        label: 'Debugging',
        submenu: [
            { role: 'toggleDevTools' },
            { type: 'separator' },
            { role: 'reload', accelerator: 'Alt+R' }
        ]
    });
}

const menu = Menu.buildFromTemplate(template);

module.exports = { menu, saveFile, loadFile, ipcMain, dialog, fs };