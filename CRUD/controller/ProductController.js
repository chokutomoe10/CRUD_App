const db = require('../db/models')
const Validator = require('fastest-validator')
// const AuthService = require('../services/AuthService')

const v = new Validator();

exports.createProduct = async(req, res) => {
    const schema = {
        name: { type: 'string', min: 3, max: 50, optional: false },
        price: { type: 'number', positive: true, optional: false },
        image: { type: 'string', optional: false },
        status: { type: 'string', min: 5, max: 20, optional: false }
    }

    try {
        const validationResult = v.validate(req.body, schema);

        if (validationResult !== true) {
            res.status(400).json({
                message: 'Validation failed',
                data: validationResult
            })
        } else {
            db.product.create(req.body).then(result => {
                res.status(200).json({
                    message: 'Product created!',
                    data: result
                });
            }).catch(err => {
                res.status(400).json({
                    message: 'Create Product failed',
                    data: err
                });
            });
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getAllProducts = async(req, res) => {
    try {
        const response = await db.product.findAll()
        return res.status(200).json(response)
    } catch (error) {
        console.log(error.message);
    }
}

exports.getOneProduct = async(req, res) => {
    try {
        const response = await db.product.findOne({
            where: {
                id: req.params.id
            }
        })
        return res.status(200).json(response)
    } catch (error) {
        console.log(error.message);
    }
}

exports.updateProduct = async(req, res) => {
    const schema = {
        name: { type: 'string', min: 3, max: 50, optional: false },
        price: { type: 'number', positive: true, optional: false },
        image: { type: 'string', optional: false },
        status: { type: 'string', min: 5, max: 20, optional: false }
    }

    const validationResult = v.validate(req.body, schema);

    if (validationResult !== true) {
        res.status(400).json({
            message: 'Validation failed',
            data: validationResult
        })
    } else {
        await db.product.update(req.body,{
            where: {
                id: req.params.id
            }
        }).then(result => {
            res.status(200).json({
                message: 'Product updated',
                data: result
            })
        }).catch(err => {
            res.status(400).json({
                message: 'Update Product failed',
                data: err
            })
        })
    }
}

exports.deleteProduct = async(req, res) => {
    try {
        await db.product.destroy({
            where: {
                id: req.params.id
            }
        })
        return res.status(200).json({msg: "product deleted!"})
    } catch (error) {
        console.log(error.message);
    }
}