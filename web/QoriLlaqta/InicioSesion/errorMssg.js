function validarInicioSesion() {
    var username = document.getElementById("usernameInput").value;
    var password = document.getElementById("passwordInput").value;

    if (username.trim() === "" || password.trim() === "") {
        document.getElementById("errorMessage").style.display = "block";
    } else {
        window.location.href = "../MENÚ/index.html";
    }
}
