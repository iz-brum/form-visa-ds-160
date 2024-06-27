// // Informações sobre Companheiros de Viagem - Funções Relacionadas


// Função para lidar com a opção de viajar sozinho ou não
function handleTravelingAlone() {
    var radioButton = document.getElementById("viajando_com_pessoas_nao");
    toggleFields(radioButton, "questoes_companheiros", "none");
}

// Função para lidar com o tipo de relacionamento dos companheiros de viagem
function handleRelationshipType() {
    var selectBox = document.getElementById("tipo_relacao");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;

    if (selectedValue === "familiar") {
        document.getElementById("questoes_familiares").style.display = "block";
        document.getElementById("questoes_grupo").style.display = "none";
    } else if (selectedValue === "grupo") {
        document.getElementById("questoes_familiares").style.display = "none";
        document.getElementById("questoes_grupo").style.display = "block";
    } else {
        // Opção inválida selecionada ou não selecionada
        document.getElementById("questoes_familiares").style.display = "none";
        document.getElementById("questoes_grupo").style.display = "none";
    }
}


