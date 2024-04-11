const mongoose = require('mongoose')

const connectDb = async () => {
    try {
        mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING).then(() => {
            console.log('database connected successfully');
        })
    } catch (error) {
        throw new Error('data base connection problem')
    }
}

module.exports={
    connectDb
}