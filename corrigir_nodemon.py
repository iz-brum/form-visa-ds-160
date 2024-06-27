import os

# Diretório onde o node_modules está instalado
node_modules_dir = 'D:/dev/anthony/form-visa-ds-160/node_modules'

# Função para substituir 'indiceOf' por 'indexOf' em um arquivo
def substituir_indiceof_por_indexof(caminho_arquivo):
    with open(caminho_arquivo, 'r', encoding='utf-8') as arquivo:
        conteudo = arquivo.read()
    
    conteudo_corrigido = conteudo.replace('indiceOf', 'indexOf')
    
    with open(caminho_arquivo, 'w', encoding='utf-8') as arquivo:
        arquivo.write(conteudo_corrigido)

# Percorrer todos os arquivos no diretório node_modules
for raiz, _, arquivos in os.walk(node_modules_dir):
    for arquivo in arquivos:
        if arquivo.endswith('.js'):
            caminho_arquivo = os.path.join(raiz, arquivo)
            substituir_indiceof_por_indexof(caminho_arquivo)

print("Substituições concluídas com sucesso.")
