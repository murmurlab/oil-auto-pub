import { conf } from './conf.js'

import path from 'path';
// import Fs from 'fs';
import fs from 'fs/promises';
// import { chdir, exit } from 'process';
import { pathToFileURL } from 'url';
import { exec, execFile, execFileSync } from 'child_process';
// import * as cp from 'child_process';
import * as util from 'node:util'

import { app, BrowserWindow, ipcMain } from 'electron'

import { getHwId } from 'hwid2';
import getAppDataPath from 'appdata-path';
import isOnline from 'is-online';
import { npmRunPathEnv } from 'npm-run-path';
// import { simpleGit } from 'simple-git';
import { rejects } from 'assert';
import { rename, renameSync, writeFileSync, readFileSync, truncate } from 'fs';
import { truncateSync } from 'fs';



const Promisify = fn => {
	return (...args) => {
		return new Promise((ok, ko) => {
			fn(...args, (...cb_arg) => {
				ok(cb_arg)
			})
		})
	}
}



const { createHmac } = await import('node:crypto');
const very_secret = 'abcdefg';

const appdir = getAppDataPath("oil-auto")
// console.log(appdir);
const license_file = path.join(appdir, "license")
const __dirname = app.getAppPath()

// ghost script folder 
const gsdir = path.join(__dirname, 'gs10.03.0', 'bin')
const gsexe = path.join(gsdir, 'gswin32c.exe')

// console.log(__dirname); // C:\Users\Administrator\sources\repos\oil-auto
// app.disableHardwareAcceleration() //fix the lock blur() when alert()

const remote = `https://github.com/murmurlab/ota-updater`;
const otadir = path.join(appdir, `ota`)
const ota = path.join(otadir, `ota.js`)

let printer = ""
let size = ""

// const git = path.join(__dirname, 'node_modules', 'portablegit', 'out', 'PortableGit', 'bin', 'git.exe')
// const line2 = `npm exec --package=portablegit -c git`
// const line1 = `npx --prefix ${__dirname} git`
// const line3 = `npx --prefix ${path.join(__dirname, 'portablegit')} git`

// let pro_exec = Promisify(exec)
// const stat = util.promisify(exec);


// async function x(line) {
// 	const { [0]: err, [1]: stdout, [2]: stderr } = await pro_exec(line, {
// 		env: npmRunPathEnv()
// 	})
// 		.catch(stderror => {
// 			console.log(stderror);
// 		})
// 	if (err) {
// 		console.error('err\n', err, stderr, stdout);
// 	} else {
// 		console.log('no-err\n', stderr, stdout);
// 	}
// }


// try {
// 	(async () => {
// 		{
// 			await (async () => {
// 				fs.mkdir(otadir, { recursive: true }, (err) => {
// 					if (err) console.error(err);;
// 				})
// 				await x(`${git} clone ${remote} ${otadir}`);
// 				await x(`${git} -C ${otadir} fetch`);
// 				await x(`${git} -C ${otadir} pull origin main`);
// 				await x(`${git} -C ${otadir} reset --hard`);

// 				// eval(fs.readFileSync('tools.js')+'');
// 				import(pathToFileURL(ota))
// 				// import('https://raw.githubusercontent.com/murmurlab/ota-updater/main/ota.js')
// 				// console.log('finished')
// 			})()
// 		}
// 	})
// 	()
// } catch (e) {
// 	console.log(e);
// }



/* .catch(e => {
	// console.error(e);
}) ?? {} */
// examgle 0 || {} bad, because (0).any is ok but will skipp then return {}.any so (0).any acceptaple

// exec('git', (err, serr, sout) => {
// 	console.log(serr);
// })




// try {

// 	await (async () => {
// 		{
// 			await (async () => {
// 				fs.mkdir(otadir, { recursive: true }, (err) => {
// 					if (err) console.error(err);;
// 				})
// 				await simpleGit(otadir).checkIsRepo()
// 					.then(async (isRepo) => {
// 						if (!isRepo)
// 							await simpleGit(otadir).init().addRemote('origin', remote)
// 					})
// 				await simpleGit(otadir).fetch().pull(remote, 'main').catch(e => {
// 					console.log(e);
// 				})
// 				// eval(fs.readFileSync('tools.js')+'');
// 				import(pathToFileURL(ota))
// 				// import('https://raw.githubusercontent.com/murmurlab/ota-updater/main/ota.js')
// 				// console.log('finished')
// 			})()
// 		}
// 	})()
// } catch (e) {
// 	console.log(e);
// }


