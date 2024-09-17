const User = require('../models/user')

exports.showRegister = async (req, res) => res.render('register', { field: '', message: '' })

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username)
            return res.render('login', { field: 'username', message: 'username is required!' })
        if (!password)
            return res.render('login', { field: 'password', message: 'password is required!' })
        const newUser = new User({ username, password })
        await newUser.save()
        req.session.userId = newUser._id
        res.redirect('/posts')
    } catch (e) {
        res.render('login', { field: '', message: '', error: e.message, })
    }
}

exports.showLogin = async (req, res) => res.render('login', { field: '', message: '' })

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username)
            return res.render('login', { field: 'username', message: 'username is required!' })
        if (!password)
            return res.render('login', { field: 'password', message: 'password is required!' })
        const user = await User.findOne({ username })
        if (!user) return res.render('login', { field: 'username', message: 'user is not found!' })
        if (!user.comparePassword(password)) return res.render('login', { field: 'password', message: 'password is incorrect!' })
        req.session.userId = user._id
        res.redirect('/posts')
    } catch (e) {
        res.render('login', { field: '', message: '', error: e.message, })
    }
}

exports.logout = (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) return res.status(500).send('Failed to logout')
            res.clearCookie('connect.sid')
            res.redirect('/login')
        })
    } catch (e) {
        res.status(500).send('Failed to logout')
    }
}