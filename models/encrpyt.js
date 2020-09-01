import bcrypt from 'bcryptjs';

// generates hash
function generateHash(password) {
    return bcrypt.hashSync(password, 8);
};

// compares the password
function validateHash(password) {
    return bcrypt.compareSync(password, this.password);
};

export default {generateHash, validateHash};