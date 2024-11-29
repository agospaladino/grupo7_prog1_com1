// Capturo elementos 
let categoriaTitulo = document.querySelector("#categoria-titulo");
let containerRecetasCategory = document.querySelector("#container-recetas-category");

// Query String
let queryString = location.search;
let queryStringObj = new URLSearchParams(queryString);
let categoriaId = queryStringObj.get("category");
let url = `https://dummyjson.com/recipes/tag/${categoriaId}`

if(categoriaId){
    categoriaTitulo.innerHTML = `CATEGORÍA: <span>${categoriaId}</span>`;

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            
            if (data.recipes && data.recipes.length > 0) {
                let categoriaDetalle ="";

                for (let i = 0; i < data.recipes.length; i++) {
                    const receta = data.recipes[i];
                    
                    categoriaDetalle += `
                        <article class="categoria-article">
                            <img src="${receta.image}" alt="${receta.name}" class="categoria-imagen">
                            <h2 class="categoria-subtitulo">${receta.name}</h2>
                            <p class="categoria-dificultad">Dificultad: ${receta.difficulty}</p>
                            <a href="receta.html?id=${receta.id}" class="categoria-detalle">Ver detalle</a>
                        </article>`
                }
                containerRecetasCategory.innerHTML = categoriaDetalle;
            }else {
                containerRecetasCategory.innerHTML = '<p class="mensaje-invalid">No se encontraron recetas disponibles para esta categoría.</p>';
            }
        })
        .catch(function (error) {
            console.log("Error al cargar la categoría " + error);
            containerRecetasCategory.innerHTML = '<p class="mensaje-invalid">Hubo un error al cargar la categoría.</p>';
        })
}else {
    // Si no se selecciona una categoría
    containerRecetasCategory.innerHTML = '<p class="mensaje-invalid">No se especificó una categoría válida.</p>';
}