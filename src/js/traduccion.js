import "/node_modules/jquery/dist/jquery.min.js";

var xmlhttp = new XMLHttpRequest(); 
var url;
url = "/src/json/language.json";

$(document).ready(function () {
  $("html").attr("lang", window.localStorage.getItem("lang") == null ? "es" : window.localStorage.getItem("lang"));

  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var traducciones = JSON.parse(this.responseText);
      cambiarIdioma(traducciones);
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send(); 
  document.body.style.visibility = "visible";
});


$("#changeLang").on("click", function () {
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var traducciones = JSON.parse(this.responseText);
      cambiarIdioma(traducciones);
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
});

function cambiarIdioma(idioma) {
  let elementos = document.querySelectorAll("[data-translate]");
  let language = $("html").attr("lang") == "es" ? "ingles" : "espanol";

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

  $("html").attr("lang", $("html").attr("lang") == "es" ? "en" : "es");
  $("#buttonLang")
    .find("img")
    .attr("src", `/src/icons/${$("html").attr("lang")}.png`);
  $("#changeLang")
    .find("img")
    .attr("src", `/src/icons/${$("html").attr("lang") == "es" ? "en" : "es"}.png`);
  window.localStorage.setItem("lang", $("html").attr("lang") == "es" ? "en" : "es");
}
