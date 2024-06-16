const { format, parseISO, isValid } = require('date-fns');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const path = require('path');
const fs = require('fs').promises;

async function getNameFromGeonameId(geonameId) {
    const response = await fetch(`http://api.geonames.org/getJSON?geonameId=${geonameId}&username=izann_brum`);
    const data = await response.json();
    return data;
}

async function loadCountryTranslations() {
    const translationsPath = path.join(__dirname, '../public/json/countryTranslations.json');
    const fileContent = await fs.readFile(translationsPath, 'utf-8');
    return JSON.parse(fileContent);
}

async function processFormData(formData) {
    const processedData = { ...formData };

    // Carregar as traduções dos países
    const countryTranslations = await loadCountryTranslations();

    // Substitua os códigos pelos nomes usando a API
    if (formData.pais_nascimento) {
        const countryData = await getNameFromGeonameId(formData.pais_nascimento);
        const countryCode = countryData.countryCode;
        processedData.pais_nascimento = countryTranslations[countryCode] || countryData.name;
    }
    if (formData.estado_nascimento) {
        const stateData = await getNameFromGeonameId(formData.estado_nascimento);
        processedData.estado_nascimento = stateData.name;
    }
    if (formData.cidade_nascimento) {
        const cityData = await getNameFromGeonameId(formData.cidade_nascimento);
        processedData.cidade_nascimento = cityData.name;
    }

    // Ajustar o valor de 'aplicante'
    if (formData.aplicante === 'nao_principal') {
        processedData.aplicante = 'Não principal';
    } else if (formData.aplicante === 'principal') {
        processedData.aplicante = 'Principal';

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
            } else if (obj[key] && typeof obj[key] === 'object' && !(obj[key] instanceof Date)) {
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
