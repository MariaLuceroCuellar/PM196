function peticionApi(){
    return new Promise((resolve) =>{
        setTimeout(() =>{
            resolve("Datos de la API recibidos correctamente");
        },3000);
        
    });

}
async function obtenerDatosApi() {
    try{
        console.log("Iniciando la petición a la API...");
        const datos = await peticionApi();
        console.log(datos);
    }catch(error) {
        console.error("Error al obtener los datos de la API:", error);
    }

}
obtenerDatosApi();