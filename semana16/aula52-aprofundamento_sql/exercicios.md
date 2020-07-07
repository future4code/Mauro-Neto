### Exercício 1
**a)** Apagaria a coluna "salary" da tabela Actor

**b)** Alteraria o nome da coluna "gender" para "sex"

**c)** Alteraria o tipo da coluna "gender" para VARCHAR com tamanho máximo de 255

**d)** ```ALTER TABLE Actor CHANGE gender gender VARCHAR(100);```

### Exercício 2
**a)** Comando utilizado:
```UPDATE Actor
SET name = "Lázaro Ramos", birth_date = "1978-11-01", gender = "male"
WHERE id = "003";
```

**b)** Comando utilizado para alterar para JULIANA PÃES:
```UPDATE Actor
SET name = "JULIANA PÃES"
WHERE name = "Juliana Paes";
```

Comando para alterar de volta:
```UPDATE Actor
SET name = "Juliana Paes"
WHERE name = "JULIANA PÃES";
```

**c)** Comando utilizado:
```UPDATE Actor
SET name = "Fábio Assunção",
salary = 750000,
birth_date = "1971-08-10",
gender= "male"
WHERE id="005";
```

**d)** O comando simplesmente roda, mas não altera nada

### Exercício 3
**a)** O comando roda, mas não altera nada.

**b)** ```DELETE FROM Actor WHERE gender = "male" AND salary > 1000000;```

### Exercício 4
**a)** ```SELECT MAX(salary) FROM Actor```

**b)** ```SELECT MIN(salary) FROM Actor WHERE gender = "female";```

**c)** ```SELECT COUNT(*) FROM Actor WHERE gender = "female";```

**d)** ```SELECT SUM(salary) FROM Actor```

### Exercício 5
**a)** Essa query retorna a contagem dos dados da tabela agrupados pelo gênero

**b)** ```SELECT id, name FROM Actor ORDER BY name DESC;```

**c)** ```SELECT * FROM Actor ORDER BY salary;```

**d)** ```SELECT * FROM Actor ORDER BY salary DESC LIMIT 3;```

**e)** ```SELECT AVG(salary), gender FROM Actor GROUP BY gender;```

### Exercício 6
**a)** ```ALTER Table Movie ADD playing_limit_date DATE;```

**b)** ```ALTER Table Movie CHANGE rating rating FLOAT;```

**c)** ```UPDATE Movie SET playing_limit_date = "2020-07-10" WHERE id="003";```
e ```UPDATE Movie SET playing_limit_date = "2006-04-07" WHERE id="001";```

**d)** ```DELETE FROM Movie WHERE id="004";```
Ao tentar atualizar, o comando roda, mas não altera nada.
Query utilizada: 
```UPDATE Movie SET synopsis = "teste" WHERE id="004"```

### Exercício 7
**a)** ```SELECT COUNT(*) FROM Movie WHERE rating > 7.5;```

**b)** ```SELECT AVG(rating) FROM Movie;```

**c)** ```SELECT COUNT(*) FROM Movie WHERE playing_limit_date >= CURDATE();```

**d)** ```SELECT COUNT(*) FROM Movie WHERE release_date > CURDATE();```

**e)** ```SELECT MAX(rating) FROM Movie;```

**f)** ```SELECT MIN(rating) FROM Movie;```

### Exercício 8
**a)** ```SELECT * FROM Movie ORDER BY name;```

**b)** ```SELECT * FROM Movie ORDER BY name DESC LIMIT 5;```

**c)** ```SELECT * FROM Movie WHERE playing_limit_date >= CURDATE() LIMIT 3;```

**d)** ```SELECT * FROM Movie ORDER BY rating DESC LIMIT 3;```