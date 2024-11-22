const loginButton = document.getElementById('login-button');
const createAccountButton = document.getElementById('create-account-button');

loginButton.addEventListener('click', () => {
    console.log('Botão de Login clicado.');
    alert('Bem-vindo de volta! Faça seu login.');
});

createAccountButton.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('Link "Criar Conta" clicado.');
    alert('Redirecionando para a página de cadastro.');
});
