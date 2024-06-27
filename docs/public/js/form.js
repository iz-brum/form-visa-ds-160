
document.addEventListener('DOMContentLoaded', function () {
    const radioButtons = document.querySelectorAll('input[name="outros_nomes_usados"]');

    radioButtons.forEach(radio => {
        radio.addEventListener('change', toggleOtherNamesFields);
    });

    function toggleOtherNamesFields() {
        radioButtons.forEach(radio => {
            const label = radio.parentElement;
            if (radio.checked) {
                label.classList.add('selected');
            } else {
                label.classList.remove('selected');
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('data_nascimento').setAttribute('max', today);
});

// Chamando a função para preencher todos os dropdowns de países
document.addEventListener("DOMContentLoaded", function () {
    const paisSelectIds = [
        "pais_nascimento",
        "pais_emissao_passaporte",
        "pais_emissao_passaporteEmissor",
        "pais_emissao_passaporte_perdido"
    ];
    populateCountrySelect(paisSelectIds);
});

document.addEventListener("DOMContentLoaded", function () {
    console.log('segundo DomContentLoaded');

    const sections = document.querySelectorAll("section");
    const totalSteps = sections.length;
    let currentSection = parseInt(localStorage.getItem('currentSection')) || 0;

    document.querySelector('.progress-text').textContent = `${currentSection + 1} de ${totalSteps}`;

    const sectionTitles = [
        "FORMULÁRIO DS-160",
        "ESCOLHA DO CONSULADO",
        "DADOS PESSOAIS",
        "VIAGEM AOS EUA",
        "COMPANHEIROS DE VIAGEM",
        "VIAGENS ANTERIORES AO EUA",
        "ENDEREÇO E CONTATOS",
        "PASSAPORTE",
        "REDES SOCIAIS",
        "CONTATOS NO EUA",
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
        document.getElementById('form-title').innerText = sectionTitles[indice];
        document.getElementById('next-step').innerText = `Next: ${sectionTitles[indice + 1] || 'Fim'}`;
        updateProgressCircle(indice);
    }

    function updateProgressCircle(indice) {
        const progressCircle = document.querySelector('.progress-circle-fill');
        const text = document.querySelector('.progress-text');
        const progress = ((indice + 1) / totalSteps) * 125.6;
        progressCircle.style.strokeDashoffset = 125.6 - progress;
        text.textContent = `${indice + 1} of ${totalSteps}`;
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
        button.addEventListener("click", nextSection);
    });

    const prevButtons = document.querySelectorAll(".secao_anterior");
    prevButtons.forEach(button => {
        button.addEventListener("click", prevSection);
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
    // console.log('não se aplica aplicado em ', inputId);
    var inputField = document.getElementById(inputId);
    inputField.value = "Not Apply";
}

// Selecionar elementos
const triggerParagraph = document.querySelector('.trigger-paragraph');
const popupContent = document.getElementById('conteudo_popup');
let popupVisible = false;
let hidePopupTimeout;


// Funções auxiliares
function togglePopupVisibility() {
    if (!popupVisible) {
        showPopup();
    } else {
        hidePopup();
    }
}

function showPopup() {
    popupContent.style.display = 'block';
    popupVisible = true;
}

function hidePopup() {
    popupContent.style.display = 'none';
    popupVisible = false;
}

function hidePopupWithDelay() {
    hidePopupTimeout = setTimeout(() => {
        hidePopup();
    }, 300); // 300ms delay
}

// Adicionar manipulador de eventos para fechar o pop-up ao clicar no ícone de fechar
const closeIcon = document.querySelector('.icone_fechar');
closeIcon.addEventListener('click', function () {
    hidePopup();
});

