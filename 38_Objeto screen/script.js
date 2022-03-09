
AnchoTotal = screen.width;
AlturaTotal = screen.height;

AnchoDisponible = screen.availWidth;
AlturaDisponible = screen.availHeight;

Resolucion = screen.pixelDepth;
Profundidad = screen.colorDepth;

console.log(`Width: ${AnchoTotal}`);
console.log(`Height: ${AlturaTotal}`);

console.log(`availWidth: ${AnchoDisponible}`);
console.log(`availHeight: ${AlturaDisponible}`);

console.log(`PixelDepth: ${Resolucion}`);
console.log(`colorDepth: ${Profundidad}`);