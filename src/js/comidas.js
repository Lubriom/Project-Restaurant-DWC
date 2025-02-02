import "/node_modules/jquery/dist/jquery.min.js";
import "/DataTables/datatables.min.js";
import "/bootstrap/js/bootstrap.bundle.min.js";

$(document).ready(function () {
  const languages = {
    es: {
      decimal: ",",
      thousands: ".",
      lengthMenu: "_MENU_ Filas por página",
      zeroRecords: "No se encontraron resultados",
      info: "Mostrando _START_ a _END_ de _TOTAL_ entradas",
      infoEmpty: "No hay entradas disponibles",
      infoFiltered: "(filtrado de _MAX_ entradas totales)",
      search: "Buscar:",
      paginate: {
        next: "Siguiente",
        previous: "Anterior"
      }
    },
    en: {
      decimal: ".",
      thousands: ",",
      lengthMenu: "_MENU_ Rows per page",
      zeroRecords: "No results found",
      info: "Showing _START_ to _END_ of _TOTAL_ entries",
      infoEmpty: "No entries available",
      infoFiltered: "(filtered from _MAX_ total entries)",
      search: "Search:",
      paginate: {
        next: "Next",
        previous: "Previous"
      }
    }
  };
  
  let fichero;
  var tabla;
  fichero = $("html").attr("lang") !== "es" ? "/src/json/dataES.json" : "/src/json/dataEN.json";
  
  tabla = $("#myTable").DataTable({
    ajax: {
      url: fichero,
      dataSrc: ""
    },
    columns: [{ data: "Producto" }, { data: "Precio" }, { data: "Categoria" }],
    responsive: true,
    ordering: false,
    language: $("html").attr("lang") !== "es" ? languages.es : languages.en
  });
  
  $("#changeLang").on("click", function () {
    fichero = $("html").attr("lang") !== "es" ? "/src/json/dataES.json" : "/src/json/dataEN.json";
    console.log(fichero);
    tabla.destroy();
  
    tabla = $("#myTable").DataTable({
      ajax: {
        url: fichero,
        dataSrc: ""
      },
      columns: [{ data: "Producto" }, { data: "Precio" }, { data: "Categoria" }],
      responsive: true,
      ordering: false,
      language: $("html").attr("lang") !== "es" ? languages.es : languages.en
    });
  });
});
