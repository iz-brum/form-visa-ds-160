// Inicializa o contador de campos de redes sociais
var cont_social_media = 0;

/**
 * Alterna a visibilidade dos campos de mídia social
 */
function toggleSocialMediaInput() {
    var radioButton = document.getElementById("rede_social_sim");
    toggleFields(radioButton, "entrada_rede_social", "block");

    if (cont_social_media === 0) {
        addSocialMediaField();
    }

    // Limpa a mensagem de aviso, se existir
    const errorDiv = document.querySelector('.erro_rede_social');
    errorDiv.textContent = "";
    errorDiv.style.display = 'none';
}

// Função para adicionar um novo campo de mídia social adicional
function addSocialMediaField() {
    const additionalSocialMediaContainer = document.querySelector(".container_rede_social_adicional");
    const errorDiv = document.querySelector('.erro_rede_social');

    // Limpa a mensagem de erro, se existir
    if (errorDiv) {
        errorDiv.textContent = "";
        errorDiv.style.display = 'none';
    }

    if (additionalSocialMediaContainer) {
        cont_social_media++;

        // Cria um novo campo de mídia social adicional usando template strings
        const newSocialMediaField = document.createElement("div");
        newSocialMediaField.classList.add("additional-socialMedia"); // Adiciona uma classe específica ao novo campo
        newSocialMediaField.innerHTML = `
            <fieldset class="conjunto_campos_g2">
                <div class="indice" style="position: relative; margin: 0 auto; bottom: 9px; width: 25px; height: 25px; text-align: centro; border-radius: 50%; background-color: #007bff; color: #fff; line-height: 25px; font-size: 1.2em;">${cont_social_media}</div>
                
                <div class="envoltura_input">
                    <input type="text" class="input_personalizado" id="rede_social_adicional_${cont_social_media}" name="rede_social_adicional_${cont_social_media}" placeholder="">
                    <label for="rede_social_adicional_${cont_social_media}" class="rotulo_personalizado">Rede social</label>
                </div>

                <div class="envoltura_input">
                    <input type="text" class="input_personalizado" id="usuario_adicional_rede_social_${cont_social_media}" name="usuario_adicional_rede_social_${cont_social_media}" placeholder="">
                    <label for="usuario_adicional_rede_social_${cont_social_media}" class="rotulo_personalizado">Nome de usuário</label>
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
    const additionalSocialMediaContainer = document.querySelector(".container_rede_social_adicional");
    const errorDiv = document.querySelector('.erro_rede_social');

    if (additionalSocialMediaContainer) {
        const additionalSocialMediaFields = document.querySelectorAll(".additional-socialMedia");

        if (additionalSocialMediaFields.length > 1) {
            // Remove o último campo de mídia social adicionado
            additionalSocialMediaContainer.removeChild(additionalSocialMediaFields[additionalSocialMediaFields.length - 1]);
            cont_social_media--; // Decrementa o contador de campos de mídias sociais
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