



// Exemplo de uso para os campos de explicação de habilidades
function toggleExplicacaoHabilidades() {
    var radioButton = document.getElementById("habilidades_sim");
    toggleFields(radioButton, "explicacao_habilidades", "block");
}

// Exemplo de uso para os campos de serviço militar
function toggleServicoMilitarFields() {
    var radioButton = document.getElementById("sim_servico_militar");
    toggleFields(radioButton, "campos_servico_militar", "block");
}

// Exemplo de uso para os campos de serviço paramilitar
function toggleServicoParamilitarFields() {
    var radioButton = document.getElementById("sim_servico_paramilitar");
    toggleFields(radioButton, "campos_servico_paramilitar", "block");
}

function toggleOrganizacoes() {
    var participacao_sim = document.getElementById("participacao_sim");
    var organizacoes = document.getElementById("organizacoes");
    if (participacao_sim.checked) {
        organizacoes.style.display = "block";
        addOrganizacao();
    } else {
        organizacoes.style.display = "none";
        clearList();
    }
}

function showAdditionalOccupationQuestions() {
    var ocupacaoSelect = document.getElementById("ocupacao");
    var selectedOccupation = ocupacaoSelect.value;
    var perguntas_adicionais = document.getElementById("perguntas_adicionais");
    var secao_trabalho = document.getElementById("secao_trabalho");
    var secao_escola = document.getElementById("secao_escola");
    var descricao_desempregado = document.getElementById("descricao_desempregado");
    var aposentadoSection = document.getElementById("aposentado");

    // Reset display settings
    perguntas_adicionais.style.display = "block";
    secao_trabalho.style.display = "none";
    secao_escola.style.display = "none";
    descricao_desempregado.style.display = "none";
    aposentadoSection.style.display = "none";

    // Display fields based on selected ocupacao
    if (selectedOccupation === "empregado") {
        secao_trabalho.style.display = "block";
    } else if (selectedOccupation === "empregado e estudante") {
        secao_trabalho.style.display = "block";
        secao_escola.style.display = "block";
    } else if (selectedOccupation === "desempregado") {
        descricao_desempregado.style.display = "block";
    } else if (selectedOccupation === "desempregado e estudante") {
        secao_escola.style.display = "block";
        descricao_desempregado.style.display = "block";
    } else if (selectedOccupation === "aposentado") {
        aposentadoSection.style.display = "block";
    }
}

// Função para esconder todas as perguntas adicionais
function hideAdditionalQuestions() {
    var ocupacaoSelect = document.getElementById("ocupacao");
    var fieldsToHide = ["employmentQuestions", "employment&studentQuestions", "unemploymentQuestions", "unemployment&studentQuestions"];
    fieldsToHide.forEach(function (fieldId) {
        toggleFields(ocupacaoSelect, fieldId, "none");
    });
}

// Variável para contar o número de visitaas
var visitaCount2 = 0;

// Função para alternar a exibição do bloco de países visitaados
function togglePaisesVisitados() {
    var paises_visitaados = document.getElementById("paises_visitaados");
    var viagem_sim = document.getElementById("viagem_sim");
    if (viagem_sim.checked) {
        paises_visitaados.style.display = "block";
        // Adiciona automaticamente o campo de entrada para o primeiro país visitaado
        addVisit2();
    } else {
        paises_visitaados.style.display = "none";
        // // Remove todos os campos de entrada para os países visitaados
        clearVisitList();
    }
}

// Função para adicionar uma nova visitaa
function addVisit2() {
    const visitaMessages = document.getElementById('mensagens_visitaa_2');
    visitaMessages.innerHTML = ''; // Limpa todas as mensagens

    const lista_visitaas = document.getElementById("lista_visitaas");
    const newVisitDiv = document.createElement("div");
    newVisitDiv.classList.add("conjunto_campos_g2");

    const idSuffix = visitaCount2 + 1;

    const newVisitHTML = `
        <div class="indice" style="position: relative; margin: 0 auto; bottom: 9px; width: 25px; height: 25px; text-align: centro; border-radius: 50%; background-color: #007bff; color: #fff; line-height: 25px; font-size: 1.2em;">
            ${idSuffix}
        </div>
        <div class="envoltura_input">
            <input type="text" class="input_personalizado" name="visita" placeholder="">
            <label class="rotulo_personalizado">Informe o país visitaado</label>
        </div>
    `;

    newVisitDiv.innerHTML = newVisitHTML;
    lista_visitaas.appendChild(newVisitDiv);
    visitaCount2++;
}

