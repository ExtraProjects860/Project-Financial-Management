//requisições
export const getTokenAndUid = () => {
    const token_payload = localStorage.getItem('token_payload');
    if (token_payload) {
        return JSON.parse(token_payload);
    } else {
        console.error('token_payload não encontrado no localStorage');
        return null;
    }
};

const createAccountData = async (token, uid, newAccountData) => {
    try {
        const response = await fetch(`${URL_API}create-financial-accounts/${uid}`, {
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
            throw new Error(`Erro ao criar a subcategoria: ${errorData.message || 'Erro desconhecido'}`);
        }

        const data = await response.json();
        console.log('Subcategoria criada com sucesso:', data);

        location.reload();
    } catch (error) {
        console.error('Erro ao criar a subcategoria:', error);
    }
};

const renameTypeAccount = async (token, uid, typeAccount, newTypeAccount) => {
    try {
        const response = await fetch(`${URL_API}rename-type-account/${uid}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type_account: typeAccount,
                new_type_account: newTypeAccount
            }),
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Erro ao renomear o tipo de conta: ${errorData.message || 'Erro desconhecido'}`);
        }

        const data = await response.json();
        location.reload();
        console.log('Tipo de conta renomeado com sucesso:', data);
    } catch (error) {
        console.error('Erro ao renomear o tipo de conta:', error);
    }
};

const updateMetaTypeAccount = async (token, uid, typeAccount, newMeta) => {
    try {
        const response = await fetch(`${URL_API}update-meta-type-account/${uid}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type_account: typeAccount,
                new_meta: newMeta
            }),
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Erro ao atualizar a meta da conta: ${errorData.message || 'Erro desconhecido'}`);
        }

        const data = await response.json();
        console.log('Meta da conta atualizada com sucesso:', data);
        location.reload();
    } catch (error) {
        console.error('Erro ao atualizar a meta da conta:', error);
    }
};

const updateAccountData = async (token, uid, updatedData) => {
    try {
        const response = await fetch(`${URL_API}update-financial-accounts/${uid}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData),
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Erro ao atualizar a conta: ${errorData.message || 'Erro desconhecido'}`);
        }
        
        const data = await response.json();
        console.log('Conta atualizada com sucesso:', data);
    } catch (error) {
        console.error('Erro ao atualizar a conta:', error);
    }
};

const deleteAccountData = async (token, uid, typeAccount, nameAccount) => {
    try {
        const response = await fetch(`${URL_API}delete-financial-accounts/${uid}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type_account: typeAccount, 
                name_account: nameAccount
            }),
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Erro ao deletar a conta: ${errorData.message || 'Erro desconhecido'}`);
        }

        const data = await response.json();
        console.log('Conta deletada com sucesso:', data);

        location.reload();
    } catch (error) {
        console.error('Erro ao deletar a conta:', error);
    }
};


//handles
export const enableEditHeader = () => {
    const categoryInput = document.getElementById('category');
    const metaInput = document.getElementById('meta');
    const editButton = document.getElementById('edit-category-meta');
    const saveButton = document.getElementById('save-category-meta');
    const cancelButton = document.getElementById('cancel-category-meta');

    const initialHeaderValues = {
        category: categoryInput.value,
        meta: metaInput.value
    };

    if (categoryInput && metaInput) {
        categoryInput.disabled = false;
        metaInput.disabled = false;
    }

    editButton.classList.add('hidden');
    saveButton.classList.remove('hidden');
    cancelButton.classList.remove('hidden');

    cancelButton.onclick = () => {
        categoryInput.value = initialHeaderValues.category;
        metaInput.value = initialHeaderValues.meta;
        categoryInput.disabled = true;
        metaInput.disabled = true;

        saveButton.classList.add('hidden');
        cancelButton.classList.add('hidden');
        editButton.classList.remove('hidden');
    };
};

export const enableEdit = (account) => {
    const detailsElement = document.getElementById(`details-${account}`);
    if (detailsElement) {
        const inputs = detailsElement.querySelectorAll('input, textarea');
        const initialValues = {};
        inputs.forEach(input => {
            initialValues[input.id] = input.value;
            input.disabled = false;
        });

        const updateButton = detailsElement.querySelector('.btn-update-save');
        const deleteButton = detailsElement.querySelector('.btn-delete-cancel');

        updateButton.classList.add('btn-update');

        updateButton.textContent = 'Salvar';
        deleteButton.textContent = 'Cancelar';
        
        updateButton.onclick = () => {
            saveAccount(account);
            updateButton.classList.remove('btn-update');
        }
        deleteButton.onclick = () => {
            inputs.forEach(input => {
                input.value = initialValues[input.id];
                input.disabled = true;
            });
            
            updateButton.classList.remove('btn-update');
            updateButton.textContent = 'Atualizar';
            deleteButton.textContent = 'Deletar';

            updateButton.onclick = () => enableEdit(account);
            deleteButton.onclick = () => deleteAccount(account);
        };
    }
};

