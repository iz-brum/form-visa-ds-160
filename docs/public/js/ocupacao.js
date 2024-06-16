



// Exemplo de uso para os campos de explicação de habilidades
function toggleExplicacaoHabilidades() {
    var radioButton = document.getElementById("habilidadesSim");
    toggleFields(radioButton, "explicacaoHabilidades", "block");
}

// Exemplo de uso para os campos de serviço militar
function toggleServicoMilitarFields() {
    var radioButton = document.getElementById("simServicoMilitar");
    toggleFields(radioButton, "servicoMilitarFields", "block");
}

// Exemplo de uso para os campos de serviço paramilitar
function toggleServicoParamilitarFields() {
    var radioButton = document.getElementById("simServicoParamilitar");
    toggleFields(radioButton, "servicoParamilitarFields", "block");
}

function toggleOrganizacoes() {
    var participacaoSim = document.getElementById("participacaoSim");
    var organizacoes = document.getElementById("organizacoes");
    if (participacaoSim.checked) {
        organizacoes.style.display = "block";
        addOrganizacao();
    } else {
        organizacoes.style.display = "none";
        clearList();
    }
}

function showAdditionalOccupationQuestions() {
    var occupationSelect = document.getElementById("occupation");
    var selectedOccupation = occupationSelect.value;
    var additionalQuestions = document.getElementById("additionalQuestions");
    var workSection = document.getElementById("workSection");
    var schoolSection = document.getElementById("schoolSection");
    var unemployedDescription = document.getElementById("unemployedDescription");
    var aposentadoSection = document.getElementById("aposentado");

    // Reset display settings
    additionalQuestions.style.display = "block";
    workSection.style.display = "none";
    schoolSection.style.display = "none";
    unemployedDescription.style.display = "none";
    aposentadoSection.style.display = "none";

    // Display fields based on selected occupation
    if (selectedOccupation === "empregado") {
        workSection.style.display = "block";
    } else if (selectedOccupation === "empregado e estudante") {
        workSection.style.display = "block";
        schoolSection.style.display = "block";
    } else if (selectedOccupation === "desempregado") {
        unemployedDescription.style.display = "block";
    } else if (selectedOccupation === "desempregado e estudante") {
        schoolSection.style.display = "block";
        unemployedDescription.style.display = "block";
    } else if (selectedOccupation === "aposentado") {
        aposentadoSection.style.display = "block";
    }
}

// Função para esconder todas as perguntas adicionais
function hideAdditionalQuestions() {
    var occupationSelect = document.getElementById("occupation");
    var fieldsToHide = ["employmentQuestions", "employment&studentQuestions", "unemploymentQuestions", "unemployment&studentQuestions"];
    fieldsToHide.forEach(function (fieldId) {
        toggleFields(occupationSelect, fieldId, "none");
    });
}

// Variável para contar o número de visitas
var visitCount2 = 0;

// Função para alternar a exibição do bloco de países visitados
function togglePaisesVisitados() {
    var paisesVisitados = document.getElementById("paisesVisitados");
    var viagemSim = document.getElementById("viagemSim");
    if (viagemSim.checked) {
        paisesVisitados.style.display = "block";
        // Adiciona automaticamente o campo de entrada para o primeiro país visitado
        addVisit2();
    } else {
        paisesVisitados.style.display = "none";
        // // Remove todos os campos de entrada para os países visitados
        clearVisitList();
    }
}

// Função para adicionar uma nova visita
function addVisit2() {
    const visitMessages = document.getElementById('visitMessages2');
    visitMessages.innerHTML = ''; // Limpa todas as mensagens

    const visitList = document.getElementById("visitList");
    const newVisitDiv = document.createElement("div");
    newVisitDiv.classList.add("fieldset-g2");

    const idSuffix = visitCount2 + 1;

    const newVisitHTML = `
        <div class="index" style="position: relative; margin: 0 auto; bottom: 9px; width: 25px; height: 25px; text-align: center; border-radius: 50%; background-color: #007bff; color: #fff; line-height: 25px; font-size: 1.2em;">
            ${idSuffix}
        </div>
        <div class="input-wrapper">
            <input type="text" class="custom-input" name="visit" placeholder="">
            <label class="custom-label">Informe o país visitado</label>
        </div>
    `;

    newVisitDiv.innerHTML = newVisitHTML;
    visitList.appendChild(newVisitDiv);
    visitCount2++;
}

