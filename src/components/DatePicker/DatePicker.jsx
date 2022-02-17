import React, { useEffect, useState } from 'react';
import { NativeSelect, FormControl } from "@material-ui/core";

import { fetchDates } from "../../api";

import styles from './DatePicker.module.css';

const DatePicker = ({ handleDateChange }) => {
    const [fetchedDates, setFetchedDates] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setFetchedDates(await fetchDates());
        }

        fetchAPI();
    }, [setFetchedDates]);

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e) => handleDateChange(e.target.value)}>
                <option value="">- None -</option>
                {fetchedDates.map((date, i) => <option key={i} value={date}>{date}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default DatePicker;