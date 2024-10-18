
const logout = async (token) => {
    const response = await fetch(`${URL_API}logout`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
    })

    if (!response.ok) {
        Swal.fire({
            title: 'Erro!',
            text: 'Ocorreu um erro durante o logout. Deslogando automaticamente...',
            icon: 'error'
        });
        return;
    }

    const data = await response.json();
    validationDataLogout(data);
};


const validationDataLogout = (data) => {
    if(data.error) {
        localStorage.removeItem('token_payload');
        localStorage.removeItem('data_user');
        Swal.fire({
            title: 'Erro!',
            text: 'Ocorreu um erro durante o logout. Deslogando automaticamente...',
            icon: 'error'
        }).then(() => {
            window.location.href = '../VIEW/index.html';
        })
        return;
    } 
    console.log(data.success);
    localStorage.removeItem('token_payload');
    localStorage.removeItem('data_user');
    Swal.fire({
        title: 'Sucesso!',
        text: 'Deslogado com sucesso!',
        icon: 'success'
    }).then(() => {
        window.location.href = '../VIEW/index.html';
    });
};


document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout-button');
    const token_payload = JSON.parse(localStorage.getItem('token_payload'));
    
    if (token_payload) {
        try {
            logoutButton.addEventListener('click', () => {
                logout(token_payload.token);
            });
        } catch (error) {
            console.error('Erro ao parsear token_payload:', error);
        }
    } else {
        console.error('token_payload encontrado no localStorage');
    }

})