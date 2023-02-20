# integrado-backend


Node.js + JavaScript + Express + Mongoose + ESLint


## Como rodar em Linux

```
A partir do terminal, entre na pasta em que você deseja manter o projeto e siga os passos abaixo:

$ git clone https://github.com/edevaldohbf/integrado-backend.git
$ cd integrado-backend
$ cp .env.sample .env
$ npm install -g yarn
$ yarn install

A partir do momento em que o último comando terminar de ser executado você estará apto a executar o comando "yarn dev" para executar o o backend utilizando nodemon ou "yarn start" para executar o backend direto node.
```

## Padrão de commits

```
Para executar um commit de forma padronizada no código, utilize o [Commitizen](https://github.com/commitizen/cz-cli). Execute os seguintes comandos:

$ npm install -g commitizen
$ npx cz

Dessa forma, abrirá um questionário no terminal que te auxiliará na formação do commit.
```

## Estrutura de código

```
Todo o código da api se encontra dentro da pasta "src". Segue abaixo uma explicação resumida sobre a função de cada arquivo e pasta presente nesta pasta. 

src - diretório raiz da API
	config - Pasta que contem todos os arquivos de configuração
		app.js - Arquivo responsável pelas configurações do Express
		env.js - Arquivo responsável por extrair os dados do .env
		mongoDb.js - Arquivo responsável pela conexão com o mongoDb
		routes.js - Arquivo contendo todas as rotas configuradas
	modules - Pasta que contém todos os módulos funcionais do sistema
		auth - módulo de autenticação
		email - módulo para disparo de e-mails
		resetPassword - módulo para reset de senha
		universities - módulo com todas as funções envolvendo registro das universisdades
		users - módulo com todas as funções envolvendo registro das usuários
		utils - funções de código que podem ser utilizadas em multiplos módulos
		index.js - Arquivo para unificar extração de controllers dos modules
	server.js - Arquivo responsável por iniciar o servidor
```

## Como se autenticar e solicitar alterações de senha no sistema

```
Sempre que um usuário é criado, é gerado automaticamente uma senha de 6 digitos aleatória pra ele. É possível encontrar essa senha na resposta da requisição de criação do usuário. Nos demais endpoints e no banco de dados, por segurança, esse dado se encontra encriptado. Caso o usuário esqueça/perca a senha ele deve recorrer ao fluxo de reset de password.

Sendo o primeiro login de um usuário ou o primeiro login após um reset de senha, o usuário deverá logar no sistema com a senha enviada no e-mail e em seguida digitar a nova senha que ele deseja usar.

Após autentica os usuários com permissões de admin conseguem gerir os usuários e as universidades cadastradas. Já os usuários sem permissões de admin, conseguem apenas gerir as universidades cadastradas.

## Author

* **Edevaldo Henrique** - [GitHub](https://github.com/edevaldohbf) [Linkedin](https://www.linkedin.com/in/edevaldo-filho/)