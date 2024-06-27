function togglePassportQuestions(hasLostOrStolen) {
    var numero_passaporteQuestion = document.getElementById('numero_passaporteQuestion');
    var pais_emissao_passaporteQuestion = document.getElementById('pais_emissao_passaporteQuestion');
    
    if (hasLostOrStolen) {
        numero_passaporteQuestion.style.display = 'block';
        pais_emissao_passaporteQuestion.style.display = 'block';
    } else {
        numero_passaporteQuestion.style.display = 'none';
        pais_emissao_passaporteQuestion.style.display = 'none';
    }
}
