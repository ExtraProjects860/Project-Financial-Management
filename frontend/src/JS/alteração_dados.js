const validarCampo = (campo) => {
    const regex = /^[a-zA-Z]+$/; // Permite apenas letras
    if (event.key !== 'Backspace' && event.key !== 'Delete' && !regex.test(campo.value)) {
        campo.value = campo.value.replace(/\d/g, ''); // Remove números
    }
}

const validarCampoNumerico = (campo) => {
    const regex = /^[0-9]+$/; // Permite apenas números
    if (event.key !== 'Backspace' && event.key !== 'Delete' && !regex.test(campo.value)) {
        campo.value = campo.value.replace(/\D/g, ''); // Remove não-números
    }
}