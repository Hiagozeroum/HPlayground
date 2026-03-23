# API — Instruções do Módulo

> Instruções globais do projeto (documentação, padrões gerais) estão em `/CLAUDE.md`.

## Stack

- **Runtime:** Node.js com NestJS 11
- **Linguagem:** TypeScript (strict)
- **Validação:** `class-validator` + `class-transformer` (via `ValidationPipe` global)
- **Env vars:** `@nestjs/config` (`ConfigService`) — nunca acessar `process.env` diretamente nos módulos
- **Documentação:** Swagger disponível em `/docs`

## Estrutura de Módulos

Cada recurso da API vive no seu próprio módulo:

```
src/
├── main.ts
├── app.module.ts
├── app.controller.ts     # apenas o health check
├── app.service.ts
└── <recurso>/
    ├── <recurso>.module.ts
    ├── <recurso>.controller.ts
    ├── <recurso>.service.ts
    ├── dto/
    │   ├── create-<recurso>.dto.ts
    │   └── update-<recurso>.dto.ts
    └── entities/
        └── <recurso>.entity.ts
```

Gerar com a CLI: `nest g module <nome>`, `nest g controller <nome>`, `nest g service <nome>`

## Convenções

### DTOs

- Usar `class-validator` para todas as validações de entrada
- Usar `@ApiProperty()` em todos os campos para documentar no Swagger
- DTOs de update devem usar `PartialType(CreateDto)` do `@nestjs/swagger`

### Serviços

- Toda lógica de negócio vive no service, nunca no controller
- Controllers só recebem a requisição, delegam ao service e retornam a resposta

### Erros

- Usar as exceções do NestJS (`NotFoundException`, `BadRequestException`, etc.)
- Não capturar erros no controller — deixar o filtro global do NestJS tratar

### Variáveis de Ambiente

- Declarar no `.env.example` ao adicionar qualquer nova variável
- Injetar via `ConfigService`, nunca `process.env`

## Endpoints Base

| Método | Rota          | Descrição       |
|--------|---------------|-----------------|
| GET    | /api/health   | Health check    |
| -      | /docs         | Swagger UI      |
