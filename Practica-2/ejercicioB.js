//Ejercicio b
const productos =[
    {nombre: "Laptop", precio: 1200},
    {nombre: "Mouse", precio: 250},
    {nombre: "Teclado", precio: 750},
    {nombre: "Monitor", precio: 3000},
];
const productosFiltrados = productos.filter((producto) => producto.precio >1000);
console.log(productosFiltrados);
const productoNombres = productos.map(producto => producto.nombre);
console.log(productoNombres);