// Função para remover a última visitaa adicionada
function removeLastVisit2() {
    var lista_visitaas = document.getElementById("lista_visitaas");
    const visitaMessages = document.getElementById('mensagens_visitaa_2'); // Div para mensagens de aviso

    // Remove a mensagem de aviso, se existir
    visitaMessages.innerHTML = ''; // Limpa todas as mensagens

    if (lista_visitaas.childElementCount > 1) {
        lista_visitaas.removeChild(lista_visitaas.lastChild);
        visitaCount2--;
    } else {
        // Cria mensagem de aviso
        const minVisitMessage = document.createElement('p');
        minVisitMessage.innerHTML = '<strong>Não é possível remover. Pelo menos uma visitaa deve ser mantida.</strong>';
        minVisitMessage.style.color = 'red'; // Cor vermelha
        visitaMessages.appendChild(minVisitMessage);

         // Limpar as mensagens de aviso após alguns segundos
         setTimeout(() => {
            visitaMessages.textContent = '';
            visitaMessages.style.display = 'none';
        }, 5000);

        return;
    }
}


// Função para limpar a lista de países visitaados
function clearVisitList() {
    var lista_visitaas = document.getElementById("lista_visitaas");
    lista_visitaas.innerHTML = "";
    visitaCount2 = 0;
}


// Variável para contar o número de organizações
var org = 0;

// Função para alternar a exibição do bloco de organizações
function toggleOrganizacoes() {
    var participacao_sim = document.getElementById("participacao_sim");
    var organizacoes = document.getElementById("organizacoes");
    if (participacao_sim.checked) {
        organizacoes.style.display = "block";
        addOrganizacao();
    } else {
        organizacoes.style.display = "none";
        clearList();
    }
}

// Função para adicionar uma nova organização
function addOrganizacao() {
    const organizacoesMessages = document.getElementById('mensagens_organizacao');
    // Remove a mensagem de aviso, se existir
    organizacoesMessages.innerHTML = ''; // Limpa todas as mensagens

    const lista_organizacoes = document.getElementById("lista_organizacoes");
    const newOrganizacaoDiv = document.createElement("div");
    newOrganizacaoDiv.classList.add("conjunto_campos_g2");

    const idSuffix = lista_organizacoes.children.length + 1;

    const newOrganizacaoHTML = `
        <div class="indice" style="position: relative; margin: 0 auto; bottom: 9px; width: 25px; height: 25px; text-align: centro; border-radius: 50%; background-color: #007bff; color: #fff; line-height: 25px; font-size: 1.2em;">
            ${idSuffix}
        </div>
        <div class="envoltura_input">
            <input type="text" class="input_personalizado" name="organizacao" placeholder="">
            <label class="rotulo_personalizado">Nome completo</label>
        </div>
    `;

    newOrganizacaoDiv.innerHTML = newOrganizacaoHTML;
    lista_organizacoes.appendChild(newOrganizacaoDiv);
    org++;
}


// Função para remover a última visitaa adicionada
function removeLastOrganizacao() {
    var lista_organizacoes = document.getElementById("lista_organizacoes");
    const organizacoesMessages = document.getElementById('mensagens_organizacao'); // Div para mensagens de aviso

    // Remove a mensagem de aviso, se existir
    organizacoesMessages.innerHTML = ''; // Limpa todas as mensagens

    if (lista_organizacoes.childElementCount > 1) {
        lista_organizacoes.removeChild(lista_organizacoes.lastChild);
        org--;
    } else {
        // Cria mensagem de aviso
        const minOrganizationMessage = document.createElement('p');
        minOrganizationMessage.style.color = 'red'; // Cor vermelha
        minOrganizationMessage.innerHTML = '<strong>Não é possível remover. Pelo menos uma organização deve ser mantida.</strong>';
        organizacoesMessages.appendChild(minOrganizationMessage);

         // Limpar as mensagens de aviso após alguns segundos
         setTimeout(() => {
            organizacoesMessages.textContent = '';
            organizacoesMessages.style.display = 'none';
        }, 5000);

        return;
    }
}

// Função para remover todas as organizações
function clearList() {
    const lista_organizacoes = document.getElementById("lista_organizacoes");
    lista_organizacoes.innerHTML = '';
    org = 0;
}


// --------------------------- LISTA DE INSTITUIÇÕES -------------------------------------

