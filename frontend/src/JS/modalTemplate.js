import { enableEditHeader } from '../SERVICES/expensesByCategory/modalService.js';

export const createModalTemplate = (category, meta, accounts) => {
    const accountsEntries = Object.entries(accounts);
    console.log(category);

    return `
    <div class="modal-container">
        <div class="modalContent">
            <div class="modalHeader">
                <div class="inner-modalHeader">
                    <input type="text" id="category" value="${category}" disabled />
                    <div>
                        <span>Meta: </span> 
                        <input type="number" id="meta" value="${meta}" disabled />
                    </div>
                    <button class="editHeader" id="edit-category-meta" onclick="enableEditHeader('${category}', '${meta}')"><i class="bi bi-pencil-fill"></i></button>
                    <button class="saveHeader hidden" id="save-category-meta" onclick="saveHeader('${category}', '${meta}')"><i class="bi bi-check-square-fill"></i></button>
                    <button class="cancelHeader hidden" id="cancel-category-meta"><i class="bi bi-x-square-fill"></i></button>
                </div>
                <button class="close-modal" onclick="closeModal()"><i class="bi bi-x"></i></button>
            </div>
            <div class="modalBody">
                <div class="accountItem">
                    <div class="account-header">
                        <span>Add</span>
                        <button class="toggle-account" onclick="toggleAccount('add')">
                            <i class="bi bi-plus-lg"></i>
                        </button>
                    </div>
                    <div class="account-details hidden" id="details-add">
                            <div class="inner-account-details">
                                <div class="formRow">
                                    <label for="name-account-add">Nome</label>
                                    <input type="text" id="name-account-add" />
                                </div>
                            </div>
                            <div class="inner-account-details">
                                <div class="formRow">
                                    <label for="description-add">Descrição</label>
                                    <textarea id="description-add"></textarea>
                                </div>
                                <div class="formRow">
                                    <label for="payment-date-add">Data de Pagamento</label>
                                    <input type="date" id="payment-date-add" />
                                </div>
                                <div class="formRow">
                                    <label for="price-add">Preço</label>
                                    <input type="number" id="price-add" />
                                </div>
                                <div class="formRow">
                                    <label for="priority-add">Prioridade</label>
                                    <input type="text" id="priority-add" />
                                </div>
                                <div class="formRow">
                                    <label for="status-add">Status</label>
                                    <input type="text" id="status-add" />
                                </div>
                            </div>
                            <div class="actionButtons">
                                <button class="btn-create" onclick="createAccount('add')">Criar</button>
                                <button class="btn-cancel" onclick="toggleAccount('add')">Cancelar</button>
                            </div>
                        </div>
                </div>
                ${accountsEntries.map(([account, details]) => `
                    <div class="accountItem">
                        <div class="account-header">
                            <span>${account}</span>
                            <button class="toggle-account" onclick="toggleAccount('${account}')">
                                <i class="bi bi-chevron-down"></i>
                            </button>
                        </div>
                        <div class="account-details hidden" id="details-${account}">
                            <div class="inner-account-details">
                                <div class="formRow">
                                    <label for="description-${account}">Descrição</label>
                                    <textarea id="description-${account}" value="${details.description}" disabled>${details.description}</textarea>
                                </div>
                                <div class="formRow">
                                    <label for="payment-date-${account}">Data de Pagamento</label>
                                    <input type="date" id="payment-date-${account}" value="${details.paymentDate}" disabled />
                                </div>
                                <div class="formRow">
                                    <label for="price-${account}">Preço</label>
                                    <input type="number" id="price-${account}" value="${details.price}" disabled />
                                </div>
                                <div class="formRow">
                                    <label for="priority-${account}">Prioridade</label>
                                    <input type="text" id="priority-${account}" value="${details.priority}" disabled />
                                </div>
                                <div class="formRow">
                                    <label for="status-${account}">Status</label>
                                    <input type="text" id="status-${account}" value="${details.status}" disabled />
                                </div>
                            </div>
                            <div class="actionButtons">
                                <button class="btn-update-save" onclick="enableEdit('${account}')">Atualizar</button>
                                <button class="btn-delete-cancel" onclick="deleteAccount('${account}')">Deletar</button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </div>
    `;
};

export const showModal = (category, meta, accounts) => {
    const modalHTML = createModalTemplate(category, meta, accounts);
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.querySelector('.modal-container').style.display = 'flex';

    window.saveAccount = (account) => saveAccount(account);
};

export const closeModal = () => {
    const modalContainer = document.querySelector('.modal-container');
    if (modalContainer) {
        modalContainer.remove();
    }
};

export const toggleAccount = (account) => {
    const detailsElement = document.getElementById(`details-${account}`);
    if (detailsElement) {
        detailsElement.classList.toggle('hidden');
    }
};

window.createModalTemplate = createModalTemplate;
window.closeModal = closeModal;
window.toggleAccount = toggleAccount;