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
app.get('/api/b/for-you', async (req, res) => {
  try {
    console.log('Fetching for-you data...');
    const apiUrl = 'https://frontend-api.pump.fun/coins/for-you?offset=0&limit=100&includeNsfw=false';
    const apiResponse = await axios.get(apiUrl);
    console.log('Received response status:', apiResponse.status); // Log the HTTP status code
    console.log('Received response data:', apiResponse.data); // Log the response data

    res.json(apiResponse.data);
  } catch (error) {
    console.error('Error fetching for-you data:', error.message);

    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }

    const status = error.response ? error.response.status : 500;
    res.status(status).json({ error: 'Internal Server Error' });
  }
});
// Proxy endpoint for "about-to-graduate" data
app.get('/api/atg/about-to-end', async (req, res) => {
  try {
    // Extract query parameters from the incoming request
    const queryString = new URLSearchParams(req.query).toString();
    const apiUrl = `https://advanced-api.pump.fun/coins/about-to-graduate?${queryString}`;

    // Fetch data from the original API
    const apiResponse = await axios.get(apiUrl);

    // Respond with the fetched data
    res.json(apiResponse.data);
  } catch (error) {
    console.error('Error fetching about-to-graduate data:', error.message);

    const status = error.response ? error.response.status : 500;
    res.status(status).json({ error: 'Failed to fetch data' });
  }
});


// Start the server
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
