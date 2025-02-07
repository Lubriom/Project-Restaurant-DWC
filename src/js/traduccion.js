import "/node_modules/jquery/dist/jquery.min.js";

const xmlhttp = new XMLHttpRequest();
const url = "/src/json/language.json"; 
var traducciones;

$(document).ready(function () {
  $("html").attr("lang", window.localStorage.getItem("lang"));

  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      traducciones = JSON.parse(this.responseText); 
      cambiarIdioma(traducciones);
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
});

$("#changeLang").on("click", function () {
  $("html").attr("lang", $("html").attr("lang") == "en" ? "es" : "en");
  window.localStorage.setItem("lang", $("html").attr("lang"));

  cambiarIdioma(traducciones);
});

function cambiarIdioma(idioma) { 
  let elementos = document.querySelectorAll("[data-translate]");
  let language = $("html").attr("lang") == "es" ? "espanol" : "ingles";

  elementos.forEach((element) => {
    if (element.hasAttribute("alt")) {
      element.setAttribute("alt", idioma[language][element.getAttribute("data-translate")]);
    } else if (element.hasAttribute("placeholder")) {
      element.setAttribute("placeholder", idioma[language][element.getAttribute("data-translate")]);
    } else if (element.tagName === "OPTGROUP") {
      element.label = idioma[language][element.getAttribute("data-translate")];
    } else if (element.hasAttribute("aria-label")) {
      element.setAttribute("aria-label", idioma[language][element.getAttribute("data-translate")]);
    } else {
      element.innerHTML = idioma[language][element.getAttribute("data-translate")];
    }
  });

  $("#buttonLang")
    .find("img")
    .attr("src", `/src/icons/${$("html").attr("lang") == "es" ? "es" : "en"}.png`);
  $("#changeLang")
    .find("img")
    .attr("src", `/src/icons/${$("html").attr("lang") == "es" ? "en" : "es"}.png`);

  document.body.style.display = "block";
}
