import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './styles.scss';


const RegisterUserForm = ({onSubmit}) => {
    const [ name, setName ] = useState('');
    const [ login, setLogin ] = useState('');
    const [ pass, setPass ] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const handleName = (e) => {
        setName(e.target.value);
        e.preventDefault();
    };

    const handleLogin = (e) => {
        setLogin(e.target.value);
        e.preventDefault();
    };

    const handlePass = (e) => {
        setPass(e.target.value);
        e.preventDefault();
    };

    const handleConfirmPass = (e) => {
        setConfirmPass(e.target.value);
        e.preventDefault();
    };

    const submit = (event) => {
        // TODO: confirm password
        onSubmit(name, login, pass);
        event.preventDefault();
    };

    return (
        <form
            onSubmit={submit}
            className='register-form'
            data-testid='register-form'
        >
            <div className='register-inputs'>
                <TextField
                    type='text'
                    placeholder="Nome"
                    inputProps={{ 'data-testid': 'name-input' }}
                    onChange={handleName}
                />
                <TextField
                    type='text'
                    placeholder="email"
                    inputProps={{ 'data-testid': 'email-input' }}
                    onChange={handleLogin}
                />
                <TextField
                    type='password'
                    placeholder="Senha"
                    inputProps={{ 'data-testid': 'create-password-input' }}
                    onChange={handlePass}
                />
                <TextField
                    type='password'
                    placeholder="Confirmar Senha"
                    inputProps={{ 'data-testid': 'confirm-password-input' }}
                    onChange={handleConfirmPass}
                />
            </div>
            <div className='register-button'>
                <Button data-testid='register-submit-button' type='submit'>Cadastrar</Button>
            </div>
        </form>
    );
};


export default RegisterUserForm;
