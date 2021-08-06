import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useErrors from '../../hooks/errors';
import VehicleService from '../../services/vehicle/service';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import BrandService from '../../services/brand/service';
import './styles.scss';

const VehicleRegister = () => {

    const [model, setModel] = useState('');
    const [value, setValue] = useState('');
    const [year, setYear] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [brands, setBrands] = useState([]);
    const [canSubmit, setCanSubmit] = useState(false);

    const history = useHistory();

    const { id } = useParams();

    const validations = {
        vehicleModel: data => {
            if (data && data.length >= 3) {
                return { valid: true };
            } else {
                return { valid: false, message: 'Veiculo deve ter ao menos 3 letras.' };
            }
        },
        vehicleYear: data => {
            if (data && data > 1900) {
                return { valid: true };
            } else {
                return { valid: false, message: 'Veiculo deve ser de um ano maior que 1900.' };
            }
        },
        vehicleValue: data => {
            if (data && data > 0) {
                return { valid: true };
            } else {
                return { valid: false, message: 'Veiculo deve ter preço maior do que 0.' };
            }
        }
    };

    const [errors, validateFields, canSend] = useErrors(validations);

    const cancel = () => {
        history.goBack();
    };

    useEffect(async () => {
        const brandResponse = await BrandService.getList();
        setBrands(brandResponse.data);
        if (id) {
            const { data } = await VehicleService.getById(id);
            setValue(data.value ? data.value : '');
            setModel(data.model ? data.model : '');
            setYear(data.year ? data.year : '');
            setSelectedBrand(data.brand.id ? data.brand.id : '');
        }
    }, []);

    const submit = async (event) => {
        event.preventDefault();
        if (id) {
            await VehicleService.update({ id, model, year, value, brandId: selectedBrand });
            history.goBack();
        } else {
            await VehicleService.create({ model, year, value, brandId: selectedBrand });
            history.goBack();
        }
    };
    const validateVehicleFields = (event) => {
        validateFields(event);
        setCanSubmit(canSend());
    };

    return (
        <form onSubmit={submit}>
            <FormControl
                variant="outlined"
                required
                className='vehicle-input'
                data-testid='input-register-vehicle-brand'
            >
                <InputLabel id="demo-simple-select-label">Marca</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedBrand}
                    onChange={(event) => setSelectedBrand(event.target.value ? event.target.value : '')}
                >
                    {brands.map(
                        (brand, index) =>
                            <MenuItem
                                key={`brand-${index}`}
                                id={brand.id}
                                value={brand.id}
                            >
                                {brand.name}
                            </MenuItem>
                    )}
                </Select>
            </FormControl>
            <TextField
                className='vehicle-input'
                value={model}
                onChange={(event) => setModel(event.target.value ? event.target.value : '')}
                onBlur={validateVehicleFields}
                helperText={errors.vehicleModel.message}
                error={!errors.vehicleModel.valid}
                name="vehicleModel"
                id="vehicleModel"
                label="Modelo"
                type="text"
                variant="outlined"
                fullWidth
                required
                inputProps={{ 'data-testid': 'input-register-vehicle-model' }}
            />
            <TextField
                className='vehicle-input'
                value={year}
                onChange={(event) => setYear(event.target.value ? event.target.value : '')}
                onBlur={validateVehicleFields}
                helperText={errors.vehicleYear.message}
                error={!errors.vehicleYear.valid}
                name="vehicleYear"
                id="vehicleYear"
                label="Ano"
                type="number"
                variant="outlined"
                fullWidth
                required
                inputProps={{ 'data-testid': 'input-register-vehicle-year' }}
            />
            <CurrencyTextField
                className='vehicle-input'
                onChange={(event, value) => setValue(value ? value : '')}
                onBlur={(event, value) => validateVehicleFields({ target: { name: event.target.name, value } })}
                helperText={errors.vehicleValue.message}
                error={!errors.vehicleValue.valid}
                name="vehicleValue"
                id="vehicleValue"
                label="Valor"
                variant="outlined"
                fullWidth
                required
                inputProps={{ 'data-testid': 'input-register-vehicle-value' }}
                value={value}
                currencySymbol="R$"
                //minimumValue="0"
                decimalCharacter=","
                digitGroupSeparator="."
            />
            <Button
                variant="contained"
                color="primary"
                type="submit"
                data-testid='button-register-vehicle'
                disabled={!canSubmit}
            >
                {id ? 'Alterar' : 'Cadastrar'}
            </Button>

            <Button
                variant="contained"
                color="secondary"
                data-testid='cancel-register-vehicle'
                onClick={cancel}>
                Cancelar
            </Button>
        </form>
    );
};

export default VehicleRegister;