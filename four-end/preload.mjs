console.log("preload script loaded");

import { exec, execFile } from 'child_process';
import { contextBridge, shell, ipcRenderer } from 'electron'

const getPrinters = async () => {
    // wmic printer get name | more +1
    let list
    const promisify = new Promise((resolve, reject) => {
        exec(`wmic printer get name | more +1`, (err, stdout, stderr) => {
            if (err)
                reject(stderr)
            else
                resolve(stdout)
        })
    })
    return (await promisify).split('\n').map(a => a.trim()).filter(a => a != "")
}

const getSizesPrinter = async (name) => {
    const sc =
    `$printer = '${name}'\n` +

    `Add-Type -AssemblyName System.Drawing\n` +
    `$PrintDocument = New-Object System.Drawing.Printing.PrintDocument\n` +

    `$PrintDocument.PrinterSettings.PrinterName = $printer\n` +
    `$PrintDocument.PrinterSettings.PaperSizes | ft -Property PaperName -HideTableHeaders`

    let list
    const promisify = new Promise((resolve, reject) => {
        execFile('powershell.exe', ['-command', `${sc}`], (err, stdout, stderr) => {
            if (err)
                reject(stderr)
            else
                resolve(stdout)
        })
    })
    let sizess;
    try {
        sizess = (await promisify).split('\n').map(a => a.trim()).filter(a => a != "")
    } catch {
        sizess = ["no printer dedected"]
    }
    return (sizess)
}

contextBridge.exposeInMainWorld('UrlExternal', {
    openUrlExternal: link => shell.openExternal(link)
})

contextBridge.exposeInMainWorld('printDOM', {
    blob2printer: (blob) => ipcRenderer.send('print', blob),
    setPrinter: (name) => ipcRenderer.send('printer', name),
    getPrinters: async () => await getPrinters(),
    setSizePrinter: (idx) => ipcRenderer.send('size', idx),
    getSizesPrinter: async (name) => await getSizesPrinter(name)
})
