import { showModal } from '../../JS/modalTemplate.js';

const loadUserExpenses = async (token, uid) => {
    const response = await fetch(`${URL_API}get-financial-payments/${uid}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
    });

    if (!response.ok) {
        console.error('Erro ao buscar contas por uid:', error);
        return;
    }

    const data = await response.json();
    loadUserExpensesDisplay(data);
};

const createTypeAccount = async (token, uid, newAccountData) => {
    try {
        const response = await fetch(`${URL_API}create-financial-payments/${uid}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAccountData),
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Erro ao criar o tipo de conta: ${errorData.message || 'Erro desconhecido'}`);
        }

        const data = await response.json();
        console.log('Tipo de conta criado com sucesso:', data);

        location.reload();
    } catch (error) {
        console.error('Erro ao criar o tipo de conta:', error);
    }
};


const deleteTypeAccount = async (token, uid, typeAccount) => {
    try {
        const response = await fetch(`${URL_API}delete-type-account/${uid}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type_account: typeAccount
            }),
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Erro ao deletar a subcategoria: ${errorData.message || 'Erro desconhecido'}`);
        }

        const data = await response.json();
        console.log('Subcategoria deletada com sucesso:', data);

        location.reload();
    } catch (error) {
        console.error('Erro ao deletar a subcategoria:', error);
    }
};


const loadUserExpensesDisplay = (data) => {
    const listGroup = document.getElementById('list-group');

    listGroup.innerHTML = `
        <li class="list-group-item list-item-category">
            <div class="innerAddContentContainer">
                <div>
                    <span>Nova categoria:</span>
                    <input type="text" id="name-category-add" />
                </div>
                <div>
                    <span class="metaAdd">Meta:</span>
                    <input type="number" id="meta-category-add" />
                </div>
            </div>
            <div class="btns-container">
                <i class="bi bi-plus-lg" id="create-category-btn"></i>
                <i class="bi bi-arrow-clockwise" id="clearInputs"></i>
            </div>
        </li>
    `;

    if (data && data.success && Object.keys(data.success).length > 0) {
        for (const category in data.success) {
            const categoryData = data.success[category];
            
            const listItemCategory = document.createElement('li');
            listItemCategory.classList.add('list-group-item', 'list-item-category');

            listItemCategory.innerHTML = `
                <div class="inner-content-container">
                    <i class="bi bi-folder-fill"></i>
                    <div class="inner-content">
                        <span>${category}</span>
                        <span class="meta">Meta: ${categoryData.meta}</span>
                    </div>
                </div>
                <div class="btns-container">
                    <i class="bi bi-info-circle more-information" data-category="${category}"></i>
                    <i class="bi bi-trash-fill delete" data-category="${category}"></i>
                </div>
            `;

            listGroup.appendChild(listItemCategory);
        }

        const infoIcons = document.querySelectorAll('.more-information');
        infoIcons.forEach(icon => {
            icon.addEventListener('click', (event) => {
                const category = event.target.getAttribute('data-category');
                const categoryData = data.success[category];

                showModal(category, categoryData.meta, categoryData.accounts || {});
            });
        });

        const deleteIcons = document.querySelectorAll('.delete');
        deleteIcons.forEach(icon => {
            icon.addEventListener('click', (event) => {
                const category = event.target.getAttribute('data-category');
                const token_payload = JSON.parse(localStorage.getItem('token_payload'));

                if (token_payload) {
                    deleteTypeAccount(token_payload.token, token_payload.uid, category);
                } else {
                    console.error('token_payload não encontrado no localStorage');
                }
            });
        });
    } else {
        const noAccountsItem = document.createElement('li');
        noAccountsItem.classList.add('list-group-item', 'text-muted');
        noAccountsItem.textContent = 'Não há contas a pagar no momento';
        listGroup.appendChild(noAccountsItem);
    }

    const createCategoryBtn = document.getElementById('create-category-btn');
    createCategoryBtn.addEventListener('click', () => {
        const nameCategory = document.getElementById('name-category-add').value;
        const metaCategory = parseFloat(document.getElementById('meta-category-add').value);
        const token_payload = JSON.parse(localStorage.getItem('token_payload'));

        if (token_payload && nameCategory && metaCategory) {
            const newAccountData = {
                type_account: nameCategory,
                meta: metaCategory
            };

            createTypeAccount(token_payload.token, token_payload.uid, newAccountData);
        } else {
            console.error('Preencha todos os campos corretamente.');
        }
    });

    const clearInputsBtn = document.getElementById('clearInputs');
    clearInputsBtn.addEventListener('click', () => {
        document.getElementById('name-category-add').value = '';
        document.getElementById('meta-category-add').value = '';
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const token_payload = JSON.parse(localStorage.getItem('token_payload'));
    if (token_payload) {
        try {
            loadUserExpenses(token_payload.token, token_payload.uid);
        } catch (error) {
            console.error('Erro ao parsear token_payload:', error);
        }
    } else {
        console.error('token_payload encontrado no localStorage');
    }
});
