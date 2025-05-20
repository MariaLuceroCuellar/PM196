const persona ={
    nombre: "Lucero",
    edad: 21,
    direccion:{
        ciudad: "Queretaro",
        pais: "Mexico",
    }
};
const {nombre, edad, direccion:{ciudad}} = persona;
console.log("Me llamo "+nombre+" tengo "+edad+" años y vivo en "+ciudad);