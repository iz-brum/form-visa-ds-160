// Informações sobre Viagens Anteriores aos EUA - Funções Relacionadas


// Função para mostrar ou ocultar os campos relacionados às informações do visto
function showVisaInfoFields() {
    var radioButton = document.getElementById("yesUSVisa");
    toggleFields(radioButton, "visaInfoFields", "block");
}

// Função para mostrar ou ocultar o campo de entrada do ano relacionado a vistos roubados ou perdidos
function toggleYearInputForLostOrStolenVisa() {
    var radioButton = document.getElementById("previousVisaYes");
    toggleFields(radioButton, "yearContainer", "block");
}

// Função para mostrar ou ocultar os detalhes relacionados a vistos cancelados ou revogados
function toggleVisaCanceledDetails() {
    var radioButton = document.getElementById("visaCanceledYes");
    toggleFields(radioButton, "visaCanceledDetails", "block");
}


let visitCount = 0;

function toggleVisitFields() {
    const radioButton = document.getElementById("visitou_eua_sim");
    const visitFields = document.getElementById("campos_visita");
    const visitMessages = document.getElementById("visitMessages");

    toggleFields(radioButton, "campos_visita", "block");

    if (visitCount === 0 && visitFields.style.display === "block") {
        addVisit();
    }

    visitMessages.innerHTML = ''; // Limpa todas as mensagens
}


function addVisit() {
    const MAX_VISITS = 5;

    if (visitCount < MAX_VISITS) {
        visitCount++;
        const idSuffix = visitCount;
        visitMessages.innerHTML = ''; // Limpa todas as mensagens

        const newVisitHTML = `
            <fieldset class="fieldset-g2">
                <div class="index"
                    style="position: relative; margin: 0 auto; bottom:9px; width: 25px; height: 25px; text-align: center; border-radius: 50%; background-color: #007bff; color: #fff; line-height: 25px; font-size: 1.2em;">
                    ${visitCount}</div>

                <div class="date-input-container">
                    <label for="visitDate${idSuffix}">Data de entrada:</label>
                    <input type="date" id="visitDate${idSuffix}" name="visitDate${idSuffix}">
                </div>

                <div class="date-input-container">
                    <label for="leftDate${idSuffix}">Data de saída:</label>
                    <input type="date" id="leftDate${idSuffix}" name="leftDate${idSuffix}">
                </div>

            </fieldset>
        `;

        const visitContainer = document.getElementById('visitContainer');
        visitContainer.insertAdjacentHTML('beforeend', newVisitHTML);
    } else {
        const visitMessages = document.getElementById('visitMessages');
        visitMessages.innerHTML = '<p>Você atingiu o limite máximo de visitas.</p>';
    }
}

function removeLastVisit() {
    const visitContainer = document.getElementById('visitContainer');
    const visitMessages = document.getElementById('visitMessages');
    visitMessages.innerHTML = ''; // Limpa todas as mensagens

    if (visitCount > 1) {
        visitContainer.removeChild(visitContainer.lastElementChild);
        visitCount--;
    } else {
        visitMessages.innerHTML = '<p>Você deve manter pelo menos uma visita.</p>';
    }
}



let americanLicenseCount = 0;

function toggleAmericanLicenseFields() {
    const radioButton = document.getElementById("yesAmericanLicense");
    const americanLicenseFields = document.getElementById("americanLicenseFields");
    const licenseMessages = document.getElementById("licenseMessages");

    toggleFields(radioButton, "americanLicenseFields", "block");

    if (americanLicenseCount === 0 && americanLicenseFields.style.display === "block") {
        addAmericanLicense();
    }

    licenseMessages.innerHTML = ''; // Limpa todas as mensagens
}

function addAmericanLicense() {
    americanLicenseCount++;
    const idSuffix = `_${americanLicenseCount}`; // Garante IDs únicos

    const licenseMessages = document.getElementById('licenseMessages');
    licenseMessages.innerHTML = ''; // Limpa todas as mensagens de erro

    const americanLicenseList = document.getElementById('americanLicenseList');

    const newLicenseHTML = `
        <fieldset class="fieldset-g2">
            <div class="index" style="position: relative; margin: 0 auto; bottom:9px; width: 25px; height: 25px; text-align: center; border-radius: 50%; background-color: #007bff; color: #fff; line-height: 25px; font-size: 1.2em;">
                ${americanLicenseCount}
            </div>

            <div class="input-wrapper">
                <input type="text" id="americanLicenseNumber${idSuffix}" name="americanLicenseNumber${idSuffix}"
                    class="custom-input" placeholder="">
                <label for="americanLicenseNumber${idSuffix}" class="custom-label">${americanLicenseCount}ª
                    Licença:
                </label>
            </div>
            <div class="input-wrapper">
                <input type="text" id="americanLicenseState${idSuffix}" name="americanLicenseState${idSuffix}"
                    class="custom-input" placeholder="">
                <label for="americanLicenseState${idSuffix}" class="custom-label">
                    Estado emissor da Licença:
                </label>
            </div>
        </fieldset>
    `;

    americanLicenseList.insertAdjacentHTML('beforeend', newLicenseHTML);
}

function removeAmericanLicense() {
    const americanLicenseList = document.getElementById('americanLicenseList');
    const licenseMessages = document.getElementById('licenseMessages');

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



