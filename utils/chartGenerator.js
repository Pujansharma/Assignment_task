const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

const generateChart = async (data) => {
    const width = 800;
    const height = 400;

    // Create a new ChartJSNodeCanvas instance
    const chartNode = new ChartJSNodeCanvas({ width, height });

    const configuration = {
        type: 'bar',
        data: {
            labels: ['Label 1', 'Label 2', 'Label 3'],
            datasets: [{
                label: 'Chart Data',
                data: data,
                backgroundColor: 'blue' // Example background color
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    // Render the chart using the configuration
    const image = await chartNode.renderToBuffer(configuration);

    return image;
};

module.exports = generateChart;
