import { Button, Fab } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect, useState } from 'react';
import './styles.scss';

const DefaultList = ({ columns, load, add, update, remove }) => {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState();

    const updateItem = async () => {
        await update(selectedItem);
    };

    const deleteItem = async () => {
        await remove(selectedItem);
        setSelectedItem(null);
        await loadItems();
    };

    const loadItems = async () => {
        const items = await load();
        setItems(items);
    };

    const updateSelectedItem = (item) => {
        setSelectedItem(item[0]);
    };

    useEffect(loadItems, []);

    return (
        <div className='default-list-container'>
            <DataGrid componentsProps={{ 'data-testid': 'choraste' }} rows={items} columns={columns}
                onSelectionModelChange={updateSelectedItem}
            />

            <div className='actionsToolbar'>
                <Button
                    data-testid='default-list-delete-button'
                    className='actions'
                    variant='contained'
                    color='secondary'
                    disabled={!selectedItem}
                    onClick={deleteItem}>
                    Excluir
                </Button>
                <Button
                    data-testid='default-list-update-button'
                    className='actions'
                    variant='contained'
                    color='primary'
                    disabled={!selectedItem}
                    onClick={updateItem}>
                    Alterar
                </Button>
            </div>

            <Fab color='primary'
                aria-label='add'
                className='fab'
                data-testid='default-list-add-button'
                onClick={add}>
                <AddIcon />
            </Fab>
        </div>
    );
};

export default DefaultList;
