# fullstack-graphql-demo

Projekt obsahuje 3 adresare:

* **spring-boot-graphql-backend** - spring boot graphql backend
* **react-graphql-frontend** - react graphql frontend
* **build** - Zbuildovany jar subor


### spring-boot-graphql-backend

Klasicky spring boot projekt ktory obsahuje databazu knih a autorov + prislusne graphql api.
Pri starte sa spusti in memory H2(v postgresql mode) do ktorej liquibase vytvori schemu, tabulky a data - potom pracuje dalej s touto in memory - nie je potrebne nic dalsie vytvarat, len spustit

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

Graphql endpoint sa nachadza na: [http://localhost:8080/graphql](http://localhost:8080/graphql)

Automaticky je generovana definicia celej schemy ktora sa nachadza na: [http://localhost:8080/graphql/schema.json](http://localhost:8080/graphql/schema.json)




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

Pricom je potrebne zadat aj query variables:
      
      {
        "firstName": "Jozko",
        "lastName": "Mrkvicka"
      }
      

### react-graphql-frontend

Typescript react fe vytvoreny cez create-react-app.

Na jeho spravne fungovanie, je okrem spustenia jeho samotneho (yarn start) potrebne spustit aj backend - staci sa hodit do toho build foldra cez cmdline a spustit: java -jar graphql-backend-1.0.0.jar

Co sa tyka samotneho FE vyuziva okrem react-appollo-boostra na graphql [react-apollo-hooks](https://github.com/trojanowski/react-apollo-hooks) a automaticke generovanie typov cez [graphql code generator](https://graphql-code-generator.com/) a vyuziva automaticky generovanu schemu backedom na [http://localhost:8080/graphql/schema.json](http://localhost:8080/graphql/schema.json)

Generator je nakonfigurovany v **graphql-codegen.yml** s nasledovnym obsahom:

	overwrite: true
	schema: "http://localhost:8080/graphql"
	generates:
	  src/generated/graphql.tsx:
	    plugins:
	      - "typescript"
	      - "typescript-operations"
	      - "typescript-react-apollo"
	      
Pricom v **src/generated/graphql.tsx** sa nachadzaju vygenerovane TS typy.

V **App.tsx** je ukazane zadefinovanie initial statu(skrz in memory cache) a naslednej definicie graphql klienta:

	const cache = new InMemoryCache();

	//Create initial state
	cache.writeData({
	    data: {
		__typename: "data",
		auth: {
		    __typename: "auth",
		    username: null,
		    accessToken: null,
		    refreshToken: null,
		    expirationTime: null
		},
		books: {}
	    }
	});

	const client = new ApolloClient({ cache: cache, uri: "http://localhost:8080/graphql"});
	
Aplikacia ma zadefinovanu default "non-private" cast priamo na [http://localhost:3000/](http://localhost:3000/) a secured cast nachadzajucu sa na [http://localhost:3000/secured](http://localhost:3000/secured) endpointe.

Po spusteni aplikacie mame moznost zobrazit **"secured content"** na ktory ked klikneme, sme presmerovani na **login page**

Login page po stlaceni tlacidla **log me in** sa vlozi fake **accesToken** do state. Nasledne presmeruje na **secure page** kde sa zobrazi "tajny" zoznam kniziek z BE.

Handling celej security ma na starosti **HOC secured** ktory si cez **hook useQuery**:

	const {data} = useQuery(GET_AUTH_DATA);
	
Spustenim query: 

	export const GET_AUTH_DATA = gql`
	  {
	    auth @client {
	       accessToken 
	    }
	  }
	`;

Ziska hodnotu z globalneho statu (preto **@client** aby sa nevolalo api) a nasledne urcuje presmerovanie na **secure** alebo **login** page.

Tot vse :) Enjoy
	






