
const jwt = require('jsonwebtoken')

const generateToken=(async(payload)=>{
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15d' }); // Set an expiration time
    return token;
})

module.exports={generateToken}