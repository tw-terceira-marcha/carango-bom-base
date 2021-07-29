import React, { useState } from 'react';
import Modal from '../../ui/modal';
import LoginForm from '../../ui/login-form';
import RegisterUserForm from '../../ui/register-user-form';

const UserAccess = ({openModal, setModalOpen}) => {

    const [openRegister,setOpenRegister] = useState(false);
    const registerOpen = () => {
        setOpenRegister(!openRegister);
    };

    return (
        <Modal 
            open={openModal} 
            onClose={() => setModalOpen(false)} 
            Component={
                openRegister ? 
                    <RegisterUserForm onSubmit={() => {}} /> :
                    <LoginForm onSubmit={() => {}} registerOpen={registerOpen}/> 
            }
        />
    );
};

export default UserAccess;