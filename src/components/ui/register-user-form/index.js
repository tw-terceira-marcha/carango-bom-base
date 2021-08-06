import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import './styles.scss';


const RegisterUserForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [login, setLogin] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [error, setError] = useState(false);


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

    const submit =async (event) => {
        if (confirmPass !== pass) {
            setError('Senhas diferentes, insira a senha novamente');
            event.preventDefault();
            return;
        }
        onSubmit(name, login, pass);
        event.preventDefault();
    };

    return (
        <form
            onSubmit={submit}
            className='register-form'
            data-testid='register-form'
        >
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={!!error}
                autoHideDuration={6000}
                onClose={() => {}}
                message={error}
            />
            <div className='register-inputs' >
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
