const express = require('express');
const {
    getProducts, getByProducts, saveProducts, updateProducts, deleteProducts
} = require('../controllers/ProductController.js');

const router = express.Router();


router.get('/product', getProducts)
router.get('/product/:id', getByProducts)
router.post('/product', saveProducts)
router.patch('/product/:id', updateProducts)
router.delete('/product/:id', deleteProducts)

module.exports = router;
