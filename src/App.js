import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import Details from './components/Details/Details';
import Main from './components/Main/Main';
import useStyles from './styles'
import { useSpeechContext } from '@speechly/react-client';


console.log("pass9");

const App = () => {
    const { listening, attachMicrophone, start, stop } = useSpeechContext();
    const handleClick = async () => {
        if (listening) {
            await stop();
        } else {
            await attachMicrophone();
            await start();
        }
    };
    const classes = useStyles();
    return (
        <div>
            <Grid className={classes.grid} container spacing={0} alignItems="center" justify="center" style={{ height: '100vh' }}>
                <Grid item xs={12} sm={4}>
                    <Details title="Income" />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Main />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Details title="Expense" />
                </Grid>
                <button onClick={handleClick}>
                    {listening ? 'Stop' : 'Start'} Microphone
                </button>
            </Grid>
        </div>
    );
}

export default App