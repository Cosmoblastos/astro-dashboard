import React, {useCallback, useContext, useState} from 'react';
import IconButton from "@material-ui/core/IconButton";
import {AppBar, Badge, Fade, Menu, MenuItem, useMediaQuery} from "@material-ui/core";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import {decomposeColor, useTheme} from "@material-ui/core/styles";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => {
    const { values: rgbTertiary } = decomposeColor(theme.palette.primary.main);
    return {
        appBar: {
            backgroundColor: 'transparent',
            borderBottom: 0,
        },
        logoContainer: {
            flexGrow: 1
        },
        button: {
        },
        menuIButton: {
            marginRight: theme.spacing(3),
            '&:hover': {
                backgroundColor: `rgba(${rgbTertiary[0]},${rgbTertiary[1]}, ${rgbTertiary[2]}, 0.6)`
            }
        },
        menuIButtonPrimary: {
            backgroundImage: `linear-gradient(91.89deg, #629ACE 0%, #2978C0 100%)`,
            color: '#fff',
            marginRight: theme.spacing(3),
            padding: theme.spacing(1),
        },
        toolbar: {
            paddingRight: theme.spacing(3 * 2)
        },
        mobileActions: {
            minHeight: '10vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        avatar: {
            width: theme.spacing(4),
            height: theme.spacing(4),
        },
        avatarName: {
            width: theme.spacing(4),
            height: theme.spacing(4),
            background: theme.palette.primary.main
        }
    }
});

const TopMenu = ({ toggleShowMenu }) => {
    const classes = useStyles(),
        [loading, setLoading] = useState(false),
        [anchorEl, setAnchorEl] = useState(null),
        theme = useTheme(),
        isMd = useMediaQuery(theme.breakpoints.up('md'));

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const submitLogout = async () => {
    };

    const handleLogout = useCallback(() => {

    }, [setLoading]);

    const handleSettings = () => {

    }

    const menuActions = (
        <React.Fragment>
            {/*-------------------- NOTIFICATION DRAWER ------------------------*/}
            <IconButton color='primary' className={classes.menuIButton} size='medium'>
                <Badge variant='dot' color="error">
                    <NotificationsNoneIcon />
                </Badge>
            </IconButton>

            {
                isMd && (
                    <React.Fragment>
                        <Box pr={2} component='span'>
                            <Badge
                                variant={'dot'}
                                color={'primary'}
                                overlap="circle"
                                badgeContent={' '}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            >
                                <Avatar className={classes.avatar} src={'/media/avatar2.png'}>hola</Avatar>
                            </Badge>
                        </Box>
                        <Box pr={1} component='span'>
                            <Typography variant={'caption'}>Hola,</Typography>
                            <Typography variant='h6'>Alejandro</Typography>
                        </Box>
{/*                        <IconButton size='small' color='primary' onClick={handleClick}>
                            {Boolean(anchorEl) ? <ExpandLessIcon /> : <ExpandMoreIcon/>}
                        </IconButton>*/}
                        <Menu
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            TransitionComponent={Fade}
                            onClose={handleClose}
                            getContentAnchorEl={null}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                        >
                            <MenuItem onClick={handleSettings}>
                                <Typography variant='h6'>Ajustes</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                boton
                            </MenuItem>
                        </Menu>
                    </React.Fragment>
                )
            }
        </React.Fragment>
    );

    return (
        <AppBar
            elevation={0}
            position="fixed"
            className={classes.appBar}
            color='transparent'
        >
            {
                isMd ? (
                    <Toolbar className={classes.toolbar}>
                        <div className={classes.logoContainer} />
                        {menuActions}
                    </Toolbar>
                ) : (
                    <React.Fragment>
                        <Toolbar>
                            <IconButton onClick={toggleShowMenu}>
                                <MenuIcon color='primary' />
                            </IconButton>
                        </Toolbar>
                    </React.Fragment>
                )
            }
        </AppBar>
    );
};

export default TopMenu;