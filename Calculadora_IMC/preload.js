    const { contextBridge, ipcRenderer } = require('electron');

    contextBridge.exposeInMainWorld('imc', {
    getRecords:    ()         => ipcRenderer.invoke('get-records'),
    saveRecord:    (record)   => ipcRenderer.invoke('save-record', record),
    deleteRecord:  (id)       => ipcRenderer.invoke('delete-record', id),
    exportCSV:     ()         => ipcRenderer.invoke('export-csv'),
    closeWindow:   ()         => ipcRenderer.send('window-close'),
    minimizeWindow:()         => ipcRenderer.send('window-minimize'),
    });