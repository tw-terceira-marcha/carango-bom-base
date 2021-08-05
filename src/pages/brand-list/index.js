import React from 'react';
import { useHistory } from 'react-router';
import DefaultList from '../../components/container/default-list';
import BrandService from '../../services/brand/service';
import './styles.scss';

const columns = [
    { field: 'name', headerName: 'Marca', width: 200 }
];

const BrandList = () => {
    const history = useHistory();

    const updateBrand = (brandId) => {
        history.push('/brand-update/' + brandId);
    };

    const deleteBrand = async (brandId) => {
        await BrandService.deleteById(brandId);
    };

    const addBrand = async () => {
        history.push('/brand-register');
    };

    const loadBrands = async () => {
        const response = await BrandService.getList();
        return response.data;
    };

    return (
        <DefaultList
            columns={columns}
            load={loadBrands}
            add={addBrand}
            update={updateBrand}
            remove={deleteBrand}
        />
    );
};

export default BrandList;
