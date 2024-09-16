const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const ProductRoutes= require('./routes/productRoutes')

dotenv.config()

const PORT = process.env.PORT || 3000;
app.use(express.json())
mongoose.connect(process.env.MONGO_URL).then(() => console.log("Database is connected!")).catch((err) => console.log("Database is not connected!" + err));

app.use('/api/products', ProductRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})