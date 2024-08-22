import axios from 'axios';

const API_BASE_URL = 'https://api.openaq.org/v1';

export const getAirQualityData = async (city) => {
    try {
        const getCities = async () => {
            const response = await axios.get(`${API_BASE_URL}/countries`);
            return response.data.results;
        };
         getCities();   
        // const response = await axios.get(`${API_BASE_URL}/v2/measurements`,{ params: {
        //     city: 'Amsterdam',
        // },});
        const url='https://api.openaq.org/v2/measurements?date_from=2024-05-30T00%3A00%3A00Z&date_to=2024-06-06T20%3A45%3A00Z&limit=100&page=1&offset=0&sort=desc&radius=1000&order_by=datetime';
        const response= await axios.get(url)
        console.log("api data ",response)
        return response.data.results;
    } catch (error) {
        console.error("Error fetching data", error);
    }
};
