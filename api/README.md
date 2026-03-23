# HPlayground — API

API REST construída com [NestJS](https://nestjs.com) como parte do projeto de aprendizado HPlayground.

## Stack

- **NestJS 11** — framework Node.js com arquitetura modular
- **TypeScript** (strict)
- **class-validator / class-transformer** — validação e transformação de DTOs
- **@nestjs/config** — gerenciamento de variáveis de ambiente
- **Swagger** — documentação automática dos endpoints

## Pré-requisitos

- Node.js 20+
- npm

## Configuração

Copie o arquivo de exemplo e ajuste as variáveis:

```bash
cp .env.example .env
```

| Variável       | Padrão                  | Descrição                        |
|----------------|-------------------------|----------------------------------|
| `PORT`         | `3001`                  | Porta em que a API vai escutar   |
| `NODE_ENV`     | `development`           | Ambiente de execução             |
| `FRONTEND_URL` | `http://localhost:5173` | Origem permitida pelo CORS       |

## Rodando o projeto

```bash
# Instalar dependências
npm install

# Modo desenvolvimento (com hot reload)
npm run start:dev

# Modo produção
npm run start:prod
```

## Endpoints

| Método | Rota          | Descrição                        |
|--------|---------------|----------------------------------|
| GET    | /api/health   | Verifica se a API está no ar     |

Documentação interativa (Swagger) disponível em: `http://localhost:3001/docs`

## Testes

```bash
# Unitários
npm run test

# E2E
npm run test:e2e

# Cobertura
npm run test:cov
```

## Estrutura

```
src/
├── main.ts              # Bootstrap: prefix, CORS, validação, Swagger
├── app.module.ts        # Módulo raiz
├── app.controller.ts    # Health check
├── app.service.ts
└── <recurso>/           # Cada recurso tem seu próprio módulo
    ├── <recurso>.module.ts
    ├── <recurso>.controller.ts
    ├── <recurso>.service.ts
    └── dto/
```

Consulte [`CLAUDE.md`](./CLAUDE.md) para convenções e padrões do módulo.
