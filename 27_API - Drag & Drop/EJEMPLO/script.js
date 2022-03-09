"use strict";

const transferirTextura = (n,e) =>{
	e.dataTransfer.setData("textura",n);
}

const zona = document.querySelector(".zona");
zona.addEventListener("dragover",(e)=>{
	e.preventDefault();
	zona.style.outline = "1px dashed #000";
})
zona.addEventListener("drop",(e)=>{
	let n = e.dataTransfer.getData("textura");
	zona.style.background = `url("textura${n}.png")`;
	zona.style.outline = "none";

})

for (let i = 1; i < document.querySelector(".texturas").children.length + 1  ; i++){
	document.querySelector(`.textura${i}`).addEventListener("dragstart",(e)=>transferirTextura(i,e));
}

