// DIR: FORMULARIO-VISTO\PUBLIC\JS\DADOS_PESSOAIS.JS

// Funções Relacionadas Aos Dados Pessoais 

// Função para preencher o dropdown de países com o Select2 e traduzir os nomes para o português
function populateCountrySelect(countrySelectId) {
    console.log('Populando dropdown de países...');
    var countrySelect = document.getElementById(countrySelectId);

    fetch("/api/countries")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao buscar dados de países: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Dados de países recebidos da API:', data);
            var countries = data.geonames;
            console.log('Países recebidos:', countries);
            countries.sort((a, b) => a.countryName.localeCompare(b.countryName));
            countries.forEach(country => {
                var option = new Option(country.countryName, country.geonameId);
                countrySelect.add(option);
            });
            console.log('Inicializando Select2...');
            $(countrySelect).select2();
        })
        .catch(error => {
            console.error('Erro ao buscar dados de países:', error);
        });
}


// Função para preencher o dropdown de estados
function getStatesByCountry(countryCode, stateSelectId) {
    fetch('/api/username')
        .then(response => response.json())
        .then(config => {
            var stateSelect = $('#' + stateSelectId);
            stateSelect.empty().append($('<option>', {
                value: '',
                text: 'Selecione o estado'
            }));
            fetch(`https://secure.geonames.org/childrenJSON?geonameId=${countryCode}&username=${config.username}`)
                .then(response => response.json())
                .then(data => {
                    if (data.totalResultsCount > 0) {
                        var states = data.geonames;
                        states.forEach(state => {
                            stateSelect.append($('<option>', {
                                value: state.geonameId,
                                text: state.name
                            }));
                        });
                        stateSelect.select2();
                    } else {
                        stateSelect.append($('<option>', {
                            text: 'Nenhum estado disponível'
                        }));
                    }
                })
                .catch(error => {
                    console.error('Erro ao buscar estados:', error);
                });
        });
}

// Função para preencher o dropdown de cidades
function getCitiesByState(stateCode, citySelectId) {
    fetch('/api/username')
        .then(response => response.json())
        .then(config => {
            var citySelect = $('#' + citySelectId);
            citySelect.empty().append($('<option>', {
                value: '',
                text: 'Selecione a cidade'
            }));
            fetch(`https://secure.geonames.org/childrenJSON?geonameId=${stateCode}&username=${config.username}`)
                .then(response => response.json())
                .then(data => {
                    if (data.totalResultsCount > 0) {
                        var cities = data.geonames;
                        cities.forEach(city => {
                            citySelect.append($('<option>', {
                                value: city.geonameId,
                                text: city.name
                            }));
                        });
                        citySelect.select2();
                    } else {
                        citySelect.append($('<option>', {
                            text: 'Nenhuma cidade disponível'
                        }));
                    }
                })
                .catch(error => {
                    console.error('Erro ao buscar cidades:', error);
                });
        });
}


document.addEventListener("DOMContentLoaded", function () {
    // Função para popular o seletor de nacionalidades
    function populateNationalities(selectId) {
        const nationalitySelect = document.getElementById(selectId);

        // Carrega o arquivo JSON de traduções de nacionalidades
        fetch('public/json/nationalitiesTranslations.json')
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
    populateNationalities("spouseNationality");
});


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
    toggleFields(radioButton, "outro_nome_div", "block");
}



// Contador de nacionalidades adicionais
let nacionalidadeAdicionalCounter = 1;

// Função para exibir ou ocultar campos relacionados à segunda nacionalidade
function toggleNationalitySecond() {
    const radioButton = document.getElementById("outra_nacionalidade_sim");
    toggleFields(radioButton, "nationality-second-div", "block");

    if (nacionalidadeAdicionalCounter === 1) {
        addNationality();
    }

    // Limpar mensagens de aviso, se existirem
    nationalityMessages.innerHTML = '';
}



