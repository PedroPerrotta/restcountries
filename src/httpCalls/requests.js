import axios from 'axios';

const getAllCountries = async () => {
    try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        return response.data;
    } catch (error) {
        return error;
    }
}

const getCountry = async (country) => {
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${country}`)
        return response.data;
    } catch (error) {
        return error;
    }
}

export {
    getAllCountries,
    getCountry
};