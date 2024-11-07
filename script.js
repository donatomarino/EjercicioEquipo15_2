function enviarMensaje(e) {
    e.preventDefault();
}

function validar() {
    let nombre = document.getElementById('nombre');
    let apellido = document.getElementById('apellido');
    let direccion = document.getElementById('direccion');
    let email = document.getElementById('email');
    let confirmaEmail = document.getElementById('confirmaEmail');
    let dni = document.getElementById('dni');
    let intereses = document.getElementById('intereses');
    let password = document.getElementById('password');
    let mensaje = document.getElementsByClassName('mensaje');
    let mensajeCorrecto = document.getElementById('mensajeCorrecto');

    // Campos required
    nombre.setAttribute('required', 'true');
    apellido.setAttribute('required', 'true');
    direccion.setAttribute('required', 'true');
    email.setAttribute('required', 'true');
    confirmaEmail.setAttribute('required', 'true');
    dni.setAttribute('required', 'true');
    password.setAttribute('required', 'true');

    //Validamos el nombre
    if (!validarUsuario(nombre.value)) {
        mensaje[0].textContent = 'La primera letra del nombre tiene que ser mayúscula y puede contener solamente letras.';
        return;
    } else {
        mensaje[0].innerHTML = '';
    }

    // //Validamos apellido
    if (!validarUsuario(apellido.value)) {
        mensaje[1].textContent = 'La primera letra del apellido tiene que ser mayúscula y puede contener solamente letras.';
        return;
    } else {
        mensaje[1].innerHTML = '';
    }

    //Validar direccion
    if (!validarDireccion(direccion.value)) {
        mensaje[2].textContent = 'La dirección tiene que tener este tipo de formato: Tipo vía/ Nombre vía, Número, Resto de Datos (piso, portal...etc), CP, Población y País (separados por ,)';
        return;
    } else {
        mensaje[2].innerHTML = '';
    }

    // // //Validar Email
    if (!validarEmail(email.value)) {
        mensaje[3].textContent = 'El email tiene que contener una @ obligatoriamente.';
        return;
    } else {
        mensaje[3].innerHTML = '';
    }

    // // Validar email de confirmación
    if (!validarConfirmaEmail(email.value, confirmaEmail.value)) {
        mensaje[4].textContent = 'La email de confirmación no coincide.';;
        return;
    } else {
        mensaje[4].innerHTML = '';
    }

    // Validar DNI
    if (!validarDNI(dni.value)) {
        mensaje[5].textContent = 'El DNI no tiene el formato correcto';
        return;
    } else {
        mensaje[5].innerHTML = '';
    }

    // // // Validar email de confirmación
    if (!validarIntereses(intereses.value)) {
        mensaje[6].textContent = 'Los intereses no están correctos';
        return;
    } else {
        mensaje[6].innerHTML = '';
    }

    // Validamos intereses
    if(!validarIntereses(intereses.value)){
        mensaje[6].textContent = 'Los intereses no coinciden. Mirar en la consola los correctos.'
        return;
    } else {
        mensaje[6].innerHTML = '';
    }

    //Validar password
    if(!validarPassword(password.value)){
        mensaje[7].textContent = 'La password tiene que estar formado por minimo 8 caracteres, maximo 20, contener almenos una mayuscula, una minuscula y dos numeros.'
        return;
    } else{
        mensaje[7].innerHTML = '';
    }

    mensajeCorrecto.textContent = 'Formulario enviado';
}

// Validamos nombre y apellido
function validarUsuario(dato) {
    dato = dato.trim(); // Utilizamos el trim para quitar los espacios al principio y al final de la cadena, si hay.
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZÑabcdefghijklmnopqrstuvwxyzñ";

    // Si la primera letra del nombre/apellido es minuscula devuelve false
    if (dato[0] !== dato[0].toUpperCase()) {
        return false;
    }

    // Recorremos el array para verificar si está compuesto por solo letras (y no un símbolo o número)
    for (let i = 0; i < dato.length; i++) {
        if (!letras.includes(dato[i])) { // 
            return false;
        }
    }

    // Si está bien devuelve true
    return true;
}

