// Função para mostrar ou ocultar os campos de endereço do passaporte
function togglePassportAddressFields() {
    var radioButton = document.getElementById("passportAddressNo");
    toggleFields(radioButton, "passportAddressFields", "block");
    toggleFields(radioButton, "passportCareOf", "none");
}



// Função para formatar números de telefone enquanto o usuário digita
function formatPhoneNumber(input) {
    // Remove todos os caracteres não numéricos
    var phoneNumber = input.value.replace(/\D/g, '');

    // Verifica o comprimento do número de telefone para aplicar a formatação apropriada
    if (phoneNumber.length === 11) {
        // Formato para números de celular: (99) 99999-9999
        phoneNumber = phoneNumber.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (phoneNumber.length === 10) {
        // Formato para números de telefone fixo: (99) 9999-9999
        phoneNumber = phoneNumber.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    } else {
        // Retorno padrão se o número de telefone não estiver completo
        return phoneNumber;
    }

    // Atualiza o valor do campo de entrada com o número de telefone formatado
    input.value = phoneNumber;
}

// Adiciona um listener de evento de entrada para cada campo de número de telefone
document.getElementById("homePhone").addEventListener("input", function () {
    formatPhoneNumber(this);
});

document.getElementById("cellPhone").addEventListener("input", function () {
    formatPhoneNumber(this);
});

document.getElementById("workPhone").addEventListener("input", function () {
    formatPhoneNumber(this);
});

document.getElementById("additionalPhones").addEventListener("input", function () {
    formatPhoneNumber(this);
});

document.getElementById("phoneUS").addEventListener("input", function () {
    formatPhoneNumber(this);
});


// Declaração da variável contPhones
var contPhones = 0;

// Função para mostrar ou ocultar os telefones adicionais
function toggleAdditionalPhones() {
    var radioButton = document.getElementById("usedOtherPhonesYes");
    toggleFields(radioButton, "additionalPhones", "block");

    if (contPhones === 0) {
        addAdditionalPhone();
    }

    // Remove a mensagem de aviso, se existir
    const errorDiv = document.getElementById('error-tel-message');
    errorDiv.textContent = "";
    errorDiv.style.display = 'none';
}

// Função para adicionar um novo campo de número de telefone adicional
function addAdditionalPhone() {
    contPhones++;

    // Remove a mensagem de aviso, se existir
    const errorDiv = document.getElementById('error-tel-message');
    errorDiv.textContent = "";
    errorDiv.style.display = 'none';

    // Obtém o elemento container para adicionar os telefones
    var additionalPhonesContainer = document.getElementById("additionalPhonesContainer");

    // Cria um novo campo de número de telefone
    var newPhoneField = document.createElement("div");
    newPhoneField.innerHTML = `
            
        <fieldset class="fieldset-g2">

            <div class="index" style="position: relative; margin: 0 auto; bottom:9px; width: 25px; height: 25px; text-align: center; border-radius: 50%; background-color: #007bff; color: #fff; line-height: 25px; font-size: 1.2em;">${contPhones}</div>
    
            <div class="input-wrapper">
                <input type="tel" class="custom-input" id="cellPhone" name="cellPhone" placeholder="">
                <label for="cellPhone" class="custom-label">Telefone/Celular</label>
            </div>

        </fieldset>
     `;

    // Adiciona o novo campo de telefone ao container
    additionalPhonesContainer.appendChild(newPhoneField);
}

// Função para remover o último campo de número de telefone adicionado
function removeLastAdditionalPhone() {
    // Obtém o elemento container dos telefones adicionais
    var additionalPhonesContainer = document.getElementById("additionalPhonesContainer");

    // Verifica se há mais de um campo de telefone
    if (contPhones > 1) {
        // Remove o último filho (último campo de telefone adicionado)
        additionalPhonesContainer.removeChild(additionalPhonesContainer.lastChild);
        // Decrementa o contador de telefones
        contPhones--;
    } else {
        // Exibe uma mensagem de erro informando que é necessário manter pelo menos um campo de telefone
        var errorTelMessage = document.getElementById("error-tel-message");
        errorTelMessage.textContent = "É necessário manter pelo menos um campo de número de telefone.";
        errorTelMessage.style.display = "block"; // Exibe a mensagem de erro

        // Oculta a mensagem após alguns segundos (opcional)
        setTimeout(function() {
            errorTelMessage.textContent = ""; // Limpa o conteúdo da mensagem
            errorTelMessage.style.display = "none"; // Oculta a mensagem
        }, 5000); // Tempo em milissegundos (5 segundos)
    }
}



let contEmails = 0;

function toggleAdditionalEmails() {
    var radioButton = document.getElementById("usedOtherEmailsYes");
    toggleFields(radioButton, "additionalEmails", "block");

    if (contEmails === 0) {
        addAdditionalEmail();
    }
    // Remove a mensagem de aviso, se existir
    const errorDiv = container.querySelector('.error-email');
    errorDiv.textContent = "";
    errorDiv.style.display = 'none';
}

// Função para adicionar um novo campo de e-mail adicional
function addAdditionalEmail() {
    // Remove a mensagem de erro, se existir
    const container = document.querySelector("#additionalEmails");
    const errorDiv = container.querySelector('.error-email');
    if (errorDiv) {
        errorDiv.textContent = "";
        errorDiv.style.display = 'none';
    }

    // Incrementa o contador de e-mails
    contEmails++;

    // Obtém o container para adicionar o novo campo de e-mail
    const additionalEmailContainer = document.querySelector(".additional-email-container");

    // Cria um novo campo de e-mail adicional usando template strings
    const newEmailField = document.createElement("div");
    newEmailField.innerHTML = `
        <fieldset class="fieldset-g2">

            <div class="index" style="position: relative; margin: 0 auto; bottom: 9px; width: 25px; height: 25px; text-align: center; border-radius: 50%; background-color: #007bff; color: #fff; line-height: 25px; font-size: 1.2em;">${contEmails}</div>
    
            <div class="input-wrapper">
                <input type="email" class="custom-input" id="additionalEmail_${contEmails}" name="additionalEmail_${contEmails}" placeholder="">
                <label for="additionalEmail_${contEmails}" class="custom-label">E-mail adicional</label>
            </div>

        </fieldset>
    `;

    // Adiciona o novo campo de e-mail ao container
    additionalEmailContainer.appendChild(newEmailField);
}

function removeLastAdditionalEmail() {
    // Obtém o container que contém os campos de e-mail adicionais
    var container = document.querySelector("#additionalEmails");

    // Obtém todos os campos de e-mail adicionais dentro do container
    var additionalEmailInputs = container.querySelectorAll('.additional-email');

    // Verifica se há mais de um campo de e-mail adicional para garantir que não removemos todos
    if (additionalEmailInputs.length > 1) {
        // Remove o último campo de e-mail adicional
        var lastEmailField = additionalEmailInputs[additionalEmailInputs.length - 1];
        container.querySelector('.additional-email-container').removeChild(lastEmailField);
        contEmails--; // Decrementa o contador de campos de e-mail
    } else {
        // Exibe a mensagem de erro se houver apenas um campo de e-mail adicional
        const errorDiv = container.querySelector('.error-email');
        errorDiv.textContent = "É necessário manter pelo menos um e-mail.";
        errorDiv.style.display = 'block';

         // Oculta a mensagem após alguns segundos (opcional)
         setTimeout(function() {
            errorDiv.textContent = ""; // Limpa o conteúdo da mensagem
            errorDiv.style.display = "none"; // Oculta a mensagem
        }, 5000); // Tempo em milissegundos (5 segundos)
    }
}


