// Capturar el formulario, el campo de entrada y el div con el mensaje a mostrar en caso de error//
let formularioBusqueda = document.querySelector("#form-busqueda");
let entradaBusqueda = document.querySelector("#input-busqueda");
let errorBusqueda = document.querySelector(".invalid-busqueda");

// Agregar evento al formulario para validarlo antes de que sea enviado //
formularioBusqueda.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevenir accion por defecto

    let valida = true;

    // Validaciones del input
    // El campo de busqueda no se debe enviar vacio
    if (entradaBusqueda.value == "") {
        errorBusqueda.style.display = "block";
        errorBusqueda.innerText = "El campo se encuentra vacío";

        valida = false; //cambia el valor a true dando por hecho que ocurrio un error
    }else if (entradaBusqueda.value.length<3) {
        entradaBusqueda.value = ""; // Vacía el campo para buscar nuevamente
        errorBusqueda.style.display = "block";
        errorBusqueda.innerText = "Mínimo 3 caracteres";
        
        valida = false;
    }
    if (valida){
        formularioBusqueda.submit();
    }
})

document.addEventListener("DOMContentLoaded", function () {
    let containerRecetas = document.querySelector(".container-recetas-index");
    let botonCargarMas = document.querySelector(".boton-cargar-index");

    let recetasMostradas = 0;
    let recetasPorPagina = 10; //chequear

    function cargarRecetas() {
        fetch(`https://dummyjson.com/recipes?skip=${recetasMostradas}&limit=${recetasPorPagina}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                if (data.recipes) {
                    let recetasHTML = "";
                    for (let i = 0; i < data.recipes.length; i++) {
                        let receta = data.recipes[i];
                        recetasHTML += `
                            <article id="article-recipes">
                                <img src="${receta.image}" class="imagenes-receta"/>
                                <h2 class="titulo-receta">${receta.name}</h2>
                                <p class="dificultad-receta">Dificultad: ${receta.difficulty}</p>
                                <a href="receta.html?id=${receta.id}" class="detalle-receta">Ver detalle</a>
                            </article>
                        `;
                    }
                    containerRecetas.innerHTML += recetasHTML;
                    recetasMostradas += recetasPorPagina;
                } else {
                    containerRecetas.innerHTML = `<p>No se encontraron recetas para mostrar.</p>`;
                }
            })
        .catch((error){
            console.error(`Error al cargar las recetas: ${error}`);
        });
    }
    // Asignar el evento al botón de cargar más
    botonCargarMas.addEventListener("click", cargarRecetas);

    // Cargar recetas al cargar la página
    cargarRecetas();
});