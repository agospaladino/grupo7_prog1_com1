// Capturar el formulario, el campo de entrada y el div con el mensaje a mostrar en caso de error//
let formularioBusqueda = document.querySelector("#form-busqueda");
let entradaBusqueda = document.querySelector("#input-busqueda");
let errorBusqueda = document.querySelector(".invalid-busqueda");

// Agregar evento al formulario para validarlo antes de que sea enviado //
formularioBusqueda.addEventListener("submit", function (event) {

    let valida = true;

    // Validaciones del input
    // El campo de busqueda no se debe enviar vacio
    if (entradaBusqueda.value == "") {
        event.preventDefault(); // Prevenir accion por defecto
        errorBusqueda.style.display = "block";
        errorBusqueda.innerText = "El campo se encuentra vacío.";

        valida = false; //cambia el valor a true dando por hecho que ocurrio un error
    }else if (entradaBusqueda.value.length<3) {
        event.preventDefault(); // Prevenir accion por defecto
        entradaBusqueda.value = ""; // Vacía el campo para buscar nuevamente
        errorBusqueda.style.display = "block";
        errorBusqueda.innerText = "Mínimo 3 caracteres.";
        
        valida = false;
    }
    if (valida){
        formularioBusqueda.submit(); //Se envia el formulario en caso de no entrar en las validaciones anteriores
    }
})

let containerRecetas = document.querySelector(".container-recetas-index");
let botonCargar = document.querySelector(".boton-cargar-index");

let recetasMostradas = 0; // Para saber cuántas recetas se mostraron hasta el momento 
const recetasPorPagina = 10; // Número de recetas a mostrar cada vez que toca "cargar mas"

fetch("https://dummyjson.com/recipes")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
    console.log(data);

        if (data.recipes.length > 0) {
            let recetas = " ";
            for (let i = 0; i < recetasPorPagina && i < data.recipes.length; i++) {
                recetas += `
                    <article id="article-recipes">
                        <img src="${data.recipes[i].image}" class="imagenes-recipes"/>
                        <h2 class="titulo-receta">${data.recipes[i].name}</h2>
                        <p class="dificultad-receta">Dificultad: ${data.recipes[i].difficulty}</p>
                        <a href="receta.html?id=${data.recipes[i].id}" class="detalle-receta">Ver detalle</a>
                    </article>`;
                }
                containerRecetas.innerHTML += recetas;
                recetasMostradas = recetasPorPagina; //Actualizo el contador
                
                // Evento del botón "cargar más"
                botonCargar.addEventListener("click", function() {
                    let nuevasRecetas = " ";
                    for (let i = recetasMostradas; i < recetasMostradas + recetasPorPagina && i < data.recipes.length; i++) {
                        nuevasRecetas += `
                            <article id="article-recipes">
                                <img src="${data.recipes[i].image}" class="imagenes-recipes"/>
                                <h2 class="titulo-receta">${data.recipes[i].name}</h2>
                                <p class="dificultad-receta">Dificultad: ${data.recipes[i].difficulty}</p>
                                <a href="receta.html?id=${data.recipes[i].id}" class="detalle-receta">Ver detalle</a>
                            </article>`;
                    }
                containerRecetas.innerHTML += nuevasRecetas;
                recetasMostradas += recetasPorPagina; // Vuelvo a actualizar el contador

                // Ocultar el botón si ya se cargaron todas
                if (recetasMostradas >= data.recipes.length) {
                    botonCargar.style.display = "none";
                }
            });
        } else {
            // Si por alguna razón no carga ninguna receta de la API 
            containerRecetas.innerHTML = `<p class="mensaje-invalid" >No se encontraron recetas para mostrar.</p>`;
        }
    })
    .catch(function(error) {
        console.log("Error al cargar las recetas " + error);
});