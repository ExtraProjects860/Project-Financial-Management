
document.addEventListener('DOMContentLoaded', () => {
    const userData = JSON.parse(localStorage.getItem('data_user'));

    if(userData) {
        for (const [key, value] of Object.entries(userData)) {
            if (!value) {
                continue;
            }
            const element = document.getElementById(key);
            if (element) {
                element.value = value;
            } else {
                console.warn(`Element with ID '${key}' not found.`);
            }
        }
        const nameElement = document.getElementById('nameDashBoard');
        if (nameElement && userData.name) {
            nameElement.textContent = `Bem vindo, ${userData.name}`;
        }
    } else {
        console.warn('No user data found in localStorage.');
    }
});