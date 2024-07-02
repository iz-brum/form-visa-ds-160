// DIR: /PUBLIC/JS/INFORMACOESPESSOAIS.JS

// Função para popular o seletor de nacionalidades
function populateNationalities(selectId) {
    const nationalitySelect = document.getElementById(selectId);

    // Carrega o arquivo JSON de traduções de nacionalidades
    fetch('./public/json/nationalitiesTranslations.json')
        .then(response => response.json())
        .then(nationalitiesData => {
            // Preenche o seletor de nacionalidades com as traduções
            Object.entries(nationalitiesData).forEach(([countryCode, nationality]) => {
                const option = document.createElement('option');
                option.value = nationality; // Usar o nome da nacionalidade como valor
                option.text = nationality;
                nationalitySelect.appendChild(option);
            });

            // Inicializa o seletor de nacionalidades com o Select2
            $(nationalitySelect).select2();
        })
        .catch(error => {
            console.error('Erro ao carregar o arquivo JSON:', error);
        });
}

populateNationalities("nacionalidade");
populateNationalities("nacionalidade_conjuge");

let otherNameCount = 3;
function addOtherName() {
    const otherNameContainer = document.querySelector('.other-name-container');

    const otherNameDiv = document.createElement('div');
    otherNameDiv.classList.add('other-name');

    const nameLabel = document.createElement('label');
    nameLabel.textContent = `${otherNameCount}º Nome:`;
    otherNameDiv.appendChild(nameLabel);

    const lastNameInput = document.createElement('input');
    lastNameInput.type = 'text';
    lastNameInput.classList.add('other-last-name');
    lastNameInput.name = `otherLastName${otherNameCount}`;
    lastNameInput.placeholder = 'Outros sobrenomes utilizados';
    otherNameDiv.appendChild(lastNameInput);

    const firstNameLabel = document.createElement('label');
    firstNameLabel.textContent = `${otherNameCount}º Sobrenome:`;
    otherNameDiv.appendChild(firstNameLabel);

    const firstNameInput = document.createElement('input');
    firstNameInput.type = 'text';
    firstNameInput.classList.add('other-first-name');
    firstNameInput.name = `otherFirstName${otherNameCount}`;
    firstNameInput.placeholder = 'Outros nomes utilizados';
    otherNameDiv.appendChild(firstNameInput);

    otherNameContainer.appendChild(otherNameDiv);
    otherNameCount++;
}

function toggleOtherNamesFields() {
    var radioButton = document.getElementById("outros_nomes_sim");
    toggleFields(radioButton, "div_outro_nome", "block");
}

// Contador de nacionalidades adicionais
let nacionalidadeAdicionalCounter = 0;

// Função para exibir ou ocultar campos relacionados à segunda nacionalidade
function toggleNationalitySecond() {
    const radioButton = document.getElementById("outra_nacionalidade_sim");
    toggleFields(radioButton, "nacionalidade_segunda_div", "block");

    if (nacionalidadeAdicionalCounter === 0) {
        addNationality();
    }

    // Limpar mensagens de aviso, se existirem
    document.getElementById('mensagens_nacionalidade').innerHTML = '';
}

function addNationality() {
    nacionalidadeAdicionalCounter++;
    console.log("nacionalidadeAdicionalCounter: " + nacionalidadeAdicionalCounter);

    // Gerar um ID único para o novo conjunto de campos
    const id_suffix = nacionalidadeAdicionalCounter; // Pode ser melhorado para evitar colisões de IDs

    // Criar o HTML para a nova nacionalidade
    const newNationalityHTML = `
        <fieldset class="conjunto_campos_g2 container_cards_style envoltura_input" id="container_nacionalidade_${id_suffix}">
            <div class="indice">${nacionalidadeAdicionalCounter}</div>
            <select id="nacionalidade_segunda_${id_suffix}" class="selecao_padrao_01"> 
                <option value="">Selecione a nacionalidade</option>
            </select>
            <div class="envoltura_input my-2">
                <input type="text" class="input_personalizado numero_passaporte" id="numero_passaporte_${id_suffix}" name="numero_passaporte_${id_suffix}" placeholder="">
                <label for="numero_passaporte_${id_suffix}" class="rotulo_personalizado">Nº do passaporte</label>
            </div>
            <div class="envoltura_input">
                <input type="date" class="input_personalizado expiracao_passaporte" name="expiracao_passaporte_${id_suffix}" id="expiracao_passaporte_${id_suffix}" style="width: 100%; text-align: left;" placeholder="">
                <label for="expiracao_passaporte_${id_suffix}" class="rotulo_personalizado">Data de validade</label>
            </div>
        </fieldset>
    `;

    // Adicionar o HTML ao container de nacionalidades adicionais
    const nationalityContainer = document.getElementById("nacionalidades_adicionais");
    nationalityContainer.insertAdjacentHTML('beforeend', newNationalityHTML);

    // Invocar a função populateNationalities() para preencher o novo select
    populateNationalities(`nacionalidade_segunda_${id_suffix}`);
}

