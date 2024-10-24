
const loadAccountsPaymentDate = async (token, uid) => {
    const response = await fetch(`${URL_API}verify-accounts-payment-date/${uid}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
    });

    if (!response.ok) {
        console.error('Erro ao buscar contas para pagar hoje:', error);
        return;
    }

    const data = await response.json();
    updateAccountsPaymentDateDisplay(data);
    console.log(data);
    console.log(response);
};


const updateAccountsPaymentDateDisplay = (data) => {
    const accountsPaymentDate = document.getElementById('contasAPagarHoje');
    accountsPaymentDate.innerHTML = '';

    if (data && data.data) {
        for (const account in data.data) {
            const accounts = data.data[account];

            accounts.forEach(item => {
                accountsPaymentDate.innerHTML += `• <strong>${item["accountName"]} : ${item["paymentDate"]}</strong><br><br>`
            });
        }
        return;
    }

    accountsPaymentDate.innerHTML = 'Não a contas a pagar hoje';
};


document.addEventListener('DOMContentLoaded', () => {
    const token_payload = JSON.parse(localStorage.getItem('token_payload'));
    if (token_payload) {
        try {
            loadAccountsPaymentDate(token_payload.token, token_payload.uid);
        } catch (error) {
            console.error('Erro ao parsear token_payload:', error);
        }
    } else {
        console.error('token_payload encontrado no localStorage');
    }
});