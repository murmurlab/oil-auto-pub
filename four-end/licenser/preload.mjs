console.log("preload script loaded");

const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('licenser', {
    activate: (key) => ipcRenderer.send('lic', key),
})

const enterLicense = () => {
    const inf = document.getElementById("info")
    const key = document.getElementById("key")
    key.style.visibility = 'visible'
    inf.innerText = "lisans kodunu giriniz."

}
const noInternetConnection = () => {
    const inf = document.getElementById("info")
    inf.innerText = "lisansi girmek icin internete baglanin"
}

const copyLicense = () => {
    const inf = document.getElementById("info")
    inf.innerText = "programi baska cihazda calistirdiniz."
}

const invalidKey = () => {
    alert("GECERSIZ ANAHTAR")
    const inputt = document.getElementById("key")
    inputt.removeAttribute("disabled")
}

const fetchError = () => {
    alert("INTERNET BAGLANTINIZI KONTROL EDIN !")
    // ipcRenderer.send('x', 0)
    const inputt = document.getElementById("key")
    inputt.removeAttribute("disabled")
}

const fullDev = () => {
    alert("BIRDEN FAZLA CIHAZ !")
    // ipcRenderer.send('x', 0)
    const inputt = document.getElementById("key")
    inputt.removeAttribute("disabled")
}

// preload.js

// All the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    // inf.innerText = "aaaaaaa"
    const inputt = document.getElementById("key")
    inputt.addEventListener("focusout", e => {
        ipcRenderer.send('lic', inputt.value)
        inputt.setAttribute("disabled", "")
    })
    inputt.addEventListener("keydown", e => {
        if (e.key == "Enter")
            inputt.blur()
    })

    console.log("listener loaded");
    ipcRenderer.on("lic", (e, arg) => {
        switch (arg) {
            case 1:
                noInternetConnection()
                break;
            case 2:
                copyLicense()
                break;
            case 3:
                enterLicense()
                break;
            case 4:
                invalidKey()
                break;
            case 5:
                fullDev()
                break;
            case 7:
                fetchError()
                break;
            default:
                alert("defaulttttttttttttttttttt1111111111111111111111111111111111111111111111");
                break;
        }
    })
})