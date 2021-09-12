import React, {useEffect, useState} from 'react';
import InternLayout from "../components/core/layouts/Intern";
import {
    Box,
    Card,
    CardContent, CircularProgress,
    Divider,
    Grid,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import ListAltIcon from '@material-ui/icons/ListAlt';
import RateOxygen from '../components/dashboard/RateOxygen';
import List from "@material-ui/core/List";
import Battery60Icon from '@material-ui/icons/Battery60';
import SignalCellular2BarIcon from '@material-ui/icons/SignalCellular2Bar';
import MemoryIcon from '@material-ui/icons/Memory';
import Rate from "../components/dashboard/Rate";
import Oxygen from "../components/dashboard/Oxygen";
import ReactStickyBox from 'react-sticky-box';
import {useSelector} from "react-redux";
import {useRouter} from "next/router";
import { useSession } from '../components/core/index';
import authReducer from "../store/reducers/auth";

const useMetricCardStyles = makeStyles((theme) => ({
    glass: {
        width: '100%',
        marginTop: theme.spacing(2),
    },
    content: {
    }
}));

const MetricCard = ({ icon, title, value }) => {
    const classes = useMetricCardStyles();
    return <Card className={classes.glass}>
        <CardContent className={classes.content}>
            <Box pr={2}>
                <IconButton>
                    {icon}
                </IconButton>
            </Box>
            <Box>
                <Typography variant={'h5'}>
                    {title}
                </Typography>
                <Typography>
                    {value}
                </Typography>
            </Box>
        </CardContent>
    </Card>
};

const useStyles = makeStyles((theme) => ({
    healthStatus: {
        backgroundColor: '#25d366',
        color: '#fff',
        borderRadius: '20px',
        width: 'fit-content',
        padding: theme.spacing(0.2, 2)
    },
    card: {
        width: '100%',
        height: 'fit-content'
    },
    metrics: {
    },
    lungs: {
        width: '25px',
        height: '25px',
    },
    astroImageContainer: {
        backgroundColor: '#f7f7f8',
        '& > img': {
            width: '100%',
        }
    },
    search: {
        maxWidth: '500px',
        position: 'relative',
        borderRadius: '32px',
        color: '#222',
        padding: theme.spacing(0, 1, 0, 2),
        backgroundColor: '#fff'
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('md')]: {
            width: '40ch',
        },
    },
}));

const MainView = ({ }) => {
    const classes = useStyles(),
        [loading, setLoading] = useState(true),
        token = useSession(),
        { user } = useSelector(state => state.authReducer);

    useEffect(() => {
        if (token) setLoading(false);
    }, [token]);

    if (loading) return <Box width={'100%'} height={'100vh'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
        <CircularProgress color={'primary'} />
    </Box>;

    return <InternLayout title={'Inicio'}>
        <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
                <ReactStickyBox offsetTop={100}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant={'h2'} gutterBottom>Bienvenido {user?.fullName}</Typography>
                                    <Typography paragraph>Tu estado de salud es: <span className={classes.healthStatus}>bueno</span></Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <RateOxygen />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <MetricCard icon={<FavoriteIcon color={'primary'} />} title={'Frecuencia cardiaca'} value={'74'} />
                        </Grid>
                        <Grid item xs={4}>
                            <MetricCard icon={<img src={'/media/icons/lungs.png'} className={classes.lungs}/>} title={'Oxigenación'} value={'96'} />
                        </Grid>
                        <Grid item xs={4}>
                            <MetricCard icon={<ListAltIcon color={'primary'} />} title={'Info. médica'} value={'50%'} />
                        </Grid>
                        <Grid item xs={6}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Rate />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Oxygen />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </ReactStickyBox>
            </Grid>
           <Grid item xs={12} md={4}>
               <ReactStickyBox offsetTop={100}>
                   <>
                       <Box pb={4}>
                           <Card className={classes.astroImageContainer}>
                               <CardContent>
                                   <img src={'/media/astro.jpg'}/>
                               </CardContent>
                           </Card>
                       </Box>
                       <Card className={classes.card}>
                           <CardContent>
                               <Box p={2}>
                                   <Typography variant={'h2'}>Métricas de tu robot</Typography>
                               </Box>
                               <List>
                                   <ListItem>
                                       <ListItemIcon>
                                           <Battery60Icon />
                                       </ListItemIcon>
                                       <ListItemText>
                                           <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                                               <Typography>Batería</Typography>
                                               <Typography>60%</Typography>
                                           </Box>
                                       </ListItemText>
                                   </ListItem>
                                   <Divider />
                                   <ListItem>
                                       <ListItemIcon>
                                           <SignalCellular2BarIcon />
                                       </ListItemIcon>
                                       <ListItemText>
                                           <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                                               <Typography>Señal</Typography>
                                               <Typography>media</Typography>
                                           </Box>
                                       </ListItemText>
                                   </ListItem>
                                   <Divider />
                                   <ListItem>
                                       <ListItemIcon>
                                           <MemoryIcon />
                                       </ListItemIcon>
                                       <ListItemText>
                                           <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                                               <Typography>Memoria</Typography>
                                               <Typography>10 GIB</Typography>
                                           </Box>
                                       </ListItemText>
                                   </ListItem>
                               </List>
                           </CardContent>
                       </Card>
                   </>
               </ReactStickyBox>
            </Grid>
        </Grid>
    </InternLayout>
};

export default MainView;