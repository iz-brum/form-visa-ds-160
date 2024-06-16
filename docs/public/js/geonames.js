// DIR: FORMULARIO-VISTO\PUBLIC\JS\GEONAMES.JS





// function getCitiesInUSA(selectId, containerId) {
//     var citySelect = document.getElementById(selectId);
//     citySelect.innerHTML = "<option value='outros' selected>Outros</option><option value='' disabled>──────────────</option><option value='' disabled>Carregando...</option>";
//     // Faz uma requisição para obter as cidades dos EUA
//     fetch(`http://api.geonames.org/searchJSON?country=US&maxRows=1000&username=izann_brum`)
//         .then(response => response.json())
//         .then(data => {
//             // Preenche o dropdown de cidades com as cidades dos EUA obtidas
//             var cities = data.geonames;
//             citySelect.innerHTML = "<option value='null'>Inserir cidade manualmente</option><option value='' disabled>──────────────</option><option value='' selected disabled hidden>Selecione uma cidade</option>";
//             cities.forEach(city => {
//                 var option = document.createElement("option");
//                 option.value = city.name;
//                 option.textContent = city.name;
//                 citySelect.appendChild(option);
//             });
//             var otherCityContainer = document.getElementById(containerId);
//             otherCityContainer.style.display = 'none';
//         })
//         .catch(error => {
//             console.error('Erro ao buscar cidades:', error);
//             citySelect.innerHTML = "<option value='null'>Inserir cidade manualmente</option><option value='' disabled>──────────────</option><option value='' selected disabled hidden>Erro ao carregar cidades</option>";
//         });
// }


function getAddressDetailsByCoordinates(latitude, longitude) {
    return fetch(`http://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
        .then(response => response.json())
        .then(data => {
            const address = data.address || {};
            const road = address.road || '';
            const houseNumber = address.house_number || '';
            const addressString = `${houseNumber} ${road}`.trim();

            console.log('Rua / Av:', addressString);

            return addressString;
        })
        .catch(error => {
            console.error('Erro ao buscar informações do endereço:', error);
            throw error; // Lançar o erro para ser capturado pela chamada da função
        });
}

function getAddressDetailsByZip(zipCode) {
    fetch(`http://api.geonames.org/postalCodeLookupJSON?postalcode=${zipCode}&country=US&username=izann_brum`)
        .then(response => response.json())
        .then(data => {
            if (data.postalcodes && data.postalcodes.length > 0) {
                const addressData = data.postalcodes[0];

                const city = addressData.placeName || '';
                const state = addressData.adminName1 || '';

                const latitude = addressData.lat || '';
                const longitude = addressData.lng || '';

                console.log('Cidade:', city);
                console.log('Estado:', state);

                // Preenche os campos com os dados obtidos da API
                document.getElementById("city2").value = city;
                document.getElementById("state2").value = state;
            } else {
                console.error('Endereço não encontrado.');
            }
        })
        .catch(error => {
            console.error('Erro ao buscar informações do endereço:', error);
        });
}

// Adiciona um listener para o evento de mudança no campo do código postal
document.getElementById("zip").addEventListener("change", function () {
    var zipCode = this.value;
    // Verifica se o código postal possui um valor e se possui 5 dígitos
    if (zipCode && zipCode.length === 5) {
        // Chama a função para obter os dados do código postal
        getAddressDetailsByZip(zipCode);
    } else if (zipCode.length !== 0) {
        // Exibe uma mensagem de erro ou realiza outra ação adequada se o código postal não tiver 5 dígitos
        alert('O código postal deve ter 5 dígitos numéricos.');
    }
});

// Dicionário de siglas de estados para nomes completos
const stateDictionary = {
    'AC': 'Acre',
    'AL': 'Alagoas',
    'AP': 'Amapá',
    'AM': 'Amazonas',
    'BA': 'Bahia',
    'CE': 'Ceará',
    'DF': 'Distrito Federal',
    'ES': 'Espírito Santo',
    'GO': 'Goiás',
    'MA': 'Maranhão',
    'MT': 'Mato Grosso',
    'MS': 'Mato Grosso do Sul',
    'MG': 'Minas Gerais',
    'PA': 'Pará',
    'PB': 'Paraíba',
    'PR': 'Paraná',
    'PE': 'Pernambuco',
    'PI': 'Piauí',
    'RJ': 'Rio de Janeiro',
    'RN': 'Rio Grande do Norte',
    'RS': 'Rio Grande do Sul',
    'RO': 'Rondônia',
    'RR': 'Roraima',
    'SC': 'Santa Catarina',
    'SP': 'São Paulo',
    'SE': 'Sergipe',
    'TO': 'Tocantins'
};

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed');
    generateAddressFieldsForForms([
        'pessoal-address-form',
        'passport-destination-address-form',
        'schoolCep',
        'workCep',
        'institution-address-form',
        'contact-br01-address-form',
        'contact-br02-address-form',
        'escola02-address-form'
    ]);
});

