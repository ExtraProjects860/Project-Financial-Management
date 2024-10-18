
const paymentsTypeAccount = async (token, uid) => {
    const response = await fetch(`${URL_API}all-payments-per-type-account/${uid}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
    });

    if (!response.ok) {
        console.error('Erro ao buscar gastos por tipo de conta')
    }

    const data = await response.json();
    updatePaymentsTypeAccount(data)
};


const updatePaymentsTypeAccount = (data) => {
    if (!data && !data.data) {
        console.error('Dados de gastos por conta não encontrados.');
        return;
    }

    const labels = Object.keys(data.data);
    const subcategories = [];
    const values = [];

    labels.forEach(account => {
        const subcategoryData = data.data[account];
        subcategoryData.forEach(subcategory => {
            for (const [subcategoryLabel, value] of Object.entries(subcategory)) {
                subcategories.push(subcategoryLabel);
                values.push(value);
            }
        });
    });

    const chartData = {
        labels: subcategories,
        datasets: [{
            label: 'Gastos por Conta',
            data: values,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)'
            ],
            borderWidth: 1
        }]
    };

    const config = {
        type: 'bar',
        data: chartData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    const ctx = document.getElementById('myChart-payments-type-account').getContext('2d');
    new Chart(ctx, config);
};


document.addEventListener('DOMContentLoaded', () => {
    const token_payload = JSON.parse(localStorage.getItem('token_payload'));
    if (token_payload) {
        try {
            paymentsTypeAccount(token_payload.token, token_payload.uid);
        } catch (error) {
            console.error('Erro ao parsear token_payload:', error);
        }
    } else {
        console.error('token_payload encontrado no localStorage');
    }
});