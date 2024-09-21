const mostrarSenha = () => {
    const password = document.querySelector("#senha");
    const confirmarSenha = document.querySelector("#confirmarSenha");
    const botaoVerSenha = document.querySelector("#botaoVerSenha");

    if (botaoVerSenha.checked) {
        password.setAttribute("type", "text");
        confirmarSenha.setAttribute("type", "text");
    } else {
        password.setAttribute("type", "password");
        confirmarSenha.setAttribute("type", "password");
    }
}