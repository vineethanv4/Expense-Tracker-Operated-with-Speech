import React from 'react';
import {Card, CardHeader, CardContent, Typography} from '@material-ui/core';
import { Doughnut,Pie } from 'react-chartjs-2';
import useTransactions from '../../useTransactions';
import useStyles from './styles';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);


const Details = ({title}) => {
    const classes =  useStyles();
    const {total, chartData} = useTransactions(title);
    console.log(chartData);

  return (
    <Card classname={title === 'Income' ? classes.income : classes.expnses}>
        < CardHeader title={title} />
        <CardContent>
            <Typography variant='h5'>${total}</Typography>
            <Doughnut data={chartData} />
        </CardContent>
    </Card>
  )
}
export default Details