// console.log(getHwId()); // ca19233b843e4fd1a6baf73fa8212fe3
// echo "e5 6b dc d4 12 14 7f c5 35 d6 82 04 67 00 6e 23 d0 6c 8f f0 24 0c e4 9e c5 be 8b 47 6d e9 9a 74" | tr -d ' ' | xxd -r -p - > test


// run().catch(console.dir);


const p = blob => {
	const content = Buffer.from(blob);
	// const content = Buffer.from(blob.split(',')[1], 'base64');

	// console.log(content);
	fs.writeFile(path.join(appdir, "tmp.pdf"), content, err => {
		if (err) {
			console.error(err);
		} else {
			console.log('file written succesfully');
		}
	}).then(a => {
		console.log(a, '<- saved');

		const file = `C:\\Users\\Administrator\\Documents\\cv_v1.0.0.pdf`
		const file2 = `${path.join(appdir, "tmp.pdf")}`
		// const sc =
		// 	`$order = '${file2}'\n` +
		// 	`$printer = '${printer}'\n` +
		// 	`$paperize = ${size}\n` +

		// 	`Add-Type -AssemblyName System.Drawing\n` +
		// 	`$PrintDocument = New-Object System.Drawing.Printing.PrintDocument\n` +

		// 	// `$src=[System.Drawing.Image]::FromFile("$order")\n` +

		// 	`$PrintDocument.DefaultPageSettings.PaperSize = $PrintDocument.PrinterSettings.PaperSizes | Select-Object -Index $paperize\n` +
		// 	`$pagem = $PrintDocument.DefaultPageSettings.PaperSize\n` +
		// 	// `if ( $src.Width -gt $src.Height ){\n` +
		// 	// `$multer = ($pagem.Width / $src.Width)    \n` +
		// 	// `}else{\n` +
		// 	// `$multer = ($pagem.Height / $src.Height)\n` +
		// 	// `}\n` +
		// 	// `$PrintDocument.Add_PrintPage({$_.Graphics.DrawImage($src, ($pagem.Width/2) - (($src.Width * $multer)/2) , 0, ($src.Width * $multer), ($src.Height * $multer))})\n` +

		// 	`$PrintDocument.PrinterSettings.PrinterName = $printer\n` +
		// 	`$PrintDocument.DocumentName = $order\n` +

		// 	`$PrintDocument.DefaultPageSettings.Landscape = $false\n` +
		// 	`$PrintDocument.Print()\n`

		try {
			let outt = execFileSync('powershell.exe', ['-command',`
			Add-Type -AssemblyName System.Drawing
			$PrintDocument = New-Object System.Drawing.Printing.PrintDocument
			$PrintDocument.PrinterSettings.PrinterName = "${printer}"
			$PrintDocument.PrinterSettings.PaperSizes | Select-Object -Index ${size} | ft -Property 'PaperName' -HideTableHeaders
			`]).toString().trim()	
		} catch {
			console.log("error while printing");
		}

		// outt = 'letter'

		// for help gswin32c -h

		// const gsargs = [
		// 	"-q",
		// 	"-r1600",
		// 	"-sDEVICE=mswinpr2",
		// 	"-dBATCH",
		// 	"-dNOPAUSE",
		// 	"-dFitPage",
		// 	"-dFIXEDMEDIA",
		// 	`-sPAPERSIZE=${outt}`,
		// 	`-sOutputFile=%printer%${printer}`,
		// 	file2
		// ]
		// console.log(gsargs);
		// const child = execFile(gsexe, gsargs, (error, stdout, stderr) => {
		// 	if (error) {
		// 		console.error(error);;
		// 		console.error(stderr);;
		// 	} else {
		// 		console.log(stdout);
		// 		console.error(stderr);;
		// 	}
		// });


		// sharp(path.join(appdir, "tmp.svg"))
		// 	.toFormat('png')
		// 	.toFile(path.join(appdir, "tmp.png"), function (err) {
		// 		console.log(err);
		// 		// output.jpg is a 300 pixels wide and 200 pixels high image
		// 		// containing a scaled and cropped version of input.jpg
		// 	});

		// svg2img(path.join(appdir, "tmp.svg"), {
		// 	// resvg: {
		// 	// 	fitTo: {
		// 	// 		mode: 'width', // or height
		// 	// 		value: 600,
		// 	// 	},
		// 	// }
		// }, function (error, buffer) {
		// 	Fs.writeFileSync(path.join(appdir, "tmp.png"), buffer);

		// });

		// C:\Users\Administrator\Desktop\wallpaper_murmurcute (1).png
		// ${path.join(appdir, "tmp.png")}
		// pwsh -Command 'Get-Content .\Desktop\print.ps1 | Out-Printer -Name PDFCreator'
		// wmic printer list brief
		// wmic printer get name
		// wmic printer list full
		// Get-CIMInstance CIM_Printer | Format-Table -HideTableHeaders Name
		// Get-Printer | Format-Table -HideTableHeaders Name
		// get-WmiObject -class Win32_printer | ft name -HideTableHeaders
		// wmic printer get name | more +1
		// rundll32 C:\WINDOWS\system32\shimgvw.dll,ImageView_PrintTo "C:\Users\Administrator\Desktop\wallpaper_murmurcute (1).png" "PDFCreator"
		// use exec for rundll32
		// use exec for rundll32
		// use exec for rundll32
		// use exec for rundll32
		// use exec for rundll32
		// use exec for rundll32

		// const script2 = `rundll32 shimgvw.dll,ImageView_PrintTo "${path.join(appdir, "tmp.png")}" "${printer}"`
		// // const script = `Get-Content ${path.join(appdir, "tmp.png")} | Out-Printer -Name ${printer}`
		// const child = exec(script2, (error, stdout, stderr) => {
		// 	if (error) {
		// 		console.error(error);;
		// 	} else {
		// 		console.log(stdout);
		// 		console.log(script2);
		// 	}
		// });

		// const x = exec(`powershell -command ${script}`, (e, o) => {
		// 	console.log(e);
		// 	console.log(o);
		// })

	})

}

