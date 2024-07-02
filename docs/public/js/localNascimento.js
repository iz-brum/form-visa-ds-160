// Função para salvar dados no localStorage
function saveToLocalStorage(key, value) {
    if (value) {
        console.log(`Saving to localStorage: ${key} = ${value}`);
        localStorage.setItem(key, value);
    } else {
        console.log(`Not saving empty value for key: ${key}`);
    }
}

// Função para carregar dados do localStorage
function loadFromLocalStorage(key) {
    const value = localStorage.getItem(key);
    console.log(`Loading from localStorage: ${key} = ${value}`);
    return value;
}

// Função para preencher o dropdown de cidades
function getCitiesByState(stateCode, citySelectId) {
    var citySelect = $('#' + citySelectId);
    citySelect.empty().append($('<option>', {
        value: '',
        text: 'Selecione sua cidade'
    }));
    if (stateCode) {
        fetch(`https://secure.geonames.org/childrenJSON?geonameId=${stateCode}&username=izann_brum`)
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
                    citySelect.prop('disabled', false);
                } else {
                    citySelect.append($('<option>', {
                        text: 'Nenhuma cidade disponível'
                    }));
                }
                citySelect.select2();
                // Carregar valor salvo após preencher o dropdown
                loadSavedSelectValue(citySelectId);
            })
            .catch(error => {
                console.error('Erro ao buscar cidades:', error);
            });
    } else {
        citySelect.prop('disabled', true);
    }
}

// Função para preencher o dropdown de estados
function getStatesByCountry(countryCode, stateSelectId) {
    var stateSelect = $('#' + stateSelectId);
    stateSelect.empty().append($('<option>', {
        value: '',
        text: 'Selecione o estado'
    }));
    if (countryCode) {
        fetch(`https://secure.geonames.org/childrenJSON?geonameId=${countryCode}&username=izann_brum`)
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
                    stateSelect.prop('disabled', false);
                } else {
                    stateSelect.append($('<option>', {
                        text: 'Nenhum estado disponível'
                    }));
                }
                stateSelect.select2();
                // Carregar valor salvo após preencher o dropdown
                loadSavedSelectValue(stateSelectId);
            })
            .catch(error => {
                console.error('Erro ao buscar estados:', error);
            });
    } else {
        stateSelect.prop('disabled', true);
    }
}

// Função para preencher o dropdown de países com o Select2 e traduzir os nomes para o português
function populateCountrySelect(countrySelectIds) {
    console.log('Populando dropdown de países...');
    var countrySelects = countrySelectIds.map(id => document.getElementById(id));

    var missingIds = countrySelectIds.filter((id, index) => !countrySelects[index]);

    if (missingIds.length > 0) {
        console.error(`Elemento(s) com ID ${missingIds.join(', ')} não encontrado(s).`);
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
                    countrySelects.forEach(countrySelect => {
                        countries.forEach(country => {
                            var translatedName = countryTranslations[country.countryCode] || country.countryName;
                            var option = new Option(translatedName, country.geonameId);
                            countrySelect.add(option);
                        });
                        console.log('Inicializando Select2...');
                        $(countrySelect).select2();
                        // Carregar valor salvo após preencher o dropdown
                        loadSavedSelectValue(countrySelect.id);
                    });
                })
                .catch(error => {
                    console.error('Erro ao buscar dados de países:', error);
                });
        })
        .catch(error => {
            console.error('Erro ao carregar traduções de países:', error);
        });
}

function loadSavedSelectValue(selectId) {
    const savedValue = loadFromLocalStorage(selectId);
    if (savedValue) {
        console.log(`Restoring value for ${selectId}: ${savedValue}`);
        $('#' + selectId).val(savedValue).trigger('change');
    }
}

// Função para desabilitar os selects de estado e cidade
function disableSelects() {
    $('#estado_nascimento').prop('disabled', true);
    $('#cidade_nascimento').prop('disabled', true);
}

// Função para habilitar/desabilitar os selects de acordo com a seleção
function handleSelectChange() {
    const countryValue = $('#pais_nascimento').val();
    const stateValue = $('#estado_nascimento').val();
    if (countryValue) {
        $('#estado_nascimento').prop('disabled', false);
        if (!stateValue) {
            $('#cidade_nascimento').prop('disabled', true);
        }
    } else {
        $('#estado_nascimento').prop('disabled', true);
        $('#cidade_nascimento').prop('disabled', true);
    }
    if (stateValue) {
        $('#cidade_nascimento').prop('disabled', false);
    } else {
        $('#cidade_nascimento').prop('disabled', true);
    }
}

// Função para resetar o estado e a cidade ao mudar o país
function resetStateAndCity() {
    $('#estado_nascimento').empty().append($('<option>', {
        value: '',
        text: 'Selecione um país antes'
    })).prop('disabled', true);
    $('#cidade_nascimento').empty().append($('<option>', {
        value: '',
        text: 'Selecione um estado antes'
    })).prop('disabled', true);
    saveToLocalStorage('estado_nascimento', '');
    saveToLocalStorage('cidade_nascimento', '');
}

// Função para resetar a cidade ao mudar o estado
function resetCity() {
    $('#cidade_nascimento').empty().append($('<option>', {
        value: '',
        text: 'Selecione um estado antes'
    })).prop('disabled', true);
    saveToLocalStorage('cidade_nascimento', '');
}

// Garanta que o DOM esteja carregado antes de chamar a função
document.addEventListener('DOMContentLoaded', function() {
    populateCountrySelect(['pais_nascimento', 'pais_emissor_passaporte', 'pais_emissao_passaporte']);
    disableSelects();
    handleSelectChange();

    // Salvar os valores selecionados ao mudar os selects
    document.addEventListener('change', function(event) {
        if (event.target.tagName === 'SELECT' || event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            const value = event.target.value.trim();
            if (value) {
                saveToLocalStorage(event.target.id, value);
            }
            if (event.target.id === 'pais_nascimento') {
                resetStateAndCity();
                getStatesByCountry(event.target.value, 'estado_nascimento');
            } else if (event.target.id === 'estado_nascimento') {
                resetCity();
                getCitiesByState(event.target.value, 'cidade_nascimento');
            }
            handleSelectChange();
        }
    });

    // Carregar os valores salvos ao iniciar a página
    loadSavedSelectValue('pais_nascimento');
    loadSavedSelectValue('estado_nascimento');
    loadSavedSelectValue('cidade_nascimento');
});
