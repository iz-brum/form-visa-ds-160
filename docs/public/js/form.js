document.addEventListener('DOMContentLoaded', function () {
    const currentYear = new Date().getFullYear();
    const dataOcorridoInput = document.getElementById('data_ocorrido');
    if (dataOcorridoInput) {
        dataOcorridoInput.setAttribute('max', currentYear);
    }

    const today = new Date().toISOString().split('T')[0];
    const dataNascimentoInput = document.getElementById('data_nascimento');
    if (dataNascimentoInput) {
        dataNascimentoInput.setAttribute('max', today);
    }

    // Load saved form data
    loadFormData();

    const sections = document.querySelectorAll("section");
    const totalSteps = sections.length;
    let currentSection = parseInt(localStorage.getItem('currentSection')) || 0;

    document.querySelector('.progress_text').textContent = `${currentSection + 1} de ${totalSteps}`;

    const sectionTitles = [
        "FORMULÁRIO DS-160",
        "ESCOLHA DO CONSULADO",
        "DADOS PESSOAIS",
        "VIAGEM AOS EUA",
        "COMPANHEIROS DE VIAGEM",
        "VIAGENS ANTERIORES AOS EUA",
        "ENDEREÇO E CONTATO",
        "PASSAPORTE",
        "REDES SOCIAIS",
        "CONTATOS NOS EUA",
        "FAMILIARES",
        "OCUPAÇÃO ATUAL",
        "OCUPAÇÕES ANTERIORES",
        "DADOS MÉDICO, CRIMINAIS E DE SEGURANÇA",
        "VISTO DE ESTUDANTE"
    ];

    function showSection(indice) {
        // Oculta todas as seções
        sections.forEach(section => section.style.display = "none");
        // Exibe a seção desejada
        sections[indice].style.display = "block";
        // Move o foco para o topo da página
        window.scrollTo(0, 0);

        // Atualiza a barra de progresso e o indicador de etapa
        document.getElementById('form_title').innerText = sectionTitles[indice];
        document.getElementById('next_step').innerText = `Next: ${sectionTitles[indice + 1] || 'Fim'}`;
        updateProgressCircle(indice);
    }

    function updateProgressCircle(indice) {
        const progressCircle = document.querySelector('.progress_circle_fill');
        const text = document.querySelector('.progress_text');
        const progress = ((indice + 1) / totalSteps) * 125.6;
        progressCircle.style.strokeDashoffset = 125.6 - progress;
        text.textContent = `${indice + 1} de ${totalSteps}`;
    }

    function nextSection() {
        if (currentSection < sections.length - 1) {
            currentSection++;
            localStorage.setItem('currentSection', currentSection);
            showSection(currentSection);
        }
    }

    function prevSection() {
        if (currentSection > 0) {
            currentSection--;
            localStorage.setItem('currentSection', currentSection);
            showSection(currentSection);
        }
    }

    const nextButtons = document.querySelectorAll(".proxima_secao");
    nextButtons.forEach(button => {
        button.addEventListener("click", () => {
            saveFormData();
            nextSection();
        });
    });

    const prevButtons = document.querySelectorAll(".secao_anterior");
    prevButtons.forEach(button => {
        button.addEventListener("click", () => {
            saveFormData();
            prevSection();
        });
    });

    // Salva o formulário após cada alteração de input
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', saveFormData);
        input.addEventListener('change', saveFormData); // Garantir que selects e outros inputs disparem o salvamento
    });

    // Mostra a seção salva ou a primeira seção
    showSection(currentSection);
});


// Função genérica para mostrar ou ocultar campos
function toggleFields(inputElement, targetElementId, action) {
    var targetElement = document.getElementById(targetElementId);

    // Verificar o tipo de elemento de entrada
    if (inputElement.type === "radio") {
        // Se for um elemento de rádio, verifique se está marcado
        if (inputElement.checked) {
            targetElement.style.display = action;
        } else {
            targetElement.style.display = (action === "block") ? "none" : "block";
        }

    } else if (inputElement.tagName === "SELECT") {
        // Se for um elemento <select>, use o valor selecionado
        if (inputElement.value === "Sim") {
            targetElement.style.display = action;
        } else {
            targetElement.style.display = (action === "block") ? "none" : "block";
        }
    }
}

function toggleFieldForOtherOption(selectElement, targetElementId, action) {
    var targetElement = document.getElementById(targetElementId);
    var selectedOption = selectElement.value;

    if (selectedOption === "Outros/Especifique" || selectedOption === "Outros") {
        targetElement.style.display = action;
    } else {
        targetElement.style.display = "none";
    }
}

function setNaoSeAplica(inputId) {
    var inputField = document.getElementById(inputId);
    inputField.value = "Not Apply";
}

const triggerParagraph = document.querySelector('.trigger-paragraph');
const popupContent = document.getElementById('conteudo_popup');
const closeIcon = document.querySelector('.icone_fechar');
let popupVisible = false;
let hidePopupTimeout;

// Função para alternar a visibilidade do popup
function togglePopupVisibility() {
    if (!popupVisible) {
        showPopup();
    } else {
        hidePopup();
    }
}

// Função para exibir o popup
function showPopup() {
    popupContent.style.display = 'block';
    popupVisible = true;
}

// Função para ocultar o popup
function hidePopup() {
    popupContent.style.display = 'none';
    popupVisible = false;
}

// Adicionar manipulador de eventos para o parágrafo acionador
triggerParagraph.addEventListener('click', togglePopupVisibility);

// Adicionar manipulador de eventos para fechar o popup ao clicar no ícone de fechar
closeIcon.addEventListener('click', hidePopup);

// Função para salvar os dados do formulário
function saveFormData() {
    const formData = {};
    const formElements = document.querySelectorAll('input, select, textarea');

    formElements.forEach(element => {
        if (element.type !== 'button' && element.type !== 'submit' && element.type !== 'reset') {
            if (element.value !== null && element.value !== undefined && element.value !== "") {
                formData[element.id] = element.value;
            }
        }
    });

    localStorage.setItem('formData', JSON.stringify(formData));
    console.log("Dados salvos no Local Storage");
}

// Função para carregar os dados do formulário
function loadFormData() {
    const formData = JSON.parse(localStorage.getItem('formData'));

    if (formData) {
        const formElements = document.querySelectorAll('input, select, textarea');

        formElements.forEach(element => {
            if (formData[element.id] !== undefined) {
                element.value = formData[element.id];
            }
        });

        console.log("Dados carregados do Local Storage");
    }
}
