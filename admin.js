
const form = document.getElementById('Formulario');
const userList = document.getElementById('lista');
const searchInput = document.getElementById('Pesquisa');
const clearBtn = document.getElementById('Limpar');
const submitBtn = document.getElementById('Cadastro');

let userData = [];

//função para adcionar as informações na lista e no formulario
function addUserToList(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const userDataObj = {
        id: Date.now(),
        name,
        email,
        date: new Date().toLocaleDateString()
    };
    userData.push(userDataObj);
    localStorage.setItem('users', JSON.stringify(userData));
    renderUserList();
    form.reset();
}

//escolher os cadastradas e excluir eles
function removeUserFromList(id) {
    userData = userData.filter(user => user.id !== id);
    localStorage.setItem('users', JSON.stringify(userData));
    renderUserList();
}

//excluir todos os cadastros da lista
function clearUserList() {
    userData = [];
    localStorage.removeItem('users');
    renderUserList();
}

//pesquisar por cadastros especificos que estao na lista
function searchUsers(event) {
    const searchTerm = event.target.value.toLowerCase();
    const filteredUsers = userData.filter(user => {
        return user.name.toLowerCase().includes(searchTerm) || user.email.toLowerCase().includes(searchTerm);
    });
    renderUserList(filteredUsers);
}

//fazer a limpeza dos campos que foram preenchidos
function clearForm() {
    form.reset();
}

//mostrar a lista com as informações dos cadastros
function renderUserList(users = userData) {
    userList.innerHTML = '';
    users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = `${user.date} - ${user.name} (${user.email})`;
        listItem.dataset.id = user.id;
        userList.appendChild(listItem);
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Excluir';
        removeBtn.addEventListener('click', () => removeUserFromList(user.id));
        listItem.appendChild(removeBtn);
    });
}

//criar os eventos nos botoes
submitBtn.addEventListener('click', addUserToList);
clearBtn.addEventListener('click', clearForm);
searchInput.addEventListener('input', searchUsers);

//salvas a lista no localhost
userData = JSON.parse(localStorage.getItem('users')) || [];
renderUserList();