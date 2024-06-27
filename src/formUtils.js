import { format, parseISO, isValid } from 'date-fns';
import fetch from 'node-fetch';
import path from 'path';
import { promises as fs } from 'fs';

export async function getNameFromGeonameId(geonameId) {
    const response = await fetch(`https://api.geonames.org/getJSON?geonameId=${geonameId}&username=izann_brum`);
    const data = await response.json();
    return data;
}

async function loadCountryTranslations() {
    const translationsPath = path.join(__dirname, '../docs/public/json/paisTranslations.json');
    const fileContent = await fs.readFile(translationsPath, 'utf-8');
    return JSON.parse(fileContent);
}

export async function processFormData(formData) {
    const processedData = { ...formData };

    // Carregar as traduções dos países
    const paisTranslations = await loadCountryTranslations();

    // Substitua os códigos pelos nomes usando a API
    if (formData.pais_nascimento) {
        const paisData = await getNameFromGeonameId(formData.pais_nascimento);
        const paisCode = paisData.paisCode;
        processedData.pais_nascimento = paisTranslations[paisCode] || paisData.name;
    }
    if (formData.estado_nascimento) {
        const estadoData = await getNameFromGeonameId(formData.estado_nascimento);
        processedData.estado_nascimento = estadoData.name;
    }
    if (formData.cidade_nascimento) {
        const cidadeData = await getNameFromGeonameId(formData.cidade_nascimento);
        processedData.cidade_nascimento = cidadeData.name;
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
