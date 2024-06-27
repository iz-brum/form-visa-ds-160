// DIR: /PUBLIC/JS\INFORMACOESPESSOAIS.JS

// Funções Relacionadas Aos Dados Pessoais 

// Função para preencher o dropdown de países com o Select2 e traduzir os nomes para o português
function populateCountrySelect(countrySelectId) {
    console.log('Populando dropdown de países...');
    var countrySelect = document.getElementById(countrySelectId);

    if (!countrySelect) {
        console.error(`Elemento com ID ${countrySelectId} não encontrado.`);
        return;
    }

    // Ajustar o caminho para o JSON de traduções
    fetch('./public/json/countryTranslations.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao carregar traduções de países: ${response.statusText}`);
            }
            return response.json();
        })
        .then(countryTranslations => {
            console.log('Traduzindo nomes de países...');
            fetch('https://secure.geonames.org/countryInfoJSON?username=izann_brum')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao buscar dados de países');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Dados de países recebidos da API:', data);
                    var countries = data.geonames;
                    countries.sort((a, b) => a.countryName.localeCompare(b.countryName));
                    countries.forEach(country => {
                        var translatedName = countryTranslations[country.countryCode] || country.countryName;
                        var option = new Option(translatedName, country.geonameId);
                        countrySelect.add(option);
                    });
                    console.log('Inicializando Select2...');
                    $(countrySelect).select2();
                })
                .catch(error => {
                    console.error('Erro ao buscar dados de países:', error);
                });
        })
        .catch(error => {
            console.error('Erro ao carregar traduções de países:', error);
        });
}

// Função para preencher o dropdown de estados
function getStatesByCountry(countryCode, stateSelectId) {
    fetch('/api/config')
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
function getCitiesByState(estadoCode, cidadeSelectId) {
    fetch('/api/config')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar configuração');
            }
            return response.json();
        })
        .then(config => {
            var cidadeSelect = $('#' + cidadeSelectId);
            cidadeSelect.empty().append($('<option>', {
                value: '',
                text: 'Selecione sua cidade'
            }));

            if (!config.username) {
                console.error('Configuração de username não encontrada.');
                cidadeSelect.append($('<option>', {
                    text: 'Erro na configuração'
                }));
                return;
            }

            fetch(`https://secure.geonames.org/childrenJSON?geonameId=${estadoCode}&username=${config.username}`)
                .then(response => response.json())
                .then(data => {
                    if (data.totalResultsCount > 0) {
                        var cities = data.geonames;
                        cities.forEach(cidade => {
                            cidadeSelect.append($('<option>', {
                                value: cidade.geonameId,
                                text: cidade.name
                            }));
                        });
                        cidadeSelect.select2();
                    } else {
                        cidadeSelect.append($('<option>', {
                            text: 'Nenhuma cidade disponível'
                        }));
                    }
                })
                .catch(error => {
                    console.error('Erro ao buscar cidades:', error);
                });
        })
        .catch(error => {
            console.error('Erro ao buscar configuração:', error);
        });
}

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
    mensagens_nacionalidade.innerHTML = '';
}

function addNationality() {
    nacionalidadeAdicionalCounter++;
    console.log("nacionalidadeAdicionalCounter: " + nacionalidadeAdicionalCounter);

    // Verificar e ajustar a rolagem horizontal
    checkHorizontalScroll();

    // Limpar mensagens de aviso, se existirem
    mensagens_nacionalidade.innerHTML = '';

    // Gerar um ID único para o novo conjunto de campos
    const id_suffix = nacionalidadeAdicionalCounter; // Pode ser melhorado para evitar colisões de IDs

    // Criar o HTML para a nova nacionalidade
    const newNationalityHTML = `
        <fieldset class="conjunto_campos_g2 bgc_continar_nacionalidade container_nacionalidade envoltura_input">
        <div class="indice">${nacionalidadeAdicionalCounter}</div>
            <select id="nacionalidade_segunda_${id_suffix}" class="selecao_padrao_01"> 
                <option value="">Selecione a nacionalidade</option>
            </select>
            
            <div class="envoltura_input my-2">
                <input type="text" class="input_personalizado numero_passaporte" id="numero_passaporte" name="numero_passaporte" placeholder="">
                <label for="numero_passaporte" class="rotulo_personalizado">Nº do passaporte</label>
            </div>
            
            <div class="envoltura_input expiracao_passaporte-container">
                <input type="date" class="input_personalizado expiracao_passaporte" name="expiracao_passaporte" id="expiracao_passaporte_${id_suffix}" style="width: 100%; text-align: centro;" placeholder="">
                <label for="expiracao_passaporte_${id_suffix}" class="rotulo_personalizado">Data de validade</label>
            </div>
        </fieldset>
    `;

    // Adicionar o HTML ao container de nacionalidades adicionais
    const nationalityContainer = document.getElementById("nacionalidades_adicionais");
    nationalityContainer.insertAdjacentHTML('beforeend', newNationalityHTML);

    // Invocar a função populateNationalities() para preencher o novo select
    populateNationalities(`nacionalidade_segunda_${id_suffix}`);

    // Retornar os elementos para acesso posterior
    return {
        nacionalidadeSelect: document.getElementById(`nacionalidade_segunda_${id_suffix}`),
        numero_passaporteInput: document.getElementById(`numero_passaporte-${id_suffix}`),
        expiracao_passaporteInput: document.getElementById(`expiracao_passaporte_${id_suffix}`)
    };
}

function removeLastNationality() {
    const nacionalidadeContainers = document.querySelectorAll('#nacionalidade_segunda_div .container_nacionalidade');
    const nacionalidadeMessages = document.getElementById('mensagens_nacionalidade'); // Div para mensagens de aviso

    // Remove a mensagem de aviso, se existir
    nacionalidadeMessages.innerHTML = ''; // Limpa todas as mensagens

    if (nacionalidadeContainers.length > 2) {
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

        return 0;
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

function updateStatePlaceholder(paisValue, estadoSelectId) {
    const estadoSelect = document.getElementById(estadoSelectId);
    const firstOption = estadoSelect.querySelector("option:first-child");

    if (paisValue) {
        firstOption.textContent = "Selecione seu estado";
        estadoSelect.disabled = false; // Habilitar o menu suspenso de estado
    } else {
        firstOption.textContent = "Selecione um país antes";
        estadoSelect.disabled = true; // Desabilitar o menu suspenso de estado
    }
}

function updateCityPlaceholder(estadoValue, cidadeSelectId) {
    const cidadeSelect = document.getElementById(cidadeSelectId);
    const firstOption = cidadeSelect.querySelector("option:first-child");

    if (estadoValue) {
        firstOption.textContent = "Selecione sua cidade";
        cidadeSelect.disabled = false; // Habilitar o menu suspenso de cidade
    } else {
        firstOption.textContent = "Selecione um estado antes";
        cidadeSelect.disabled = true; // Desabilitar o menu suspenso de cidade
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
