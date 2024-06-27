import os
import re

# Lista de palavras reservadas do Bootstrap
palavras_reservadas_bootstrap = {
    # Layout
    'container', 'container-fluid', 'row', 'col', 'col-1', 'col-2', 'col-3', 'col-4', 'col-5', 'col-6', 'col-7', 'col-8', 'col-9', 'col-10', 'col-11', 'col-12',
    # Display
    'd-block', 'd-flex', 'd-inline', 'd-inline-block', 'd-inline-flex', 'd-none', 'd-lg-block', 'd-lg-flex', 'd-lg-inline', 'd-lg-inline-block', 'd-lg-inline-flex', 'd-lg-none',
    'd-md-block', 'd-md-flex', 'd-md-inline', 'd-md-inline-block', 'd-md-inline-flex', 'd-md-none', 'd-sm-block', 'd-sm-flex', 'd-sm-inline', 'd-sm-inline-block', 'd-sm-inline-flex', 'd-sm-none',
    'd-xl-block', 'd-xl-flex', 'd-xl-inline', 'd-xl-inline-block', 'd-xl-inline-flex', 'd-xl-none', 'd-xxl-block', 'd-xxl-flex', 'd-xxl-inline', 'd-xxl-inline-block', 'd-xxl-inline-flex', 'd-xxl-none',
    # Flexbox
    'flex-row', 'flex-column', 'flex-row-reverse', 'flex-column-reverse', 'flex-grow-0', 'flex-grow-1', 'flex-shrink-0', 'flex-shrink-1', 'flex-wrap', 'flex-nowrap', 'flex-wrap-reverse', 
    'justify-content-start', 'justify-content-end', 'justify-content-center', 'justify-content-between', 'justify-content-around', 'justify-content-evenly',
    'align-items-start', 'align-items-end', 'align-items-center', 'align-items-baseline', 'align-items-stretch', 'align-content-start', 'align-content-end', 'align-content-center', 'align-content-between',
    'align-content-around', 'align-content-stretch', 'align-self-auto', 'align-self-start', 'align-self-end', 'align-self-center', 'align-self-baseline', 'align-self-stretch',
    # Grid
    'g-0', 'g-1', 'g-2', 'g-3', 'g-4', 'g-5',
    'gx-0', 'gx-1', 'gx-2', 'gx-3', 'gx-4', 'gx-5',
    'gy-0', 'gy-1', 'gy-2', 'gy-3', 'gy-4', 'gy-5',
    # Colors
    'bg-primary', 'bg-secondary', 'bg-success', 'bg-danger', 'bg-warning', 'bg-info', 'bg-light', 'bg-dark', 'bg-white', 'bg-transparent',
    'text-primary', 'text-secondary', 'text-success', 'text-danger', 'text-warning', 'text-info', 'text-light', 'text-dark', 'text-body', 'text-muted', 'text-black-50', 'text-white-50',
    # Spacing
    'm-0', 'm-1', 'm-2', 'm-3', 'm-4', 'm-5', 'mt-0', 'mt-1', 'mt-2', 'mt-3', 'mt-4', 'mt-5', 'me-0', 'me-1', 'me-2', 'me-3', 'me-4', 'me-5', 'mb-0', 'mb-1', 'mb-2', 'mb-3', 'mb-4', 'mb-5', 'ms-0', 'ms-1', 'ms-2',
    'ms-3', 'ms-4', 'ms-5', 'mx-0', 'mx-1', 'mx-2', 'mx-3', 'mx-4', 'mx-5', 'my-0', 'my-1', 'my-2', 'my-3', 'my-4', 'my-5', 'p-0', 'p-1', 'p-2', 'p-3', 'p-4', 'p-5', 'pt-0', 'pt-1', 'pt-2', 'pt-3', 'pt-4', 'pt-5',
    'pe-0', 'pe-1', 'pe-2', 'pe-3', 'pe-4', 'pe-5', 'pb-0', 'pb-1', 'pb-2', 'pb-3', 'pb-4', 'pb-5', 'ps-0', 'ps-1', 'ps-2', 'ps-3', 'ps-4', 'ps-5', 'px-0', 'px-1', 'px-2', 'px-3', 'px-4', 'px-5', 'py-0', 'py-1', 'py-2', 
    'py-3', 'py-4', 'py-5',
    # Typography
    'text-start', 'text-center', 'text-end', 'fs-1', 'fs-2', 'fs-3', 'fs-4', 'fs-5', 'fs-6', 'fw-light', 'fw-normal', 'fw-bold', 'lh-1', 'lh-sm', 'lh-base', 'lh-lg',
    # Borders
    'border', 'border-0', 'border-top', 'border-end', 'border-bottom', 'border-start', 'border-primary', 'border-secondary', 'border-success', 'border-danger', 'border-warning', 'border-info', 'border-light', 'border-dark',
    'border-white', 'rounded', 'rounded-0', 'rounded-1', 'rounded-2', 'rounded-3', 'rounded-top', 'rounded-end', 'rounded-bottom', 'rounded-start', 'rounded-circle', 'rounded-pill',
    # Shadows
    'shadow', 'shadow-sm', 'shadow-lg', 'shadow-none',
    # Components
    'accordion', 'alert', 'badge', 'breadcrumb', 'button', 'btn-close', 'btn-group', 'card', 'card-body', 'card-footer', 'card-header', 'carousel', 'dropdown', 'form', 'form-check', 'form-check-input', 'form-check-label',
    'form-control', 'form-control-lg', 'form-control-sm', 'form-floating', 'form-group', 'form-label', 'form-select', 'input-group', 'input-group-append', 'input-group-prepend', 'list-group', 'modal', 'modal-body', 'modal-content',
    'modal-dialog', 'modal-footer', 'modal-header', 'nav', 'nav-item', 'nav-link', 'navbar', 'navbar-brand', 'navbar-collapse', 'navbar-expand', 'navbar-light', 'navbar-dark', 'pagination', 'page-item', 'page-link', 'popover', 
    'progress', 'progress-bar', 'spinner-border', 'spinner-grow', 'table', 'table-responsive', 'toast', 'tooltip'
}


