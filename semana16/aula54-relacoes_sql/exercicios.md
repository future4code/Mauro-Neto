### Exercício 1
**a)** Chaves estrangeiras são chaves que criam relações entre tabelas

**b)** Criação da tabela:
```CREATE TABLE Rating (
		id VARCHAR(255) PRIMARY KEY,
    comment TEXT NOT NULL,
		rate FLOAT NOT NULL,
    movie_id VARCHAR(255),
    FOREIGN KEY (movie_id) REFERENCES Movie(id)
);
```

Inserindo avaliações:
```INSERT INTO Rating (id, comment, rate, movie_id)
VALUES("001", "Filme muito bom", 7, "001"),
("002", "gostei", 8, "002"),
("003", "péssimo", 1, "003"),
("004", "Pede pra sair!", 10, "004");
```

**c)** Retorna um erro que não pode criar ou adicionar uma "linha filha", por conta de uma falha na chave estrangeira.

**d)** 
```ALTER TABLE Movie DROP COLUMN rating;
```

**e)** Retorna um erro que não pode deletar ou atualizar por estar sendo usado como foreign key na tabela filha

### Exercício 2
**a)** Essa é uma tabela para representar um filme e os atores que atuaram nele. Como temos uma tabela de atores e outra de filmes, utilizamos elas como foreign keys, já que nessa tabela relacionamos os dois.

**b)** 
```INSERT INTO MovieCast (movie_id, actor_id)
VALUES("001", "001"),
("001", "002"),
("001", "005"),
("001", "006"),
("003", "005"),
("004", "007");
```

**c)** Retornou o mesmo erro da letra c do 1º exercício, não pode criar ou adicionar por conta de falha na chave estrangeira

**d)** Retornou o mesmo erro da e do 1º exercício, não pode deletar por estar sendo usado como foreign key numa tabela filha

### Exercício 3
**a)** Essa query retorna as avaliações por filme, juntando as tabelas Movie e Rating. O operador ON serve para condicionar o que deve ser retornado, evitando que retornem valores referentes a outras avaliações no mesmo filme.

**b)** 
```SELECT Movie.name, Movie.id as movie_id, Rating.rate FROM Movie JOIN Rating ON Movie.id = Rating.movie_id
```

### Exercício 4
**a)** 
```SELECT Movie.name, Movie.id as movie_id, Rating.rate, Rating.comment FROM Movie LEFT JOIN Rating ON Movie.id = Rating.movie_id;
```

**b)** 
```SELECT Movie.id as movie_id, Movie.name, MovieCast.actor_id FROM Movie JOIN MovieCast ON Movie.id=MovieCast.movie_id
```

**c)**
```SELECT AVG(Rating.rate), Movie.id, Movie.name FROM Movie LEFT JOIN Rating ON Movie.id=Rating.movie_id GROUP BY Movie.id
```

### Exercício 5
**a)** Porque cada JOIN junta uma tabela à que está no FROM, então precisa de dois para poder pegar informações das três tabelas

**b)**
```SELECT Movie.id as movie_id, Movie.name as movie_name, MovieCast.actor_id, Actor.name as actor_name FROM Movie JOIN MovieCast ON Movie.id=MovieCast.movie_id JOIN Actor ON MovieCast.actor_id=Actor.id;
```

**c)** Aconteceu um erro que não foi encontrada a coluna "m". Isso ocoreu porque no lugar de "m.title" estava "m,title"

**d)** 
```SELECT Movie.id as movie_id, Movie.name as movie_name, MovieCast.actor_id, Actor.name as actor_name, Rating.rate, Rating.comment FROM Movie LEFT JOIN MovieCast ON Movie.id=MovieCast.movie_id LEFT JOIN Actor ON MovieCast.actor_id=Actor.id JOIN Rating ON Rating.movie_id = Movie.id;
```

### Exercício 6
**a)** Relação M:N, já que um tipo de oscar pode ser entregue a mais de um filme

**b)** Query utilizada:
```CREATE TABLE Oscar(
	id VARCHAR(255) PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
    awardDate DATE NOT NULL,
    movie_id VARCHAR(255),
    FOREIGN KEY (movie_id) REFERENCES Movie(id)
);
```
Foi criada uma tabela de nome Oscar, onde cada Oscar tem:
um id, que é um VARCHAR, e é a PRIMARY KEY;
o nome do oscar, que não pode ser nulo,
a data do prêmio, que não pode ser nula,
e o id do filme, que é uma chave estrangeira, vindo da tabela Movie

**c)** 
```INSERT INTO Oscar(id, name, awardDate, movie_id)
VALUES("001", "Primeiro Oscar Fake", "2006-02-06", "001"),
("002", "Segundo Oscar Fake", "2006-02-06", "001"),
("003", "Não sei um nome para Oscar", "2013-01-01", "002"),
("004", "Mais um que não sei", "2013-01-01", "002"),
("005", "Mais outro", "2017-12-01", "003"),
("006", "Mais um que não sei", "2017-12-01", "003"),
("007", "Não sei nome para Oscar", "2007-12-01", "004"),
("008", "Segundo Oscar Fake", "2007-12-01", "004"),
("009", "Segundo Oscar Fake", "2010-11-01", "005"),
("010", "Último Oscar Fake", "2010-11-01", "005")
```

**d)**
```SELECT * FROM Movie JOIN Oscar ON Movie.id=Oscar.movie_id;
```