export const createAccount = async (account) => {
    console.log(`Criar nova subcategoria: ${account}`);

    const token_payload = getTokenAndUid();
    if (!token_payload) {
        console.error('Token ou UID não encontrados.');
        return;
    }

    const token = token_payload.token;
    const uid = token_payload.uid;

    const typeAccountElement = document.querySelector('#category').value;
    const detailsElement = document.getElementById(`details-${account}`);

    const newAccountData = {
        type_account: typeAccountElement,
        name_account: detailsElement.querySelector('#name-account-add').value,
        description: detailsElement.querySelector('#description-add').value,
        status: detailsElement.querySelector('#status-add').value,
        priority: detailsElement.querySelector('#priority-add').value,
        paymentDate: detailsElement.querySelector('#payment-date-add').value,
        price: parseFloat(detailsElement.querySelector('#price-add').value)
    };

    console.log('Dados a serem enviados:', newAccountData);

    try {
        await createAccountData(token, uid, newAccountData);
    } catch (error) {
        console.error('Erro ao criar a subcategoria:', error);
    }
};

export const saveHeader = async (category, meta) => {
    const token_payload = getTokenAndUid();
    if (!token_payload) {
        console.error('Token ou UID não encontrados.');
        return;
    }

    const token = token_payload.token;
    const uid = token_payload.uid;

    const categoryInput = document.getElementById('category');
    const metaInput = document.getElementById('meta');

    const newTypeAccount = categoryInput.value;
    const newMeta = parseFloat(metaInput.value);

    if (category !== newTypeAccount) {
        try {
            await renameTypeAccount(token, uid, category, newTypeAccount);
            console.log(`Nome da conta alterado de ${category} para ${newTypeAccount}`);
        } catch (error) {
            console.error('Erro ao renomear a conta:', error);
        }
    }

    if (meta !== newMeta) {
        try {
            await updateMetaTypeAccount(token, uid, category, newMeta);
            console.log(`Meta da conta alterada de ${meta} para ${newMeta}`);
        } catch (error) {
            console.error('Erro ao atualizar a meta da conta:', error);
        }
    }

    categoryInput.disabled = true;
    metaInput.disabled = true;

    const editButton = document.getElementById('edit-category-meta');
    const saveButton = document.getElementById('save-category-meta');
    const cancelButton = document.getElementById('cancel-category-meta');

    saveButton.classList.add('hidden');
    cancelButton.classList.add('hidden');
    editButton.classList.remove('hidden');
};

export const saveAccount = async (account) => {
    console.log(`Salvar conta: ${account}`);

    const token_payload = getTokenAndUid();
    if (!token_payload) {
        console.error('Token ou UID não encontrados.');
        return;
    }

    const token = token_payload.token;
    const uid = token_payload.uid;

    const detailsElement = document.getElementById(`details-${account}`);
    const typeAccountElement = document.querySelector('#category').value;

    const updatedData = {
        type_account: typeAccountElement,
        name_account: account,
        description: detailsElement.querySelector('#description-' + account).value,
        status: detailsElement.querySelector('#status-' + account).value,
        priority: detailsElement.querySelector('#priority-' + account).value,
        paymentDate: detailsElement.querySelector('#payment-date-' + account).value,
        price: parseFloat(detailsElement.querySelector('#price-' + account).value)
    };

    console.log('Dados a serem enviados:', updatedData);

    try {
        await updateAccountData(token, uid, updatedData);
        location.reload();
    } catch (error) {
        console.error('Erro ao atualizar a conta:', error);
    }
};

export const deleteAccount = async (account) => {
    console.log(`Deletar conta: ${account}`);

    const token_payload = getTokenAndUid();
    if (!token_payload) {
        console.error('Token ou UID não encontrados.');
        return;
    }

    const token = token_payload.token;
    const uid = token_payload.uid;

    const typeAccountElement = document.querySelector('#category').value;

    try {
        await deleteAccountData(token, uid, typeAccountElement, account);
    } catch (error) {
        console.error('Erro ao deletar a conta:', error);
    }
};

window.enableEdit = enableEdit;
window.enableEditHeader = enableEditHeader;
window.saveAccount = saveAccount;
window.deleteAccount = deleteAccount;
window.createAccount = createAccount;
window.saveHeader = saveHeader;
