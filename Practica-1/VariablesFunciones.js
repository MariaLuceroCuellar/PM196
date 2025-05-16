let nombre = 'Armando';
const edad = 25;
nombre = 'Ana María';

let saludo = 'Hola soy ' + nombre + 'y tengo ' + edad + ' años';
console.log(saludo);

// función arrow
const cuadrado = (numero) => numero * numero;
console.log(cuadrado(5));

const saludoPersonalizado = (nombre, edad) => {
    return `Hola soy ${nombre} y tengo ${edad} años`;
}
console.log(saludoPersonalizado('Armando', 25));