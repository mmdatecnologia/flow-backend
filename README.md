# Flow Backend

## Ajustes e melhorias

O projeto ainda está em desenvolvimento e as próximas atualizações serão voltadas nas seguintes tarefas:

- [ ] some_task

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- Você instalou a versão `nodejs16`
- Você instalou a versão mais recente de `npm`
- Você tem uma máquina `<Windows / Linux / Mac>`

## ☕ Clonando e Instalando ``<flow-backend>``

Para clonar o repositorio `<flow-backend>`, siga estas etapas:

```bash
git clone git@github.com:mmdatecnologia/flow-backend.git
```

Para instalar as dependencias `<flow-backend>`, siga estas etapas:

```bash
npm run install
```
## ⚙️ Configurando ambiente `<flow-backend>`

Utilizar o arquivo `src/config/env/example.env` como base para a criação dos seguintes arquivos de configuração:
- `development.env`
- `test.env`

> Aplicação utiliza schema de validação `src/config/validation/validation.ts`, caso não sejam providas a configurações requeridas, resultará em erro.

## 🚀 Usando `<flow-backend>`

Para usar `<flow-backend>`, siga estas etapas:

```bash
# Unix users

# development
$ npm run start

# watch mode
$ npm run start:dev

# debug watch mode
$ npm run start:debug

# ***Windows users***

# development
$ npm run start:win

# watch mode
$ npm run start:dev:win

# debug watch mode
$ npm run start:debug:win
```

## Testes

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Gerando arquivo de change log

```bash
$ npm run changelog:minor # x.y.x
$ npm run changelog:major # y.x.x
$ npm run changelog:patch # x.x.y
$ npm run changelog:alpha # x.x.x-alpha.0
```