//Se define la función validarDireccion que se ejecutará para validar la dirección ingresada en un formulario.
function validarDireccion(direccion) {
    let domicilio = direccion.trim(); // trim para eliminar espacios en blanco al principio y al final.
    console.log(domicilio);

    if (domicilio === "") { // Si la dirección está vacía, muestra un mensaje en consola y termina la función retornando false.
        console.log("La dirección está vacía");
        return false; // Salir de la función si está vacía
    }

    let miArray = domicilio.split(",").map(item => item.trim());
    //Se usa .split(" ") para dividir la dirección en partes, utilizando los espacios como delimitadores. Luego, se aplica .map(item => item.trim()) a cada parte para asegurarse de que no haya espacios adicionales dentro de las palabras. El resultado es un arreglo con las partes de la dirección.

    console.log("miArray:", miArray);

    if (miArray.length < 6) {
        //Validación de cantidad de campos: Si el arreglo miArray tiene menos de 6 elementos, se muestra un mensaje indicando que la dirección no tiene todos los campos requeridos (tipo de vía, número, resto de datos, código postal, población, país). Además, se aplica una clase de estilo de error en un elemento con id "errorDireccion". Luego, la función termina con return false.
        console.log("La dirección no tiene todos los campos requeridos");

        return false;
    }
    //Se asignan las partes de la dirección a variables específicas
    let tipoViaYNombre = miArray[0];
    let numero = miArray[1];
    let restoDatos = miArray[2];
    let cp = miArray[3];
    let poblacion = miArray[4];
    let pais = miArray[5];

    if (!tipoViaYNombre.includes("/")) {
        //Validación del formato "Tipo vía / Nombre vía": Se espera que el primer campo, tipoViaYNombre, contenga una barra (/) para separar el tipo de la vía del nombre de la vía. Si no la tiene, muestra un error.
        console.log("El formato 'Tipo vía / Nombre vía' es incorrecto");

        return false;
    }

    if (!restoDatos.includes("-")) {
        //Se espera que contenga una barra (-) para separar los datos, sino, muestra un error.
        console.log("El formato 'resto de datos' deben estar separados por \"-\"");

        return false;
    }


    if (isNaN(numero) || !numero.trim()) {
        //Se verifica si el valor del número de la dirección (numero) es un número válido usando isNaN(), y también si no está vacío. Si no es válido, muestra un error.
        console.log("El número de la dirección no es válido");

        return false;
    }

    // Verificar que el código postal (CP) sea un número válido
    if (isNaN(cp) || cp.trim().length !== 5) {
        //Se valida que el código postal (cp) sea un número y que tenga exactamente 5 caracteres. Si no es válido, muestra un error.
        console.log("El código postal no es válido");
        return false;
    }

    // Verificar que la población y el país no estén vacíos
    if (!poblacion || !pais) {
        //Se asegura de que los campos poblacion y pais no estén vacíos. Si alguno de ellos está vacío, muestra un mensaje de error.
        console.log("La población y el país son obligatorios");

        return false;
    }

    return true;
}

// Validación email
function validarEmail(email) {
    email = email.trim(); // Utilizamos el metodo trim para que se quiten los espacios, si hay, al principio y al final de la cadena

    if (email.includes('@')) {
        return true; // Devolvemos true si incluye '@'
    } return false; // Devolvemos false si no incluye '@'
}


// Validación ConfirmaEmail
function validarConfirmaEmail(email, confirmaEmail) {
    confirmaEmail = confirmaEmail.trim(); // Utilizamos el metodo trim para que se quiten los espacios, si hay, al principio y al final de la cadena

    if (confirmaEmail == email) { // Verificamos que la email coincida con la anterior
        return true; // Devolvemos true si coincide
    } return false; // Devolvemos false si no coincide
}

// Validación DNI
function validarDNI(dni) {
    // Trasformamos el dni en cadena String
    let DniStr = dni.toString();

    // Cogemos los numeros del DNI
    let numDni = parseInt(dni.substring(0, 8));

    // Cogemos la ultima y unica letra del DNI
    let letraDni = DniStr.substring(8, 9).toUpperCase();

    let letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];
    
    // Formula para calcular letra correcta
    let letraCorrecta = letras[numDni % 23];

    // Si la longitud es diferente que 9, es incorrecto. 
    if (dni.length !== 9) {
        return false;
    }

    // La ultima letra introducida tiene que corresponder con la calculada.
    if (letraDni != letraCorrecta) {
        alert("Has introducido una letra incorrecta\nTu letra debería ser: " + letraCorrecta);
        return false;
    }

    return true;
}

// Validamos intereses 
function validarIntereses(intereses, guardados) {
    //Se declara una constante interesesValidos, que contiene un arreglo de intereses predefinidos. Estos son los únicos intereses aceptables.
    const interesesValidos = ["mercado inmobiliario", "bolsa", "bienes estatales"];
    let miArrayCorrectos = [];

    intereses = intereses.trim();// trim para eliminar espacios en blanco al principio y al final.
    console.log(intereses);

    //Aquí se divide la cadena intereses en un arreglo utilizando la coma como delimitador. Luego, se utiliza .filter() para mantener solo los intereses que están en la lista interesesValidos. También se usa trim() para quitar espacios adicionales y toLowerCase() para asegurarse de que la comparación no sea sensible a mayúsculas o minúsculas.
    const interesesArray = intereses.split(",").filter(interes => interesesValidos.includes(interes.trim().toLowerCase()));
    console.log(interesesArray);

    if (intereses === "") { // Si la cadena está vacía, muestra un mensaje en consola y termina la función retornando false.
        console.log("Intereses está vacío");
        return false; // Salir de la función si está vacía
    }

    if (intereses != interesesArray) { // Si la cadena no coincide, muestra un mensaje en consola y termina la función retornando false.
        miArrayCorrectos.push(interesesArray);
        console.log('Interes/es guardado/s: ' + miArrayCorrectos);
        return false; // Salir de la función
    }

    return true;
}

// Validación password
function validarPassword(password) {
    let hayMayuscula = false;
    let hayMinuscula = false;
    let count = 0;

    // Verificamos longitud minima y maxima de la psw
    if (password.length < 8 || password.length > 20) {
        return false;
    }

    // Verificamos si la password contiene almenos una mayuscula, una minuscula y dos números
    for (let char of password) {
        if (char >= 'A' && char <= 'Z') {
            hayMayuscula = true;
        } else if (char >= 'a' && char <= 'z') {
            hayMinuscula = true;
        } else if (char >= '0' && char <= '9') {
            count++;
        }
    }

    // Verificamos que las 3 condiciónes sean verdaderas, en caso contrario, devuelve false.
    if (hayMayuscula && hayMinuscula && count >= 2) {
        return true;
    }

    return false
}