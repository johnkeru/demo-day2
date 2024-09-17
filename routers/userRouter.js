const { Router } = require('express')
const { showLogin, showRegister, login, register, logout } = require('../controllers/userContoller')

const userRouter = Router()

// actions
userRouter.post('/login', login)
userRouter.post('/register', register)
userRouter.get('/logout', logout)

// templates
userRouter.get('/login', showLogin)
userRouter.get('/register', showRegister)

module.exports = userRouter