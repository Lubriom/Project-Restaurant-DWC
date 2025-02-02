import "/node_modules/jquery/dist/jquery.min.js";
import "/node_modules/jquery-validation/dist/jquery.validate.min.js";
import "/bootstrap/js/bootstrap.bundle.min.js";

var xmlhttp = new XMLHttpRequest();
var url = "/src/json/valoraciones.json"; 
var datos;
 
xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var valoraciones = JSON.parse(this.responseText);
    imprimirValoraciones(valoraciones); 
    datos = valoraciones
  }
};
xmlhttp.open("GET", url, true);
xmlhttp.send(); 

$("#changeLang").on("click", function () {
  imprimirValoraciones(datos);
});

function imprimirValoraciones(array) {
  let out = "";
  array[$("html").attr("lang") !== "es" ? "es" : "en"].forEach((element) => {
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
  document.getElementById("testimonios").innerHTML = out;
}

// $("#changeLang").on("click", function () {
//   xmlhttp.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {
//       var valoraciones = JSON.parse(this.responseText);
//       imprimirValoraciones(valoraciones);
//     }
//   };
//   xmlhttp.open("GET", url, true);
//   xmlhttp.send();
// });

$(document).ready(function () {
  $.validator.addMethod(
    "pattern",
    function (value, element, param) {
      if (this.optional(element)) {
        return true;
      }
      const regex = new RegExp(param);
      return regex.test(value);
    },
    "El formato ingresado no es válido."
  );

  // Inicializar el validador
  $("#formValoracion").validate({
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
    messages: {
      name: {
        required: "Por favor, ingresa tu nombre.",
        minlength: "El nombre debe tener al menos 3 caracteres.",
        pattern: "El nombre solo puede contener letras y espacios."
      },
      platillo: {
        required: "Por favor, selecciona un platillo."
      },
      message: {
        pattern: "El mensaje solo puede contener letras, espacios y signos de puntuación básicos."
      }
    },
    errorClass: "is-invalid",
    validClass: "is-valid",
    errorElement: "div",
    errorPlacement: function (error, element) {
      error.addClass("invalid-feedback");
      error.insertAfter(element);
    },
    highlight: function (element) {
      $(element).addClass("is-invalid").removeClass("is-valid");
    },
    unhighlight: function (element) {
      $(element).removeClass("is-invalid").addClass("is-valid");
    }
  });

  // Botón para enviar
  $("#btnEnviar").on("click", function () {
    if ($("#formValoracion").valid()) {
      $("#mensaje").text("Formulario enviado correctamente").css("color", "green");
    } else {
      $("#mensaje").text("Por favor, completa los campos requeridos.").css("color", "red");
    }
  });
});
