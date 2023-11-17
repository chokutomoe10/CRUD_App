const express = require('express')
const { createUser, getAllUsers, getOneUser, updateUser, deleteUser, loginUser, authorizationUser } = require('../controller/UserController')
const { createProduct, getAllProducts, getOneProduct, updateProduct, deleteProduct } = require('../controller/ProductController')

const router = express.Router()

//CRUD User
router.get('/user', getAllUsers)
router.get('/user/:id', getOneUser)
router.post('/user', createUser)
router.patch('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

//CRUD Product
router.get('/product', getAllProducts)
router.get('/product/:id', getOneProduct)
router.post('/product', createProduct)
router.patch('/product/:id', updateProduct)
router.delete('/product/:id', deleteProduct)

//Google Login User
router.get('/auth/google', loginUser)
router.get('/auth/google/callback', authorizationUser)

module.exports = router