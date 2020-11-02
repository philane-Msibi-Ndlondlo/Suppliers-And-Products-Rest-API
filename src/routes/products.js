const express = require('express');
const router = express.Router();
const DBInstance = require('../config/database/dbConnection');
const productJoiSchema = require('../utils/Validators/Products');

const DBConnection = DBInstance.connect();

router.get('/', (req, res) => {

    DBConnection.then(connection => {

        connection.query(`SELECT * FROM ${process.env.PRODUCTS_TABLE_NAME}`, (error, products) => {

            if (error) {

                return res.status(500).json({
                    success: false,
                    error,
                });
            }

            if (products.length === 0) {

                return res.status(404).json({
                    success: false,
                    error: 'Products not found',
                });
            }

            return res.status(200).json({
                success: true,
                error: null,
                products
            });

        });

    })
    .catch(error => {

        return res.status(500).json({
            success: false,
            error : 'Fetching Records Failed. Contact API Support for assistance.',
        });
    })

});

router.get('/:id', (req, res) => {

    DBConnection.then(connection => {

        connection.query(`SELECT * FROM ${process.env.PRODUCTS_TABLE_NAME} WHERE id = ?`, [req.params.id] , (error, product) => {

            if (error) {

                return res.status(500).json({
                    success: false,
                    error,
                });
            }

            if (product.length === 0) {
                
                return res.status(404).json({
                    success: false,
                    error: 'Product is not found',
                });
            }

            return res.status(200).json({
                success: true,
                error: null,
                product: product[0]
            });

        });

    })
    .catch(error => {

        return res.status(500).json({
            success: false,
            error : 'Fetching Records Failed. Contact API Support for assistance.',
        });
    })

});

router.post('/', (req, res) => {

    const { error } = productJoiSchema.validate(req.body);

    if ( error ) return res.status(400).json({ success: false, error: error.details[0].message });

    const { name, sku, price, supplier_id } = req.body;

    DBConnection.then(connection => {

        connection.query(`INSERT INTO ${process.env.PRODUCTS_TABLE_NAME}(name, sku, price, supplier_id)VALUES(?,?,?,?)`, [name, sku, price, supplier_id] , (error, feedback) => {

            if (error) {

                return res.status(500).json({
                    success: false,
                    error,
                });
            }

            return res.status(201).json({
                success: true,
                error: null,
                message: `Product Added and has ID: ${feedback.insertId}`
            });

        });

    })
    .catch(error => {

        return res.status(500).json({
            success: false,
            error : 'Saving Record Failed. Contact API Support for assistance.',
        });
    })

});

router.delete('/:id', (req, res) => {

    DBConnection.then(connection => {

        connection.query(`SELECT * FROM ${process.env.PRODUCTS_TABLE_NAME} WHERE id = ?`, [req.params.id] , (error, product) => {

            if (error) {

                return res.status(500).json({
                    success: false,
                    error,
                });
            }

            if (product.length === 0) {
                
                return res.status(404).json({
                    success: false,
                    error: 'Product is not found',
                });
            }

            connection.query(`DELETE FROM ${process.env.PRODUCTS_TABLE_NAME} WHERE id = ?`, [req.params.id] , (error, feedback) => {

                if (error) {

                    return res.status(500).json({
                        success: false,
                        error,
                    });
                }

                if (feedback.affectedRows === 1) {
                    
                    return res.status(200).json({
                        success: true,
                        error: `Product deleted with ID: ${req.params.id}`,
                    });
                }

            });

        });

    })
    .catch(error => {

        return res.status(500).json({
            success: false,
            error : 'Fetching Records Failed. Contact API Support for assistance.',
        });
    })

});

module.exports = router;