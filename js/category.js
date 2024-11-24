// Query string
let queryString = location.search;
let obj = new URLSearchParams(queryString);
let idReceta = obj.get("id");
