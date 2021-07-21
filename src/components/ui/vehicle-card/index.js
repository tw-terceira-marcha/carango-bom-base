import React from 'react'
import { Card, CardContent } from '@material-ui/core';
import { formatCurrency } from '../../../utils/formatter';

const VehicleCard = ({ data, ...props }) => {
    return (
        <Card data-testid='vehicle-card' {...props}>
            <CardContent>
                <h4>{data.marca?.nome}</h4>
                <h2>{data.modelo}</h2>
                <p>{data.ano}</p>
                <h3>{formatCurrency(data.valor)}</h3>
            </CardContent>
        </Card>
    );
};

export default VehicleCard;