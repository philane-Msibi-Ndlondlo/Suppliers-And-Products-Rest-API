const express = require('express');
const cors = require('cors');
const logger = require('volleyball');
const helmet = require('helmet');
const env = require('dotenv');

const app = express();
env.config();
const port = process.env.PORT || 1337;

/*
    ROUTE IMPORTS
*/
const suppliersRoutes = require('./routes/suppliers');
const productsRoutes = require('./routes/products');

/*
    MIDDLEWARES
*/
app.use(express.json());
app.use(cors());
app.use(helmet());

if (process.env.ENVIRONMENT === 'DEVELOPMENT') {
    app.use(logger);
}

/*
    @suppliersRoutes: Routes for Suppliers Operations
    @productsRoutes: Routes for Products Operations
*/
app.use('/api/v1/suppliers', suppliersRoutes);
app.use('/api/v1/products', productsRoutes);

/*
    ROUTE NOT FOUND HANDLER
*/
app.use((req, res, next) => {
    const error = new Error(`Route not Found: ${req.originalUrl}`);
    res.status(404);
    next(error);
})

/*
    ERROR HANDLER
*/
app.use((error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    return res.json({
        success: false,
        error: error.message,
    });
})

/*
    RUN HTTP SERVER
*/
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
