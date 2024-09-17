const mongoose = require('mongoose')

module.exports = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('DB Connected')
    } catch (error) {
        console.log('Error connecting to DB: ', e.message)
    }
}