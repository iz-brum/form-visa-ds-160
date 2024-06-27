
function openPopup() {
    document.getElementById('popup_informacoes').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup_informacoes').style.display = 'none';
}

function toggleDoencaTransmissivel() {
    var radioButton = document.getElementById("sim_doenca_transmissivel");
    toggleFields(radioButton, "doenca_transmissivel_field", "block");
}

function toggleDisturbioMentalFields() {
    var radioButton = document.getElementById("sim_disturbio_mental");
    toggleFields(radioButton, "disturbio_mental_field", "block");
}

function toggleViciadoDrogasFields() {
    var radioButton = document.getElementById("sim_viciado_drogas");
    toggleFields(radioButton, "campo_viciado_drogas", "block");
}

function togglePresoCondenadoFields() {
    var radioButton = document.getElementById("preso_condenado_sim");
    toggleFields(radioButton, "preso_condenado", "block");
}

function toggleViolacaoLeiFields() {
    var radioButton = document.getElementById("violacao_lei_sim");
    toggleFields(radioButton, "violacao_lei_fields", "block");
}

function toggleExercicioProstituicaoFields() {
    var radioButton = document.getElementById("exercicio_prostituicao_sim");
    toggleFields(radioButton, "exercicio_prostituicao", "block");
}

function toggleExercicioProstituicaoFields() {
    var radioButton = document.getElementById("exercicio_prostituicao_sim");
    toggleFields(radioButton, "exercicio_prostituicao", "block");
}

function toggleLavagemDinheiroFields() {
    var radioButton = document.getElementById("lavagem_dinheiroSim");
    toggleFields(radioButton, "lavagem_dinheiro", "block");
}

function toggleAtividadeIlegalFields() {
    var radioButton = document.getElementById("atividade_ilegalSim");
    toggleFields(radioButton, "atividade_ilegal", "block");
}

function toggleAtividadesTerroristasFields() {
    var radioButton = document.getElementById("atividades_terroristas_sim");
    toggleFields(radioButton, "atividades_terroristas", "block");
}

function toggleAssistenciaTerroristaFields() {
    var radioButton = document.getElementById("apoio_terrorista_sim");
    toggleFields(radioButton, "apoio_terrorista", "block");
}

function toggleMembroOrganizacaoTerroristaFields() {
    var radioButton = document.getElementById("membro_organizacao_terrorista_sim");
    toggleFields(radioButton, "membro_organizacao_terrorista", "block");
}

function toggleGenocidioFields() {
    var radioButton = document.getElementById("genocidio_sim");
    toggleFields(radioButton, "genocidio", "block");
}

function toggleTorturaFields() {
    var radioButton = document.getElementById("tortura_sim");
    toggleFields(radioButton, "tortura", "block");
}

function toggleViolenciaFields() {
    var radioButton = document.getElementById("violencia_sim");
    toggleFields(radioButton, "violencia", "block");
}

function toggleViolacaoReligiosaFields() {
    var radioButton = document.getElementById("violacao_religiosaSim");
    toggleFields(radioButton, "violacao_religiosa", "block");
}

function toggleAudienciaDeportacaoFields() {
    var radioButton = document.getElementById("audiencia_deportacao_sim");
    toggleFields(radioButton, "audiencia_deportacao", "block");
}

function toggleFraudeImigracaoFields() {
    var radioButton = document.getElementById("fraude_imigracao_sim");
    toggleFields(radioButton, "fraude_imigracao", "block");
}

function toggleUltrapassouTempoVistoFields() {
    var radioButton = document.getElementById("ultrapassou_tempo_vistoSim");
    toggleFields(radioButton, "ultrapassou_tempo_visto", "block");
}

function toggleCustodiaCriancaFields() {
    var radioButton = document.getElementById("custodia_criancaSim");
    toggleFields(radioButton, "custodia_crianca", "block");
}

function toggleVotouViolacaoFields() {
    var radioButton = document.getElementById("votou_violacaoSim");
    toggleFields(radioButton, "votou_violacao", "block");
}

function toggleRenunciouCidadaniaFields() {
    var radioButton = document.getElementById("renunciou_cidadania_sim");
    toggleFields(radioButton, "renunciou_cidadania", "block");
}

