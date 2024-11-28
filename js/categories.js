// Capturo elemento
let categoriasContainer = document.querySelector(".categorias-container");

let url = "https://dummyjson.com/recipes/tags";

fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        
        if (data.length > 0) {
            let categorias = "";
            for (let i = 0; i < data.length; i++) {
                const categoria = data[i];

                categorias += `
                    <article class="categorias-cajas">
                        <a href="category.html?category=${categoria}" class="categorias-opciones">${categoria}</a>
                    </article>`;
                
            }
            categoriasContainer.innerHTML = categorias;
        }else {
            // Si 'tags' no existe o está vacío:
            categoriasContainer.innerHTML = '<p class="mensaje-invalid" >No se encontraron categorías.</p>';
        }
    })
    .catch(function (error) {
        console.log("Error al cargar las categorías " + error);
        categoriasContainer.innerHTML = '<p class="mensaje-invalid" >Hubo un error al cargar las categorías.</p>';
    })