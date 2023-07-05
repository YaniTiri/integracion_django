//Lee un archivo JSON con infromacion de la carta y los muestra en el DOOM
const tarjetasContainer = document.getElementById("tarjetas-container");

// Obtener los datos del archivo JSON
fetch("carta.JSON")
    .then((response) => response.json())
    .then((data) => {
        // Recorrer los datos y crear las tarjetas
        data.pizza.forEach((pizza) => {
            // Crear elementos HTML
            const tarjeta = document.createElement("div");
            tarjeta.classList.add("tarjeta");

            const imagen = document.createElement("img");
            imagen.src = pizza.ruta;
            imagen.alt = pizza.nombre;

            const nombre = document.createElement("h3");
            nombre.textContent = pizza.nombre;

            const descripcion = document.createElement("p");
            descripcion.textContent = pizza.descripcion;

            // Agregar elementos a la tarjeta
            tarjeta.appendChild(imagen);
            tarjeta.appendChild(nombre);
            tarjeta.appendChild(descripcion);

            // Agregar la tarjeta al contenedor
            tarjetasContainer.appendChild(tarjeta);
        });
    })
    .catch((error) => console.log("Error al obtener los datos del archivo JSON:", error));



