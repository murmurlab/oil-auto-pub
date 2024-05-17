// import {} from './libs/davidshimjs-qrcodejs-04f46c6/qrcode.js'

// domtoimage.toJpeg(paper, { quality: 0.95 })
// .then(function (dataUrl) {
//    console.log(dataUrl);
// });



// domtoimage.toPng(paper)
//     .then(function (dataUrl) {
//         var img = new Image();
//         img.src = dataUrl;
//         document.body.appendChild(img);
//     })
//     .catch(function (error) {
//         console.error('oops, something went wrong!', error);
//     });


// import QrCode from './libs/qrcodejs-master/qrcode.mjs'

// const data = 'Hello, World!';
// const matrix = QrCode.generate(data);
// const uri = QrCode.render('medium', matrix, {white: false});
// console.log(uri);

// // const img = document.createElement("img")
// // img.src = uri

// document.querySelector('#quadrata-code').innerHTML = `${uri}`

// import html2canvas from './libs/html2canvas.js';


let focussed = {}


const prnsel = document.querySelector("#prnsel")
const printers = document.querySelector("#printers")
const sizsel = document.querySelector("#sizsel")
const sizes = document.querySelector("#sizes")
const paper = document.querySelector("#preview-panel")
const filters = document.getElementsByClassName("inp-2")
const mur = document.getElementById("mur")
const help = document.getElementById("help")
const help_menu = document.getElementById("help-menu")
const save = document.getElementById("save")
const reset = document.getElementById("reset")
const reset2 = document.getElementById("reset-2")
const title = document.getElementById("t-title")
const del = document.getElementById("del")
const table = document.getElementById("table")
const form_type = document.getElementById("form-type")
const tcnomu = document.getElementById("tcnomu")
const print = document.getElementById("print")
const preview = document.getElementById("preview")
const preview_panel = document.getElementById("preview-panel")
const footer = document.getElementById("footer")

// inputs
const logo_select = document.getElementById("logo-select")
const kasa_select = document.getElementById("kasa-select")
const inp_baslik = document.getElementById("baslik")
const vergi = document.getElementById("vergi")
const alt_baslik = document.getElementById("alt-baslik")
const fis_date = document.getElementById("fis-date")
const fis_litre = document.getElementById("fis-litre")
const fis_fiyat = document.getElementById("fis-fiyat")
const fis_total = document.getElementById("fis-total")
const fis_no = document.getElementById("fis-no")
const fis_plaka = document.getElementById("fis-plaka")
const fis_tc = document.getElementById("fis-tc")
const fis_vendor = document.getElementById("fis-vendor")
const fis_eku = document.getElementById("fis-eku")
const fis_z = document.getElementById("fis-z")
const fis_type = document.getElementById("fis-type")

// outputs
const baslik_content = document.getElementById("baslik-content")
const date_content = document.getElementById("date-content")
const time_content = document.getElementById("time-content")
const num_content = document.getElementById("num-content")
const price_content = document.getElementById("price-content")
const total_price = document.getElementById("total-price")
const cash = document.getElementById("cash")
const total_kdv = document.getElementById("total-kdv")
const price2_content = document.getElementById("price2-content")
const tckn = document.getElementById("num-content2")
const vkn = document.getElementById("tckn")
const vendor = document.getElementById("vendor")
const plaka = document.getElementById("plaka")
const ekuno = document.getElementById("ekuno")
const zno = document.getElementById("zno")
const type = document.getElementById("type")


let db;

let item = {
	// index: 333,
	description: 'It is a purple 111199222!',
	created: new Date().getTime(),
};

const openRequest = indexedDB.open('db1', 1);

openRequest.onupgradeneeded = function (e) {
	db = e.target.result;
	console.log('onupgradeneeded');
	const storeOS = db.createObjectStore('fishes', { keyPath: "uid", autoIncrement: true });
	// storeOS.createIndex("a", "b", { unique: false });
	// storeOS.createIndex("c", "d", { unique: false });
	// storeOS.createIndex("e", "f", { unique: false });
};
openRequest.onsuccess = function (e) {
	console.log('running onsuccess');
	db = e.target.result;
	console.log("onsucces", db);
	listUpdate()
	// addItem(item);
};
openRequest.onerror = function (e) {
	console.log('onerror! doesnt work');
	console.dir(e);
};

function addItem(item) {
	const tx = db.transaction("fishes", "readwrite");
	const store = tx.objectStore('fishes');
	store.add(item);
}

