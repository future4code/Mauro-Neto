### Exercício 1
**a)** Primeiramente temos o comando CREATE TABLE que serve para criar a tabela, em seguida especificamos as colunas da tabela com os tipos de dados a serem inseridos. 
O id é definido como VARCHAR de tamanho máximo 255, que é uma string, e ele é a PRIMARY KEY, que é um identificador único de cada item;
O name também é definido como VARCHAR com tamanho máximo de 255;
O salary é definido como FLOAT;
Birth-date é definido como DATE, tipo usado para repreesntar uma data;
O gender é definido como VARCHAR com tamanho máximo de 6.
Todos os items que tem NOT NULL não podem ser nulos

**b)** SHOW DATABASES - mostra todos os bancos de dados
SHOW TABLES - mostra as tabelas criadas no banco de dados;

**c)** SHOW Actor - dá um erro, mas o DESCRIBE Actor mostra a estrutura da tabela, com as colunas e tipos

### Exercício 2
Primeiramente, ao tentar inserir "Tony Ramos", deu um erro, porque não tinha o gender nos parenteses e tava passando ele como valor;

**b)** Gerou um erro de entrada duplicada. O erro acontece porque não podem existir itens iguais nas Primary Keys

**c)** O erro acontece porque falta especificar a data e o gênero.
Query corrigida:
```
INSERT INTO Actor (id, name, salary, birth_date, gender)
VALUES(
  "003", 
  "Fernanda Montenegro",
  300000,
  "1929-10-19", 
  "female"
);
```

**d)** Ocorreu um erro, pois estava faltando o nome.
Query corrigida: 
```
INSERT INTO Actor (id, salary, birth_date, gender, name)
VALUES(
  "004",
  400000,
  "1949-04-18", 
  "male",
  "Antônio Fagundes"
);
```

**e)** O formato da data estava incorreto.
Query corrigida:
```
INSERT INTO Actor (id, name, salary, birth_date, gender)
VALUES(
  "005", 
  "Juliana Paes",
  719333.33,
  "1979-03-26", 
  "female"
);
```

**f)** Query utilizada:
```
INSERT INTO Actor (id, name, salary, birth_date, gender)
VALUES(
	"006",
    "Leonardo Villar",
    1000000,
    "1923-07-25",
    "male"
);
```

### Exercício 3
**a)** ```SELECT * FROM Actor WHERE gender="female";```

**b)** ```SELECT salary FROM Actor WHERE name="Tony Ramos";```

**c)** ```SELECT * FROM Actor WHERE gender="invalid";```
O retorno é todo null, porque não foi criado nenhum ator com o gênero "invalid", e como gender é um VARCHAR, pode assumir qualquer valor, bastava definir na criação (ia dar erro por conta do tamanho da palavra invalid, o máximo para o gender são 6 caracteres)

**d)** ```SELECT id, name, salary FROM Actor WHERE salary <= 500000;```

**e)** Retornou um erro, porque não existe coluna chamada "nome".
Query corrigida:
```
SELECT id, name from Actor WHERE id = "002";
```

### Exercício 4
**a)** A query seleciona todos os campos em que o nome "seja como" (LIKE) o modelo passado, no exemplo, "a%", onde o % é o "coringa", ou seja, tem que começar com a e não importa com o que tem depois OU começar com j("j%") E que o salário seja maior que 300000.

**b)** ```SELECT * FROM Actor WHERE name NOT LIKE "A%" AND salary > 350000;```

**c)** ```SELECT * FROM Actor WHERE name LIKE "%G%" OR name LIKE "%g%;"```

**d)** ```SELECT * FROM Actor WHERE (name LIKE "%a%" OR name LIKE "%A%" OR name LIKE "%g%" OR name LIKE "%G%") AND salary BETWEEN 350000 AND 900000;```

### Exercício 6
**a)** ```SELECT id, name, rating FROM Movie WHERE id="001";```

**b)** ```SELECT * FROM Movie WHERE name="Se Eu Fosse Você";```

**c)** ```SELECT * FROM Movie WHERE rating >= 7;```

### Exercício 7
**a)** ```SELECT * FROM Movie WHERE name LIKE "%vida%";```

**b)** ```SELECT * FROM Movie WHERE name LIKE "%filhos%" OR synopsis LIKE "%filhos%";```

**c)** ```SELECT * FROM Movie WHERE release_date < NOW();```

**d)** ```SELECT * FROM Movie WHERE release_date < NOW() AND name LIKE "%filhos%" OR synopsis LIKE "%filhos%" AND rating > 7;```