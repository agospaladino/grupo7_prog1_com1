let section = document.querySelector("#home section");
let button = document.querySelector("home button");
let pagina = 0;


fetch("https://dummyjson.com/recipes")
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        console.log(data);

        for (let i = 0; i < 10; i++) {
            section.innerHTML += `
                <article id="article-recipes">
                    <img src="${data.recipes[i].image}" alt="">
                    <div id="recipes">
                        <h3>${data.recipes[i].name}</h3>
                        <p>${data.recipes[i].difficulty}</p>
                        <a href="detalle.html?id=${data.recipes[i].id}">Ir a receta</a>
                    </div>
                </article>
            `;
        }
    })
    .catch(function(err){
        console.log(err);
        
    })


boton.addEventListenner('click', function(){
    console.log('tocaste el boton')
    pagina += 10;
    
    
    fetch(`https://dummyjson.com/recipes?limit=&skip=&select=name,image=${pagina}`)
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
                    <a href="detalle.html?id=${data.recipes[i].id}">Ir a detalle</a>
                </div>
                
            </article>
            `
        }
        if(pagina == 50){
            boton.innerHTML = "ya no hay mas elementos por mostrar"
            boton.disabled = true
        }
    })
    })
    .catch(function(err){
    console.log(err);
    })