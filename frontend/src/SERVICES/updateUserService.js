
const updateUserService = async (name, email, profession, monthlyIncome, token, uid) => {
    const response = await fetch(`${URL_API}update-user`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ uid, name, email, profession, monthlyIncome }),
        credentials: 'include'
    })

    console.log(token)

    if (!response.ok) {
        Swal.fire({
            title: 'Erro!',
            text: response.text || 'Ocorreu um erro ao atualizar os dados. Tente novamente mais tarde.',
            icon: 'error'
        });
        return;
    }

    const data = await response.json();
    console.log(data);
    validationDataUpdateAccount(data);
};


const validationDataUpdateAccount = (data) => {
    if(data.error) {
        Swal.fire({
            title: 'Erro!',
            text:  data.error,
            icon: 'error'
        });
        return;
    } 

    console.log(data.success);
    Swal.fire({
        title: 'Sucesso!',
        text: 'Informações atualizadas com sucesso! Redirecionando para a página inicial... Logue novamente para ver as alterações!',
        icon: 'success'
    }).then(() => {
        window.location.href = '../VIEW/index.html';
    });
};


document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form-container');
    const token_payload = JSON.parse(localStorage.getItem('token_payload'));
    if (token_payload) {
        try {
            form.addEventListener('submit', (event) => {
                event.preventDefault();

                const name = document.getElementById('nome').value;
                const email = document.getElementById('email').value;
                const profession = document.getElementById('emprego').value;
                const monthlyIncome = document.getElementById('salario').value;
        
                updateUserService(name, email, profession, monthlyIncome, token_payload.token, token_payload.uid);
            });
        } catch (error) {
            console.error('Erro ', error);
        }
    } else {
        console.error('token_payload encontrado no localStorage');
    }
});