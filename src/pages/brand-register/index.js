import { Button, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import useErrors from '../../hooks/errors';
import BrandService from '../../services/brand/service';

const BrandRegister = () => {

    const [brand, setBrand] = useState('');

    const history = useHistory();

    const { id } = useParams();

    const validations = {
        brand: data => {
            if (data && data.length >= 3) {
                return { valid: true };
            } else {
                return { valid: false, message: 'Marca deve ter ao menos 3 letras.' };
            }
        }
    };

    const [errors, validateFields, canSend] = useErrors(validations);

    const cancel = () => {
        history.goBack();
    };

    const changeInput = (event) => {
        setBrand(event.target.value);
        event.preventDefault();
    };

    useEffect(async () => {
        if (id) {
            const { data } = await BrandService.getById(id);
            setBrand(data.name);
        }
    }, [id]);

    const submit = async (event) => {
        event.preventDefault();
        if (id) {
            await BrandService.update({ id, name: brand });
            history.goBack();
        } else {
            await BrandService.create({ name: brand });
            history.goBack();
        }
    };

    return (
        <form onSubmit={submit}>
            <TextField
                // value={brand}
                onChange={changeInput}
                onBlur={validateFields}
                helperText={errors.brand.message}
                error={!errors.brand.valid}
                name="brand"
                id="brand"
                label="Marca"
                type="text"
                variant="outlined"
                fullWidth
                required
                inputProps={{ 'data-testid': 'input-register-brand' }}
            />
            <Button
                variant="contained"
                color="primary"
                type="submit"
                data-testid='button-register-brand'
                disabled={!canSend()}
            >
                {id ? 'Alterar' : 'Cadastrar'}
            </Button>

            <Button
                variant="contained"
                color="secondary"
                data-testid='cancel-register-brand'
                onClick={cancel}>
                Cancelar
            </Button>
        </form>
    );
};

export default BrandRegister;