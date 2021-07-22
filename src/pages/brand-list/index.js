import { Button, Fab, makeStyles } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import BrandService from '../../services/brand/service';

const columns = [
    { field: 'nome', headerName: 'Marca', width: 200 }
];

const useStyles = makeStyles(() => ({
    fab: {
        position: 'absolute',
        bottom: '100px',
        right: '100px',
    },
    actionsToolbar: {
        float: 'right'
    },
    actions: {
        top: '10px',
        marginLeft: '10px',
    }
}));

const BrandList = () => {
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState();
    const classes = useStyles();
    const history = useHistory();

    const update = () => {
        history.push('/alteracao-marca/' + selectedBrand.id);
    };

    const deleteBrand = () => {
        BrandService.delete(selectedBrand)
            .then(() => {
                setSelectedBrand(null);
                loadBrands();
            });
    };

    // TODO: Avaliar remover disable na próxima linha
    // eslint-disable-next-line
    useEffect(() => loadBrands(), []);

    const loadBrands = () => {
        BrandService.getList()
            .then(data => setBrands(data));
    };

    return (
        <div style={{ height: 300, width: '100%' }}>
            <DataGrid rows={brands} columns={columns}
                onRowSelected={gridSelection => setSelectedBrand(gridSelection.data)}
            />

            <div className={classes.actionsToolbar}>
                <Button
                    className={classes.actions}
                    variant="contained"
                    color="secondary"
                    disabled={!selectedBrand}
                    onClick={() => deleteBrand()}>
                    Excluir
                </Button>
                <Button
                    className={classes.actions}
                    variant="contained"
                    color="primary"
                    disabled={!selectedBrand}
                    onClick={() => update()}>
                    Alterar
                </Button>
            </div>

            <Fab color="primary" aria-label="add" className={classes.fab} onClick={() => history.push('/cadastro-marca')}>
                <AddIcon />
            </Fab>
        </div>
    );
};

export default BrandList;