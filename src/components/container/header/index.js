import { AppBar, IconButton, SwipeableDrawer, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState } from 'react';
import ApplicationMainMenu from '../main-menu';


const ApplicationHeader = () => {

    const [menuOpen, setMenuOpen] = useState(false);

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
            <ApplicationMainMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen}>
            </ApplicationMainMenu>
        </>
    );
};

export default ApplicationHeader;
