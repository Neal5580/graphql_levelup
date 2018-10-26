import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";

const defaultState = {
    isEditMode: false
};

/**
 * With Apollo Persist way
 */
const cache = new InMemoryCache();

persistCache({
    cache,
    storage: window.localStorage
}).then(() => {
    const client = new ApolloClient({
        cache,
        uri:
            "https://api-apeast.graphcms.com/v1/cjnmf57hc3act01gl938offu3/master",
        clientState: {
            defaults: defaultState,
            resolvers: {}
        }
    });

    ReactDOM.render(
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>,
        document.getElementById("root")
    );

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: http://bit.ly/CRA-PWA
    serviceWorker.unregister();
});

/*
*Without Apollo Persist way
*/
/*
const client = new ApolloClient({
    uri: "https://api-apeast.graphcms.com/v1/cjnmf57hc3act01gl938offu3/master",
    clientState: {
        defaults: defaultState,
        resolvers: {}
    }
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
*/
