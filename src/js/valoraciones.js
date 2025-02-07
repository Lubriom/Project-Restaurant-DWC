import '/node_modules/jquery/dist/jquery.min.js';
import '/node_modules/jquery-validation/dist/jquery.validate.min.js';
import '/bootstrap/js/bootstrap.bundle.min.js';

const xmlhttp = new XMLHttpRequest();
const url = '/src/json/valoraciones.json';
var datos = null;

$(document).ready(function () {
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var valoraciones = JSON.parse(this.responseText);
      imprimirValoraciones(valoraciones);
      datos = valoraciones;
    }
  };
  xmlhttp.open('GET', url, true);
  xmlhttp.send();

  initValidator();
  $.validator.addMethod(
    'pattern',
    function (value, element, param) {
      if (this.optional(element)) {
        return true;
      }
      const regex = new RegExp(param);
      return regex.test(value);
    },
    $('html').attr('lang') == 'es'
      ? 'El formato ingresado no es válido.'
      : 'The entered format is invalid.'
  );
});

$('#changeLang').on('click', function () {
  imprimirValoraciones(datos);

  $('#formValoracion').validate().destroy();
  initValidator();
});

function getLanguage() {
  return $('html').attr('lang');
}

function getFormTranslation(translation) {
  return getLanguage() === 'en' ? translation.en : translation.es;
}

function initValidator() {
  const translation = {
    es: {
      name: {
        required: 'Por favor, ingresa tu nombre.',
        minlength: 'El nombre debe tener al menos 3 caracteres.',
        pattern: 'El nombre solo puede contener letras y espacios.'
      },
      platillo: {
        required: 'Por favor, selecciona un platillo.'
      },
      message: { 
        required: 'Por favor, ingresa un mensaje.',
        pattern:
          'El mensaje solo puede contener letras, espacios y signos de puntuación básicos.'
      }
    },
    en: {
      name: {
        required: 'Please enter your name.',
        minlength: 'The name must be at least 3 characters long.',
        pattern: 'The name can only contain letters and spaces.'
      },
      platillo: {
        required: 'Please select a dish.'
      },
      message: { 
        required: 'Please enter a message.',
        pattern:
          'The message can only contain letters, spaces, and basic punctuation marks.'
      }
    }
  }; 
  
  // Inicializar el validador
  $('#formValoracion').validate({
    rules: {
      name: {
        required: true,
        minlength: 3,
        pattern: /^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]{3,25}$/
      },
      platillo: {
        required: true
      },
      message: {
        required: true,
        pattern: /^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s.,!?¿¡'"]{0,100}$/
      }
    },
    messages: { ...getFormTranslation(translation) },
    errorClass: 'is-invalid',
    validClass: 'is-valid',
    errorElement: 'div',
    errorPlacement: function (error, element) {
      error.addClass('invalid-feedback');
      error.insertAfter(element);
    },
    highlight: function (element) {
      $(element).addClass('is-invalid').removeClass('is-valid');
    },
    unhighlight: function (element) {
      $(element).removeClass('is-invalid').addClass('is-valid');
    }
  });
}

function imprimirValoraciones(array) {
  let out = '';
  let lang = getLanguage();

  console.log('lang', lang);

  array[lang].forEach((element) => {
    out += `
          <div class="col">
            <div class="card mb-3 shadow p-3 mb-5 bg-body-tertiary rounded">
              <div class="row g-0">
                <div class="col-md-8">
                  <div class="card-body">
                    <h3 class="card-title h5">${element.producto}</h3>
                    <p class="card-text">
                      "${element.descripcion}"
                      <br><strong>- ${element.autor}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
  });
  document.getElementById('testimonios').innerHTML = out;
}

$('#btnEnviar').on('click', function () {
  if ($('#formValoracion').valid()) {
    $('#mensaje')
      .text(
        getLanguage() !== 'es'
          ? 'Thank you for your review.'
          : 'Gracias por tu valoración.'
      )
      .css('color', 'green');
  } else {
    $('#mensaje')
      .text(
        getLanguage() !== 'es'
          ? 'Please complete the form correctly.'
          : 'Por favor, completa el formulario correctamente.'
      )
      .css('color', 'red');
  }
});
