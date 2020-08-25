echo "Digite o nome do projeto (entre aspas, minusculo e sem espaços)"
read nomeDoProjeto
echo "Digite o nome do autor (entre aspas)"
read autorDoProjeto
mkdir src
touch tsconfig.json
cat << EOF > tsconfig.json
{
    "compilerOptions": {
      "noImplicitAny": true,
      "removeComments": true,
      "preserveConstEnums": true,
      "outDir": "build",
      "sourceMap": true,
      "target": "es6",
      "module": "commonjs",
      "esModuleInterop": true
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules"]
}
EOF
touch package.json
cat << EOF > package.json
{
  "name": ${nomeDoProjeto},
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "ts-node ./src/index.ts"
  },
  "author": ${autorDoProjeto},
  "license": "ISC",
  "dependencies": {
  }
}
EOF
npm install typescript ts-node @types/node axios @types/axios express@4.17.0 knex @types/knex mysql @types/express@4.17.0 dotenv jsonwebtoken @types/jsonwebtoken uuid @types/uuid moment bcryptjs @types/bcryptjs
touch ./src/index.ts
cat << EOF > ./src/index.ts
console.log("Hello World");
EOF
