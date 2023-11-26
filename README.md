# Desafio entrevista Transfeera
![image](https://github.com/GuilhermeDaBolsa/Transfeera/assets/39105309/5e75ad65-b6be-4ef1-96ca-2fef67d2f53b)

<br/>

## Baixando e instalando o projeto

- Clone o repositório para um pasta.
- Instale as dependências (abra um terminal na pasta do projeto e rode o comando)
````
npm ci
````
(obs) é possível executar também o famoso "npm i" porém não é recomendado.

<br/>

## Executando o projeto
O projeto possui 3 "servidores", sendo eles: • "backend" • frontend • testes.

Para rodar o • "backend" abra um terminal e execute:
```
npm run backend
```

<br/>

Para rodar o • frontend abra um terminal e execute o seguinte comando:
```
npm run frontend
```
Após isso, basta acessar a URL http://localhost:3001 (caso demore muito para abrir na primeira vez, recarregue a página)

<br/>

Para rodar os • testes abra um terminal e execute:
```
npm run tests
```
Após isso uma nova tela será aberta automaticamente, selecione os testes E2E. <br/>
Nessa nova tela, haverá 3 arquivos dentro da pasta e2e chamados "create", "delete" e "edit". <br/>
Cada um desses arquivos cria, deleta e edita favorecidos, respectivamente. <br/>

<br/><br/>

## Configurações / Observações
- Backend está configurado para rodar na porta 3000 (importante para o front)
- Frontend está configurado para rodar na porta 3001 (importante para os testes)
- O projeto possui um arquivo db.json na raiz e ele serve como banco de dados.
- O projeto possui um arquivo db_original.json na raiz e ele é o JSON original do desafio.
- O projeto possui ao todo 5 testes E2E que abrangem criação, edição e remoção de favorecidos.
- (OBS) os testes de edição e remoção dependem da existecia de favorecidos (criados pelos testes de criação)

<br/><br/>

## Estrutura
- Pasta "views" contém as telas principais da aplicação (acessadas pela url)
- Pasta "components" contém elementos visuais repetidos ou importantes para a aplicação.
- Pasta "layouts" contém elementos estruturais padrão da aplicação.
- Pasta "utils" contém utilitários como máscaras, validações e outros elementos que podem ser reutilizados.

<br/><br/>

## Bibliotecas e Tecnologias
- vite & vue 3
- vuetify (componentes visuais)
- axios (chadas de API)
- maska (mascara de valores e inputs)
- cpf-cnpj-validator (validador de CPF e CNPJ)
- json-server (backend "falso")
- cypress (testes)
