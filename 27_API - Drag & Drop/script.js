"use strict";

const circulo = document.querySelector(".circulo");
const rectangulo = document.querySelector(".rectangulo");



circulo.addEventListener("dragstart",(e)=>{
	e.dataTransfer.setData("clase",e.target.className); //Se suele hacer con ID y no con ClassName
	// console.log(e.dataTransfer.getData("clase"));
});
// circulo.addEventListener("drag",()=>console.log(2));
// circulo.addEventListener("dragend",()=>console.log(3));

rectangulo.addEventListener("dragenter",()=>console.log(1)); //Entra en la zona
rectangulo.addEventListener("dragover",(e) => {
	e.preventDefault();
	console.log(2)
}) 
rectangulo.addEventListener("drop",(e)=>{
	console.log(e.dataTransfer.getData("clase"))
}); //Verifica cuando se suelta
rectangulo.addEventListener("dragleave",()=>console.log(4)); //Verifica cuando se va de la zona