# Função para ler todos os arquivos em um diretório recursivamente
def ler_arquivos_recursivamente(diretorio):
    for raiz, _, arquivos in os.walk(diretorio):
        for arquivo in arquivos:
            if arquivo.endswith(('.html', '.css', '.js')):
                yield os.path.join(raiz, arquivo)

# Função para extrair IDs, names e classes de um arquivo
def extrair_ids_names_classes(caminho_arquivo):
    with open(caminho_arquivo, 'r', encoding='utf-8') as arquivo:
        conteudo = arquivo.read()

    ids = re.findall(r'id="([^"]+)"', conteudo)
    names = re.findall(r'name="([^"]+)"', conteudo)
    classes = re.findall(r'class="([^"]+)"', conteudo)

    return ids, names, classes

# Loop através de todos os arquivos e coletar IDs, names e classes
diretorio_projeto = './'  # Diretório raiz do projeto

todos_ids = set()
todos_names = set()
todas_classes = set()

for caminho_arquivo in ler_arquivos_recursivamente(diretorio_projeto):
    ids, names, classes = extrair_ids_names_classes(caminho_arquivo)
    todos_ids.update(ids)
    todos_names.update(names)
    for classe in classes:
        todas_classes.update(classe.split())  # Classes podem ser múltiplas em um único atributo

# Filtrar palavras reservadas do Bootstrap
todos_ids_filtrados = [id_ for id_ in todos_ids if id_ not in palavras_reservadas_bootstrap]
todos_names_filtrados = [name for name in todos_names if name not in palavras_reservadas_bootstrap]
todas_classes_filtradas = [classe for classe in todas_classes if classe not in palavras_reservadas_bootstrap]

# Criar um dicionário para armazenar os elementos filtrados
mapeamento_nomes_ids_classes_filtrados = {
    'ids': todos_ids_filtrados,
    'names': todos_names_filtrados,
    'classes': todas_classes_filtradas
}

# Exibir o resultado
import json
print(json.dumps(mapeamento_nomes_ids_classes_filtrados, indent=4, ensure_ascii=False))

# Opcional: Salvar o dicionário em um arquivo JSON para referência futura
with open('mapeamento_nomes_ids_classes_filtrados.json', 'w', encoding='utf-8') as arquivo_json:
    json.dump(mapeamento_nomes_ids_classes_filtrados, arquivo_json, indent=4, ensure_ascii=False)

print("IDs, names e classes foram extraídos, filtrados e salvos com sucesso.")
