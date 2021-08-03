import { Button, Fab } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import BrandService from '../../services/brand/service';
import './styles.scss';

const columns = [
    { field: 'name', headerName: 'Marca', width: 200 }
];

const BrandList = () => {
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState();
    const history = useHistory();

    const update = () => {
        history.push('/alteracao-marca/' + selectedBrand?.id);
    };

    const deleteBrand =async () => {
        await BrandService.deleteById(selectedBrand?.id);
        setSelectedBrand(null);
        loadBrands();
    };
    
    const loadBrands = async () => {
        const brands = await BrandService.getList();
        setBrands(brands.data);
    };

    useEffect(loadBrands, []);
    
    return (
        <div style={{ height: 300, width: '100%' }}>
            <DataGrid rows={brands} columns={columns}
                onRowSelected={gridSelection => setSelectedBrand(gridSelection.data)}
            />

            <div className='actionsToolbar'>
                <Button
                    className='actions'
                    variant="contained"
                    color="secondary"
                    disabled={!selectedBrand}
                    onClick={() => deleteBrand()}>
                    Excluir
                </Button>
                <Button
                    className='actions'
                    variant="contained"
                    color="primary"
                    disabled={!selectedBrand}
                    onClick={() => update()}>
                    Alterar
                </Button>
            </div>

            <Fab color="primary" aria-label="add" className='fab' onClick={() => history.push('/cadastro-marca')}>
                <AddIcon />
            </Fab>
        </div>
    );
};

export default BrandList;
