import React from "react";

import { Cards, Chart, CountryPicker, DatePicker } from './components';
import styles from './App.module.css';

import { fetchData, fetchDailyData } from './api';

import coronaImage from './images/image.png';

class App extends React.Component {
    state = {
        data: {},
        country: '',
        date: ''
    }

    async componentDidMount() {
        const fetchedData = await fetchData();

        this.setState({ data: fetchedData })
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        
        this.setState({ data: fetchedData, country: country })

        // console.log("Country data fetched : ", fetchedData);
    }

    handleDateChange = async (date) => {
        const fetchedData = await fetchData(date);
        
        this.setState({ data: fetchedData, date: date })

        // console.log("Date daata fetched : ", fetchedData);
    }

    render() {
        const { data, country, date } = this.state;

        return (
            <div className={styles.container}>
                <img className={styles.image} src={coronaImage} alt="COVID-19"/>
                <Cards data={data} />
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <DatePicker handleDateChange={this.handleDateChange} />
                <Chart data={data} country={country} date={date}/>
            </div>
        )
    }
}

export default App;