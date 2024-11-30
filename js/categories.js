// Capturo elemento
let categoriasContainer = document.querySelector(".categorias-container");

let url = "https://dummyjson.com/recipes/tags";

fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        
        let categorias = "";
        for (let i = 0; i < data.length; i++) {
            const categoria = data[i];

            categorias += `
                <article class="categorias-cajas">
                    <a href="category.html?category=${categoria}" class="categorias-opciones">${categoria}</a>
                </article>`;
            
        }
        categoriasContainer.innerHTML = categorias;
        
    })
    .catch(function (error) {
        console.log("Error al cargar las categorías " + error);
        categoriasContainer.innerHTML = '<p class="mensaje-invalid" >Hubo un error al cargar las categorías.</p>';
    })