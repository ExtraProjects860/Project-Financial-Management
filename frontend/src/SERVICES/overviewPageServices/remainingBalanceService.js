// Função para carregar dados do saldo da API
const loadRemainingBalance = (token, uid, balanceData) => {    
        fetch(`${URL_API}sum-total-balance/${uid}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data => {
            balanceData = data.data;
            updateBalanceDisplay(balanceData);
        })
        .catch(error => {
            console.error('Erro ao buscar o saldo:', error);
        });
};


const updateBalanceDisplay = (balance) => {
    const monthlyIncome = JSON.parse(localStorage.getItem('data_user')).monthlyIncome;
    const saldoRestanteElement = document.getElementById('saldoRestante');

    if (monthlyIncome) {
        saldoRestanteElement.style.color = balance < 0 ? 'red' : 'green';
        saldoRestanteElement.textContent = `R$ ${balance.toFixed(2)} de R$ ${monthlyIncome}`;
    }
};


document.addEventListener('DOMContentLoaded', () => {
    const tokenPayload = localStorage.getItem('token_payload');
    if (tokenPayload) {
        try {
            const parsedTokenPayload = JSON.parse(tokenPayload);
            const token = parsedTokenPayload.token;
            const uid = parsedTokenPayload.uid;
            loadRemainingBalance(token, uid);
        } catch (error) {
            console.error('Erro ao parsear token_payload:', error);
        }
    } else {
        console.error('token_payload não encontrado no localStorage');
    }
});
