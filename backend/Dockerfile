# Escolha a imagem base do Node.js
FROM node:18

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos do projeto
COPY . .

# Instale as dependências
RUN npm install

# Exponha a porta do backend
EXPOSE 8080

# Comando para rodar o servidor
CMD ["npm", "run", "dev"]
