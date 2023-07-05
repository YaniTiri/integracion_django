
//CAMBIAR TEXTO DE BOTON DE la SECCION ABOUT AL PASAR POR ENCIMA
function cambiarTexto(nuevoTexto) {
  document.getElementById("miBoton").innerHTML = nuevoTexto;
}

//ANIMACION DE LA SECCION CARTA QUE HIZO YANI 
//(pero para que se ejecute cuando el usuario baja a la seccion, asi se ve sino se pierde a menos que el usuario baje rapido)
window.addEventListener("scroll", function () {
  var section = document.querySelector(".titulocarta");
  var sectionOffsetTop = section.offsetTop;
  var windowHeight = window.innerHeight;
  var scrollTop = window.scrollY;

  if (scrollTop + windowHeight > sectionOffsetTop) {
      section.classList.add("titulocarta-animacion");
  } else {
      section.classList.remove("titulocarta-animacion");
  }
});

//IR A LA SECCION A TRAVES DE LOS ENLACES DEL MENU

// Seleccionar todos los enlaces del menú
var menuLinks = document.querySelectorAll("nav a");

// Agregar un evento de clic a cada enlace
menuLinks.forEach(function (link) {
  link.addEventListener("click", function (event) {
      event.preventDefault(); // Evitar el comportamiento predeterminado del enlace

      // Obtener el destino del enlace (la sección a la que se debe desplazar)
      var targetId = this.getAttribute("href");

      // Obtener el elemento de destino
      var targetElement = document.querySelector(targetId);

      // Realizar el desplazamiento suave
      targetElement.scrollIntoView({
          behavior: "smooth",
      });
  });
});
