import {useLazyQuery, useMutation} from '@apollo/client';
import {Box, Button, Card, CardContent, Grid, makeStyles, TextField, Typography} from '@material-ui/core'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useRouter } from "next/router";
import ExternLayout from "../components/core/layouts/Extern"
import { gql } from '@apollo/client';
import {useDispatch, useSelector} from "react-redux";
import { LOGIN_SUCCESS } from "../store/types";

const useStyles = makeStyles((theme) => ({
    card: {
        boxShadow: 'none',
        width: '90%',
        [theme.breakpoints.up('md')]: {
            maxWidth: '30vw',
        }
    }
}));

const LOGIN_DOC = gql`
    mutation login ($email: String!, $password: String!) {
        login (email: $email, password: $password) {
            user {
                id
                fullName
            }
            tokens {
                token
            }
            error
        }
    }
`;

const LoginView = () => {
    const classes = useStyles(),
        router = useRouter(),
        dispatch = useDispatch(),
        { token } = useSelector((state) => state.authReducer),
        [email, setEmail] = useState(''),
        [password, setPassword] = useState(''),
        [result, setResult] = useState(null),
        [submitLogin, { loading, error, data }] = useMutation(LOGIN_DOC);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        try {
            const { data, error } = await submitLogin({ variables: { email, password } });
            console.log(data, error);
            if (data?.login) setResult(data?.login);
            if (data?.login?.user && !data?.login?.error) {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: {
                        user: data?.login.user,
                        token: data?.login.tokens.token,
                    }
                });
                await router.push('/');
            }
        } catch (error) {
            console.log(error);
        }
    }, [router, email, password, submitLogin, dispatch]);

    return <ExternLayout>
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} width={'100%'} height={'100vh'}>
            <Card className={classes.card}>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant={'h2'}>
                                    Inicia sesión
                                </Typography>
                                <Box pb={1} />
                            </Grid>
                            {
                                loading && <Grid item xs={12}>
                                    <Typography variant={'body1'} color={'primary'} gutterBottom>
                                        Loading...
                                    </Typography>
                                </Grid>
                            }
                            {
                                error && <Grid item xs={12}>
                                    <Typography variant={'body1'} color={'error'} gutterBottom>
                                        {error?.toString()?.replace('Error: ', '')}
                                    </Typography>
                                </Grid>
                            }
                            <Grid item xs={12}>
                                <TextField 
                                    label={'Correo electrónico'}
                                    type={'email'}
                                    variant={'outlined'}
                                    fullWidth
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={loading}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label={'Contraseña'}
                                    type={'password'}
                                    variant={'outlined'}
                                    fullWidth
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={loading}
                                    required
                                />
                                <Box pb={1} />
                            </Grid>
                            <Grid item xs={12}>
                                <Button 
                                    variant={'contained'} 
                                    color={'primary'} 
                                    fullWidth 
                                    disableElevation
                                    type={'submit'}
                                    disabled={loading}
                                >
                                    Inicia sesión
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                    <hr width={'100%'} style={{ backgroundColor: '#999' }}/>
                                    <Box style={{paddingLeft: '10px', paddingRight: '10px'}}>
                                        o
                                    </Box>
                                    <hr width={'100%'} style={{ backgroundColor: '#999' }}/>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant={'outlined'}
                                    color={'primary'}
                                    fullWidth
                                    disableElevation
                                >
                                    Registrate
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Box>
    </ExternLayout>
}

export default LoginView