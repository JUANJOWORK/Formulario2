const formulario = document.getElementById("formulario");
const inputs =
  document.querySelectorAll(
    "#formulario input"
  ); /*devuelve un arreglo con todos los names de los inputs */

const expresiones = {
  usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  password: /^.{5,12}$/, // 4 a 12 digitos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  telefono: /^\d{10,14}$/, // 10 a 14 numeros.
};

const campos = {
  usuario: false,
  nombre: false,
  password: false,
  correo: false,
  telefono: false,
};

const validarFormulario = (e) => {
  switch (e.target.name /*se obtiene el name del input */) {
    case "usuario":
      //e.target es el input
      validarCampo(expresiones.usuario, e.target, "usuario");
      break;
    case "nombre":
      validarCampo(expresiones.nombre, e.target, "nombre");

      break;
    case "password":
      validarCampo(expresiones.password, e.target, "password");
      validarPassword2();
      break;
    case "password2":
      validarPassword2();
      break;
    case "correo":
      validarCampo(expresiones.correo, e.target, "correo");

      break;
    case "telefono":
      validarCampo(expresiones.telefono, e.target, "telefono");
      break;
  }
};

const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    //comprobando los valores del input sí cumplen
    /*-----backtick-----importante  ctrl Alt } ``
     el backtick se usa para juntar cadenas con variables*/
    document
      .getElementById(`grupo__${campo}`)
      .classList.remove("formulario__grupo-incorrecto");

    document
      .getElementById(`grupo__${campo}`)
      .classList.add("formulario__grupo-correcto");

    document
      .querySelector(`#grupo__${campo} i`)
      .classList.add("fa-square-check");

    document
      .querySelector(`#grupo__${campo} i`)
      .classList.remove("fa-square-xmark");

    document
      .querySelector(`#grupo__${campo} .formulario__input-error`)
      .classList.remove("formulario__input-error-activo");

    campos[campo] = true;
  } else {
    document
      .getElementById(`grupo__${campo}`)
      .classList.add("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__${campo}`)
      .classList.remove("formulario__grupo-correcto");

    document
      .querySelector(`#grupo__${campo} i`)
      .classList.add("fa-square-xmark");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.remove("fa-square-check");

    document
      .querySelector(`#grupo__${campo} .formulario__input-error`)
      .classList.add("formulario__input-error-activo");

    campos[campo] = false;
  }
};
/**------------------funcion contraseña  */
const validarPassword2 = () => {
  const inputPassword1 = document.getElementById("password");
  const inputPassword2 = document.getElementById("password2");

  if (inputPassword1.value !== inputPassword2.value) {
    document
      .getElementById(`grupo__password2`)
      .classList.add("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__password2`)
      .classList.remove("formulario__grupo-correcto");

    document
      .querySelector(`#grupo__password2 i`)
      .classList.add("fa-square-xmark");
    document
      .querySelector(`#grupo__password2 i`)
      .classList.remove("fa-square-check");

    document
      .querySelector(`#grupo__password2 .formulario__input-error`)
      .classList.add("formulario__input-error-activo");
    campos["password"] = false;
  } else {
    document
      .getElementById(`grupo__password2`)
      .classList.remove("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__password2`)
      .classList.add("formulario__grupo-correcto");

    document
      .querySelector(`#grupo__password2 i`)
      .classList.remove("fa-square-xmark");
    document
      .querySelector(`#grupo__password2 i`)
      .classList.add("fa-square-check");

    document
      .querySelector(`#grupo__password2 .formulario__input-error`)
      .classList.remove("formulario__input-error-activo");
    campos["password"] = true;
  }
};

inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario); //cuando se suelte una letra se ejecutara la funcion
  input.addEventListener("blur", validarFormulario); //se ejecuta cuando se da clic fuera del input
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const terminos = document.getElementById("terminos");
  if (
    campos.usuario &&
    campos.nombre &&
    campos.password &&
    campos.correo &&
    campos.telefono &&
    terminos.checked
  ) {
    formulario.reset(); //limpiar campos
    document
      .getElementById("formulario__mensaje-exito")
      .classList.add("formulario__mensaje-exito-activo");
    //despues de 3 segundos
    setTimeout(() => {
      document
        .getElementById("formulario__mensaje-exito")
        .classList.remove("formulario__mensaje-exito-activo");
    }, 3000); //duración 3 segundos
 
    //quitar icono de palomita
    document
      .querySelectorAll(".formulario__grupo-correcto")
      .forEach((icono) => {
        icono.classList.remove("formulario__grupo-correcto");
      });
  }
  //MENSAJE DE ERROR
  else{
    document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');

    //despues de 3 segundos
    setTimeout(()=>{
      document.getElementById("formulario__mensaje").classList.remove("formulario__mensaje-activo");
    }, 3000)//duración 3 segundos
  }
});