// Função para remover a última visita adicionada
function removeLastVisit2() {
    var visitList = document.getElementById("visitList");
    const visitMessages = document.getElementById('visitMessages2'); // Div para mensagens de aviso

    // Remove a mensagem de aviso, se existir
    visitMessages.innerHTML = ''; // Limpa todas as mensagens

    if (visitList.childElementCount > 1) {
        visitList.removeChild(visitList.lastChild);
        visitCount2--;
    } else {
        // Cria mensagem de aviso
        const minVisitMessage = document.createElement('p');
        minVisitMessage.innerHTML = '<strong>Não é possível remover. Pelo menos uma visita deve ser mantida.</strong>';
        minVisitMessage.style.color = 'red'; // Cor vermelha
        visitMessages.appendChild(minVisitMessage);

         // Limpar as mensagens de aviso após alguns segundos
         setTimeout(() => {
            visitMessages.textContent = '';
            visitMessages.style.display = 'none';
        }, 5000);

        return;
    }
}


// Função para limpar a lista de países visitados
function clearVisitList() {
    var visitList = document.getElementById("visitList");
    visitList.innerHTML = "";
    visitCount2 = 0;
}


// Variável para contar o número de organizações
var org = 0;

// Função para alternar a exibição do bloco de organizações
function toggleOrganizacoes() {
    var participacaoSim = document.getElementById("participacaoSim");
    var organizacoes = document.getElementById("organizacoes");
    if (participacaoSim.checked) {
        organizacoes.style.display = "block";
        addOrganizacao();
    } else {
        organizacoes.style.display = "none";
        clearList();
    }
}

// Função para adicionar uma nova organização
function addOrganizacao() {
    const organizacoesMessages = document.getElementById('orgMessages');
    // Remove a mensagem de aviso, se existir
    organizacoesMessages.innerHTML = ''; // Limpa todas as mensagens

    const organizacoesList = document.getElementById("organizacoesList");
    const newOrganizacaoDiv = document.createElement("div");
    newOrganizacaoDiv.classList.add("fieldset-g2");

    const idSuffix = organizacoesList.children.length + 1;

    const newOrganizacaoHTML = `
        <div class="index" style="position: relative; margin: 0 auto; bottom: 9px; width: 25px; height: 25px; text-align: center; border-radius: 50%; background-color: #007bff; color: #fff; line-height: 25px; font-size: 1.2em;">
            ${idSuffix}
        </div>
        <div class="input-wrapper">
            <input type="text" class="custom-input" name="organizacao" placeholder="">
            <label class="custom-label">Nome completo</label>
        </div>
    `;

    newOrganizacaoDiv.innerHTML = newOrganizacaoHTML;
    organizacoesList.appendChild(newOrganizacaoDiv);
    org++;
}


// Função para remover a última visita adicionada
function removeLastOrganizacao() {
    var organizacoesList = document.getElementById("organizacoesList");
    const organizacoesMessages = document.getElementById('orgMessages'); // Div para mensagens de aviso

    // Remove a mensagem de aviso, se existir
    organizacoesMessages.innerHTML = ''; // Limpa todas as mensagens

    if (organizacoesList.childElementCount > 1) {
        organizacoesList.removeChild(organizacoesList.lastChild);
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
    const organizacoesList = document.getElementById("organizacoesList");
    organizacoesList.innerHTML = '';
    org = 0;
}


// --------------------------- LISTA DE INSTITUIÇÕES -------------------------------------

// Função para popular o seletor de instituições a partir de um arquivo CSV
async function populateInstitutionsFromCSV(csvData) {
    try {

        const selectElement = document.getElementById('instituicaoSelecao');
        selectElement.innerHTML = '<option selected disabled hidden value="">Selecione a Instituição</option>';

        // Adiciona a opção "Inserir Manualmente"
        const manualOption = document.createElement('option');
        manualOption.value = 'manual';
        manualOption.textContent = 'INSERIR MANUALMENTE';
        selectElement.appendChild(manualOption);

        const lines = csvData.split('\n');
        lines.forEach(line => {
            const [name, acronym, state] = line.split(',').map(field => field.trim());
            const institutionInfo = `${name} - ${acronym} - ${state}`;
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
    const selectElement = document.getElementById('instituicaoSelecao');
    const manualEntryDiv = document.getElementById('enter-institution-manually');

    const selectElementCourse = document.getElementById('cursoEstudoInstituicao');
    const manualEntryDivCourse = document.getElementById('enter-course-manually');

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
        const csvFileUrl = '/csv/universidades.csv'; // Substitua pelo URL do seu arquivo CSV
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
        const coursesJson = await fetch('json/run_results.json');
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
    const selectorId = 'cursoEstudoInstituicao';
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
    const salaryInput = document.getElementById('monthlySalary');
    salaryInput.addEventListener('input', handleSalaryInput);
});