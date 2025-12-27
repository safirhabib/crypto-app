require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
const port = process.env.PORT || 5001;

// CORS Configuration
const allowedOrigins = ['http://localhost:3000', 'https://your-production-domain.com'];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests, please try again later.'
});
app.use('/api/', limiter);

// Logging Middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Cryptocurrency Endpoint
const COINGECKO_BASE_URL = process.env.COINGECKO_BASE_URL;

app.get('/api/cryptocurrencies', async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        if (page < 1) {
            return res.status(400).json({ error: 'Page must be a positive number' });
        }

        const response = await axios.get(`${COINGECKO_BASE_URL}/coins/markets`, {
            params: {
                vs_currency: 'cad',
                order: 'market_cap_desc',
                per_page: 10,
                page: page
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Failed to fetch data', details: error.message });
    }
});


/* =========================
   Serve React (PRODUCTION)
========================= */

const __dirnameResolved = path.resolve();

app.use(express.static(path.join(__dirnameResolved, 'client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirnameResolved, 'client/build', 'index.html'));
});



// Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
