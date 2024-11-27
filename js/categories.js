let queryString = location.search;
let obj = new URLSearchParams(queryString);
let categories = obj.get("categories");

// Capturo elemento
let categoriasContainer = document.querySelector(".categorias-container");
let url = 'https://dummyjson.com/recipes/tags';

fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        
        let datos = "";
        
    })