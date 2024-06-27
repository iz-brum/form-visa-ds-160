
document.addEventListener('DOMContentLoaded', function () {
    // Seleciona o ícone de interrogação
    const questionIcon = document.getElementById('icone_pergunta');
    // Seleciona o pop-up
    const popup = document.getElementById('popup');
    // Adiciona um evento de clique ao ícone de interrogação
    questionIcon.addEventListener('click', function () {
        // Exibe o pop-up ao clicar no ícone
        popup.style.display = 'block';
    });
    
    // Seleciona o ícone de fechar
    const closeIcon = document.getElementById('icone_fechar');
    // Adiciona um evento de clique ao ícone de fechar
    closeIcon.addEventListener('click', function () {
        // Esconde o pop-up ao clicar no ícone de fechar
        popup.style.display = 'none';
    });
});


function toggleApplicantTypeQuestions() {
    const applicantType = document.querySelector('input[name="aplicante"]:checked').id;

    if (applicantType === 'aplicante_principal_sim') {
        document.getElementById('questoes_aplicante_principal').style.display = 'block';
        document.getElementById('questoes_aplicante_nao_principal').style.display = 'none';
    } else if (applicantType === 'aplicante_principal_nao') {
        document.getElementById('questoes_aplicante_principal').style.display = 'none';
        document.getElementById('questoes_aplicante_nao_principal').style.display = 'block';
    }
}

function showReasonForTravel() {
    const motivo = document.getElementById('motivo_viagem').value;

    if (motivo === 'Outros') {
        document.getElementById('outros_especificacao_motivo').style.display = 'block';
    } else {
        document.getElementById('outros_especificacao_motivo').style.display = 'none';
    }
}

function showReasonForTravel() {
    const motivo = document.getElementById('motivo_viagem').value;

    if (motivo === 'Outros') {
        document.getElementById('outros_especificacao_motivo').style.display = 'block';
    } else {
        document.getElementById('outros_especificacao_motivo').style.display = 'none';
    }
}

function showAdditionalFieldsVisaCategory() {
    var visaCategory = document.getElementById('categoria_visto').value;
    var sevisIdContainer = document.getElementById('container_sevis_id');
    var petitionNumberContainer = document.getElementById('container_numero_peticao');

    if (visaCategory === 'Estudante') {
        sevisIdContainer.style.display = 'block';
        petitionNumberContainer.style.display = 'none';
    } 
    else {
        sevisIdContainer.style.display = 'none';
        petitionNumberContainer.style.display = 'block';
    }
}

