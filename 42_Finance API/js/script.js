
let endpoint = 'https://api.binance.com/api/v3/ticker/price'
// fetch(endpoint)
//     .then( respuesta => respuesta.json() )
//     .then( datos => mostrarTabla(datos))
//     .catch( e => console.log(e))	


const mostrarTabla = (data)=>{
    let body = ''
    for (let i=0; i < data.length; i++) {
   		body += `<tr><td>${data[i].symbol}</td><td>${data[i].price}</td></tr>`
	}
	document.getElementById('data').innerHTML = body;
}

// ------------------------------ INDEXED DB ------------------------------ //
const IDBRequest = indexedDB.open("favorite-coins",1);
IDBRequest.addEventListener("upgradeneeded",()=>{
	const db = IDBRequest.result;
	db.createObjectStore("coin-pairs",{
		autoIncrement: true
	})
})


const addObjeto = objeto =>{
	const db = IDBRequest.result;
	const IDBtransaction = db.transaction("coin-pairs","readwrite");
	const objectStore = IDBtransaction.objectStore("coin-pairs");
	objectStore.add(objeto);
	IDBtransaction.addEventListener("complete",()=>{
		console.log("objeto agregado correctamente");
	})
}
// addObjeto({coin-pair: "BTCUSDT"})
// ------------------------------ INDEXED DB ------------------------------ //

let searchButton = document.getElementById("searchButton");
    searchButton.addEventListener("click",()=>{
    	console.log("Searching...")
    	fetch(endpoint)
		    .then( respuesta => respuesta.json() )
		    .then( datos => search(datos))
		    .catch( e => console.log(e))
})



const search = data =>{
 	let searchText = document.getElementById("searchText").value;
 	let state = false;
 	for (let i = 0; i < data.length; i++){
		if (data[i].symbol == searchText){

			let divCoin = document.querySelector(".search-coins");
			let coinName = document.createElement("p");
			let coinPrice = document.createElement("p");
			let pairdiv = document.createElement("DIV");
			let optionButton = document.createElement("button");
			pairdiv.classList.add("searched-pair");
			optionButton.classList.add("optionButton");

			coinName.innerHTML = "Pair: " + data[i].symbol;
			coinPrice.innerHTML = "Price: " + data[i].price;
			optionButton.innerHTML = "★ Add";
			console.log(i);

			optionButton.addEventListener("click",()=>{
				console.log("Agregado a favoritos en la base de datos");
				addObjeto({coinPair: data[i].symbol});
				optionButton.style.background = "#f0b90b";
			})

			pairdiv.appendChild(coinName);
			pairdiv.appendChild(coinPrice);
			pairdiv.appendChild(optionButton);
			divCoin.appendChild(pairdiv);

			state = true;
		}
	} if (state == false) {

		console.log("Dont found")
		let divCoin = document.querySelector(".search-coins");
		let NotFound = document.createElement("DIV");
		NotFound.classList.add("notFound")
		NotFound.innerHTML = "NOT FOUND";
		divCoin.appendChild(NotFound);
	}
}

const favoritos = () =>{
	const db = IDBRequest.result;
	const IDBtransaction = db.transaction("coin-pairs","readonly");
	const objectStore = IDBtransaction.objectStore("coin-pairs");
	const cursor = objectStore.openCursor();
	const fragment = document.createDocumentFragment();
	cursor.addEventListener("success",()=>{
		if(cursor.result){
				var resultadoDB = [cursor.result.key,cursor.result.value]
				// console.log(resultadoDB);
				cursor.result.continue();

				let userfavs = document.querySelector(".favorite-pairs");
				let div = document.createElement("DIV");
				div.classList.add("favPair");
				let coinName = document.createElement("p");
				coinName.innerHTML 	=  resultadoDB[1].coinPair;
				div.appendChild(coinName);
				userfavs.appendChild(div);

				fetch(endpoint)
				    .then( respuesta => respuesta.json() )
				    .then( datos => Price(datos,resultadoDB[1].coinPair))
				    .catch( e => console.log(e))
		}
	}) 
}
				
const Price = (data,coin) =>{
	for (let i = 0; i < data.length; i++){
		if (data[i].symbol == coin){
			let coinPrice = document.createElement("p");
			let userfavs = document.querySelector(".favorite-pairs");
			let div = document.querySelector(".favPair")
			coinPrice.innerHTML = data[i].price;
			div.appendChild(coinPrice);
			userfavs.appendChild(div);
		}
	}
}


let favoriteButton = document.getElementById("favoriteButton");
favoriteButton.addEventListener("click", ()=>{
	favoritos()
	let div = document.querySelector(`favorite-pairs`);
})
favoriteButton.addEventListener("click", ()=>{
	let element = document.querySelector(".favorite-pairs");
	while(element.firstElementChild){
		element.firstElementChild.remove();
	}
})

let cleanSearch = document.getElementById("cleanSearch");
cleanSearch.addEventListener("click",()=>{
	let element = document.querySelector(".search-coins");
	while(element.firstElementChild){
		element.firstElementChild.remove();
	}
})

