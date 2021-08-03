import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import { formatCurrency } from '../../../utils/formatter';

const VehicleCard = ({ data, ...props }) => {
    return (
        <Card data-testid='vehicle-card' {...props}>
            <CardContent>
                <h4>{data.brand?.name}</h4>
                <h2>{data.model}</h2>
                <p>{data.year}</p>
                <h3>{formatCurrency(data.value)}</h3>
            </CardContent>
        </Card>
    );
};

export default VehicleCard;