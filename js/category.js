// Capturo elementos 
let categoriaTitulo = document.querySelector("#categoria-titulo");
let containerRecetasCategory = document.querySelector("#container-recetas-category");

// Query String
let queryString = location.search;
let queryStringObj = new URLSearchParams(queryString);
let categoriaId = queryStringObj.get("category");
let url = `https://dummyjson.com/recipes/tag/${categoriaId}`

if(categoriaId){
    categoriaTitulo.innerHTML = `CATEGORÍA: <span style="color: rgb(92, 91, 91);">${categoriaId}</span>`;

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
                        <article class="receta-article">
                            <img src="${receta.image}" alt="${receta.name}" class="receta-img">
                            <h2 class="receta-titulo">${receta.name}</h2>
                            <p class="receta-dificultad">Dificultad: ${receta.difficulty}</p>
                            <a href="receta.html?id=${receta.id}" class="receta-detalle-link">Ver detalle</a>
                        </article>`
                }
                containerRecetasCategory.innerHTML = categoriaDetalle;
            }else {
                containerRecetasCategory.innerHTML = "<p>No se encontraron recetas disponibles para esta categoría.</p>"
            }
        })
        .catch(function (error) {
            console.log("Error al cargar la categoría " + error);
            containerRecetasCategory.innerHTML = "<p>Hubo un error al cargar la categoría.</p>";
        })
}else {
    // Si no se selecciona una categoría
    containerRecetasCategory.innerHTML = "<p>No se especificó una categoría válida.</p>";
}