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
        }else {
            console.log(status); 
            // definir component do material ui para demonstrativo de erros no login
        }
            
    };

    return (
        <Modal 
            open={openModal} 
            onClose={() => setModalOpen(false)} 
            Component={
                openRegister ? 
                    <RegisterUserForm onSubmit={() => {}} /> :
                    <LoginForm onSubmit={userLogin} registerOpen={registerOpen}/> 
            }
        />
    );
};

export default UserAccess;