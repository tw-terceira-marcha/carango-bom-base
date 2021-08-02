import React, { useState } from 'react';
import Modal from '../../ui/modal';
import LoginForm from '../../ui/login-form';
import RegisterUserForm from '../../ui/register-user-form';
import AuthService from '../../../services/auth/service';
import StorageService from '../../../services/storage';

const {tokenKey} = StorageService;

const UserAccess = ({openModal, setModalOpen}) => {

    const [openRegister,setOpenRegister] = useState(false);
    const registerOpen = () => {
        setOpenRegister(!openRegister);
    };
    const userLogin = async (login, password) => {
        const {data, status, ok} = await AuthService.login(login, password);
        if(ok){
            StorageService.set(tokenKey, data.token);
            setModalOpen(false);
        }else {
            console.log(status);
            // definir component do material ui para demonstrativo de erros no login
        }

    };

    const userRegister = async (name, email, password) => {
        const { status, ok } = await AuthService.register(name, email, password);
        if (ok) {
            await userLogin(email, password);
        } else {
            console.log(status);
            // definir component do material ui para demonstrativo de erros no cadastro
        }

    };

    return (
        <Modal
            open={openModal}
            onClose={() => setModalOpen(false)}
            Component={
                openRegister ?
                    <RegisterUserForm onSubmit={userRegister} /> :
                    <LoginForm onSubmit={userLogin} registerOpen={registerOpen}/>
            }
        />
    );
};

export default UserAccess;
