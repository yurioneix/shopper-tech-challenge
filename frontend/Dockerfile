# Escolha a imagem base 
FROM node:18

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos do projeto
COPY . .

# Instale as dependências
RUN npm install

# Exponha a porta do frontend
EXPOSE 80

# Comando para rodar o servidor
CMD ["npm", "run", "start"]
