let titulo =  document.querySelector('#detalle-receta h1')
let foto = document.querySelector('#detalle-receta img')
let tiempo = document.querySelector('#detalle-receta p')
let ol = document.querySelector('#detalle-receta ol')
let li = document.querySelector('#detalle-receta li')

let querystring = location.search
let querystringObj = new URLSearchParams(querystring)
let id = querystringObj.get('id')
console.log(id);

fetch(`https://dummyjson.com/recipes/${id}`)
    .then(function(res){
        return res.json()
    })
    .then(function(data){
        console.log(data);

        titulo.innerHTML = data.name
        tiempo.innerHTML += `${data.cookTimeMinutes}min`
        foto.src= data.image

        for(let i= 0; i< data.instructions.length; i++){
            ol.innerHTML += `<li>${data.instructions}</li>`
        }
        let categorias = ''
        for (let i = 0; i < data.tags.length; i++) {
            categorias += `<li>${data.tags[i]}</li>`
            
        }
        URL.innerHTML = categorias
    })
    .catch(function(err){
        console.log(err);
        
    })