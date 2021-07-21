import React from 'react'
import { Card, CardContent } from '@material-ui/core';
import { formatCurrency } from '../../../utils/formatter';

const VehicleCard = ({data}) => {
    return (
        <Card data-testid='vehicle-card'>
            <CardContent>
                <p>{data.marca?.nome}</p>
                <p>{data.modelo}</p>
                <p>{data.ano}</p>
                <p>{formatCurrency(data.valor)}</p>
            </CardContent>
        </Card>
    );
};

export default VehicleCard;