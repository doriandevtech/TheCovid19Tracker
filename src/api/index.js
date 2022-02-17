import axios from 'axios';

const url =  'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
    let changeableUrl = url;

    if (country) {
        changeableUrl = `${url}/countries/${country}`;
    }

    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);

        return { confirmed, recovered, deaths, lastUpdate };
    } catch (error) {
        console.log(error);
    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);

        console.log(data);

        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
            incidentRate: dailyData.incidentRate
        }));
        console.log("modified data : ", modifiedData);
        return modifiedData;
    } catch (error) {

    }
}

export const fetchCountries = async () => {
    try {
        const { data: { countries }} = await axios.get(`${url}/countries`);
        
        return countries.map((country) => country.name);
    } catch (error) {
        console.log(error);
    }
}

export const fetchDates = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);
        console.log("dated data : ", data.reportDate)
        return data.map((date) => date.reportDate);
    } catch (error) {
        console.log(error);
    }
}