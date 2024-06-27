// Informações sobre Viagens Anteriores aos EUA - Funções Relacionadas


// Função para mostrar ou ocultar os campos relacionados às informações do visto
function showVisaInfoFields() {
    var radioButtonSim = document.getElementById("tem_visto_americano_sim");
    var radioButtonNao = document.getElementById("tem_visto_americano_nao");

    // Verifique se os radio buttons existem
    if (radioButtonSim && radioButtonNao) {
        // Mostrar o campo se "Sim" estiver selecionado, esconder se "Não" estiver selecionado
        if (radioButtonSim.checked) {
            toggleFields(radioButtonSim, "campos_informacao_visto", "block");
        } else if (radioButtonNao.checked) {
            toggleFields(radioButtonNao, "campos_informacao_visto", "none");
        }
    } else {
        console.error('Radio buttons para visto americano não encontrados.');
    }
}


// Função para mostrar ou ocultar o campo de entrada do ano relacionado a vistos roubados ou perdidos
function toggleYearInputForLostOrStolenVisa() {
    var radioButtonSim = document.getElementById("visto_anterior_perdido_sim");
    var radioButtonNao = document.getElementById("visto_anterior_perdido_nao");

    // Verifique se os radio buttons existem
    if (radioButtonSim && radioButtonNao) {
        // Mostrar o campo se "Sim" estiver selecionado, esconder se "Não" estiver selecionado
        if (radioButtonSim.checked) {
            toggleFields(radioButtonSim, "ano_perda_visto_container", "block");
        } else if (radioButtonNao.checked) {
            toggleFields(radioButtonNao, "ano_perda_visto_container", "none");
        }
    } else {
        console.error('Radio buttons para vistos roubados ou perdidos não encontrados.');
    }
}

// Função para mostrar ou ocultar os detalhes relacionados a vistos cancelados ou revogados
function toggleVisaCanceledDetails() {
    var radioButton = document.getElementById("visaCanceledYes");
    toggleFields(radioButton, "visaCanceledDetails", "block");
}


let visitaCount = 0;

function toggleVisitFields() {
    const radioButton = document.getElementById("visitaou_eua_sim");
    const visitaFields = document.getElementById("campos_visitaa");
    const visitaMessages = document.getElementById("mensagens_visitaa");

    toggleFields(radioButton, "campos_visitaa", "block");

    if (visitaCount === 0 && visitaFields.style.display === "block") {
        addVisit();
    }

    visitaMessages.innerHTML = ''; // Limpa todas as mensagens
}


function addVisit() {
    const MAX_VISITS = 5;

    if (visitaCount < MAX_VISITS) {
        visitaCount++;
        const idSuffix = `_${visitaCount}`;
        const visitaMessages = document.getElementById("mensagens_visitaa");
        visitaMessages.innerHTML = ''; // Limpa todas as mensagens

        const newVisitHTML = `
            <fieldset class="conjunto_campos_g2">
                <div class="indice"
                    style="position: relative; margin: 0 auto; bottom:9px; width: 25px; height: 25px; text-align: centro; border-radius: 50%; background-color: #007bff; color: #fff; line-height: 25px; font-size: 1.2em;">
                    ${visitaCount}</div>

                <div class="container_input_data">
                    <label for="data_entrada_${id_suffix}">Data de entrada:</label>
                    <input type="date" id="data_entrada_${id_suffix}" name="data_entrada_${id_suffix}">
                </div>

                <div class="container_input_data">
                    <label for="data_saida_${id_suffix}">Data de saída:</label>
                    <input type="date" id="data_saida_${id_suffix}" name="data_saida_${id_suffix}">
                </div>
            </fieldset>
        `;

        const visitaContainer = document.getElementById('conta_visitaas');
        visitaContainer.insertAdjacentHTML('beforeend', newVisitHTML);
    } else {
        const visitaMessages = document.getElementById('mensagens_visitaa');
        visitaMessages.innerHTML = '<p>Você atingiu o limite máximo de visitaas.</p>';
    }
}

function removeLastVisit() {
    const visitaContainer = document.getElementById('conta_visitaas');
    const visitaMessages = document.getElementById('mensagens_visitaa');
    visitaMessages.innerHTML = ''; // Limpa todas as mensagens

    if (visitaCount > 1) {
        visitaContainer.removeChild(visitaContainer.lastElementChild);
        visitaCount--;
    } else {
        const auxvisitaMessages = document.createElement('p');
        auxvisitaMessages.innerHTML = '<strong>Você deve manter pelo menos uma visitaa.</strong>';
        auxvisitaMessages.style.color = 'red'; // Cor vermelha
        visitaMessages.appendChild(auxvisitaMessages);
    }
}



let americanLicenseCount = 0;

function toggleAmericanLicenseFields() {
    const radioButton = document.getElementById("possui_carteira_americana_sim");
    const americanLicenseFields = document.getElementById("campos_carteira_americana");
    const licenseMessages = document.getElementById("mensagens_carteira");

    toggleFields(radioButton, "campos_carteira_americana", "block");

    if (americanLicenseCount === 0 && americanLicenseFields.style.display === "block") {
        addAmericanLicense();
    }

    licenseMessages.innerHTML = ''; // Limpa todas as mensagens
}

function addAmericanLicense() {
    americanLicenseCount++;
    const idSuffix = `_${americanLicenseCount}`; // Garante IDs únicos

    const licenseMessages = document.getElementById('mensagens_carteira');
    licenseMessages.innerHTML = ''; // Limpa todas as mensagens de erro

    const americanLicenseList = document.getElementById('lista_carteiras_americanas');

    const newLicenseHTML = `
        <fieldset class="conjunto_campos_g2">
            <div class="indice" style="position: relative; margin: 0 auto; bottom:9px; width: 25px; height: 25px; text-align: centro; border-radius: 50%; background-color: #007bff; color: #fff; line-height: 25px; font-size: 1.2em;">
                ${americanLicenseCount}
            </div>

            <div class="envoltura_input">
                <input type="text" id="numero_carteira_${id_suffix}" name="numero_carteira_${id_suffix}"
                    class="input_personalizado" placeholder="">
                <label for="numero_carteira_${id_suffix}" class="rotulo_personalizado">
                    Licença
                </label>
            </div>
            <div class="envoltura_input">
                <input type="text" id="estado_emissor_carteira_${id_suffix}" name="estado_emissor_carteira_${id_suffix}"
                    class="input_personalizado" placeholder="">
                <label for="estado_emissor_carteira_${id_suffix}" class="rotulo_personalizado">
                    Estado emissor da Licença
                </label>
            </div>
        </fieldset>
    `;

    americanLicenseList.insertAdjacentHTML('beforeend', newLicenseHTML);
}


function removeAmericanLicense() {
    const americanLicenseList = document.getElementById('lista_carteiras_americanas');
    const licenseMessages = document.getElementById('mensagens_carteira');

    licenseMessages.innerHTML = ''; // Limpa todas as mensagens

    if (americanLicenseCount > 1) {
        americanLicenseList.removeChild(americanLicenseList.lastElementChild);
        americanLicenseCount--;
    } else {
        const minLicenseMessage = document.createElement('p');
        minLicenseMessage.innerHTML = '<strong>Você deve manter pelo menos uma licença.</strong>';
        minLicenseMessage.style.color = 'red'; // Cor vermelha
        licenseMessages.appendChild(minLicenseMessage);
    }
}



