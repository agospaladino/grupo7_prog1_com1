// Capturo elementos
let formularioRegister = document.querySelector(".form-register");
let email = document.querySelector("#email-reg");
let contra = document.querySelector("#password-reg");
let tyc = document.querySelector("#tyc");
let boton = document.querySelector(".boton-registro");
let errorEmail = document.querySelector(".invalid-email");
let errorContra = document.querySelector(".invalid-password");

formularioRegister.addEventListener("submit", function (event) {
    event.preventDefault();
    let valida = true;

    if (email.value == "") {
        errorEmail.style.display = "block";
        errorEmail.innerText = "Por favor complete el campo.";

        valida = false;
    }else {
        errorEmail.style.display = "none"; // Ocultar mensaje si es válido
        errorEmail.innerText = "";
    }
    if (contra.value == "") {
        errorContra.style.display = "block";
        errorContra.innerText = "Por favor complete el campo.";

        valida = false;
    }else {
        errorContra.style.display = "none"; // Ocultar mensaje si es válido
        errorContra.innerText = "";
    }
    if (valida) {
        boton.innerHTML = `<a href="./login.html"></a>`;
        formularioRegister.submit();
    }
})
