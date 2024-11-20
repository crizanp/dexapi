const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Proxy endpoint to fetch coin by ID
app.get('/api/coins/:id', async (req, res) => {
  try {
    const apiUrl = `https://frontend-api.pump.fun/coins/${req.params.id}`;
    const apiResponse = await axios.get(apiUrl);

    res.json(apiResponse.data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    const status = error.response ? error.response.status : 500;
    res.status(status).json({ error: 'Failed to fetch data' });
  }
});

// Proxy endpoint for "king-of-the-hill" data
app.get('/api/coins/king-of-the-hill', async (req, res) => {
  try {
    const apiUrl = 'https://frontend-api.pump.fun/coins/king-of-the-hill?includeNsfw=false';
    const apiResponse = await axios.get(apiUrl);

    res.json(apiResponse.data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    const status = error.response ? error.response.status : 500;
    res.status(status).json({ error: 'Failed to fetch data' });
  }
});

// General proxy endpoint to handle query parameters
app.get('/api/coins', async (req, res) => {
  try {
    const queryString = new URLSearchParams(req.query).toString(); // Construct query string
    const apiUrl = `https://frontend-api.pump.fun/coins?${queryString}`;
    const apiResponse = await axios.get(apiUrl);

    res.json(apiResponse.data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    const status = error.response ? error.response.status : 500;
    res.status(status).json({ error: 'Failed to fetch data' });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
