# API de Solicitações

API com login JWT e controle de acesso por papel (solicitante, gestor e
auditor). Feita com NestJS.

## Identificação

Estudante: Matheus William
Matrícula: 20251038060021

## Contas

Matheus, matheus@empresa.com, gestor, senha é a matrícula
William, william@empresa.com, auditor, senha é a matrícula invertida
Bruno, bruno@empresa.com, solicitante, senha 123456

As senhas ficam salvas apenas como hash bcrypt.

## Como rodar

cp .env.example .env
docker compose build
docker compose up
docker compose exec api npm run test
docker compose down

A API fica em http://localhost:3000.

## Endpoints

POST /auth/login recebe email e senha e devolve um JWT
GET /auth/perfil devolve os dados do usuário autenticado
GET /solicitacoes/relatorio devolve total e quantidade por status (gestor e auditor)
PATCH /solicitacoes/:id/aprovar aprova uma solicitação (somente gestor)

## Testes

Login com senha incorreta retorna 401
Login com matrícula invertida retorna 201 com token
Perfil com token retorna 200, sem senha
Relatório sem token retorna 401
Relatório com solicitante retorna 403
Relatório com auditor retorna 200 com contagens
Aprovar com auditor retorna 403
Aprovar com gestor retorna 200

O PATCH retorna 200 porque o NestJS usa esse status por padrão.

## Por que 401 e 403

Sem token o guard JWT não identifica o usuário, então é 401. Com token de um
papel sem permissão, o guard de papéis nega com 403. 401 é "não autenticado"
e 403 é "autenticado, mas sem permissão".

## Fontes

https://docs.nestjs.com
https://www.npmjs.com/package/bcrypt