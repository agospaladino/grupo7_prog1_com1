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