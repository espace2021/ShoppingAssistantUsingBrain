const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to the database
mongoose.connect("mongodb://127.0.0.1:27017/DataBaseBrain")
    .then(() => {
        console.log("Database Successfully Connected");
    })
    .catch(err => {
        console.log("Unable to connect to database", err);
        process.exit();
    });

// Middleware to parse JSON
app.use(express.json());

// Simple route to check if the server is working
app.get('/', (req, res) => {
    res.send('Shopping assistant is ready!');
});


//Appel de routes
const productRoutes= require('./routes/productrecommendation.routes');
app.use('/api/productsRecomm',productRoutes);

// Start the server
app.listen(3001, () => {
    console.log(`Server is listening on port ${3001}`);
});

module.exports = app;
