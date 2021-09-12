import {CssBaseline, ThemeProvider} from "@material-ui/core";
import Theme from '../components/core/Theme';
import {useDispatch, useSelector} from "react-redux";
import {Provider} from "react-redux";
import store from "../store";
import {ApolloClient, ApolloProvider, gql, HttpLink, InMemoryCache, useLazyQuery, useQuery} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import { onError } from '@apollo/client/link/error';
import {useCallback, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {INITIALIZE, LOGIN_ERROR, LOGIN_SUCCESS} from "../store/types";

// const logoutLink = onError(({ networkError }) => {
//     if (networkError.statusCode === 401) window.localStorage.removeItem('auth-token');
// });


const httpLink = new HttpLink({
    uri: 'http://localhost:4000',
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('auth-token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

function App ({ Component, pageProps }) {
    const dispatch = useDispatch(),
        { token } = useSelector(state => state.authReducer),
        router = useRouter(),
        { refetch } = useQuery(gql`
            query initialize ($token: String) {
                initialize(token: $token) {
                    user {
                        id
                        fullName
                    }
                }
            }
        `, { suspend: true });

    useEffect(() => {
        if (token) return;
        if (typeof refetch === 'undefined') return;
        const _token = localStorage.getItem('auth-token');
        if (!_token) return router.replace('/login');
        refetch({ token: _token })?.then(({ data }) => {
            console.log('INITIALIZED');
            dispatch({ type: INITIALIZE, payload: data?.initialize });
        });
    }, [token, refetch]);

    return <Component {...pageProps} />;
}

function ContextWrapper ({ Component, pageProps }) {
    return <ThemeProvider theme={Theme}>
        <ApolloProvider client={apolloClient}>
            <CssBaseline />
            <Provider store={store}>
                <App {...{ Component, pageProps }} />
            </Provider>
        </ApolloProvider>
    </ThemeProvider>;
}

export default ContextWrapper;
