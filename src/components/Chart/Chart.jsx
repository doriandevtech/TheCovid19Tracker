import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Chart as ChartJS } from 'chart.js/auto'
import { Line, Bar } from 'react-chartjs-2';
import { Grid, Box, CircularProgress } from '@material-ui/core';

import cx from 'classnames';
import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }

        fetchAPI();
    }, []);

    const lineChart = (
        dailyData.length 
        ? (
            <Line
                data= {{
                    labels: dailyData.map(({ date }) => date),
                    datasets: [{
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: 'Infected',
                        borderColor: 'blue',
                        backgroundColor: 'rgba(0, 0, 250, 0.1)',
                        fill: true,
                    }, {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'rgba(250, 0, 0, 0.2)',
                        fill: true,
                    }, {
                        data: dailyData.map(({ incidentRate }) => incidentRate),
                        label: 'Incident rate',
                        borderColor: 'orange',
                        backgroundColor: 'rgba(250, 100, 0, 0.2)',
                        fill: true,
                    }],
                }}
            />) : (
            <div className={styles.container}>
                <Grid container justifyContent="center">
                    <Box className={cx(styles.loader)}>
                        <CircularProgress />
                    </Box>
                </Grid>
            </div>
        )
    );

    const barChart = (
        confirmed
            ? (
                <Bar 
                    data = {{
                        labels: ['Infected', 'Recovered', 'Deaths'],
                        datasets: [{
                            label: 'People',
                            backgroundColor: [
                                'rgba(0, 0, 255, 0.5)',
                                'rgba(0, 255, 0, 0.5)',
                                'rgba(255, 0, 0, 0.5)',
                            ],
                            data: [confirmed.value, confirmed.value - deaths.value, deaths.value]
                        }]
                    }}
                    options = {{
                        legend: { display: false },
                        title: { display: true, text: `Current state in ${country}`},
                    }}
                />
            ) : (
            <div className={styles.container}>
                <Grid container justifyContent="center">
                    <Box className={cx(styles.loader)}>
                        <CircularProgress />
                    </Box>
                </Grid>
            </div>
        )
    )

    return (
        <div className={styles.container}>
        { country ? barChart : lineChart }
        </div>
    )
}

export default Chart;