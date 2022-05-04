"use strict";

// Memoria Cache

//Almacenamos archivos en la memoria cache del navegador del usuario para que
// la pagina (o lo que sea) no deba cargarse nuevamente.

// caches.open("archivos-estaticos").then(cache =>{
// 	console.log(cache)
// })

caches.open("archivos-estaticos").then(cache =>{
	cache.addAll(["index.html","style.css","script.js"])
})
