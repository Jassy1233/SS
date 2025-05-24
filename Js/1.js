const nombre = "Alvaro"

if(nombre == 'Alvaro'){
    console.log('Tu nombre es precioso')
} else {
    console.log('No conozco este nombre')
}



////////////////////////////////////////////////////

const usuario = 'User'
const contraseña = 1234

if(usuario == 'User' && contraseña == 1234){
    console.log('Sesion iniciada')
} else {
    console.log('Los datos no son correctos')
}


////////////////////////////////////////////////////

const positivo = 1
const cero = 0
const negativo = -2
let numero;

prompt('Introduce un numero')

if(prompt = positivo){
    console.log('Has imprimido un numero positivo')
} else if (prompt = cero){
    console.log('Has imprimido un cero')
} else if (prompt = negativo){
    console.log('Has imprimido un numero negativo')
}

////////////////////////////////////////////////////////

let edad = 17

if(edad >= 18){
    console.log('Puedes votar')
} else if(edad < 18){
    console.log('No puedes votar, te faltan : ' + (18 - edad) + ' años')
}

////////////////////////////////////////////////////////

const mayor = 'Adulto'
const menor = 'Menor'

const pregunta = mayor ? 'Eres mayor de edad' : 'Eres menor de edad'

////////////////////////////////////////////////////////

let mes;

if(mes == 0){
    console.log('Estamos en invierno')
} else if (mes == 1){
    console.log('Estamos en verano')
} else if(mes == 2){
    console.log('Estamos en otoño')
} else if(mes == 4){
    console.log('Estamos en primavera')
}

////////////////////////////////////////////////////////

let language;
let mensaje = 1;

switch (mensaje){
    case 0:
        language = 'Hola'
    break;

    case 1:
        language = 'Hello'
    break;

    case 2:
        language = 'Bonjour'
    break;

    default:
        language = 'No está en el sistema'
}

////////////////////////////////////////////////////////

let estacion
let x = 0

switch (estacion){
    case 0:
        estacion = 'Primavera'
    break;

    case 1:
        estacion = 'Invierno'
    break;

    case 2:
        estacion = 'Otoño'
    break;

    case 3:
        estacion = 'Verano'
    break;
}

console.log(estacion)

////////////////////////////////////////////////////////

let xx;
let dias = 0

switch(xx){
    case 0:
        xx = 'Enero'
    break;

    case 1:
        xx = 'Febrero'
    break;
    
}