let campoCounter = 0;
function addNationality() {
    nacionalidadeAdicionalCounter++;
    console.log("nacionalidadeAdicionalCounter: " + nacionalidadeAdicionalCounter);

    // Verificar e ajustar a rolagem horizontal
    checkHorizontalScroll();

    // Limpar mensagens de aviso, se existirem
    nationalityMessages.innerHTML = '';

    // Gerar um ID único para o novo conjunto de campos
    const idSuffix = campoCounter++; // Pode ser melhorado para evitar colisões de IDs

    // Criar o HTML para a nova nacionalidade
    const newNationalityHTML = `
        <fieldset class="fieldset-g2 nationality-container input-wrapper">
        <div class="index" style="position: relative; margin: 0 auto; bottom:9px; width: 25px; height: 25px; text-align: center; border-radius: 50%; background-color: #007bff; color: #fff; line-height: 25px; font-size: 1.2em;">${nacionalidadeAdicionalCounter - 1}</div>


            <select id="nationality-second-${idSuffix}" class="default-select-01" style="width: 100%;"> 
                <option value="">Selecione a nacionalidade</option>
            </select>
            
            <div class="mb-1 input-wrapper mt-2">
                <input type="text" class="custom-input passport-number" id="passaport-number" name="passportNumber" placeholder="">
                <label for="passaport-number" class="custom-label">Nº do passaporte</label>
            </div>
            
            <div class="input-wrapper passport-expiry-container">
                <input type="date" class="custom-input passport-expiry" name="passportExpiry" id="passportExpiry-${idSuffix}" style="width: 100%; text-align: center;" placeholder="">
                <label for="passportExpiry-${idSuffix}" class="custom-label" style="display: block;text-align: center;font-size: 3.1vw;width: 91%; color: blue;">Data de validade do passaporte</label>
            </div>
        </fieldset>
    `;

    // Adicionar o HTML ao container de nacionalidades adicionais
    const nationalityContainer = document.getElementById("additional-nationalities");
    nationalityContainer.insertAdjacentHTML('beforeend', newNationalityHTML);

    // Invocar a função populateNationalities() para preencher o novo select
    populateNationalities(`nationality-second-${idSuffix}`);

    // Retornar os elementos para acesso posterior
    return {
        nacionalidadeSelect: document.getElementById(`nationality-second-${idSuffix}`),
        passportNumberInput: document.getElementById(`passportNumber-${idSuffix}`),
        passportExpiryInput: document.getElementById(`passportExpiry-${idSuffix}`)
    };
}


function removeLastNationality() {
    const nacionalidadeContainers = document.querySelectorAll('#nationality-second-div .nationality-container');
    const nacionalidadeMessages = document.getElementById('nationalityMessages'); // Div para mensagens de aviso

    // Remove a mensagem de aviso, se existir
    nacionalidadeMessages.innerHTML = ''; // Limpa todas as mensagens

    if (nacionalidadeContainers.length > 2) {
        const lastContainer = nacionalidadeContainers[nacionalidadeContainers.length - 1];
        lastContainer.remove();
        nacionalidadeAdicionalCounter--;

    } else {
        const minNationalityMessage = document.createElement('p');
        minNationalityMessage.style.color = 'red'; // Cor vermelha
        minNationalityMessage.innerHTML = '<strong>Você deve manter pelo menos uma nacionalidade.</strong>';
        nacionalidadeMessages.appendChild(minNationalityMessage);

        // Limpar as mensagens de aviso após alguns segundos
        setTimeout(() => {
            nacionalidadeMessages.textContent = '';
            nacionalidadeMessages.style.display = 'none';
        }, 5000);

        return;
    }
}


function toggleMaritalStatusFields() {
    var select = document.getElementById("estado_civil");
    toggleFieldForOtherOption(select, "outros-estados-civis", "block");

    updateSpouseStatusValue(); // Atualiza o texto do status do cônjuge quando a entrada é digitada
    updateSpouseStatus();
}

function updateSpouseStatusValue() {
    var maritalStatusEspecificacaoInput = document.getElementById("estado_civil_especificacao");
    var spouseStatusValue = document.getElementById("spouseStatusValue");
    spouseStatusValue.textContent = maritalStatusEspecificacaoInput.value;
}

function updateSpouseStatus() {
    var maritalStatus = document.getElementById("estado_civil");
    var selectedOption = maritalStatus.options[maritalStatus.selectedIndex].text;
    var spouseStatusValue = document.getElementById("spouseStatusValue");
    var spouseFields = document.getElementById("spouseFields");
    var divorceFields = document.getElementById("divorceFields");

    if (selectedOption === "Solteiro") {
        spouseStatusValue.textContent = "Não se aplica (para solteiro)";
        spouseFields.style.display = "none";
        divorceFields.style.display = "none";
    } else if (selectedOption === "Divorciado" || selectedOption === "Separado Legalmente" || selectedOption === "Viúvo" || selectedOption === "Casado") {
        spouseStatusValue.textContent = selectedOption;
        spouseFields.style.display = "block";
        if (selectedOption === "Divorciado") {
            divorceFields.style.display = "block";
        } else {
            divorceFields.style.display = "none";
        }
    }
}

function updateStatePlaceholder(countryValue, stateSelectId) {
    const stateSelect = document.getElementById(stateSelectId);
    const firstOption = stateSelect.querySelector("option:first-child");

    if (countryValue) {
        firstOption.textContent = "Selecione seu estado";
        stateSelect.disabled = false; // Habilitar o menu suspenso de estado
    } else {
        firstOption.textContent = "Selecione um país antes";
        stateSelect.disabled = true; // Desabilitar o menu suspenso de estado
    }
}

function updateCityPlaceholder(stateValue, citySelectId) {
    const citySelect = document.getElementById(citySelectId);
    const firstOption = citySelect.querySelector("option:first-child");

    if (stateValue) {
        firstOption.textContent = "Selecione sua cidade";
        citySelect.disabled = false; // Habilitar o menu suspenso de cidade
    } else {
        firstOption.textContent = "Selecione um estado antes";
        citySelect.disabled = true; // Desabilitar o menu suspenso de cidade
    }
}

// Função para verificar e ajustar a rolagem horizontal, se necessário
function checkHorizontalScroll() {
    const nationalityContainer = document.querySelector('.nationality-container');
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

