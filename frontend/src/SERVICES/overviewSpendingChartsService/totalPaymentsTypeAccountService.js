const totalPaymentsTypeAccount = async (token, uid) => {
    const response = await fetch(`${URL_API}sum-total-type-account-payments/${uid}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
    });

    if (!response.ok) {
        console.error('Erro ao buscar gastos por tipo de conta:', error);
        return;
    }

    const data = await response.json();
    updateTotalSpendingChartsDisplay(data);
};


const updateTotalSpendingChartsDisplay = (data) => {
    if (!data && !data.data) {
        console.error('Dados de gastos totais não encontrados.');
        return;
    }

    const labels = Object.keys(data.data);
    const values = Object.values(data.data);

    const chartData = {
        labels: labels,
        datasets: [{
            axis: 'y',
            label: 'Gastos Totais por Tipo de Conta',
            data: values,
            fill: false,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 0.5
        }]
    };
    
    const config = {
        type: 'bar',
        data: chartData,
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true
                }
            }
        }
    };

    const ctx = document.getElementById('myChart-total-payments-type-account').getContext('2d');
    new Chart(ctx, config);
};


document.addEventListener('DOMContentLoaded', () => {
    const token_payload = JSON.parse(localStorage.getItem('token_payload'));
    if (token_payload) {
        try {
            totalPaymentsTypeAccount(token_payload.token, token_payload.uid);
        } catch (error) {
            console.error('Erro ao parsear token_payload:', error);
        }
    } else {
        console.error('token_payload encontrado no localStorage');
    }
});