const putItem = item => {
	const tx = db.transaction("fishes", "readwrite");
	const store = tx.objectStore('fishes');
	store.put(item);
}

function delItem(key) {
	const tx = db.transaction("fishes", "readwrite");
	const store = tx.objectStore('fishes');
	Number(key) ? store.delete(Number(key)) : null;
}

const getItem = key => {
	const tx = db.transaction("fishes", "readwrite");
	const store = tx.objectStore('fishes');
	Number(key) ? store.get(Number(key)).onsuccess = editFocusUtil : null;
}

function getLastIdx() {
	const tx = db.transaction("fishes", "readwrite");
	const store = tx.objectStore('fishes');
	store.add(item);
}

const filitre = document.getElementById("filitre")

function createElementFromHTML(htmlString) {
	var div = document.createElement('div');
	div.innerHTML = htmlString.trim();

	// Change this to div.childNodes to support multiple top-level nodes.
	return div.firstChild;
}

const listUpdate = cb => {
	title.style.border = "0.0rem greenyellow dashed"
	title.setAttribute("foc", "0")
	const objectStore = db.transaction('fishes', "readonly").objectStore('fishes');
	const x = table.children.length
	for (let index = 2; index < x; index++) {
		const element = table.children[2];
		table.removeChild(element)
	}

	objectStore.openCursor().onsuccess = (event) => {
		const cursor = event.target.result;
		// Check if there are no (more) cursor items to iterate through
		if (!cursor) {
			cb ? cb() : undefined
			return;
		}

		const dataset = cursor.value.dataset;
		if (!dataset.every((e, i) => {
			return String(e).includes(filitre.children[i].children[0].value)
		})) return cursor.continue();
		console.log('accept filter');
		const row = `<div class="row">
		<div title='${dataset[0]}' class="column">
			<span class="text-1">${dataset[0]}</span>
		</div>
		<div title='${kasa_select[dataset[1]].innerText}' class="column">
			<span class="text-1">${kasa_select[dataset[1]].innerText}</span>
		</div>
		<div title='${logo_select[dataset[2]].innerText}' class="column">
			<span class="text-1">${logo_select[dataset[2]].innerText}</span>
		</div>
		<div title='${dataset[3]}' class="column">
			<span class="text-1">${dataset[3]}</span>
		</div>
		<div title='${dataset[4]}' class="column">
			<span class="text-1">${dataset[4]}</span>
		</div>
		<div title='${dataset[5]}' class="column">
			<span class="text-1">${dataset[5]}</span>
		</div>
		<div title='${dataset[6]}' class="column">
			<span class="text-1">${dataset[6]}</span>
		</div>
		<div title='${dataset[7]}' class="column">
			<span class="text-1">${dataset[7]}</span>
		</div>
		<div title='${dataset[8]}' class="column">
			<span class="text-1">${dataset[8]}</span>
		</div>
		<div title='${cursor.key}' class="column">
			<span class="text-1">${cursor.key}</span>
		</div>
	</div>`

		table.insertAdjacentHTML('beforeend', row);
		if (cursor.value.uid == focussed.children?.[9].children[0].innerText) {

			console.log('ayni var', table.lastChild);
			sel(table.lastChild)
		}
		// if (notified === 'yes') {
		//     listItem.style.textDecoration = 'line-through';
		//     listItem.style.color = 'rgba(255, 0, 0, 0.5)';
		// }

		// continue on to the next item in the cursor
		cursor.continue();
	}

}

const getPrinters = async () => {
	let list = await printDOM.getPrinters()
	if (list.length == 0)
		list = ["no printer dedected"]
	console.log(list);
	list.forEach(el => {
		const opt = document.createElement('option')
		opt.innerText = el
		printers.appendChild(opt)
	});
	let prt = localStorage.getItem('printer')
	if (!prt) {
		localStorage.setItem('printer', prt = prnsel.selectedIndex)
	} else {
		prnsel.selectedIndex = prt
	}
	printDOM.setPrinter(prnsel.options[prt].value)
}
await getPrinters()
const listSizes = async (name) => {
	const x = sizes.children.length
	for (let index = 0; index < x; index++) {
		const element = sizes.children[0];
		sizes.removeChild(element)
	}
	const list = await printDOM.getSizesPrinter(name)
	// console.log(list);
	list.forEach(el => {
		const opt = document.createElement('option')
		opt.innerText = el
		sizes.appendChild(opt)
	});
	let prt = localStorage.getItem('size')
	if (!prt) {
		localStorage.setItem('size', prt = sizsel.selectedIndex)
	} else {
		sizsel.selectedIndex = prt
	}
	printDOM.setSizePrinter(sizsel.selectedIndex)
}
	// console.log(prnsel);
