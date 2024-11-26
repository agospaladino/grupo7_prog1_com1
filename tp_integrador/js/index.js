let section = document.querySelector("#home section");

fetch("https://dummyjson.com/recipes")
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        console.log(data);

        for (let i = 0; i < data.recipes.length; i++) {
            section.innerHTML += `
                <article>
                    <img src="${data.recipes[i].image}" alt="">
                    <div>
                        <h3>${data.recipes[i].name}</h3>
                        <p>${data.recipes[i].difficulty}</p>
                        <a href="detalle-receta.html?id=${data.recipes[i]._id}">ir a receta</a>
                    </div>
                </article>
            `;
        }
    })

let button = document.querySelector("#home button");
let pagina = 0;

boton.addeventlistenner('click', function(){
    console.log('tocaste el boton')
    pagina += 10;
    
    fetch(`https://dummyjson.com/recipes?limit=10&skip=${pagina}`)
    .then(function (res) {
        return res.json()
    })
    .then(function (data) {
        console.log(data)

        for (let i = 0; i < data.recipes.length; i++) {
            section.innerHTML +=
            `
             <article>
                <img src="${data.recipes[i].image}" alt="">
                <div>
                    <h3>${data.recipes[i].name}</h3>
                    <p>${data.recipes[i].difficulty}</p>
                    <a href="detalle-receta.html?id=${data.recipes[i].id}">Ir a detalle</a>
                </div>
                
            </article>
            `
        }
        if(pagina == 50){
            boton.innerHTML = "ya no hay mas elementos por mostrar"
            boton.disabled = true
        }
    })
}
)

//bores
function cargarRecetas() {
    fetch(`https://dummyjson.com/recipes?skip=${recetasMostradas}&limit=${recetasPorPagina}`)
        .then(function (response) {
            return response.json();
            })
        .then(function (data) {
            console.log(data);
            if (data.recipes) {
                let recetas = " ";
                for (let i = 0; i < data.recipes.length; i++) {
                    recetas += `
                        <article id="article-recipes">
                            <img src="${data.recipes[i].image}" class="imagenes-recipes"/>
                            <h2 class="titulo-receta">${data.recipes[i].name}</h2>
                            <p class="dificultad-receta">Dificultad: ${data.recipes[i].difficulty}</p>
                            <a href="receta.html?id=${data.recipes[i].id}" class="detalle-receta">Ver detalle</a>
                        </article>`;
                    }
                    containerRecetas.innerHTML += recetas;
                    recetasMostradas += recetasPorPagina;
                } else {
                    containerRecetas.innerHTML = `<p>No se encontraron recetas para mostrar.</p>`;
                }
            })
        .catch(function(error) {
                console.log("Error al cargar las recetas " + error);
        })
    }
// Asignar el evento al botón de cargar más
botonCargar.addEventListener("click", cargarRecetas);

// Cargar recetas al cargar la página
cargarRecetas();