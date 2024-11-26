// Creo variable para  caputurar la section que contendrá el detalle de las recetas
let recetaDetalle = document.querySelector(".detalle-receta-container");

// Creo queryString
let queryString = location.search;
let obj = new URLSearchParams(queryString);
let id = obj.get("id");
let url = `https://dummyjson.com/recipes/${id}`;


fetch(url)
.then(function (response) {
    return response.json()
})
.then(function (data) {
    console.log(data);
    let receta = `
        <article class="detalle-receta-article">
            <img src="${data.image}" alt="${data.name}" class="detalle-receta-img">
            <h2 class="detalle-receta-titulo">${data.name}</h2>
            <p class="detalle-receta-tiempo">Tiempo de cocción: ${data.cookTimeMinutes} minutos</p>
        `;

    let instrucciones = ""; // Variable para acumular las instrucciones
    for (let i = 0; i < data.instructions.length; i++) {
        instrucciones += `<li class="detalle-receta-instrucciones">${data.instructions[i]}</li>`;
    }
    receta += `
        <h3 class="detalle-receta-instrucciones-titulo">Instrucciones:</h3>
        <ol class="detalle-receta-instrucciones-lista">${instrucciones}</ol>
    `;

    if (data.tags && data.tags.length > 0) {
        let categorias = " ";
        for (let i = 0; i < data.tags.length; i++) {
            categorias += `
                <li><a href="categories.html?categoria=${data.tags[i]}" class="receta-categorias">${data.tags[i]}</a></li>`;
        }
        receta += `
            <h3 class="receta-categorias-titulo">Categorias: </h3>
            <ul class="receta-categorias-lista">${categorias}</ul>`;
    } else{
        receta += `<p>Esta receta no cuenta con categorias disponibles.</p>`;
    }
    receta += `</article>`; //en caso de que se cumpla el if/else, se añaden los li/ul
    recetaDetalle.innerHTML = receta;
})
.catch(function (err) {
    console.log(`Error al cargar el detalle: ${err}`);
})