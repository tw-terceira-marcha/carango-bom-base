import React from 'react'
import { Card, CardContent } from '@material-ui/core';
import { formatCurrency } from '../../../utils/formatter';

const VehicleCard = ({data}) => {
    return (
        <Card props={} data-testid='vehicle-card'>
            <CardContent>
                <p>{data.brand}</p>
                <p>{data.model}</p>
                <p>{data.year}</p>
                <p>{formatCurrency(data.value)}</p>
            </CardContent>
        </Card>
    );
};

export default VehicleCard;