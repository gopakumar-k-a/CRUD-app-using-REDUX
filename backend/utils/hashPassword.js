const bcrypt = require('bcrypt');

const hashPassword=async(password, saltRounds = 10)=> {
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    } catch (err) {
        console.error('Error hashing password:', err);
        throw new Error('error in hashing password');
    }
}

module.exports = { hashPassword }