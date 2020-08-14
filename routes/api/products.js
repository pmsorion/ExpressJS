const express = require('express');
const router = express.Router();
const ProductsService = require('../../services/products');

const productService = new ProductsService();

router.get('/', async function(req, res, next) {
    const { tags } = req.query;

    console.log('req', req.query);

    try {    
        throw new Error('This is an error form the API')  
        const products = await productService.getProducts({ tags });
    
        res.status(200).json({
            data: products,
            message: 'products listed'
        });
    } catch (error) {
        next(error)
    }

})

router.get('/:productId', async function(req, res, next) {
    const { productId } = req.params;
    console.log('req', req.params);

    try {
        const product = await productService.getProduct({ productId });
    
        res.status(200).json({
            data: product,
            message: 'products retrieved'
        });
    } catch (error) {
        next(error)
    }
})

router.post('/', async function(req, res, next) {
    const { body: product } = req
    console.log('req', req.body);

    try {
        const createProduct = await productService.createProducts({ product });
    
        res.status(201).json({
            data: createProduct,
            message: 'products listed'
        });
    } catch (error) {
        next(error);
    }
})

router.put('/:productId', async function(req, res, next) {
    const { productId } = req.params;
    const { body: product } = req;
    console.log("req", req.params, req.body);

    try {
        const updateProduct = await productService.updateProduct({ productId, product });

        res.status(200).json({
            data: updateProduct,
            message: 'products updated'
        });
    } catch (error) {
        next(error);
    }
})

router.delete('/:productId', async function(req, res, next) {
    const { productId } = req.params;
    console.log('req', req.params);

    try {
        const product = await productService.deleteProduct({ productId });
    
        res.status(200).json({
            data: product,
            message: 'products deleted'
        });
    } catch (error) {
        next(error);
    }
})

router.patch('/:productId', async function(req, res, next) {
    const { productId } = req.params;
    const { body: product } = req;
    console.log("req", req.params, req.body);

    try {
        const updateProduct = await productService.patchProduct({ productId, product });

        res.status(200).json({
            data: updateProduct,
            message: 'products updated'
        });
    } catch (error) {
        next(error);
    }
})

module.exports = router;