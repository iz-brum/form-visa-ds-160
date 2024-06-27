const { format, parseISO, isValid } = require('date-fns');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// async function getNameFromGeonameId(geonameId) {
//     const response = await fetch(`http://api.geonames.org/getJSON?geonameId=${geonameId}&username=izann_brum`);
//     const data = await response.json();
//     return data.name;
// }

async function processFormData(formData) {
    const processedData = { ...formData };

    // Substitua os códigos pelos nomes usando a API
    if (formData.pais_nascimento) {
        processedData.pais_nascimento = await getNameFromGeonameId(formData.pais_nascimento);
    }
    if (formData.estado_nascimento) {
        processedData.estado_nascimento = await getNameFromGeonameId(formData.estado_nascimento);
    }
    if (formData.cidade_nascimento) {
        processedData.cidade_nascimento = await getNameFromGeonameId(formData.cidade_nascimento);
    }
    if (formData.nacionalidade) {
        processedData.nacionalidade = formData.nacionalidade; // Se a nacionalidade já está como nome, não há necessidade de traduzir
    }
    if (formData.outra_nacionalidade) {
        processedData.outra_nacionalidade = formData.outra_nacionalidade; // Se a outra nacionalidade já está como nome, não há necessidade de traduzir
    }

    // Função para remover campos vazios e arrays vazios
    const removeEmptyFields = (obj) => {
        Object.keys(obj).forEach(key => {
            if (Array.isArray(obj[key])) {
                // Remove arrays vazios
                obj[key] = obj[key].filter(value => value !== '' && value !== null && value !== undefined);
                if (obj[key].length === 0) {
                    delete obj[key];
                }
            } else if (obj[key] && typeof obj[key] === 'object') {
                // Recursivamente remover campos vazios de objetos
                obj[key] = removeEmptyFields(obj[key]);
                if (Object.keys(obj[key]).length === 0) {
                    delete obj[key];
                }
            } else if (obj[key] === '' || obj[key] === null || obj[key] === undefined) {
                delete obj[key];
            }
        });
        return obj;
    };

    // Remover campos não definidos
    return removeEmptyFields(processedData);
}

module.exports = { getNameFromGeonameId, processFormData };
