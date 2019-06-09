# fullstack-graphql-demo

Projekt obsahuje 3 adresare:

* **spring-boot-graphql-backend** - spring boot graphql backend
* **react-graphql-frontend** - react graphql frontend
* **build** - Zbuildovany jar subor


### spring-boot-graphql-backend

Klasicky spring boot projekt ktory obsahuje databazu knih a autorov + prislusne graphql api.
Pri starte sa spusti in memory H2 do ktorej liquibase vytvori schemu, tabulky a data.

DB migracie pre liqibase su v **src/main/resources/db**

Definicie pre graphql su v **src/main/resources/graphql**

Hlavne dependencie poskytujuce graphql funcionalitu:

    		<dependency>
			<groupId>com.graphql-java-kickstart</groupId>
			<artifactId>graphql-spring-boot-starter</artifactId>
			<version>5.9.0</version>
		</dependency>
		<dependency>
			<groupId>com.graphql-java-kickstart</groupId>
			<artifactId>graphql-java-tools</artifactId>
			<version>5.6.0</version>
		</dependency>

		<dependency>
			<groupId>com.graphql-java-kickstart</groupId>
			<artifactId>graphiql-spring-boot-starter</artifactId>
			<version>5.9.0</version>
			<scope>runtime</scope>
		</dependency>


Backend obsahuje graphiql ktory je pristupny na: [http://localhost:8080/graphiql](http://localhost:8080/graphiql)
Pricom data je mozne ziskat nasledovnou query:

      {
        books{
          id
          title
          author {
            firstName
            lastName
          }
        }
       }

Tak isto je mozne vlozit napr autora spustenim nasledovnej mutacie:

      mutation addAuthor($firstName: String!, $lastName:String!) {
        addAuthor(firstName: $firstName, lastName: $lastName) {
          firstName
          lastName
        }
      }

Pricom je potrebne zadat aj query variables
      {
        "firstName": "Jozko",
        "lastName": "Mrkvicka"
      }
