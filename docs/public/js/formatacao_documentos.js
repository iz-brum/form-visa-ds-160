// Funções relacionadas à formatação de números de documentos e exibição de campos adicionais

function formatar_numero_rg(input) {
    // Formata o número de RG
    let cleaned = input.value.replace(/\D/g, '');

    // Verifica se o número tem pelo menos 1 dígito
    if (cleaned.length > 1) {
        // Captura todos os dígitos, exceto o último
        let prefix = cleaned.slice(0, -1);
        // Captura o último dígito
        let verifier = cleaned.slice(-1);
        // Monta o número formatado
        cleaned = prefix.replace(/^(\d{2})(\d{3})(\d{3})/, '$1 $2.$3') + '-' + verifier;
    }

    input.value = cleaned;
}


function formatar_numero_cpf(input) {
    // Formata o número de CPF
    let cleaned = input.value.replace(/\D/g, '');

    // Verifica se o número tem pelo menos 1 dígito
    if (cleaned.length > 1) {
        // Captura os nove primeiros dígitos (prefixo)
        let prefix = cleaned.slice(0, -2);
        // Captura os dois últimos dígitos (sufixo)
        let suffix = cleaned.slice(-2);
        // Monta o número formatado
        cleaned = prefix.replace(/^(\d{3})(\d{3})(\d{3})/, '$1.$2.$3') + '-' + suffix;
    }

    // Atualiza o valor do input com o CPF formatado
    input.value = cleaned;
}



function formatar_numero_tin(input) {
    // Formata o número de identificação fiscal
    let cleaned = input.value.replace(/\D/g, '');
    
    if (cleaned.length >= 2) {
        cleaned = cleaned.replace(/^(\d{2})(\d{8})/, '$1-$2');
    }
    
    input.value = cleaned;
}

function formatar_numero_ssn(input) {
    // Formata o número de seguro social
    let cleaned = input.value.replace(/\D/g, '');

    if (cleaned.length >= 3) {
        cleaned = cleaned.replace(/^(\d{3})(\d{2})(\d{4})/, '$1-$2-$3');
    }

    input.value = cleaned;
}
