import {makeStyles, withStyles} from "@material-ui/core/styles";
import React, {useState} from "react";
import {Avatar, Badge, Box, Divider, Drawer, Grid, Icon, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import clsx from "clsx";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {useRouter} from "next/router";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import SettingsIcon from '@material-ui/icons/Settings';
import Typography from "@material-ui/core/Typography";

function isCurrent (current, toCompare) {
    return current === toCompare
        || current.split('/')[1] === toCompare.split('/')[1];
}

const LEFT_MENU_WIDTH = '80px';

const useStyles = makeStyles((theme) => ({
    slideDrawer: {
        flexShrink: 0,
        zIndex: 9,
        width: LEFT_MENU_WIDTH,
        position: 'relative',
    },
    slidePaper: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    drawerOpen: {
        width: '300px',
        overflow: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        width: LEFT_MENU_WIDTH,
        overflow: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    optionText: {
    },
    selected: {
    },
    buttonSelected: {
        borderRadius: '16px'
    },
    button: {
        marginRight: theme.spacing(3.2),
        '&:hover': {
            backgroundColor: 'transparent',
        }
    },
    option: {
        margin: 0
    },
    invert: {
        padding: theme.spacing(2),
        width: LEFT_MENU_WIDTH,
        height: '92vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        borderTopRightRadius: '40px'
    },
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    avatarContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatar: {
    },
    item: {
        margin: 0,
        padding: 0,
        color: '#fff',
        '& > .MuiListItemIcon-root': {
            minWidth: 'auto',
        }
    },
    edgeButton: {
        top: 29,
        position: 'fixed',
        zIndex: 100,
        width: 20,
        height: 20,
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
        }
    },
    edgeButtonClosed: {
        left: 60,
        transition: theme.transitions.create('left', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    edgeButtonOpen: {
        left: 290,
        transition: theme.transitions.create('left', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuContainer: {
        height: '100%',
        display: 'grid',
        gridTemplate: `100% / ${LEFT_MENU_WIDTH} 1fr`
    },
    rightSide: {
        padding: theme.spacing(2)
    },
    listItem: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    ibutton: {
        color: '#fff',
        margin: theme.spacing(1, 0)
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
}));

const LeftMenu = ( ) => {
    const classes = useStyles();
    const router = useRouter();
    const current = router.pathname;
    const [open, setOpen] = useState(true);

    const toggleOpen = () => setOpen(!open);

    const leftBar = <Drawer
        variant={'permanent'}
        anchor={'left'}
        className={clsx(classes.slideDrawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
        })}
        classes={{
            paper: clsx(classes.slidePaper, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open
            }),
        }}
    >
      {/*  <IconButton color={'primary'} size={'small'} className={clsx(classes.edgeButton, {
            [classes.edgeButtonOpen]: open,
            [classes.edgeButtonClosed]: !open
        })} onClick={toggleOpen}>
            {
                !open &&
                <NavigateNextIcon style={{ color: '#fff', width: 20, height: 20 }}/>
            }
            {
                open &&
                <NavigateBeforeIcon style={{ color: '#fff', width: 20, height: 20 }}/>
            }
        </IconButton>*/}
        <Box className={classes.menuContainer}>
            <Box>
                <Box display={'flex'} alignItems={'center'} justifyContent={'center'} height={'8vh'}>
                    <img src={'/logo.svg'} width={40} height={40} />
                </Box>
                <Box className={classes.invert}>
                    {/*<Box className={classes.center}>
                        <Badge
                            variant={'dot'}
                            color={'primary'}
                            overlap="circle"
                            badgeContent={' '}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        >
                            <Avatar className={classes.avatar} src={'/media/avatar2.png'}>hola</Avatar>
                        </Badge>
                    </Box>*/}
                    <Box flexGrow={1}>
                        <List>
                            <ListItem classes={{ root: classes.item }}>
                                <ListItemIcon>
                                    <IconButton className={classes.ibutton}>
                                        <HomeIcon color={'inherit'}/>
                                    </IconButton>
                                </ListItemIcon>
                            </ListItem>
                            <ListItem classes={{ root: classes.item }}>
                                <ListItemIcon>
                                    <IconButton className={classes.ibutton}>
                                        <FavoriteIcon color={'inherit'} />
                                    </IconButton>
                                </ListItemIcon>
                            </ListItem>
                        </List>
                    </Box>
                    <Box>
                        <IconButton className={classes.ibutton}>
                            <SettingsIcon color={'inherit'}/>
                        </IconButton>
                    </Box>
                </Box>
            </Box>
            <Box className={classes.rightSide}>
                <div className={classes.toolbar}/>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant={'h3'}>
                            Inicio
                        </Typography>
                        <List>
                            <ListItem className={classes.listItem}>
                                hola
                            </ListItem>
                            <Divider />
                            <ListItem className={classes.listItem}>
                                hola
                            </ListItem>
                            <Divider />
                            <ListItem className={classes.listItem}>
                                hola
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={'h3'}>
                            Robot
                        </Typography>
                        <List>
                            <ListItem className={classes.listItem}>
                                hola
                            </ListItem>
                            <Divider />
                            <ListItem className={classes.listItem}>
                                hola
                            </ListItem>
                            <Divider />
                            <ListItem className={classes.listItem}>
                                hola
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </Drawer>;

    return <React.Fragment>
        { leftBar }
    </React.Fragment>;
};

export default LeftMenu;