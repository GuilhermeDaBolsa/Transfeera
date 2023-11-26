# Desafio entrevista Transfeera

## Baixando e instalando o projeto

- Clone o repositório para um pasta.
- Instale as dependências (abra um terminal na pasta do projeto e rode o comando)
````
npm ci
````
(obs) é possível executar também o famoso "npm i" porém não é recomendado.

## Executando o projeto
O projeto possui 3 "servidores", sendo eles: • "backend" • frontend • testes.

Para rodar o • "backend" abra um terminal e execute:
```
npm run backend
```

Para rodar o • frontend abra um terminal e execute:
```
npm run frontend
```

Para rodar os • testes abra um terminal e execute:
```
npm run tests
```

## Configurações / Observações
- Backend está configurado para rodar na porta 3000 (importante para o front)
- Frontend está configurado para rodar na porta 3001 (importante para os testes)
- O projeto possui um arquivo db.json na raiz e ele serve como banco de dados.
- O projeto possui um arquivo db_original.json na raiz e ele é o JSON original do desafio.
- O projeto possui ao todo 5 testes E2E que abrangem criação, edição e remoção de favorecidos.

## Estrutura
O projeto foi dividido da seguinte maneira:

- Pasta "views" contém as telas principais da aplicação (acessadas pela url)
- Pasta "components" contém elementos visuais repetidos ou importantes para a aplicação.
- Pasta "layouts" contém elementos estruturais padrão da aplicação.
- Pasta "utils" contém utilitários como máscaras, validações e outros elementos que podem ser reutilizados.

