const express = require('express');
const cors = require('cors');

const studentRoutes = require('./router/studentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
    res.send('Student API running');
});

// Use student API routes
app.use('/', studentRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
