import { List, ListItem, ListItemText, SwipeableDrawer } from '@material-ui/core';
import React from 'react';
// import { useHistory } from 'react-router';

const openLoginModal = () => { };



const ApplicationMainMenu = ({ menuOpen, setMenuOpen }) => {

    const MainMenuOptions = () => {
        // const history = useHistory();

        const options = [{ name: 'Entrar', action: () => openLoginModal() }];

        // const optionsLogged = [
        //     { name: 'Veiculos', action: () => history.push('/vehicles') },
        //     { name: 'Marcas', action: () => history.push('/brands') },
        //     { name: 'Usuários', action: () => history.push('/users') },
        //     { name: 'Dashboard', action: () => history.push('/dashboard') },
        //     { name: 'Sair', action: () => logout() }
        // ];

        return (
            <div
                style={{ width: 250 }}
                role="presentation"
                onClick={() => setMenuOpen(false)}
                onKeyDown={() => setMenuOpen(false)}
            >
                <List>
                    {options.map((option, index) => (
                        <ListItem button key={option.name} data-testid='menu-item' onClick={option.action}>
                            <ListItemText primary={option.name} />
                        </ListItem>
                    ))}
                </List>
            </div>
        )
    }

    return (
        <SwipeableDrawer
            anchor='left'
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
            onOpen={() => setMenuOpen(true)}
        >
            {MainMenuOptions()}
        </SwipeableDrawer>
    )
}


export default ApplicationMainMenu;