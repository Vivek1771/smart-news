import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useStyles from "./styles.js"

const Navbar = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        SmartNews
                    </Typography>
                    <Typography variant="h6">
                        Voice Controlled News Application
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar
