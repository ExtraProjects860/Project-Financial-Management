const validarCampo = (campo) => {
    const regex = /^[a-zA-Z]+$/; // Permite apenas letras
    if (event.key !== 'Backspace' && event.key !== 'Delete' && !regex.test(campo.value)) {
        alert('O campo digitado deve conter apenas letras. Por favor, verifique e tente novamente.');
        campo.value = campo.value.replace(/\d/g, ''); // Remove números
    }
}

const validarCampoNumerico = (campo) => {
    const regex = /^[0-9]+$/; // Permite apenas números
    if (event.key !== 'Backspace' && event.key !== 'Delete' && !regex.test(campo.value)) {
        alert('O campo digitado deve conter apenas números. Por favor, verifique e tente novamente.');
        campo.value = campo.value.replace(/\D/g, ''); // Remove não-números
    }
}

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

const verificarSenhasIguais = () => {
    const password = document.querySelector("#senha").value;
    const confirmarSenha = document.querySelector("#confirmarSenha").value;
    const feedbackSenha = document.querySelector("#feedbackSenha");
    const confirmarSenhaInput = document.querySelector("#confirmarSenha");
    const passwordInput = document.querySelector("#senha");

    if (password !== confirmarSenha) {
        confirmarSenhaInput.classList.add("is-invalid");
        passwordInput.classList.add("is-invalid");
        feedbackSenha.style.display = "block";
    } else {
        confirmarSenhaInput.classList.remove("is-invalid");
        passwordInput.classList.remove("is-invalid");
        feedbackSenha.style.display = "none";
    }
}