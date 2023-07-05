function iniciarCuestionario() {
  fetch("https://opentdb.com/api.php?amount=3&category=18&difficulty=medium&type=boolean")
      .then((response) => response.json())
      .then((data) => {
          traducirPreguntas(data.results);
      })
      .catch((error) => {
          console.error("Error al obtener las preguntas:", error);
      });

  document.getElementById("cuestionario").style.display = "block";
  document.getElementById("resultado").style.display = "none";
}

/*ACA VEMOS QUE NOS DEVUELVE LA APO MYMEMORY DESPUES DE HACER LA TRADUCCION
function traducirTexto(texto) {
const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=en|es`;
return fetch(url)
  .then((response) => response.json())
  .then((data) => {console.log(data);})
}*/

function traducirTexto(texto) {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=en|es`;
  return fetch(url)
      .then((response) => response.json())
      .then((data) => {
          if (data.responseStatus === 200) {
              return data.responseData.translatedText.replace(/&quot;/g, " ");
          } else if (data.responseStatus === 429 && data.responseDetails) {
              const warningMessage = data.responseDetails;
              const mensaje = mostrarMensajeLimite(warningMessage);
              return mensaje;
          } else {
              throw new Error("Error en la traducción");
          }
      })
      .catch((error) => {
          console.error("Error en la solicitud de traducción:", error);
          throw error; // Volver a lanzar el error para que sea capturado en el catch de calificarRespuestas
      });
}

function mostrarMensajeLimite(warningMessage) {
  const regex = /NEXT AVAILABLE IN\s+(\d+) HOURS (\d+) MINUTES (\d+) SECONDS/;
  const matches = regex.exec(warningMessage);

  if (matches) {
      const HOURS = parseInt(matches[1]);
      const MINUTES = parseInt(matches[2]);
      const SECONDS = parseInt(matches[3]);

      const mensajeSalida = `Próxima pregunta disponible en: ${HOURS} horas ${MINUTES} minutos ${SECONDS} segundos`;
      return mensajeSalida;
  } else {
      return "Mensaje de traducción inválido";
  }
}

function traducirPreguntas(preguntas) {
  const promesasTraduccion = preguntas.map((pregunta) => {
      return traducirTexto(pregunta.question)
          .then((preguntaTraducida) => {
              pregunta.traducida = preguntaTraducida; // Agregar la propiedad "traducida" a la pregunta
              return pregunta;
          })
          .catch((error) => {
              console.error("Error al traducir la pregunta:", error);
              return pregunta; // Devolver la pregunta original si hay un error de traducción
          });
  });

  Promise.all(promesasTraduccion)
      .then((preguntasTraducidas) => {
          mostrarPreguntas(preguntasTraducidas);
      })
      .catch((error) => {
          console.error("Error al traducir las preguntas:", error);
      });
}

//mostrar preguntas
function mostrarPreguntas(preguntas) {
  const contenedorPreguntas = document.getElementById("preguntas");
  contenedorPreguntas.innerHTML = "";

  preguntas.forEach((pregunta, indice) => {
      const divPregunta = document.createElement("div");
      const enunciado = document.createElement("p");
      enunciado.textContent = `${indice + 1}. ${pregunta.traducida}`; // Utilizar la pregunta traducida
      divPregunta.appendChild(enunciado);

      const campoRespuesta = document.createElement("input");
      campoRespuesta.setAttribute("type", "text");
      campoRespuesta.setAttribute("id", `respuesta-${indice}`);
      divPregunta.appendChild(campoRespuesta);

      // Guardar la respuesta correcta en el atributo data-correcta del divPregunta
      divPregunta.setAttribute("data-correcta", pregunta.correct_answer);

      contenedorPreguntas.appendChild(divPregunta);
  });
}

function calificarRespuestas() {
  const respuestasCorrectas = document.querySelectorAll("[data-correcta]");
  let respuestasCorrectasUsuario = 0;

  respuestasCorrectas.forEach((pregunta, indice) => {
      const campoRespuesta = document.getElementById(`respuesta-${indice}`);
      const respuestaUsuario = campoRespuesta.value.toLowerCase(); // Convertir respuesta a minúsculas
      const respuestaCorrecta = pregunta.dataset.correcta.toLowerCase(); // Convertir respuesta correcta a minúsculas

      if (respuestaUsuario === respuestaCorrecta) {
          respuestasCorrectasUsuario++;
      }
  });

  if (respuestasCorrectasUsuario === 3) {
      mostrarResultado(true);
  } else {
      mostrarResultado(false);
  }
}

function mostrarResultado(correcto) {
  const resultado = document.getElementById("resultado");
  const imagenResultado = document.getElementById("imagenResultado");
  const mensajeResultado = document.getElementById("mensajeResultado");
  const codigoDescuento = document.getElementById("codigoDescuento");

  if (correcto) {
      resultado.style.backgroundColor = "green";
      imagenResultado.src = "./static/img/pikachu.png";
      mensajeResultado.textContent = "¡Excelente! Tu código de descuento es:";
      codigoDescuento.textContent = generarCodigoDescuento();
  } else {
      resultado.style.backgroundColor = "rgba(13, 22, 33, 255)";
      imagenResultado.src = "./static/img/nino_inspirado.jpg";
      mensajeResultado.textContent = "Al menos una respuesta es incorrecta, no te desanimes intentalo de nuevo!.";
      codigoDescuento.textContent = "";
  }

  document.getElementById("cuestionario").style.display = "none";
  resultado.style.display = "block";
}

function generarCodigoDescuento() {
  const codigo = Math.floor(10000 + Math.random() * 90000);
  return codigo;
}
