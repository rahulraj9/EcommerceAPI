const route = require("express").Router();
const productController = require('../controller/product.controller')

route.post('/products/create',productController.createProduct)

route.get('/products',productController.getProductLists)

route.delete('/products/:id',productController.deleteProduct)

route.post('/products/:id/update_quantity',productController.updateProducts)

module.exports =route