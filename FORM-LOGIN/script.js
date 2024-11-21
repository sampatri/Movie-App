const form = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("password");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    if (checkForm()) {
        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();

        try {
            const response = await axios.post('http://localhost:8080/login', {
                email: emailValue,
                password: passwordValue
            });

            if (response.status === 200) {
                const token = response.data.token; // Assumindo que o backend retorna um token
                alert("Login realizado com sucesso!");

                // Armazena o token para autenticação futura
                localStorage.setItem("authToken", token);

                // Redireciona o usuário para a página Home
                window.location.href = "/home.html"; // Altere para a rota real da página
            }
        } catch (error) {
            if (error.response) {
                // Trata os erros retornados pelo backend
                if (error.response.status === 401) {
                    alert("Credenciais inválidas. Verifique seu e-mail e senha.");
                } else {
                    alert("Erro ao realizar login. Tente novamente.");
                }
            } else {
                console.error('Erro:', error);
                alert("Erro de conexão. Tente novamente mais tarde.");
            }
        }
    }
});


email.addEventListener("blur", checkInputEmail);
password.addEventListener("blur", checkInputPassword);

function checkInputEmail() {
    const emailValue = email.value.trim();

    if (emailValue === "") {
        errorInput(email, "O E-mail é obrigatório!");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        errorInput(email, "Por favor, insira um e-mail válido!");
    } else {
        clearError(email);
    }
}

function checkInputPassword() {
    const passwordValue = password.value.trim();

    if (passwordValue === "") {
        errorInput(password, "A senha é obrigatória!");
    } else if (passwordValue.length < 8) {
        errorInput(password, "A senha deve ter pelo menos 8 caracteres!");
    } else {
        clearError(password);
    }
}

function checkForm() {
    checkInputEmail();
    checkInputPassword();

    const formItems = form.querySelectorAll(".form-content");
    const isValid = [...formItems].every(item => !item.classList.contains("error"));

    return isValid;
}

function errorInput(input, message) {
    const formItem = input.parentElement;
    const textMessage = formItem.querySelector("a");

    textMessage.innerText = message;
    formItem.classList.add("error");
}

function clearError(input) {
    const formItem = input.parentElement;
    formItem.classList.remove("error");
    const textMessage = formItem.querySelector("a");
    textMessage.innerText = "";
}
