const form = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("password");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    checkForm();
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

    if (isValid) {
        fetch("https://suaapi.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                email: email.value.trim(), 
                password: password.value.trim()
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Login bem-sucedido!");
                window.location.href = "/home";
            } else {
                alert("Credenciais inválidas.");
            }
        })
        .catch(error => console.error("Erro ao autenticar:", error));
    }
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