function generateAddressFieldsForForms(formIds) {
    console.log('generateAddressFieldsForForms called with IDs:', formIds);
    formIds.forEach(formId => {
        generateAddressFields(formId);
    });
}

function generateAddressFields(containerId) {
    console.log('generateAddressFields called for container ID:', containerId);
    const container = document.getElementById(containerId);
    if (container) {
        console.log('Container found:', containerId);
        const addressFields = `
            <fieldset>
                <!-- CEP -->
                <div class="input-wrapper">
                    <input type="text" class="custom-input cep-input" id="cep-${containerId}" name="cep" autocomplete="postal-code" placeholder="">
                    <label for="cep-${containerId}" class="custom-label">CEP</label>
                </div>
                
                <!-- Rua/Av -->
                <div class="input-wrapper">
                    <input type="text" class="custom-input street-input" id="street-${containerId}" name="street" autocomplete="street-address" placeholder="">
                    <label for="street-${containerId}" class="custom-label">Rua/Av</label>
                </div>

                <!-- Complemento -->
                <div class="input-wrapper">
                    <input type="text" class="custom-input complement-input" id="complement-${containerId}" name="complement" placeholder="">
                    <label for="complement-${containerId}" class="custom-label">Complemento</label>
                </div>

                <!-- Bairro -->
                <div class="input-wrapper">
                    <input type="text" class="custom-input neighborhood-input" id="neighborhood-${containerId}" name="neighborhood" autocomplete="address-level2" placeholder="">
                    <label for="neighborhood-${containerId}" class="custom-label">Bairro</label>
                </div>

                <!-- Cidade -->
                <div class="input-wrapper">
                    <input type="text" class="custom-input city-input" id="city-${containerId}" name="city" autocomplete="address-level2" placeholder="">
                    <label for="city-${containerId}" class="custom-label">Cidade</label>
                </div>

                <!-- Estado -->
                <div class="input-wrapper">
                    <input type="text" class="custom-input state-input" id="state-${containerId}" name="state" autocomplete="address-level1" placeholder="">
                    <label for="state-${containerId}" class="custom-label">Estado</label>
                </div>

                <!-- País -->     
           <!-- <div class="input-wrapper">
                    <input type="text" class="custom-input country-input" id="country-${containerId}" name="country" autocomplete="country-name" placeholder="">
                    <label for="country-${containerId}" class="custom-label">País</label>
                </div> -->

            </fieldset>
        `;
        container.innerHTML = addressFields;

        // Adiciona o event listener para o campo de CEP dentro deste container
        const cepInput = container.querySelector('.cep-input');
        cepInput.addEventListener('change', function (event) {
            const cepValue = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
            if (cepValue.length === 8) {
                autocompleteAddressFromCEP(cepValue, containerId); // Chama a função de autocompletar
                console.log('autocompleteAddressFromCEP chamada para o container ID: ' + containerId);
            }
        });
    } else {
        console.error('Elemento com o ID ' + containerId + ' não encontrado.');
    }
}


// Função para autocompletar os campos de endereço a partir do CEP
function autocompleteAddressFromCEP(cepValue, containerId) {
    // Constrói a URL da API ViaCEP com o CEP fornecido
    const url = `https://viacep.com.br/ws/${cepValue}/json/`;

    // Faz uma requisição GET para a API ViaCEP
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar o CEP');
            }
            return response.json();
        })
        .then(data => {
            // Preenche os campos de endereço com os dados retornados pela API
            const container = document.getElementById(containerId);
            container.querySelector('.street-input').value = data.logradouro || '';
            container.querySelector('.neighborhood-input').value = data.bairro || '';
            container.querySelector('.city-input').value = data.localidade || '';

            // Verifica se o campo 'complemento' está presente nos dados e preenche o campo de complemento
            if (data.complemento) {
                container.querySelector('.complement-input').value = data.complemento || '';
            } else {
                container.querySelector('.complement-input').value = ''; // Limpa o campo de complemento se não houver valor
            }

            // Substitui a sigla do estado pela nome completo do estado
            const stateFullName = stateDictionary[data.uf] || ''; // Procura a sigla no dicionário
            container.querySelector('.state-input').value = stateFullName;
        })
        .catch(error => {
            console.error('Erro ao buscar o CEP:', error);
            // Limpa os campos de endereço em caso de erro
            const container = document.getElementById(containerId);
            container.querySelector('.street-input').value = '';
            container.querySelector('.neighborhood-input').value = '';
            container.querySelector('.city-input').value = '';
            container.querySelector('.state-input').value = '';
            container.querySelector('.complement-input').value = ''; // Limpa o campo de complemento em caso de erro
        });
}



