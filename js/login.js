// Capturo elementos
let formLogIn = document.querySelector(".form-login");
let email = document.querySelector("#email-login");
let password = document.querySelector("#password-login");
let boton = document.querySelector(".boton-login");

formLogIn.addEventListener("submit", function (event) {
    event.preventDefault();

    let valida = true;

    if (email.value == "") {
        alert("Por favor complete el campo email.");
        valida = false;
    }
    if (password.value == "") {
        alert("Por favor complete el campo contraseña.");
        valida = false;
    }
    if (valida) {
        boton.innerHTML = `<a href="./index.html"></a>`;
        formLogIn.submit();
    }
})

