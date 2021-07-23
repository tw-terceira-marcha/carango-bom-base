import { List, ListItem, ListItemText, SwipeableDrawer } from '@material-ui/core';
import React from 'react';
// import { useHistory } from 'react-router';

const ApplicationMainMenu = ({ menuOpen, setMenuOpen, setModalOpen }) => {

    const MainMenuOptions = () => {
        // const history = useHistory();

        const options = [{ name: 'Entrar', action: () => setModalOpen(true) }];

        // const optionsLogged = [
        //     { name: 'Veiculos', action: () => history.push('/vehicles') },
        //     { name: 'Marcas', action: () => history.push('/brands') },
        //     { name: 'Usuários', action: () => history.push('/users') },
        //     { name: 'Dashboard', action: () => history.push('/dashboard') },
        //     { name: 'Sair', action: () => logout() }
        // ];

        return (
            <div
                style={{ width: 250, height: '100%' }}
                role="presentation"
                onClick={() => setMenuOpen(false)}
                onKeyDown={() => setMenuOpen(false)}
                data-testid='menu'
            >
                <List>
                    {options.map((option) => (
                        <ListItem button key={option.name} data-testid='menu-item' onClick={option.action}>
                            <ListItemText primary={option.name} data-testid='login-button'/>
                        </ListItem>
                    ))}
                </List>
            </div>
        );
    };

    return (
        <SwipeableDrawer
            anchor='left'
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
            onOpen={() => setMenuOpen(true)}
        >
            {MainMenuOptions()}
        </SwipeableDrawer>
    );
};


export default ApplicationMainMenu;