// Função para popular o seletor de instituições a partir de um arquivo CSV
async function populateInstitutionsFromCSV(csvData) {
    try {

        const selectElement = document.getElementById('selecao_instituicao');
        selectElement.innerHTML = '<option selected disabled hidden value="">Selecione a Instituição</option>';

        // Adiciona a opção "Inserir Manualmente"
        const manualOption = document.createElement('option');
        manualOption.value = 'manual';
        manualOption.textContent = 'INSERIR MANUALMENTE';
        selectElement.appendChild(manualOption);

        const lines = csvData.split('\n');
        lines.forEach(line => {
            const [name, acronym, estado] = line.split(',').map(field => field.trim());
            const institutionInfo = `${name} - ${acronym} - ${estado}`;
            const option = document.createElement('option');
            option.value = institutionInfo;
            option.textContent = institutionInfo;
            selectElement.appendChild(option);
        });


        // Inicializa o Select2 no seletor
        $(selectElement).select2();
    } catch (error) {
        console.error('Erro ao popular as instituições a partir do CSV:', error);
    }
}


function toggleManual() {
    const selectElement = document.getElementById('selecao_instituicao');
    const manualEntryDiv = document.getElementById('inserir_instituicao_manual');

    const selectElementCourse = document.getElementById('curso_estudo_instituicao');
    const manualEntryDivCourse = document.getElementById('inserir_curso_manual');

    if (selectElement && manualEntryDiv) {
        const selectedValue = selectElement.value;
        console.log('Opção selecionada:', selectedValue);

        // Mostra ou esconde a entrada manual com uma expressão ternária
        manualEntryDiv.style.display = selectedValue === 'manual' ? 'block' : 'none';
    } else {
        console.error('Elementos não encontrados.');
    }

    if (selectElementCourse && manualEntryDivCourse) {
        const selectedValueCourse = selectElementCourse.value;
        console.log('Opção selecionada:', selectedValueCourse);

        // Mostra ou esconde a entrada manual com uma expressão ternária
        manualEntryDivCourse.style.display = selectedValueCourse === 'manual' ? 'block' : 'none';
    } else {
        console.error('Elementos não encontrados.');
    }

}

// Função para fazer a requisição e obter os dados do arquivo CSV
async function fetchCSVFile(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Falha ao carregar o arquivo CSV. Código de status: ${response.status}`);
        }
        const csvData = await response.text();
        return csvData;
    } catch (error) {
        throw new Error(`Erro ao carregar o arquivo CSV: ${error.message}`);
    }
}

// Event listener para carregar o arquivo CSV e popular o seletor de instituições
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const csvFileUrl = 'public/csv/universidades.csv'; // Substitua pelo URL do seu arquivo CSV
        const csvData = await fetchCSVFile(csvFileUrl);
        populateInstitutionsFromCSV(csvData);
    } catch (error) {
        console.error('Erro ao carregar o arquivo CSV:', error);
    }
});



// --------------------------- LISTA DE CURSOS -------------------------------------

async function populateCoursesFromJson() {
    try {
        // Simulando a obtenção dos dados do JSON
        const coursesJson = await fetch('public/json/run_results.json');
        const coursesData = await coursesJson.json();
        return coursesData.courses_in_order;
    } catch (error) {
        throw new Error(`Erro ao carregar os cursos do JSON: ${error.message}`);
    }
}

async function populateCoursesSelectorFromJson(selectorId) {
    try {
        const coursesInOrder = await populateCoursesFromJson();
        const selectElement = document.getElementById(selectorId);

        // Adiciona a opção "Inserir Manualmente"
        const manualOption = document.createElement('option');
        manualOption.value = 'manual';
        manualOption.textContent = 'INSERIR MANUALMENTE';
        selectElement.appendChild(manualOption);

        // Adiciona os cursos como opções no seletor
        coursesInOrder.forEach(courseGroup => {
            for (const letterKey in courseGroup) {
                if (courseGroup.hasOwnProperty(letterKey)) {
                    const coursesArray = courseGroup[letterKey];
                    coursesArray.forEach(course => {
                        const optionElement = document.createElement('option');
                        optionElement.value = course;
                        optionElement.textContent = course;
                        selectElement.appendChild(optionElement);
                    });
                }
            }
        });
        // Inicializa o Select2 no seletor
        $(selectElement).select2();
    } catch (error) {
        console.error('Erro ao popular os cursos:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const selectorId = 'curso_estudo_instituicao';
    populateCoursesSelectorFromJson(selectorId);
});


function formatBRLCurrency(value) {
    const number = parseFloat(value.replace(/[^\d]/g, '')) / 100;
    if (isNaN(number)) return '';
    return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function handleSalaryInput(event) {
    const input = event.target;
    const formattedValue = formatBRLCurrency(input.value);
    input.value = formattedValue;
}

document.addEventListener('DOMContentLoaded', () => {
    const salaryInput = document.getElementById('salario_mensal');
    salaryInput.addEventListener('input', handleSalaryInput);
});