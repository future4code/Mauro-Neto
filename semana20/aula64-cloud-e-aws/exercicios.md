### Exercício 1
Não tive dificuldades para realizar o processo.

### Exercício 2
**2.1** Iria baixar o repositório (podendo ser um clone), instalar, "buildar" e rodar o servidor com o python -mSimpleHTTPServer 80

**2.2** Resolvi escolher o 4used

**2.3** ssh -i chave.pem ubuntu@ip-da-maquina

**2.4** 
```
git clone https://github.com/future4code/julian-4Used-2.git
cd julian-4Used-2
npm i
npm run start
```

**2.6**  
```
npm run build
cd build
sudo python -mSimpleHTTPServer 80
```

**2.7** A única diferença foi que na aula foi criado um projeto e no exercício foi feito um clone.

### Desafio
Resolvi utilizar o projeto Labook, fiz os seguintes passos:

**1** Clonar o repositório

**2)** Criar um .env com as informações para acessar o banco

**3)** Rodar o servidor

Como a porta 3000 já estava configurada, não precisei reconfigurar na AWS. Fiz os testes no postman, e deu tudo certo.