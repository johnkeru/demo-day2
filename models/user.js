const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
})

userSchema.pre('save', async function (next) {
    const user = this
    if (!user.isModified('password')) return next()
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(user.password, salt)
        user.password = hashedPassword
        next()
    } catch (error) {
        next(error)
    }
})

userSchema.methods.comparePassword = function (plainPassword) {
    try {
        const user = this
        return bcrypt.compareSync(plainPassword, user.password)
    } catch (e) {
        return false
    }
}

module.exports = mongoose.model('User', userSchema)