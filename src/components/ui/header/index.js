import { AppBar, IconButton, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';


const ApplicationHeader = ({ menuOpen, setMenuOpen }) => {
    return (
        <>
            <AppBar
                position="fixed"
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setMenuOpen(!menuOpen)}
                        edge="start"
                        data-testid='menu-button'
                    >
                        <MenuIcon />
                    </IconButton>
                    <h1>
                        Carango Bom
                    </h1>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default ApplicationHeader;
