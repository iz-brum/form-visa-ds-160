function togglePassportQuestions(hasLostOrStolen) {
    var passportNumberQuestion = document.getElementById('passportNumberQuestion');
    var passportIssuingCountryQuestion = document.getElementById('passportIssuingCountryQuestion');
    
    if (hasLostOrStolen) {
        passportNumberQuestion.style.display = 'block';
        passportIssuingCountryQuestion.style.display = 'block';
    } else {
        passportNumberQuestion.style.display = 'none';
        passportIssuingCountryQuestion.style.display = 'none';
    }
}
