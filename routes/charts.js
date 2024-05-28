const express = require('express');
const generateChart = require('../utils/chartGenerator');

const Chartsrouter = express.Router();

Chartsrouter.get('/chart', async (req, res) => {
    try {
        // Generate chart data (example data for now)
        const chartData = [10, 20, 30];

        // Generate the chart image
        const chartImage = await generateChart(chartData);

        // Set the response content type to image/png
        res.contentType('image/png');

        // Send the chart image as the response
        res.send(chartImage);
    } catch (error) {
        console.error('Error generating chart:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = { Chartsrouter }
