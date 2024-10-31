
const createAccount = (email, password, name, profession, monthlyIncome) => {
    fetch(`${URL_API}create-user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, name, profession, monthlyIncome })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        validationDataCreateAccount(data);
    }).catch(error => {
        console.error('Error:', error);
        Swal.fire({
            title: 'Erro!',
            text: 'Ocorreu um erro ao criar a conta. Tente novamente mais tarde.',
            icon: 'error'
        });
    });
}


const validationDataCreateAccount = (data) => {
    if(data.success) {
        console.log(data.success);
        
        Swal.fire({
            title: 'Sucesso!',
            text: "Conta criada com sucesso!",
            icon: 'success'
        }).then(() => {
            window.location.href = '../VIEW/login.html';
        });
    } else {
        Swal.fire({
            title: 'Erro!',
            text: data.error || 'Ocorreu um erro ao criar a conta. Verifique suas credenciais.',
            icon: 'error'
        });
    }
};


document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form-container');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('senha').value;
        const userName = document.getElementById('nome').value;
        const profession = document.getElementById('emprego').value;
        const monthlyIncome = parseFloat(document.getElementById('salario').value);

        createAccount(email, password, userName, profession, monthlyIncome);
    })
});
