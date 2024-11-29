// Capturo elementos del HTML
let tituloResults = document.querySelector("#titulo-search-results");
let containerResults = document.querySelector("#container-search-results");

// Query String
let queryString = location.search;
let queryStringObj = new URLSearchParams(queryString);
let searchResults = queryStringObj.get("q");
let url = `https://dummyjson.com/recipes/search?q=${searchResults}`;

if (searchResults) {
    tituloResults.innerHTML = `Resultados de búsqueda para: <span>${searchResults}</span>`

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            
            if (data.recipes && data.recipes.length > 0) {
                let resultados = "";

                for (let i = 0; i < data.recipes.length; i++) {
                    const receta = data.recipes[i];
                    
                    resultados += `
                        <article class="article-search-results">
                            <img src="${receta.image}" alt="${receta.name}" class="imagen-search-results">
                            <h2 class="resultado-titulo">${receta.name}</h2>
                            <a href="receta.html?id=${receta.id}" class="resultado-detalle">Ver detalle</a>
                        </article>`;
                }
                containerResults.innerHTML = resultados;
            }else {
                containerResults.innerHTML = '<p class="mensaje-invalid" >No se encontraron resultados para el término buscado.</p>';
            }
        })
        .catch(function (error) {
            console.log("Error al cargar el término buscado " + error);
            containerResults.innerHTML = '<p class="mensaje-invalid>Hubo un error al cargar el término buscado.</p>';
        })
}else {
    tituloResults.innerHTML = "No se especificó un término de búsqueda existente.";
    containerResults.innerHTML = '<p class="mensaje-invalid" >Por favor, ingrese un término de búsqueda válido.</p>';
}
