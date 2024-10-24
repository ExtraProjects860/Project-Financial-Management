
// function setCurrentMonth() {
//     const currentDate = new Date();
//     const monthNames = [
//         "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
//         "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
//     ];
//     const currentMonth = monthNames[currentDate.getMonth()]; 

//     document.getElementById('mes').textContent = currentMonth;

//     const monthSelect = document.getElementById('mes-select');
//     monthSelect.value = currentMonth; 
// }

// function changeMonth() {
//     const selectedMonth = document.getElementById('mes-select').value;
//     document.getElementById('mes').textContent = selectedMonth;
// }

function addGasto(idGasto, idInput) {
    const inputValue = document.getElementById(idInput).value;
    if (inputValue) {
        const currentValue = parseFloat(document.getElementById(idGasto).textContent);
        const newValue = currentValue + parseFloat(inputValue);
        document.getElementById(idGasto).textContent = newValue.toFixed(2);
        document.getElementById(idInput).value = ""; 
    }
}

// window.onload = setCurrentMonth;

function addGasto(categoria) {
    const input = document.getElementById(`gasto-${categoria}`);
    const valor = parseFloat(input.value) || 0; 

    if (valor > 0) {
        alert(`Você adicionou R$${valor.toFixed(2)} à categoria ${categoria.charAt(0).toUpperCase() + categoria.slice(1)}.`);
        

        input.value = ""; 
    } else {
        alert("Por favor, insira um valor válido.");
    }
}
