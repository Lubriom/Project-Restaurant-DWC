import "/node_modules/jquery/dist/jquery.min.js";
import "/bootstrap/js/bootstrap.bundle.min.js";
import "/node_modules/chart.js/dist/chart.umd.js";

let ventasChart;
let masVendidasChart;

function crearGraficos(lang) {
 
  if (ventasChart) ventasChart.destroy();
  if (masVendidasChart) masVendidasChart.destroy();
  console.log(lang);
 
  let labelsVentas = lang === "es" ? ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"] : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let labelVentas = lang === "es" ? "Ventas" : "Solds";

  const labelsProductos = lang === "es" ? ["Doble Queso", "La ibérica", "Pickle Chicken", "La tradicional", "El porcino", "Pestiños Caseros"] : ["Double Cheese", "The Iberic", "Pickle Chicken", "The tradicional", "Porked", "Pestiños Caseros"];
  const labelProductos = lang === "es" ? "Cantidad Vendida" : "Most famous";

  ventasChart = new Chart($("#ventasDiarias"), {
    type: "line",
    data: {
      labels: labelsVentas,
      datasets: [
        {
          label: labelVentas,
          data: [90, 70, 120, 90, 130, 120, 90],
          borderColor: "#82898F"
        }
      ]
    },
    options: {
      responsive: true
    }
  });

  masVendidasChart = new Chart($("#masVendidas"), {
    type: "bar",
    data: {
      labels: labelsProductos,
      datasets: [
        {
          label: labelProductos,
          data: [110, 150, 90, 70, 90, 150],
          backgroundColor: "#FFEEA3"
        }
      ]
    },
    options: {
      responsive: true
    }
  });
}

$(document).ready(function () {
  crearGraficos($("html").attr("lang"));
});

$("#changeLang").on("click", function () {  
  crearGraficos($("html").attr("lang") === "es" ? "es" : "en");
});