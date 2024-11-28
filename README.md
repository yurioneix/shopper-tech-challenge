# Shopper - Teste Técnico

## Descrição
Este projeto consiste em uma aplicação de gerenciamento de viagens. A aplicação é composta por duas partes:

- **Frontend**: Uma Single Page Application (SPA) utilizando React e TypeScript, que se comunica com a API para realizar estimativas de viagens, confirmação de viagens e exibição do histórico.
- **Backend**: A API que fornece os endpoints para estimativas de viagem, confirmação e listagem de viagens realizadas.

O projeto utiliza Docker para containerização, o que facilita o ambiente de desenvolvimento e deployment.


## Como rodar a aplicação

### 1. Clonar o repositório

Clone o repositório para a sua máquina local:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2. Instalar as dependências
Para instalar as dependências do backend e frontend:
```bash
# No diretório raiz, onde o docker-compose.yml está localizado
docker-compose build
```
Este comando irá subir os containers para os serviços do frontend, backend e database (PostgreSQL).

### 3. Subir os containers
Para subir os containers, basta executar o comando:
```bash
docker-compose up -d
```
Este comando irá subir os containers para os serviços do frontend, backend e database (PostgreSQL).

### 4. Acessar a aplicação
- Frontend: A aplicação frontend estará disponível em http://localhost, pois a porta 3000 do container está mapeada para a porta 80 na máquina local.
- Backend: A API backend estará disponível em http://localhost:8080.

--- 

## Endpoints da API
### POST /ride/estimate
Recebe os dados de origem e destino da viagem e realiza os cálculos dos valores da viagem.

- Request Body:
```json
    {
    "customer_id": "string",
    "origin": "string",
    "destination": "string"
    }
```
- Response (Status 200):
```json
{
  "origin": {
    "latitude": 0.0,
    "longitude": 0.0
  },
  "destination": {
    "latitude": 0.0,
    "longitude": 0.0
  },
  "distance": 0.0,
  "duration": "00:00",
  "options": [
    {
      "id": 1,
      "name": "Motorista A",
      "description": "Motorista com 5 anos de experiência",
      "vehicle": "Carro 1",
      "review": {
        "rating": 4.5,
        "comment": "Motorista muito bom"
      },
      "value": 50.0
    },
    {
      "id": 2,
      "name": "Motorista B",
      "description": "Motorista com 2 anos de experiência",
      "vehicle": "Carro 2",
      "review": {
        "rating": 4.0,
        "comment": "Bom motorista"
      },
      "value": 40.0
    }
  ],
  "routeResponse": {}
}
```

- Error Response (Status 400):
```json
{
  "error_code": "INVALID_DATA",
  "error_description": "Os dados fornecidos no corpo da requisição são inválidos"
}
```

## PATCH /ride/confirm
Confirma a viagem e grava a viagem no histórico.

- Request Body:
```json
{
  "customer_id": "string",
  "origin": "string",
  "destination": "string",
  "distance": 10.5,
  "duration": "00:30",
  "driver": {
    "id": 1,
    "name": "Motorista A"
  },
  "value": 50.0
}
```

- Response (Status 200):
```json
{
  "success": true
}
```

- Error Responses:
    - Status 400 (Dados inválidos):
  ```json
        {
        "error_code": "INVALID_DATA",
        "error_description": "Os dados fornecidos no corpo da requisição são inválidos"
        }
  ```
    - Status 404 (Motorista não encontrado):
    ```json
    {
  "error_code": "DRIVER_NOT_FOUND",
  "error_description": "Motorista não encontrado"
    }
    ```
    - Status 406 (Quilometragem inválida):
    ```json
    {
  "error_code": "INVALID_DISTANCE",
  "error_description": "Quilometragem inválida para o motorista"
    }
    ```

## GET /ride/{customer_id}?driver_id={id do motorista}
Lista as viagens realizadas por um determinado usuário, podendo filtrar por motorista.

- Response: 
```json
{
  "customer_id": "string",
  "rides": [
    {
      "id": 1,
      "date": "2024-11-27T12:00:00",
      "origin": "Origem A",
      "destination": "Destino A",
      "distance": 10.5,
      "duration": "00:30",
      "driver": {
        "id": 1,
        "name": "Motorista A"
      },
      "value": 50.0
    },
    {
      "id": 2,
      "date": "2024-11-28T15:00:00",
      "origin": "Origem B",
      "destination": "Destino B",
      "distance": 15.0,
      "duration": "00:40",
      "driver": {
        "id": 2,
        "name": "Motorista B"
      },
      "value": 60.0
    }
  ]
}
```

- Error Responses:
  - Status 400 (Motorista inválido):
  ```json
  {
  "error_code": "INVALID_DRIVER",
  "error_description": "Motorista inválido"
  }
  ```
  - Status 404 (Nenhum registro encontrado):
   ```json
    {
    "error_code": "NO_RIDES_FOUND",
    "error_description": "Nenhum registro encontrado"
    }
  ```

---
## Tecnologias utilizadas
Backend: Node.js, Fastify

Frontend: React, TypeScript, Next.js

Banco de Dados: PostgreSQL

Containerização: Docker

---

## Contribuições
1. Faça o fork deste repositório.
2. Crie uma branch para a sua feature (git checkout -b feature-nome).
3. Comite suas alterações (git commit -am 'Add nova feature').
4. Faça o push para a branch (git push origin feature-nome).
5. Envie um pull request.
