import {CssBaseline, ThemeProvider} from "@material-ui/core";
import Theme from '../components/core/Theme';
import { useSelector } from "react-redux";
import {Provider} from "react-redux";
import store from "../store";
import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import { onError } from '@apollo/client/link/error';

const httpLink = new HttpLink({
    uri: 'http://localhost:4000/gql',
    credentials: 'same-origin' //include for different domain
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('auth-token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const logoutLink = onError(({ networkError }) => {
    if (networkError.statusCode === 401) window.localStorage.removeItem('auth-token');
});

const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink).concat(logoutLink),
    cache: new InMemoryCache()
});

function MyApp({ Component, pageProps }) {
    //const { token } = useSelector((state) => state.authReducer);
    return <ThemeProvider theme={Theme}>
        <Provider store={store}>
            <ApolloProvider client={apolloClient}>
                <CssBaseline />
                <Component {...pageProps} />
            </ApolloProvider>
        </Provider>
    </ThemeProvider>;
}

export default MyApp
