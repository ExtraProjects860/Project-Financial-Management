

const loadHighestExpenses = async (token, uid) => {
    const response = await fetch(`${URL_API}all-payments-per-type-account/${uid}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
    });

    if (!response.ok) {
        console.error('Erro ao buscar maiores gastos de contas:', error);
        return;
    }

    const data = await response.json();
    updateHighestExpensesDisplay(data);
};


const updateHighestExpensesDisplay = (data) => {
    const highestExpenses = document.getElementById('maioresGastos');
    highestExpenses.innerHTML = '';

    if (data && data.data) {
        for (const account in data.data) {
            const expenses = data.data[account];
            highestExpenses.innerHTML += `<strong>${account}</strong>`;

            expenses.forEach(element => {
                for (const key in element) {
                    const value = element[key];
                    highestExpenses.innerHTML += `<br>- ${key}: <strong>R$ ${value.toFixed(2)}</strong>`;
                }
            });
        }
        return;
    }

    highestExpenses.innerHTML = 'No momento você não possui contas a pagar';
};


document.addEventListener('DOMContentLoaded', () => {
    const token_payload = JSON.parse(localStorage.getItem('token_payload'));
    if (token_payload) {
        try {
            loadHighestExpenses(token_payload.token, token_payload.uid);
        } catch (error) {
            console.error('Erro ao parsear token_payload:', error);
        }
    } else {
        console.error('token_payload encontrado no localStorage');
    }
});