import React, {useState} from 'react';
import {Box, makeStyles} from "@material-ui/core";
import LeftMenu from './Menu/LeftMenu';
import Head from "next/head";
import TopMenu from "./Menu/TopMenu";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100vh',
    },
    blur: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(8px)',

        overflow: 'hidden',
    },
    content: {
        overflowY: 'scroll',
        width: 'calc(100% - 300px)',
        padding: theme.spacing(5),
        height: '100vh',
        marginLeft: '300px',
    },
}));

const InternLayout = ({ children, title }) => {
    const classes = useStyles(),
        [showMenu, setShowMenu] = useState(false);

    const toggleShowMenu = () => setShowMenu(!showMenu);

    return <div className={classes.root}>
        <Head>
            <title>{title} - AstroMx</title>
        </Head>
        <TopMenu toggleShowMenu={toggleShowMenu} />
        <LeftMenu />
        <main className={classes.content}>
            { children }
        </main>
    </div>;
};

export default InternLayout;