const express = require('express');
const router = express.Router();
const DBInstance = require('../config/database/dbConnection');
const supplierJoiSchema = require('../utils/Validators/Suppliers');

const DBConnection = DBInstance.connect();

router.get('/', (req, res) => {

    DBConnection.then(connection => {

        connection.query(`SELECT * FROM ${process.env.SUPPLIERS_TABLE_NAME}`, async (error, suppliers) => {

            const newSuppliers = [];

                connection.query(`SELECT * FROM ${process.env.PRODUCTS_TABLE_NAME}`, (error, products) => {

                    if (error) {

                        return res.status(500).json({
                            success: false,
                            error,
                        });
                    }
                    
                    suppliers.forEach(supplier => {
                        const supplierProducts =  products.filter(product => product.supplier_id === supplier.id);
                        newSuppliers.push({
                            ...supplier,
                            supplierProducts
                        });
                    });
        
                    return res.status(200).json({
                        success: true,
                        error: null,
                        suppliers: newSuppliers
                    });

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

        connection.query(`SELECT * FROM ${process.env.SUPPLIERS_TABLE_NAME} WHERE id = ?`, [req.params.id] , async (error, supplierInfo) => {

            if (supplierInfo.length === 0) {
                
                return res.status(404).json({
                    success: false,
                    error: 'Supplier is not found',
                });
            }

                connection.query(`SELECT * FROM ${process.env.PRODUCTS_TABLE_NAME} WHERE supplier_id = ?`, [req.params.id], (error, products) => {

                    if (error) {

                        return res.status(500).json({
                            success: false,
                            error,
                        });
                    }
        
                    return res.status(200).json({
                        success: true,
                        error: null,
                        supplier: {
                            ...supplierInfo[0],
                            products
                        }
                    });

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

    const { error } = supplierJoiSchema.validate(req.body);

    if ( error ) return res.status(400).json({ success: false, error: error.details[0].message });

    const { name, location, contactInfo } = req.body;

    DBConnection.then(connection => {

        connection.query(`INSERT INTO ${process.env.SUPPLIERS_TABLE_NAME}(name, location, contactInfo)VALUES(?,?,?)`, [name, location, contactInfo] , (error, feedback) => {

            if (error) {

                return res.status(500).json({
                    success: false,
                    error,
                });
            }

            console.log(feedback);

            return res.status(201).json({
                success: true,
                error: null,
                message: `Supplier Added and has ID: ${feedback.insertId}`
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

        connection.query(`SELECT * FROM ${process.env.SUPPLIERS_TABLE_NAME} WHERE id = ?`, [req.params.id] , (error, supplier) => {

            if (error) {

                return res.status(500).json({
                    success: false,
                    error,
                });
            }

            if (supplier.length === 0) {
                
                return res.status(404).json({
                    success: false,
                    error: 'Supplier is not found',
                });
            }

            connection.query(`DELETE FROM ${process.env.PRODUCTS_TABLE_NAME} WHERE supplier_id = ?`, [req.params.id] , (error, feedback) => {

                if (error) {

                    return res.status(500).json({
                        success: false,
                        error,
                    });
                }

                connection.query(`DELETE FROM ${process.env.SUPPLIERS_TABLE_NAME} WHERE id = ?`, [req.params.id] , (error, feedback) => {

                    if (error) {

                        return res.status(500).json({
                            success: false,
                            error,
                        });
                    }

                        return res.status(200).json({
                            success: true,
                            error: `Supplier deleted with ID: ${req.params.id}`,
                        });

                });

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