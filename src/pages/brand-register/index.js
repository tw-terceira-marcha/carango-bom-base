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
                return { valid: false, text: 'Marca deve ter ao menos 3 letras.' };
            }
        }
    };

    const [errors, validateFields, canSend] = useErrors(validations);

    const cancel = () => {
        history.goBack();
    };

    // TODO: Avaliar remover disable na próxima linha
    useEffect(() => {
        if (id) {
            BrandService.getById(id)
                .then(m => setBrand(m.name));
        }
    }, [id]); // eslint-disable-line

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            if (canSend()) {
                if (id) {
                    BrandService.update({ id, name: brand })
                        .then(res => {
                            history.goBack();
                        });
                } else {
                    BrandService.create({ name: brand })
                        .then(res => {
                            setBrand('');
                            history.goBack();
                        });
                }
            }
        }}>
            <TextField
                value={brand}
                onChange={evt => setBrand(evt.target.value)}
                onBlur={validateFields}
                helperText={errors.brand.text}
                error={!errors.brand.valido}
                name="brand"
                id="brand"
                label="Marca"
                type="text"
                variant="outlined"
                fullWidth
                required
                margin="normal"
            />

            <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!canSend()}>
                {id ? 'Alterar' : 'Cadastrar'}
            </Button>

            <Button
                variant="contained"
                color="secondary"
                onClick={cancel}>
                Cancelar
            </Button>
        </form>
    );
};

export default BrandRegister;