ipcMain.on('print', (event, blob) => {
	// console.log('aaaaaaaaaaaaaaaaaaaaaa');
	p(blob)
})

ipcMain.on('printer', (e, name) => {
	printer = name
	console.log(printer, 'setted');
})

ipcMain.on('size', (e, idx) => {
	size = idx
	console.log(size, 'setted');
})


const front_end = "four-end"


const murmurhash = () => {
	return (
		createHmac('sha256', very_secret)
			.update(getHwId())
			.digest()
	)
}


const activate = async (key) => {
	console.log("fetching...");
	const curly = `https://my-firebasefunctions-app.a.run.app?key=${key}&hwid=${murmurhash().toString("hex")}`
	let res
	await fetch(curly)
		.then(async d => {
			res = await d.text()
		})
		.catch(e => {
			// console.log(e)
			res = "X"
		})
	// console.log(`response: ${res} ${curly}`);

	// !REMOVE LICENSE VERIFY
	// !REMOVE LICENSE VERIFY
	// !REMOVE LICENSE VERIFY
	return [6, "unlocked"]
	// !REMOVE LICENSE VERIFY
	// !REMOVE LICENSE VERIFY
	// !REMOVE LICENSE VERIFY

	switch (res) {
		case "0": { // full dev
			return [5, null]
		}
			break;
		case "1": { // invalid key
			return [4, null]
		}
			break;
		case "X": { // fetch error
			return [7, null]
		}
			break;
		default: { // succes !
			return [6, res]
		}
			break;
	}
}

const view = () => {
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			sandbox: false,
			preload: path.join(__dirname, front_end, 'preload.mjs'),
		},
		titleBarStyle: 'default',
		frame: true,
		resizable: true,
	})
	mainWindow.loadFile(path.join(front_end, 'index.html'))
	mainWindow.maximize()
}

