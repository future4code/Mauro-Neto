echo "Digite o nome do projeto (entre aspas, minusculo e sem espaços)"
read nomeDoProjeto
echo "Digite o nome do autor (entre aspas)"
read autorDoProjeto
mkdir src
mkdir build
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
      "module": "commonjs"
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
    "start": "tsc && node build/index.js"
  },
  "author": ${autorDoProjeto},
  "license": "ISC",
  "dependencies": {
    "@types/axios": "^0.14.0",
    "@types/node": "^14.0.13",
    "axios": "^0.19.2",
    "moment": "^2.27.0",
    "ts-node": "^8.10.2",
    "typescript": "^3.9.5"
  }
}
EOF
npm install
touch ./src/index.ts
cat << EOF > ./src/index.ts
console.log("Hello World");
EOF
