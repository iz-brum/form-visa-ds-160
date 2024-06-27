
// Função para mostrar ou ocultar o campo de situação do pai nos EUA
function toggleFatherStatusInUSA() {
    var radioButton = document.getElementById("pai_eua_sim");
    toggleFields(radioButton, "status_paiInUSA", "block");
}

// Função para mostrar ou ocultar o campo de situação da mãe nos EUA
function toggleMotherStatusInUSA() {
    var radioButton = document.getElementById("mae_eua_sim");
    toggleFields(radioButton, "status_mae_eua", "block");
}




