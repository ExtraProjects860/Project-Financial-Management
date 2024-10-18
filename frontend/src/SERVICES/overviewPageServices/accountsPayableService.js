
const loadAccountsPayble = async (token, uid) => {
    const response = await fetch(`${URL_API}verify-type-account-not-pay/${uid}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
    })

    if (!response.ok) {
        console.error('Erro ao buscar contas a pagar:', error);
        return;
    }

    const data = await response.json();
    updateAccountsPaybleDisplay(data);
}


const updateAccountsPaybleDisplay = (data) => {
    const accountsPayble = document.getElementById('contasAPagar');
    accountsPayble.innerHTML = '';

    if (data && data.data) {
        for (const account in data.data) {
            data.data[account].forEach(item => {
                accountsPayble.innerHTML += `- ${item}: <strong>${account}</strong><br>`;  // Itens dentro da conta
            });
        }
         
    } else {
        accountsPayble.innerHTML = 'No momento você não possui contas a pagar';
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const tokenPayload = localStorage.getItem('token_payload');
    if (tokenPayload) {
        try {
            const parsedTokenPayload = JSON.parse(tokenPayload);
            const token = parsedTokenPayload.token;
            const uid = parsedTokenPayload.uid;
            loadAccountsPayble(token, uid);
        } catch (error) {
            console.error('Erro ao parsear token_payload:', error);
        }
    } else {
        console.error('token_payload não encontrado no localStorage');
    }
});