listSizes(prnsel.selectedOptions[0].innerText)

const load_form = (selector) => {
	// .value, e.target.getAttribute("selectedindex")
	document.getElementById(`form-${selector.value}`).classList.remove("hide")
	document.getElementById(`form-${selector.getAttribute("selectedindex")}`).classList.add("hide")
	selector.setAttribute("selectedindex", selector.value)
}


fis_fiyat.addEventListener("input", e => {
	const litre = fis_litre.value
	const price = fis_fiyat.value


	console.log("fiyat");
	fis_total.value = litre * price
})
fis_litre.addEventListener("input", e => {
	const litre = fis_litre.value
	const price = fis_fiyat.value


	console.log("litre");
	fis_total.value = litre * price
})

const do_preview = () => {
	render_out()
	if (preview_panel.classList.contains("hide"))
		preview_panel.classList.remove("hide")
	else
		preview_panel.classList.add("hide")
}

const fisinps = document.getElementsByClassName("fishes")
for (const iterator of fisinps) {
	iterator.addEventListener("input", e => {
		render_out()
	})
}

const addQr = data => {
	const qrdiv = document.querySelector("#quadrata-code")
	qrdiv.children[0]?.remove()
	qrdiv.children[0]?.remove()
	var qrcode = new QRCode(document.getElementById("quadrata-code"), {
		text: data,
		width: 86,
		height: 86,
		colorDark: "#000000",
		colorLight: "#ffffff"
		// correctLevel : QRCode.CorrectLevel.H
	});
}

const render_out = () => {
	const litre = fis_litre.value
	const price = fis_fiyat.value

	baslik_content.innerText = inp_baslik.value
	date_content.innerText = fis_date.value.split('T')[0]
	time_content.innerText = fis_date.value.split('T')[1]
	// num_content.innerText = focussed.children?.[9].children[0].innerText
	num_content.innerText = fis_no.value
	price_content.innerText = `${litre} LT X ${price}`
	ekuno.innerText = fis_eku.value
	zno.innerText = fis_z.value
	plaka.innerText = fis_plaka.value
	type.innerText = `${fis_type.value} %20`
	footer.innerText = alt_baslik.value
	price2_content.innerText = `*${(litre * price).toFixed(2)}`
	total_price.innerText = `*${(litre * price).toFixed(2)}`
	cash.innerText = `*${(litre * price).toFixed(2)}`
	total_kdv.innerText = `*${((litre * price) * 0.2).toFixed(2)}`
	tckn.innerText = fis_tc.value
	vendor.innerText = fis_vendor.value
	if (tcnomu.children[0].checked) {
		plaka.innerText = `PLAKASIZ SATIS FISI`
	}
	console.log(`${vergi.value} ${fis_date.value} ${fis_no.value} ${fis_type.value} ${fis_litre.value}`);
	addQr(`${vergi.value} ${fis_date.value} ${fis_no.value} ${fis_type.value} ${fis_litre.value}`)
}
const clear_out = () => {
	baslik_content.innerText = `null`
	date_content.innerText = `null`
	time_content.innerText = `null`
	// num_content.innerText = focussed.children?.[9].children[0].innerText
	num_content.innerText = `null`
	price_content.innerText = `null LT X null`
	ekuno.innerText = `null`
	zno.innerText = `null`
	plaka.innerText = `null`
	type.innerText = `null %20`
	footer.innerText = `null`
	price2_content.innerText = `*null`
	total_price.innerText = `*null`
	cash.innerText = `*null`
	total_kdv.innerText = `*null`
	tckn.innerText = `null`
	vendor.innerText = `null`
	if (tcnomu.children[0].checked) {
		plaka.innerText = `PLAKASIZ SATIS FISI`
	}
}

// do_preview()


tcnomu.addEventListener("change", e => {
	console.log(e.target.checked);
	const prefix_ID = form_type.selectedOptions[0].value
	const sel_form = document.getElementById(`form-${prefix_ID}`)
	if (!e.target.checked) {
		sel_form.children[7].classList.remove("hide")
		sel_form.children[8].classList.add("hide")
		sel_form.children[9].classList.add("hide")
		vkn.classList.add("hide")
		vendor.classList.add("hide")
		plaka.innerText = fis_plaka.value
	} else {
		sel_form.children[7].classList.add("hide")
		sel_form.children[8].classList.remove("hide")
		sel_form.children[9].classList.remove("hide")
		plaka.innerText = "PLAKASIZ SATIS FISI"
		vkn.classList.remove("hide")
		vendor.classList.remove("hide")
	}
})
let state = 0
help.addEventListener("click", e => {
	if (!state)
		help_menu.style.display = "block"
	else
		help_menu.style.display = "none"
	state = !state
})
help.addEventListener("blur", e => {
	// help_menu.style.display = "none"
})

