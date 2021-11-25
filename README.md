
# Sobre o Código

Esse código foi utilizado para a criação do curso [Automação Full Stack](http://qaninja.io/) da QA Ninja.

A QA Ninja é uma escola online que conta com um time de Ninjas de altíssimo nível pra oferecer o melhor conteúdo sempre focando em Tecnologias Relevantes. Ministramos treinamentos com foco na mudança do modelo mental do profissional de TI. 

# Guia de Uso

## Docker
1. Instalar docker Toolbox
docker --version
docker ps

2. Inicializar o Docker QuickStart Terminal (area de trabalho) - Permitir alterações e configurações - Maquina virtual criada no virtualBox será inicializada.

3. Verifique o IP

(
    https://qastack.com.br/programming/50053255/virtualbox-raw-mode-is-unavailable-courtesy-of-hyper-v-windows-10 

    https://br.atsit.in/archives/79530#:~:text=Iniciar%20Painel%20de%20controle%20no,se%20o%20o%20problema%20foi%20corrigido.

)

4. Subir o Container 
`
docker run --name mongo -d -p 27017:27017 mongo
`
4.1 Iniciar container.
docker start -a mongo


5.  Baixar e instalar um gerenciador de banco de dados não relacionais - 3T Robomongo
https://robomongo.org/download


6. Configurar conexão - apontando o IP, na qual o container do mongo está rodando. (passo 3)


## RabbitMQ (ServiceBroker)

`
docker run -d --hostname rabbitmq --name rabbitmq -p 15672:15672 -p 5672:5672 -p 25676:25676 rabbitmq:3-management
`
docker start -a rabbitmq


http://192.168.99.100:15672/
Usuário/Senha
guest / guest

# Exemplo da Integração

![Alt text](docs/Treko.jpg?raw=true "Exemplo")


# Github
https://github.com/qaninja-academy/treko


# Executando e configurando o projeto Treko
1. na pasta api - executar -> npm install
2. alterar app.js e apontar o IP do docker
3. dentro da pasta api - executar -> npm start (para inicializar a API)
4. Treko API está no AR! ( SUCESSO API NO AR)
5. http://localhost:3000/task -> APlicação rodando de FORMA LOCAL (MONGO E RABBITMQ estão via DOCKER)

============================ Implementando testes Automatizados ============================
npm install mocha --save-dev
npm install chai --save-dev
npm install chai-http --save-dev

# Inicializar
npm start

# Relatório
npm install --save-dev mochawesome