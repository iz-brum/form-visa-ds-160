// Função para mostrar ou ocultar os campos relacionados ao endereço de envio do passaporte
function togglePassportAddressFields() {
    var radioButton = document.getElementById("endereco_passaporte_nao");
    toggleFields(radioButton, "campos_endereco_passaporte", "block");
    toggleFields(radioButton, "responsavel_endereco_passaporte", "none");
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
document.getElementById("telefone_residencial").addEventListener("input", function () {
    formatPhoneNumber(this);
});

document.getElementById("telefone_celular").addEventListener("input", function () {
    formatPhoneNumber(this);
});

document.getElementById("telefone_trabalho").addEventListener("input", function () {
    formatPhoneNumber(this);
});

document.getElementById("telefones_Adicionais").addEventListener("input", function () {
    formatPhoneNumber(this);
});

document.getElementById("telefone_us").addEventListener("input", function () {
    formatPhoneNumber(this);
});


// Declaração da variável contPhones
var contPhones = 0;

// Função para mostrar ou ocultar os telefones adicionais
function toggleAdditionalPhones() {
    var radioButton = document.getElementById("usou_Outros_Telefones_Sim");
    toggleFields(radioButton, "telefones_Adicionais", "block");

    if (contPhones === 0) {
        addAdditionalPhone();
    }

    // Remove a mensagem de aviso, se existir
    const errorDiv = document.getElementById('mensagem_erro_telefone');
    errorDiv.textContent = "";
    errorDiv.style.display = 'none';
}

// Função para adicionar um novo campo de número de telefone adicional
function addAdditionalPhone() {
    contPhones++;

    // Remove a mensagem de aviso, se existir
    const errorDiv = document.getElementById('mensagem_erro_telefone');
    errorDiv.textContent = "";
    errorDiv.style.display = 'none';

    // Obtém o elemento container para adicionar os telefones
    var telefones_adicionais_container = document.getElementById("telefones_adicionais_container");

    // Cria um novo campo de número de telefone
    var newPhoneField = document.createElement("div");
    newPhoneField.innerHTML = `
            
        <fieldset class="conjunto_campos_g2">

            <div class="indice" style="position: relative; margin: 0 auto; bottom:9px; width: 25px; height: 25px; text-align: centro; border-radius: 50%; background-color: #007bff; color: #fff; line-height: 25px; font-size: 1.2em;">${contPhones}</div>
    
            <div class="envoltura_input">
                <input type="tel" class="input_personalizado" id="telefone_celular" name="telefone_celular" placeholder="">
                <label for="telefone_celular" class="rotulo_personalizado">Telefone/Celular</label>
            </div>

        </fieldset>
     `;

    // Adiciona o novo campo de telefone ao container
    telefones_adicionais_container.appendChild(newPhoneField);
}

// Função para remover o último campo de número de telefone adicionado
function removeLastAdditionalPhone() {
    // Obtém o elemento container dos telefones adicionais
    var telefones_adicionais_container = document.getElementById("telefones_adicionais_container");

    // Verifica se há mais de um campo de telefone
    if (contPhones > 1) {
        // Remove o último filho (último campo de telefone adicionado)
        telefones_adicionais_container.removeChild(telefones_adicionais_container.lastChild);
        // Decrementa o contador de telefones
        contPhones--;
    } else {
        // Exibe uma mensagem de erro informando que é necessário manter pelo menos um campo de telefone
        var errorTelMessage = document.getElementById("mensagem_erro_telefone");
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
    var radioButton = document.getElementById("usou_outros_emails_sim");
    toggleFields(radioButton, "emails_adicionais", "block");

    if (contEmails === 0) {
        addAdditionalEmail();
    }
    // Remove a mensagem de aviso, se existir
    const errorDiv = container.querySelector('.erro_email');
    errorDiv.textContent = "";
    errorDiv.style.display = 'none';
}

// Função para adicionar um novo campo de e-mail adicional
function addAdditionalEmail() {
    // Remove a mensagem de erro, se existir
    const container = document.querySelector("#emails_adicionais");
    const errorDiv = container.querySelector('.erro_email');
    if (errorDiv) {
        errorDiv.textContent = "";
        errorDiv.style.display = 'none';
    }

    // Incrementa o contador de e-mails
    contEmails++;

    // Obtém o container para adicionar o novo campo de e-mail
    const additionalEmailContainer = document.querySelector(".container_email_adicional");

    // Cria um novo campo de e-mail adicional usando template strings
    const newEmailField = document.createElement("div");
    newEmailField.innerHTML = `
        <fieldset class="conjunto_campos_g2">

            <div class="indice" style="position: relative; margin: 0 auto; bottom: 9px; width: 25px; height: 25px; text-align: centro; border-radius: 50%; background-color: #007bff; color: #fff; line-height: 25px; font-size: 1.2em;">${contEmails}</div>
    
            <div class="envoltura_input">
                <input type="email" class="input_personalizado" id="email_adicional_${cont_emails}" name="email_adicional_${cont_emails}" placeholder="">
                <label for="email_adicional_${cont_emails}" class="rotulo_personalizado">E-mail adicional</label>
            </div>

        </fieldset>
    `;

    // Adiciona o novo campo de e-mail ao container
    additionalEmailContainer.appendChild(newEmailField);
}

function removeLastAdditionalEmail() {
    // Obtém o container que contém os campos de e-mail adicionais
    var container = document.querySelector("#emails_adicionais");

    // Obtém todos os campos de e-mail adicionais dentro do container
    var additionalEmailInputs = container.querySelectorAll('.additional-email');

    // Verifica se há mais de um campo de e-mail adicional para garantir que não removemos todos
    if (additionalEmailInputs.length > 1) {
        // Remove o último campo de e-mail adicional
        var lastEmailField = additionalEmailInputs[additionalEmailInputs.length - 1];
        container.querySelector('.container_email_adicional').removeChild(lastEmailField);
        contEmails--; // Decrementa o contador de campos de e-mail
    } else {
        // Exibe a mensagem de erro se houver apenas um campo de e-mail adicional
        const errorDiv = container.querySelector('.erro_email');
        errorDiv.textContent = "É necessário manter pelo menos um e-mail.";
        errorDiv.style.display = 'block';

         // Oculta a mensagem após alguns segundos (opcional)
         setTimeout(function() {
            errorDiv.textContent = ""; // Limpa o conteúdo da mensagem
            errorDiv.style.display = "none"; // Oculta a mensagem
        }, 5000); // Tempo em milissegundos (5 segundos)
    }
}


