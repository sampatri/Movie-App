const form = document.getElementById("form");
const username = document.getElementById("username");
const useremail = document.getElementById("email");
const userpassword = document.getElementById("password");
const passwordConfirmation = document.getElementById("password-confirmation");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    // Checa o formulário antes de enviar a requisição
    if (checkForm()) {
        const name = username.value;
        const email = useremail.value;
        const password = userpassword.value;

        // Envia a requisição de cadastro para o backend usando axios
        axios.post('http://localhost:8080/register', {
            name: name,
            email: email,
            password: password
        })
        .then(response => {
            if (response.status === 201) {
                alert("Usuário cadastrado com sucesso. Faça login.");
                document.getElementById('form').reset(); // Reseta o formulário
            }
        })
        .catch(error => {
            if (error.response) {
                if (error.response.status === 409) {
                    alert("Usuário já cadastrado. Faça login.");
                } else if (error.response.status === 400) {
                    alert("Erro inesperado, tente novamente.");
                }
            } else {
                console.error('Erro:', error);
                alert("Erro de conexão. Tente novamente mais tarde.");
            }
        });
    }
});

email.addEventListener("blur", () => {
    checkInputEmail();
})

username.addEventListener("blur", () => {
    checkInputUsername();
})

function checkInputUsername() {
    const usernameValue = username.value;

    if (usernameValue === "" || usernameValue.length < 3) {
        errorInput(username, "Nome de Usuário é obrigatório e deve conter mais de três dígitos.");
    } else {
        const formItem = username.parentElement;
        formItem.className = "form-content";
    }
}

function checkInputEmail() {
    const emailValue = email.value;

    if (emailValue === "") {
        errorInput(email, "O E-mail é obrigatório!");
    } else {
        const formItem = email.parentElement;
        formItem.className = "form-content";
    }
}

function checkInputPassword() {
    const passwordValue = password.value;  

    if (passwordValue === "") {
        errorInput(password, "A senha é obrigatória!");
    } else if (passwordValue.length < 8) {  
        errorInput(password, "A senha deve ter pelo menos 8 caracteres!");
    } else {
        const formItem = password.parentElement;
        formItem.className = "form-content";
    }
}

function checkInputPasswordConfirmation() {
    const passwordValue = password.value;
    const confirmationPasswordValue = passwordConfirmation.value;  

 if(confirmationPasswordValue === ""){
    errorInput(passwordConfirmation, "A confirmação de senha é obrigatória!")
 }else if(confirmationPasswordValue !== passwordValue){
    errorInput(passwordConfirmation, "As senhas não são iguais!")
 }else{
    const formItem = passwordConfirmation.parentElement;
    formItem.className = "form-content"
 }   
}

function checkForm() {
    checkInputUsername();
    checkInputEmail();
    checkInputPassword();
    checkInputPasswordConfirmation();

    // Verifica se todos os campos estão válidos
    const formItems = form.querySelectorAll(".form-content");
    const isValid = [...formItems].every((item) => {
        return !item.classList.contains("error");
    });

    if (!isValid) {
        alert("Dados inválidos, tente novamente.");
    }

    return isValid; // Retorna true se todos os campos forem válidos
}

function errorInput(input, message) {
    const formItem = input.parentElement;
    const textMessage = formItem.querySelector("a");

    textMessage.innerText = message;
    formItem.className = "form-content error";
}
