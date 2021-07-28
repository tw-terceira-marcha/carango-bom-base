import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './styles.scss';


const LoginForm = ({ onSubmit, registerOpen }) => {
    const [ login, setLogin ] = useState('');
    const [ pass, setPass ] = useState('');

    const loginChanged = (event) => {
        setLogin(event.target.value);
        event.preventDefault();
    };
    const passChanged = (event) => {
        setPass(event.target.value);
        event.preventDefault();
    };
    const submit = (event) => {
        onSubmit(login, pass);
        event.preventDefault();
    };

    const openRegisterModal = () => {
        registerOpen();
    };

    return (
        <form
            onSubmit={submit}
            className='login-form'>
            <div className='login-inputs'>
                <TextField
                    type='text'
                    placeholder="Login"
                    inputProps={{ 'data-testid': 'login-input' }}
                    onChange={loginChanged}/>
                <TextField
                    type='password'
                    placeholder="Password"
                    inputProps={{ 'data-testid': 'password-input' }}
                    onChange={passChanged}/>
            </div>
            <div className='login-button'>
                <Button data-testid='login-button' type='submit' >Entrar</Button>
                <Button data-testid='register-button' type='button' color='secondary' onClick={openRegisterModal}>Cadastrar</Button>
            </div>
        </form>
    );
};


export default LoginForm;
