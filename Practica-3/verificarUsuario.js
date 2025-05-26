function verificarUsurario(usuario){
    return new Promise((resolve, reject) => {
        if (usuario === "admin"){
        resolve("Usuario Autorizado");
        }
        else{
        reject("Usuario No Autorizado");
        }
    });
}

verificarUsurario("admin")
    .then((mensaje) => {
        console.log(mensaje);
    })
    .catch((error) => {
        console.log(error);
    });

verificarUsurario("Ivan")
    .then((mensaje) => {
        console.log(mensaje);
    })
    .catch((error) =>{
        console.log(error);

    });
