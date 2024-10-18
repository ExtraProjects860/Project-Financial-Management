const mostrarSenha = () => {
    const password = document.querySelector("#senha");
    const botaoVerSenha = document.querySelector("#botaoVerSenha");

    if (botaoVerSenha.checked) {
        password.setAttribute("type", "text");
    } else {
        password.setAttribute("type", "password");
    }
}