mur.addEventListener("click", e => {
	e.preventDefault()
	UrlExternal.openUrlExternal(e.target.href)
})

for (let inp of document.getElementsByClassName("heades")) {
	inp.setAttribute("disabled", '')
}
for (let inp of document.getElementsByClassName("fishes")) {
	inp.setAttribute("disabled", '')
}


const editFocusUtil = data => {
	const prefix_ID = form_type.selectedOptions[0].value
	const sel_form = document.getElementById(`form-1`)
	let sel

	console.log(data.target.result);

	if (focussed.id != 't-title')
		for (let index = 0; index < sel_form.children.length; index++) {
			const iterator = sel_form.children[index];
			// console.log(iterator);
			if (iterator.id == 'formcntl')
				continue
			if (iterator.tagName == 'SELECT') {
				// document.querySelector("#logo-select").selectedOptions[0].innerText
				if (iterator.id == "kasa-select")
					sel = data.target.result.dataset[index]
				else if (iterator.id == "logo-select")
					sel = data.target.result.dataset[index]
				iterator.selectedIndex = sel
			} else {
				iterator.value = data.target.result.dataset[index]
			}
		}
	render_out()
}

const editFocus = rowf => {
	const id = rowf.children[9].children[0].innerText
	console.log(getItem(id));
}

const rowEvent = () => {
	if (focussed.children) {
		for (let inp of document.getElementsByClassName("heades")) {
			if (inp.id != 'fis-total')
				inp.removeAttribute("disabled")
		}
		if (focussed.id != 't-title') {
			for (let inp of document.getElementsByClassName("fishes")) {
				if (inp.id != 'fis-total')
					inp.removeAttribute("disabled")
			}
		} else {
			for (let inp of document.getElementsByClassName("fishes")) {
				inp.setAttribute("disabled", '')
			}
		}
	} else {
		for (let inp of document.getElementsByClassName("heades")) {
			inp.setAttribute("disabled", '')
		}
		for (let inp of document.getElementsByClassName("fishes")) {
			inp.setAttribute("disabled", '')
		}
	}
}

const sel = rov => {
	if (rov.classList.contains("t-filter"))
		return
	if (!rov.classList.contains("row"))
		return

	if (rov.getAttribute("foc") == "1") { //unfocus
		rov.style.border = "0.0rem greenyellow dashed"
		rov.setAttribute("foc", "0")
		focussed = {}
		rowEvent()
		clear(1)
		clear(2)
		clear_out()
	} else { //focus
		if (focussed.style) {
			focussed.style.border = "0.0rem greenyellow dashed"
			focussed.setAttribute("foc", "0")
		}
		focussed = rov
		rov.style.border = "0.4rem greenyellow solid"
		rov.style.borderLeft = "none"
		rov.style.borderRight = "none"
		rov.setAttribute("foc", "1")
		rowEvent()
		editFocus(focussed)
	}

}

// $(".row").addEventListener("pointerdown", e => {

table.addEventListener("click", e => {
	const clicked = e.target.parentElement.parentElement

	sel(clicked)
})

const clear = e => {
	console.log("clearing");
	const prefix_ID = form_type.selectedOptions[0].value
	const sel_form = document.getElementById(e ? `form-${e}` : `form-${prefix_ID}`)

	for (const iterator of sel_form.children) {
		// console.log(iterator);
		iterator.value = ""
	}
}

function getChildIndex(node) {
	return Array.prototype.indexOf.call(node.parentNode.children, node);
}