function removeLastNationality() {
    const nacionalidadeContainers = document.querySelectorAll('#nacionalidades_adicionais .container_cards_style');
    const nacionalidadeMessages = document.getElementById('mensagens_nacionalidade'); // Div para mensagens de aviso

    // Remove a mensagem de aviso, se existir
    nacionalidadeMessages.innerHTML = ''; // Limpa todas as mensagens

    if (nacionalidadeContainers.length > 1) {
        const lastContainer = nacionalidadeContainers[nacionalidadeContainers.length - 1];
        lastContainer.remove();
        nacionalidadeAdicionalCounter--;
    } else {
        const minNationalityMessage = document.createElement('p');
        minNationalityMessage.style.color = 'red'; // Cor vermelha
        minNationalityMessage.style.fontSize = '0.89rem';
        minNationalityMessage.innerHTML = '<strong>Você deve manter pelo menos uma nacionalidade.</strong>';
        nacionalidadeMessages.appendChild(minNationalityMessage);

        // Limpar as mensagens de aviso após alguns segundos
        setTimeout(() => {
            nacionalidadeMessages.innerHTML = ''; // Limpa todas as mensagens sem esconder o elemento
        }, 7000);
    }
}

function toggleFields(inputElement, targetElementId, action) {
    const targetElement = document.getElementById(targetElementId);
    if (inputElement.checked) {
        targetElement.style.display = action;
    } else {
        targetElement.style.display = "none";
    }
}


function toggleMaritalStatusFields() {
    var select = document.getElementById("estado_civil");
    toggleFieldForOtherOption(select, "outros_estados_civis", "block");

    updateSpouseStatusValue(); // Atualiza o texto do status do cônjuge quando a entrada é digitada
    updateSpouseStatus();
}

function updateSpouseStatusValue() {
    var maritalStatusEspecificacaoInput = document.getElementById("estado_civil_especificacao");
    var status_conjuge = document.getElementById("status_conjuge");
    status_conjuge.textContent = maritalStatusEspecificacaoInput.value;
}

function updateSpouseStatus() {
    var maritalStatus = document.getElementById("estado_civil");
    var selectedOption = maritalStatus.options[maritalStatus.selectedIndex].text;
    var status_conjuge = document.getElementById("status_conjuge");
    var campos_conjuge = document.getElementById("campos_conjuge");
    var campos_divorcio = document.getElementById("campos_divorcio");

    if (selectedOption === "Solteiro") {
        status_conjuge.textContent = "Não se aplica (para solteiro)";
        campos_conjuge.style.display = "none";
        campos_divorcio.style.display = "none";
    } else if (selectedOption === "Divorciado" || selectedOption === "Separado Legalmente" || selectedOption === "Viúvo" || selectedOption === "Casado") {
        status_conjuge.textContent = selectedOption;
        campos_conjuge.style.display = "block";
        if (selectedOption === "Divorciado") {
            campos_divorcio.style.display = "block";
        } else {
            campos_divorcio.style.display = "none";
        }
    }
}


// Função para verificar e ajustar a rolagem horizontal, se necessário
function checkHorizontalScroll() {
    const nationalityContainer = document.querySelector('.container_nacionalidade');
    if (nationalityContainer.scrollWidth > nationalityContainer.clientWidth) {
        nationalityContainer.style.overflowX = 'auto';
    } else {
        nationalityContainer.style.overflowX = 'hidden';
    }
}

// Adicionar um event listener para o evento de redimensionamento da janela
window.addEventListener('resize', function () {
    // Verificar e ajustar a rolagem horizontal
    checkHorizontalScroll();
});
