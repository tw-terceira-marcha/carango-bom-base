import { Container, CssBaseline, makeStyles } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import { ptBR } from '@material-ui/core/locale';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import BrandRegister from './pages/brand-register/index';
import BrandList from './pages/brand-list/index';
import HomePage from './pages/home-page';
import ApplicationHeader from './components/ui/header';
import ApplicationMainMenu from './components/container/main-menu';
import UserAccess from './components/container/user-access';
import VehicleRegister from './pages/vehicle-register';
import VehicleList from './pages/vehicle-list';

const muiTheme = createMuiTheme({
    palette: {
        primary: {
            main: blue[900],
        }
    },
}, ptBR);

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));

function App() {

    const [openModal,setModalOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const classes = useStyles();
    
    return (
        <ThemeProvider theme={muiTheme}>
            <div className={classes.root}>
                <CssBaseline />
                <ApplicationHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
                <ApplicationMainMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} setModalOpen={setModalOpen}/>
                <UserAccess openModal={openModal} setModalOpen={setModalOpen} />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Container component="article" maxWidth="md">
                        <Switch>
                            <Route path="/brand-register">
                                <BrandRegister />
                            </Route>
                            <Route path='/brand-update/:id'>
                                <BrandRegister />
                            </Route>
                            <Route path="/brand-list">
                                <BrandList />
                            </Route>
                            <Route path="/vehicle-register">
                                <VehicleRegister />
                            </Route>
                            <Route path='/vehicle-update/:id'>
                                <VehicleRegister />
                            </Route>
                            <Route path="/vehicle-list">
                                <VehicleList />
                            </Route>
                            <Route path="/">
                                <HomePage />
                            </Route>
                        </Switch>
                    </Container>
                </main>
            </div>
        </ThemeProvider>
    );
}

export default App;