save.addEventListener("click", e => {
	const vals = new Array
	const prefix_ID = form_type.selectedOptions[0].value
	const sel_form = document.getElementById(`form-${prefix_ID}`)
	let err

	for (const iterator of sel_form.children) {
		let tmpval
		// console.log(iterator);
		if (iterator.id == 'formcntl')
			continue
		if (iterator.tagName == 'SELECT') {
			tmpval = iterator.selectedIndex
			err = (tmpval < 0 ? 1 : 0)
			// iterator.selectedOptions[0].value
		} else {
			tmpval = iterator.value
			err = (tmpval == '' ? 1 : 0)
		}
		if (err) {
			alert('gerekli alanlari doldurunuz')
			if (focussed.id == 't-title') {
				// clear(1)
			}
			return
		}
		vals.push(tmpval)
	}
	if (focussed.id == 't-title') { //new
		addItem({ created: new Date().getTime(), dataset: vals })
		listUpdate()
		clear(1)
		// clear(2)
		focussed = {}
		rowEvent()
	} else if ((focussed.id == '')) { //edit
		putItem({ created: new Date().getTime(), dataset: vals, uid: Number(focussed.children[9].children[0].innerText) })
		const idx = getChildIndex(focussed)
		listUpdate(() => {
			sel(table.children[idx])
			render_out()
		})
	}
})
reset.addEventListener("click", e => clear())
reset2.addEventListener("click", e => clear())
preview.addEventListener('click', do_preview)
document.addEventListener("keyup", e => {
	if (e.key == "Delete") {
		delItem(focussed.children?.[9].children[0].innerHTML)
		focussed = {}
		listUpdate()
		clear(1)
		clear(2)
		rowEvent()
		render_out()
	}
})
del.addEventListener("click", e => {
	// console.log(focussed.children);
	delItem(focussed.children?.[9].children[0].innerHTML)
	focussed = {}
	listUpdate()
	clear(1)
	clear(2)
	rowEvent()
	render_out()
})
form_type.addEventListener("change", e => load_form(e.target))


const getByfilter = () => {
	listUpdate()
}

for (const filter of filters) {
	filter.addEventListener("input", getByfilter)
}

document.addEventListener("keydown", function (event) {
	if (event.key === "e" && (event.ctrlKey || event.metaKey)) {
		event.preventDefault(); // Prevent the default action (print dialog)
		console.log("Control + e was pressed");
		do_preview()
	}
});
document.addEventListener("keydown", function (event) {
	if (event.key === "p" && (event.ctrlKey || event.metaKey)) {
		event.preventDefault(); // Prevent the default action (print dialog)
		console.log("Control + P was pressed");
		printpdf()
	}
});


var svgm
const printpdf = () => {

	const { jsPDF } = window.jspdf;

	let element = document.querySelector('#preview-panel');
	let doc = new jsPDF('p', 'px', [element.offsetWidth, element.offsetHeight]);

	doc.html(element, {
		callback: async function (doc) {
			// console.log(doc);
			await doc.deletePage(1)
			const blob = doc.output('blob')
			const ab = await blob.arrayBuffer()
			// console.log(ab);
			printDOM.blob2printer(ab)
			// doc.save("newpdf.pdf");
		},
		x: 0,
		y: 0,
		autoPaging: false,
		// width: 800
	});
	

	// htmlToImage.toSvg(document.querySelector("#preview-panel"), {
	// 	height: 800,
	// 	width: 800,
	// 	quality: 1.0
	// })
	// 	.then(async function (dataUrl) {
	// 		svgm = decodeURIComponent(dataUrl.slice(33))
	// 		// let ab = await blob.arrayBuffer()
	// 		printDOM.blob2printer(svgm)

	// 	});


	// html2canvas(document.querySelector("#preview-panel"), {scale: 15}).then(function(canvas) {
	// 	canvas.toBlob(async blob => {
	// 		let ab = await blob.arrayBuffer()
	// 		printDOM.blob2printer(ab)

	// 	})
	// 	// document.body.appendChild(canvas);
	// });

	// document.querySelector("body > canvas")


	// domtoimage.toSvg(paper,  { 
	// 	height: 1500,
	// 	width: 1500,
	// 	// quality: 1.0 
	// })
	// 	.then(async data => {
	// 		let blob = new Blob([decodeURI(data).slice(33)]);
	// 		let ab = await blob.arrayBuffer()
	// 		// console.log(a);
	// 		printDOM.blob2printer(ab)
	// 	});
}

print.addEventListener("click", printpdf)

prnsel.addEventListener("change", e => {
	let prt
	localStorage.removeItem('size')
	localStorage.setItem('printer', prt = prnsel.selectedIndex)
	printDOM.setPrinter(prnsel.options[prt].value)
	listSizes(prnsel.options[prt].value)
})
sizsel.addEventListener("change", e => {
	let prt
	localStorage.setItem('size', prt = sizsel.selectedIndex)
	printDOM.setSizePrinter(prt)
})

// listSizes(prnsel.options[prt].value)