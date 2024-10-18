const login = async (email, password) => {
    const response = await fetch(`${URL_API}login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
    })

    if (!response.ok) {
        Swal.fire({
            title: 'Erro!',
            text: 'Login falhou. Verifique suas credenciais.' || response.statusText ,
            icon: 'error'
        });
        return;
    } 

    const data = await response.json();
    validationDataLogin(data);
};


const validationDataLogin = (data) => {
    if(data.error) {
        Swal.fire({
            title: 'Erro!',
            text: 'Login falhou. Verifique suas credenciais.' || data.error,
            icon: 'error'
        });
        return;
    } 

    console.log(data.success);
    console.log(data.data_user);
    console.log(data.token_payload);

    localStorage.setItem('token_payload', JSON.stringify(data.token_payload));
    localStorage.setItem('data_user', JSON.stringify(data.data_user));

    Swal.fire({
        title: 'Sucesso!',
        text: 'Login efetuado com sucesso!' || data.success,
        icon: 'success'
    }).then(() => {
        window.location.href = '../VIEW/visao_geral.html';
    });
};


document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form-container');
    try {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('senha').value;
            login(email, password);
        });
    } catch (error) {
        console.error('Error:', error);
    }
});