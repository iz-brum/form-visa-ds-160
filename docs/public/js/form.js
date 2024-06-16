document.addEventListener('DOMContentLoaded', function () {
    const radioButtons = document.querySelectorAll('input[name="used_other_names"]');
    
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

document.addEventListener('DOMContentLoaded', function() {
    const daySelect = document.getElementById('dia_nascimento');
    const monthSelect = document.getElementById('mes_nascimento');
    const yearSelect = document.getElementById('ano_nascimento');

    // Obter a data atual
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Os meses em JavaScript começam em zero
    const currentDay = currentDate.getDate();

    // Função para determinar se um ano é bissexto
    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    // Determinar o número de dias em um determinado mês e ano
    function daysInMonth(month, year) {
        if (month === 2) {
            return isLeapYear(year) ? 29 : 28;
        }
        return [4, 6, 9, 11].includes(month) ? 30 : 31;
    }

    // Preencher seleção de dias
    function fillDaySelect(keepDay) {
        const selectedMonth = parseInt(monthSelect.value);
        const selectedYear = parseInt(yearSelect.value);
        const numDays = daysInMonth(selectedMonth, selectedYear);
        const previousDay = daySelect.value;
        daySelect.innerHTML = ''; // Limpar as opções existentes

        for (let i = 1; i <= numDays; i++) {
            const option = document.createElement('option');
            option.text = i < 10 ? '0' + i : i;
            option.value = i < 10 ? '0' + i : i;
            daySelect.add(option);
        }

        // Manter o dia selecionado se possível, caso contrário, selecionar o último dia disponível
        if (keepDay) {
            daySelect.value = previousDay <= numDays ? previousDay : numDays;
        }
    }

    // Preencher seleção de meses com o nome completo de cada mês
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    for (let i = 1; i <= 12; i++) {
        const option = document.createElement('option');
        option.text = months[i - 1];
        option.value = i < 10 ? '0' + i : i;
        monthSelect.add(option);
    }

    // Preencher seleção de anos (do ano atual até 100 anos atrás)
    for (let i = currentYear; i >= currentYear - 100; i--) {
        const option = document.createElement('option');
        option.text = i;
        option.value = i;
        yearSelect.add(option);
    }

    // Definir data mínima selecionável (um dia antes da data atual)
    const minSelectableDate = new Date(currentYear, currentMonth - 1, currentDay);
    yearSelect.value = minSelectableDate.getFullYear();
    monthSelect.value = (minSelectableDate.getMonth() + 1) < 10 ? '0' + (minSelectableDate.getMonth() + 1) : (minSelectableDate.getMonth() + 1);
    fillDaySelect(true); // Preencher a seleção de dias inicialmente
    daySelect.value = (minSelectableDate.getDate()) < 10 ? '0' + (minSelectableDate.getDate()) : (minSelectableDate.getDate());

    // Desativar datas futuras
    daySelect.addEventListener('change', () => {
        if (yearSelect.value > minSelectableDate.getFullYear() ||
            (yearSelect.value == minSelectableDate.getFullYear() && monthSelect.value > minSelectableDate.getMonth() + 1) ||
            (yearSelect.value == minSelectableDate.getFullYear() && monthSelect.value == minSelectableDate.getMonth() + 1 && daySelect.value > minSelectableDate.getDate())) {
            yearSelect.value = minSelectableDate.getFullYear();
            monthSelect.value = (minSelectableDate.getMonth() + 1) < 10 ? '0' + (minSelectableDate.getMonth() + 1) : (minSelectableDate.getMonth() + 1);
            fillDaySelect(true); // Atualizar a seleção de dias
            daySelect.value = (minSelectableDate.getDate()) < 10 ? '0' + (minSelectableDate.getDate()) : (minSelectableDate.getDate());
        }
    });
    monthSelect.addEventListener('change', () => {
        fillDaySelect(true); // Atualizar a seleção de dias quando o mês mudar
        if (yearSelect.value > minSelectableDate.getFullYear() ||
            (yearSelect.value == minSelectableDate.getFullYear() && monthSelect.value > minSelectableDate.getMonth() + 1)) {
            yearSelect.value = minSelectableDate.getFullYear();
            monthSelect.value = (minSelectableDate.getMonth() + 1) < 10 ? '0' + (minSelectableDate.getMonth() + 1) : (minSelectableDate.getMonth() + 1);
        }
    });
    yearSelect.addEventListener('change', () => {
        fillDaySelect(true); // Atualizar a seleção de dias quando o ano mudar
        if (yearSelect.value > minSelectableDate.getFullYear()) {
            yearSelect.value = minSelectableDate.getFullYear();
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    populateCountrySelect("pais_nascimento"); // Para o país de nascimento
    populateCountrySelect("passportIssuingCountry"); // Para o país do passaporte
    populateCountrySelect("passportIssuingCountryEmissor"); // Para o país emissor do passaporte
    populateCountrySelect("passportIssuingCountryLost");  // Para o país emissor do passaporte roubado
});

document.addEventListener("DOMContentLoaded", function () {
    console.log('segundo DomContentLoaded');

    const sections = document.querySelectorAll("section");
    let currentSection = 0;

    function showSection(index) {
        // Oculta todas as seções
        sections.forEach(section => section.style.display = "none");
        // Exibe a seção desejada
        sections[index].style.display = "block";
        // Move o foco para o topo da página
        window.scrollTo(0, 0);
    }

    function nextSection() {
        if (currentSection < sections.length - 1) {
            currentSection++;
            showSection(currentSection);
        }
    }

    function prevSection() {
        if (currentSection > 0) {
            currentSection--;
            showSection(currentSection);
        }
    }

    const nextButtons = document.querySelectorAll(".next-section");
    nextButtons.forEach(button => {
        button.addEventListener("click", nextSection);
    });

    const prevButtons = document.querySelectorAll(".prev-section");
    prevButtons.forEach(button => {
        button.addEventListener("click", prevSection);
    });
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

// Evento para aparelhos móveis
const triggerParagraphMobile = document.querySelector('.trigger-paragraph-mobile');
const popupContent = document.getElementById('popup-content');
let popupVisible = false;

triggerParagraphMobile.addEventListener('touchstart', function (event) {
    event.preventDefault();
    togglePopupVisibility();
});

// Evento para dispositivos não móveis
const triggerParagraphDesktop = document.querySelector('.trigger-paragraph-desktop');

triggerParagraphDesktop.addEventListener('mouseenter', function (event) {
    showPopup();
});

triggerParagraphDesktop.addEventListener('mouseleave', function (event) {
    hidePopup();
});

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

// Adicionar manipulador de eventos para fechar o pop-up ao clicar no ícone de fechar
const closeIcon = document.querySelector('.close-icon');
closeIcon.addEventListener('click', function () {
    hidePopup();
});
