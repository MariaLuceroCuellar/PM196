const personas = [
    {nombre:"Ana", edad:25},
    {nombre:"Luis", edad:35},
    {nombre:"María", edad:28},
];
const persona = personas.find((persona) => persona.nombre ==="Luis");
console.log("La persona encontrada con find() es: "+persona.nombre+" y tiene "+persona.edad+" años.");
personas.forEach((persona) => {
    console.log("Recorrer el arreglo con forEach() es: "+persona.nombre+" y tiene "+persona.edad+" años.");
});  

const suma = personas.reduce((acomulador, persona) => {
    return acomulador + persona.edad;

}, 0);
console.log("Uso reduce, La suma de las edades es: "+suma);
