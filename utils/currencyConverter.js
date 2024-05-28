const axios = require('axios');
const API_KEY = '2eeee3efaa153d39c940b59d'; // Replace with your actual API key

async function convertCurrency(amount, fromCurrency, toCurrency) {
  try {
    const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}`);
    const conversionRate = response.data.conversion_rate;
    return amount * conversionRate;
  } catch (error) {
    console.error('Error converting currency:', error);
    throw new Error('Currency conversion failed');
  }
}

module.exports = convertCurrency;
