// Inicializa o contador de campos de redes sociais
var contSocialMedia = 0;

/**
 * Alterna a visibilidade dos campos de mídia social
 */
function toggleSocialMediaInput() {
    var radioButton = document.getElementById("socialMediaYes");
    toggleFields(radioButton, "socialMediaInput", "block");

    if (contSocialMedia === 0) {
        addSocialMediaField();
    }

    // Limpa a mensagem de aviso, se existir
    const errorDiv = document.querySelector('.error-socialMedia');
    errorDiv.textContent = "";
    errorDiv.style.display = 'none';
}

// Função para adicionar um novo campo de mídia social adicional
function addSocialMediaField() {
    const additionalSocialMediaContainer = document.querySelector(".additional-socialMedia-container");
    const errorDiv = document.querySelector('.error-socialMedia');

    // Limpa a mensagem de erro, se existir
    if (errorDiv) {
        errorDiv.textContent = "";
        errorDiv.style.display = 'none';
    }

    if (additionalSocialMediaContainer) {
        contSocialMedia++;

        // Cria um novo campo de mídia social adicional usando template strings
        const newSocialMediaField = document.createElement("div");
        newSocialMediaField.classList.add("additional-socialMedia"); // Adiciona uma classe específica ao novo campo
        newSocialMediaField.innerHTML = `
            <fieldset class="fieldset-g2">
                <div class="index" style="position: relative; margin: 0 auto; bottom: 9px; width: 25px; height: 25px; text-align: center; border-radius: 50%; background-color: #007bff; color: #fff; line-height: 25px; font-size: 1.2em;">${contSocialMedia}</div>
                
                <div class="input-wrapper">
                    <input type="text" class="custom-input" id="additionalSocialMedia_${contSocialMedia}" name="additionalSocialMedia_${contSocialMedia}" placeholder="">
                    <label for="additionalSocialMedia_${contSocialMedia}" class="custom-label">Rede social</label>
                </div>

                <div class="input-wrapper">
                    <input type="text" class="custom-input" id="additionalSocialMediaUser_${contSocialMedia}" name="additionalSocialMediaUser_${contSocialMedia}" placeholder="">
                    <label for="additionalSocialMediaUser_${contSocialMedia}" class="custom-label">Nome de usuário</label>
                </div>
            </fieldset>
        `;

        // Adiciona o novo campo de mídia social ao container
        additionalSocialMediaContainer.appendChild(newSocialMediaField);
    }
}

/**
 * Remove o último campo de mídia social adicionado
 */
function removeLastSocialMediaField() {
    const additionalSocialMediaContainer = document.querySelector(".additional-socialMedia-container");
    const errorDiv = document.querySelector('.error-socialMedia');

    if (additionalSocialMediaContainer) {
        const additionalSocialMediaFields = document.querySelectorAll(".additional-socialMedia");

        if (additionalSocialMediaFields.length > 1) {
            // Remove o último campo de mídia social adicionado
            additionalSocialMediaContainer.removeChild(additionalSocialMediaFields[additionalSocialMediaFields.length - 1]);
            contSocialMedia--; // Decrementa o contador de campos de mídias sociais
        } else {
            // Exibe a mensagem de erro se houver apenas um campo de mídia social
            errorDiv.textContent = "É necessário manter pelo menos uma rede social.";
            errorDiv.style.display = 'block';

            // Oculta a mensagem após alguns segundos (opcional)
            setTimeout(function () {
                errorDiv.textContent = ""; // Limpa o conteúdo da mensagem
                errorDiv.style.display = "none"; // Oculta a mensagem
            }, 5000); // Tempo em milissegundos (5 segundos)
        }
    }
}