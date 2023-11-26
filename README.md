## API do Corpus

Bem-vindo à API do Corpus, uma poderosa ferramenta visual projetada para reforçar o aprendizado de máquina com o valioso feedback humano. Esta API possibilita a criação, listagem, atualização e exclusão de dados textuais. Ela é construída usando tecnologias como Node.js, Express e MongoDB.


## Configuração do Projeto

Certifique-se de que você tem o Node.js e o MongoDB instalados no seu sistema antes de executar o projeto.

1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/classificacao_tweets.git

2.  Instale as dependências:
    ```cd classificacao_tweets
    npm install

3. Inicie o servidor de desenvolvimento:
   ```
   ` npm run dev`


## Endpoints da API

- GET /classificacao: Lista todos os dados textuais.
- POST /classificacao: Cria um novo dado textual.
- PUT /classificacao/:id: Atualiza a classificação de um dado textual existente.
- DELETE /classificacao/:id: Exclui um dado textual pelo ID.