const viewLicenser = async () => {
	const licenser = new BrowserWindow({
		width: 400,
		height: 200,
		frame: false,
		resizable: false,
		// transparent: true,
		// roundedCorners: true,
		movable: true,
		webPreferences: {
			experimentalFeatures: true,
			preload: path.join(__dirname, front_end, "licenser", 'preload.mjs'),
			devTools: true,
			contextIsolation: true, //arst
			contextBridge: true,
			// enableRemoteModule: true,
			nodeIntegration: false,

		},
		titleBarStyle: 'hidden'
	})
	await licenser.loadFile(path.join(front_end, "licenser", 'index.html'))
	return licenser
}

const createWindow = () => {
	fs.stat(license_file, async (err, stat) => {
		if (err == null) {
			fs.open(license_file, 0o600).then(async fd => {
				const buff = Buffer.alloc(32);
				fd.read({ buffer: buff, length: 32 })
					.then(async d => {
						// console.log(String(Array(buff)))
						// console.log(Buffer(getHwId()))
						fd.close(fd)
						// console.log(buff, buff.length, "original")
						// console.log(hash, hash.length, "hash");
						// if (String(Array(buff)) == String(Array(hash)))

						
						// !REMOVE LICENSE VERIFY
						// !REMOVE LICENSE VERIFY
						// !REMOVE LICENSE VERIFY
						// !REMOVE LICENSE VERIFY
						// !REMOVE LICENSE VERIFY
						// !REMOVE LICENSE VERIFY
						// !REMOVE LICENSE VERIFY

						// if (!buff.compare(murmurhash())) {
							// view()
						// }
						if (buff.compare(murmurhash())) {
							view()
						}
						// !REMOVE LICENSE VERIFY
						// !REMOVE LICENSE VERIFY
						// !REMOVE LICENSE VERIFY
						// !REMOVE LICENSE VERIFY
						// !REMOVE LICENSE VERIFY
						// !REMOVE LICENSE VERIFY
						// !REMOVE LICENSE VERIFY



						else {
							let licenser = await viewLicenser()
							licenser.webContents.send("lic", 2)
						}
					})
					.catch(e => {
						console.log(e);
					})
			}).catch(async e => {
				if (e.code == 'ENOENT') {

				}
			})
		} else if (err.code === 'ENOENT') {
			// console.log("no license file");

			let licenser = await viewLicenser()
			// setInterval(i=>{
			//   licenser.blur()

			//   licenser.webContents.focus()
			// }, 1000)
			ipcMain.on('x', (event, key) => {
				licenser.destroy()
				exit(key)
			})
			ipcMain.on('focus', (event, key) => {
				// licenser.blur()
				// licenser.webContents.focus()
			})
			// ipcMain.emit('lic', 1)
			// licenser.webContents.on("set-title", (e) => {
			//   console.log(e);
			// })
			// licenser.on("")
			// licenser.webContents.send("set-title", "title")
			if (!await isOnline({ timeout: 5000 }))
				licenser.webContents.send("lic", 1)
			else {
				ipcMain.on('lic', async (event, key) => {
					// const webContents = event.sender
					// const win = BrowserWindow.fromWebContents(webContents)
					// win.setTitle(title)
					const res = await activate(key) // return 6 with api manipulation vulnerability
					// console.log(res);

					if (res[0] == 6) {
						// console.log(res[1], Buffer.from(res[1], "hex"));
						fs.mkdir(appdir, { recursive: true }, (err) => {
							if (err) throw err;
						});
						fs.writeFile(license_file, Buffer.from(res[1], "hex"))
						// console.log("oppenninngg");
						view()
						licenser.destroy()
					} else {
						licenser.webContents.send("lic", res[0])
					}
				})
				licenser.webContents.send("lic", 3)
			}
		} else {
			console.log('Some other error:', err.code);
		}
	});


	// Open the DevTools.
	// mainWindow.webContents.openDevTools()
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.commandLine.appendSwitch('enable-features', 'enable-experimental-web-platform-features');
app.commandLine.appendSwitch('enable-experimental-web-platform-features');

app.whenReady().then(() => {
	createWindow()
	app.on('activate', () => {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
})
console.log("test");
