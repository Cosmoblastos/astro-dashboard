import {LOGIN_SUCCESS, LOGIN_ERROR, UPDATE_TOKEN, LOADING} from "../types";
import api from '../../api';

export const login = (email, password) => (dispatch) => {
    dispatch({type: LOADING, payload: true})
    api.Auth.login(email, password)
        .then((result) => {
            console.log('login result:', result);
            if (!result.success) return dispatch({
                type: LOGIN_ERROR,
                payload: result.error
            });
            dispatch(startExpiration(LOGIN_SUCCESS, result.data));
        })
        .catch((error) => {
            console.log('login error:', error);
            dispatch({
                type: LOGIN_ERROR,
                payload: error
            });
        })
        .finally(() => dispatch({ type: LOADING, payload: false }));
};

export const startExpiration = (type, data) => (dispatch) => {
    dispatch({ type, payload: data });
    setTimeout(async () => {
        dispatch(refreshToken(window.localStorage.getItem('refreshToken')));
    }, 1000 * 60 * 15); //TODO: the expire time should come from the API
}

export const refreshToken = (token) => (dispatch) => {
    console.log('inside refreshTokem');
    api.Auth.refreshToken(token)
        .then((result) => {
            console.log('refreshToken result:', result);
            if (!result.success) return dispatch({
                type: LOGIN_ERROR,
                payload: result.error
            });
            dispatch(startExpiration(UPDATE_TOKEN, result.data));
        })
        .catch((error) => {
            console.log('refreshToken error:', error);
            dispatch({
                type: LOGIN_ERROR,
                payload: error
            });
        })
};