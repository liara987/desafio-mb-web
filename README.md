# DESAFIO-MB-WEB

Projeto dividido em duas aplicações: um frontend com Vue 3 e Vite e um backend em node com Node.js e Express.

---

## Requisitos

- Node.js 18 ou superior
- npm

---

## Dependências

### Frontend

#### Dependências:

- vue: ^3.5.13

#### Dependências de desenvolvimento:

- @vitejs/plugin-vue: ^5.2.3
- sass: ^1.89.2
- vite: ^6.3.5

---

### Backend

#### Dependências:

- cors: ^2.8.5
- express: ^5.1.0

---

## Instalação

### 1. Clone o repositório

```bash
git clone <URL-DO-REPOSITORIO>
cd DESAFIO-MB-WEB
```

### 2. Instale as dependências

#### Backend

```bash
npm install
```

#### Frontend

```bash
npm install
```

---

## Como executar o projeto localmente

### Backend

```bash
node run server
```

> O backend será executado na porta `3000`, isso pode ser configurado no `index.js`.

### Frontend

Crie um arquivo .env com a variável de ambiente **VITE_API_URL_BASE=http://localhost:3000**

```bash
npm run dev
```

> O frontend será iniciado em `http://localhost:5173` (ou outra porta disponível).

---

## Build da aplicação

Para gerar a versão de produção do frontend, isso ira gerar uma pasta `/dist`:

```bash
npm run build
```

---

## API - Envio de Dados para o Backend

A aplicação frontend envia os dados para o endpoint:

```
POST http://localhost:3000/registration
Content-Type: application/json
```

Para acessar a rota `GET` do backend rode o build e ao acessar a rota http://localhost/3000 a aplicação gerada pelo build devera aparecer

```
GET http://localhost:3000
```

### Corpo da requisição

O formato do JSON enviado varia de acordo com o tipo de pessoa selecionado:

### Pessoa Física

```json
{
  "personType": "pessoa-fisica",
  "name": "João da Silva",
  "cpf": "123.456.789-09",
  "birthDay": "1990-01-01",
  "email": "joao@email.com",
  "telephone": "11999999999",
  "password": "Senha@123"
}
```

### Pessoa Jurídica

```json
{
  "personType": "pessoa-juridica",
  "companyName": "Empresa Exemplo LTDA",
  "cnpj": "12.345.678/0001-99",
  "openDate": "2010-05-15",
  "email": "contato@empresa.com",
  "telephone": "1133334444",
  "password": "Empresa@123"
}
```

---

## Estrutura do frontend

```
src/
├── assets/       # Fontes, imagens e SCSS
├── server/       # Backend em node
├── pages/        # Views da aplicação (JuridicalPersonView, PasswordView, etc.)
├── utils/        # Validações (CPF, CNPJ, email, etc.)
├── App.vue       # Componente principal
├── main.js       # Ponto de entrada
└── .env          # Variáveis de ambiente, URL API
```

---

## Observações

- Certifique-se de que o backend esteja rodando antes de acessar o frontend.
