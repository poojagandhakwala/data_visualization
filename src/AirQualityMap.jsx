import React, { useState, useEffect } from 'react';
import BarChart from './Charts/BarChart';
import { getAirQualityData } from './API/api';

const AirQualityMap = ({ city }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        console.log("city  = ",city);
        getAirQualityData(city).then(setData);
        console.log("data= ",data);
    }, [city]);


    // Render map using D3.js with the data
    return (
        <>
        {/* <BarChart data={data} /> */}
        
        </>
    );
};

export default AirQualityMap;