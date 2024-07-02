// DIR: FORMULARIO-VISTO\PUBLIC\JS\GEONAMES.JS

function getAddressDetailsByCoordinates(latitude, longitude) {
    return fetch(`http://nominatim.openruamap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
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
    fetch(`http://api.geonames.org/postalCodeLookupJSON?postalcode=${zipCode}&pais=US&username=izann_brum`)
        .then(response => response.json())
        .then(data => {
            if (data.postalcodes && data.postalcodes.length > 0) {
                const addressData = data.postalcodes[0];

                const cidade = addressData.placeName || '';
                const estado = addressData.adminName1 || '';

                const latitude = addressData.lat || '';
                const longitude = addressData.lng || '';

                console.log('Cidade:', cidade);
                console.log('Estado:', estado);

                // Preenche os campos com os dados obtidos da API
                document.getElementById("cidade_2").value = cidade;
                document.getElementById("estado_2").value = estado;
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
const estadoDictionary = {
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
        'form_endereco_pessoal',
        'form_endereco_destino_passaporte',
        'cep_escola',
        'cep_trabalho',
        'form_endereco_instituicao',
        'form_endereco_contact_br_01',
        'form_endereco_contact_br_02',
        'form_endereco_escola_02'
    ]);
});

function generateAddressFieldsForForms(formIds) {
    console.log('generateAddressFieldsForForms called with IDs:', formIds);
    formIds.forEach(formId => {
        generateAddressFields(formId);
    });
}

function generateAddressFields(container_id) {
    console.log('generateAddressFields called for container ID:', container_id);
    const container = document.getElementById(container_id);
    if (container) {
        console.log('Container found:', container_id);
        const addressFields = `
            <fieldset class="">
                <!-- CEP -->
                <div class="envoltura_input">
                    <input type="text" class="input_personalizado input_cep" id="cep_${container_id}" name="cep" autocomplete="postal-code" placeholder="">
                    <label for="cep_${container_id}" class="rotulo_personalizado">CEP</label>
                </div>
                
                <!-- Rua/Av -->
                <div class="envoltura_input">
                    <input type="text" class="input_personalizado rua-input" id="rua_${container_id}" name="rua" autocomplete="rua-address" placeholder="">
                    <label for="rua_${container_id}" class="rotulo_personalizado">Rua/Av</label>
                </div>

                <!-- Complemento -->
                <div class="envoltura_input">
                    <input type="text" class="input_personalizado complemento-input" id="complementoo_${container_id}" name="complemento" placeholder="">
                    <label for="complementoo_${container_id}" class="rotulo_personalizado">Complemento</label>
                </div>

                <!-- Bairro -->
                <div class="envoltura_input">
                    <input type="text" class="input_personalizado bairro-input" id="bairro_${container_id}" name="bairro" autocomplete="address-level2" placeholder="">
                    <label for="bairro_${container_id}" class="rotulo_personalizado">Bairro</label>
                </div>

                <!-- Cidade -->
                <div class="envoltura_input">
                    <input type="text" class="input_personalizado cidade-input" id="cidade_${container_id}" name="cidade" autocomplete="address-level2" placeholder="">
                    <label for="cidade_${container_id}" class="rotulo_personalizado">Cidade</label>
                </div>

                <!-- Estado -->
                <div class="envoltura_input">
                    <input type="text" class="input_personalizado estado-input" id="estado_${container_id}" name="estado" autocomplete="address-level1" placeholder="">
                    <label for="estado_${container_id}" class="rotulo_personalizado">Estado</label>
                </div>

                <!-- País -->     
           <!-- <div class="envoltura_input">
                    <input type="text" class="input_personalizado pais-input" id="pais_${container_id}" name="pais" autocomplete="pais-name" placeholder="">
                    <label for="pais_${container_id}" class="rotulo_personalizado">País</label>
                </div> -->

            </fieldset>
        `;
        container.innerHTML = addressFields;

        // Adiciona o event listener para o campo de CEP dentro deste container
        const cepInput = container.querySelector('.input_cep');
        cepInput.addEventListener('change', function (event) {
            const cepValue = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
            if (cepValue.length === 8) {
                autocompleteAddressFromCEP(cepValue, container_id); // Chama a função de autocompletar
                console.log('autocompleteAddressFromCEP chamada para o container ID: ' + container_id);
            }
        });
    } else {
        console.error('Elemento com o ID ' + container_id + ' não encontrado.');
    }
}


// Função para autocompletar os campos de endereço a partir do CEP
function autocompleteAddressFromCEP(cepValue, container_id) {
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
            const container = document.getElementById(container_id);
            container.querySelector('.rua-input').value = data.logradouro || '';
            container.querySelector('.bairro-input').value = data.bairro || '';
            container.querySelector('.cidade-input').value = data.localidade || '';

            // Verifica se o campo 'complementoo' está presente nos dados e preenche o campo de complementoo
            if (data.complementoo) {
                container.querySelector('.complemento-input').value = data.complementoo || '';
            } else {
                container.querySelector('.complemento-input').value = ''; // Limpa o campo de complementoo se não houver valor
            }

            // Substitui a sigla do estado pela nome completo do estado
            const estadoFullName = estadoDictionary[data.uf] || ''; // Procura a sigla no dicionário
            container.querySelector('.estado-input').value = estadoFullName;
        })
        .catch(error => {
            console.error('Erro ao buscar o CEP:', error);
            // Limpa os campos de endereço em caso de erro
            const container = document.getElementById(container_id);
            container.querySelector('.rua-input').value = '';
            container.querySelector('.bairro-input').value = '';
            container.querySelector('.cidade-input').value = '';
            container.querySelector('.estado-input').value = '';
            container.querySelector('.complemento-input').value = ''; // Limpa o campo de complementoo em caso de erro
        });
}



