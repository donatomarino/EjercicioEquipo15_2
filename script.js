function enviarMensaje(e) {
    e.preventDefault();
}

function validar() {
    let nombre = document.getElementById('nombre').value;
    validarNombre(nombre);
}

function validarNombre(nombre){
    const letras = 'abcdefghijklmnñopqrstuwvyxABCDEFGHIJKLMNÑOPQRSTUWVXYZ'
    let mensajeError = document.getElementById('mensajeError');

    nombre = nombre.trim();
    let nomArr = Array.from(nombre); // Transformamos el string en array para recorrerlo

        if(nomArr[0] == nomArr[0].toUpperCase()){ // Verificamos si la primera letra es mayuscula
            isValid = true;
            for(let letra of nomArr){ // Si la primera letra es mayuscula, verifica si el array está formado solamente de letras.
                if(!nomArr.includes(letras)){
                    return true;
                } else{ //Si hay otros caracteres a parte las letras, sale error.
                    mensajeError.textContent = 'El nombre tiene que estar formado por solo letras';
                    return false;
                }
            }
        } else { // Si el nombre no empieza por letra mayuscula sale error.
            mensajeError.textContent = 'La primera letra tiene que ser mayuscula';
            return false;
        }

}
