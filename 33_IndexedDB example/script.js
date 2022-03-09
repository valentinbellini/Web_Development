"use strict";

const IDBRequest = indexedDB.open("usuarios",1);

//Almacenaremos datos como objetos
IDBRequest.addEventListener("upgradeneeded",()=>{
	const db = IDBRequest.result;
	db.createObjectStore("nombres",{
		autoIncrement: true
	})
})

IDBRequest.addEventListener("success",()=>{
	leerObjetos()
})
IDBRequest.addEventListener("error",()=>{
	console.log("Ocurrio un error al abrir la base de datos");
})

document.getElementById(`add`).addEventListener("click",()=>{
	let nombre = document.getElementById(`nombre`).value;
	if(nombre.length > 0){
		if(document.querySelector(".posible") !== null){
			if (confirm("Hay elementos sin guardar: ¿Quieres continuar?")){
				addObjeto({nombre});
				leerObjetos()
			}
		} else{
			addObjeto({nombre});
			leerObjetos()
		}
	}
})

const addObjeto = objeto =>{
	const db = IDBRequest.result;
	const IDBtransaction = db.transaction("nombres","readwrite");
	const objectStore = IDBtransaction.objectStore("nombres");
	objectStore.add(objeto);
	IDBtransaction.addEventListener("complete",()=>{
		console.log("objeto agregado correctamente");
	})
}
// addObjeto({nombre: "Valentin"})


const leerObjetos = () =>{
	const db = IDBRequest.result;
	const IDBtransaction = db.transaction("nombres","readonly");
	const objectStore = IDBtransaction.objectStore("nombres");
	const cursor = objectStore.openCursor();
	const fragment = document.createDocumentFragment();
	document.querySelector(".nombres").innerHTML = "";
	cursor.addEventListener("success",()=>{
		if(cursor.result){
			let elemento = nombresHTML(cursor.result.key,cursor.result.value);
			fragment.appendChild(elemento)
			cursor.result.continue();
		} else document.querySelector(".nombres").appendChild(fragment);
	})
}
// leerObjetos()


const modificarObjeto = (key,objeto) =>{
	const db = IDBRequest.result;
	const IDBtransaction = db.transaction("nombres","readwrite");
	const objectStore = IDBtransaction.objectStore("nombres");
	objectStore.put(objeto,key);
	IDBtransaction.addEventListener("complete",()=>{
		console.log("objeto modificado correctamente");
	})
}
// modificarObjeto(key,objeto)


const eliminarObjeto = (key) =>{
	const db = IDBRequest.result;
	const IDBtransaction = db.transaction("nombres","readwrite");
	const objectStore = IDBtransaction.objectStore("nombres");
	objectStore.delete(key);
	IDBtransaction.addEventListener("complete",()=>{
		console.log("objeto eliminado correctamente");
	})
}
// eliminarObjeto(key,objeto)

const IDBData = () =>{
	const db = IDBRequest.result;
	const IDBtransaction = db.transaction("nombres","readwrite");
	const objectStore = IDBtransaction.objectStore("nombres");
	return [objectStore,IDBtransaction];
}



const nombresHTML = (id,name) =>{
	const container = document.createElement("DIV");
	const h2 = document.createElement("h2");
	const options = document.createElement("DIV");
	const saveButton = document.createElement("button");
	const deleteButton = document.createElement("button");

	container.classList.add("nombre");
	options.classList.add("options");
	saveButton.classList.add("imposible");
	deleteButton.classList.add("delete");

	saveButton.textContent = "Guardar";
	deleteButton.textContent = "Eliminar";

	h2.textContent = name.nombre;
	h2.setAttribute("contenteditable","true");
	h2.setAttribute("spellcheck","false");

	options.appendChild(saveButton);
	options.appendChild(deleteButton);

	container.appendChild(h2);
	container.appendChild(options);

	h2.addEventListener("keyup",()=>{
		saveButton.classList.replace("imposible","posible")
	})

	saveButton.addEventListener("click",()=>{
		if(saveButton.className == "posible"){
			modificarObjeto(id,{nombre: h2.textContent});
			saveButton.classList.replace("posible","imposible");
		}
	})
 
	deleteButton.addEventListener("click",()=>{
		eliminarObjeto(id);
		document.querySelector(".nombres").removeChild(container);
	})

	return container;
}