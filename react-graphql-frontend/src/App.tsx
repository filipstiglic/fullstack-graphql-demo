import React from 'react';
import './App.css';
import {ApolloProvider} from "react-apollo-hooks";
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Secured from "./components/auth/Secured";
import PageHeaderBar from "./layout/PageHeaderBar";
import LoginPage from "./pages/LoginPage";
import DefaultPage from "./pages/DefaultPage";
import SecuredPage from "./pages/secured/SecuredPage";

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


const App: React.FC = () => {
  return (
      <ApolloProvider client={client}>
          <BrowserRouter>
              <div className="App">
                  <PageHeaderBar/>
                  <Switch>
                      <Route exact={true} path="/" render={() => <DefaultPage/>}/>
                      <Route path="/login" render={() => <LoginPage />}/>
                      <Secured loginPath="/login">
                          <Route path="/secured" render={() => <SecuredPage/>}/>
                      </Secured>
                  </Switch>
              </div>
          </BrowserRouter>
      </ApolloProvider>
  );
};

export default App;
