import "/node_modules/jquery/dist/jquery.min.js";
import "/bootstrap/js/bootstrap.bundle.min.js";

$("#formReserva").on("submit", function (e) {
  e.preventDefault();
});

$(document).ready(function () {
  $("#name").on("input", comprobarNombre);
  $("#email").on("input", comprobarCorreo);
  $("#date").on("change", comprobarFechaYHora);
  $("#time").on("input", comprobarFechaYHora);
  $("#message").on("input", comprobarComentarios);

  // Validación final al enviar el formulario
  $("#btnSubmit").on("click", function () {
    let valido =
      comprobarNombre() &&
      comprobarCorreo() &&
      comprobarFechaYHora() &&
      comprobarComentarios();

    if (valido) {
      $("#mensaje").text("Formulario enviado correctamente").css("color", "green");
    } else {
      $("#mensaje").text("Por favor, revisa los campos marcados en rojo.").css("color", "red");
    }
  });
});

function comprobarNombre() {
    let regex = /^[a-zA-ZÀ-ÿ\s]{3,20}$/; // Nombre entre 3 y 25 caracteres
    let resultado = regex.test($("#name").val());

    if (resultado) {
        $("#name").removeClass("is-invalid").addClass("is-valid");
        $("#nameHelp").text("Nombre válido").removeClass("text-danger").addClass("text-success");
    } else {
        $("#name").removeClass("is-valid").addClass("is-invalid");
        $("#nameHelp").text("El nombre debe tener entre 3 y 20 caracteres y no contener números ni símbolos.")
            .removeClass("text-success").addClass("text-danger");
    }
    return resultado;
}

function comprobarCorreo() {
    let regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    let resultado = regex.test($("#email").val());

    if (resultado) {
        $("#email").removeClass("is-invalid").addClass("is-valid");
        $("#emailHelp").text("Correo válido").removeClass("text-danger").addClass("text-success");
    } else {
        $("#email").removeClass("is-valid").addClass("is-invalid");
        $("#emailHelp").text("El correo debe ser válido, por ejemplo: usuario@dominio.com")
            .removeClass("text-success").addClass("text-danger");
    }
    return resultado;
}

function comprobarFechaYHora() {
    let valorFecha = $("#date").val();
    let valorHora = $("#time").val();

    if (valorFecha === "" || valorHora === "") {
        if (valorFecha === "") {
            $("#date").removeClass("is-valid").addClass("is-invalid");
            $("#dateHelp").text("La fecha es obligatoria").removeClass("text-success").addClass("text-danger");
        }
        if (valorHora === "") {
            $("#time").removeClass("is-valid").addClass("is-invalid");
            $("#timeHelp").text("La hora es obligatoria").removeClass("text-success").addClass("text-danger");
        }
        return false;
    }

    let fechaIngresada = new Date(valorFecha);
    let fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0); // Ignorar la hora para comparar solo la fecha

    if (fechaIngresada < fechaActual) {
        $("#date").removeClass("is-valid").addClass("is-invalid");
        $("#dateHelp").text("La fecha no puede ser menor a la actual").removeClass("text-success").addClass("text-danger");
        $("#time").removeClass("is-valid").addClass("is-invalid");
        $("#timeHelp").text("").removeClass("text-success").addClass("text-danger");
        return false;
    }

    if (fechaIngresada.getTime() === fechaActual.getTime()) {
        let horaActual = new Date().toTimeString().slice(0, 5); // Hora actual en formato HH:mm
        if (valorHora < horaActual) {
            $("#time").removeClass("is-valid").addClass("is-invalid");
            $("#timeHelp").text("La hora no puede ser menor a la hora actual").removeClass("text-success").addClass("text-danger");
            return false;
        }
    }

    $("#date").removeClass("is-invalid").addClass("is-valid");
    $("#dateHelp").text("Fecha válida").removeClass("text-danger").addClass("text-success");
    $("#time").removeClass("is-invalid").addClass("is-valid");
    $("#timeHelp").text("Hora válida").removeClass("text-danger").addClass("text-success");
    return true;
}

function comprobarComentarios() {
    let regex = /^[a-zA-ZÀ-ÿ\s'",.-_]{1,100}$/; // Comentarios hasta 100 caracteres
    let resultado = regex.test($("#message").val());

    if (resultado) {
        $("#message").removeClass("is-invalid").addClass("is-valid");
        $("#messageHelp").text("Comentario válido").removeClass("text-danger").addClass("text-success");
    } else {
        $("#message").removeClass("is-valid").addClass("is-invalid");
        $("#messageHelp").text("El comentario no debe exceder los 100 caracteres y solo puede contener letras y espacios.")
            .removeClass("text-success").addClass("text-danger");
    }
    return resultado;
}
