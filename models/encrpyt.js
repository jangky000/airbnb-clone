// import bcrypt from 'bcryptjs'; 
// 이 문법을 쓰려면 package.json의 최상위에 "type": "module",를 쓰고, 모든 require를 import로 변경해야 함
// https://stackoverflow.com/questions/58384179/syntaxerror-cannot-use-import-statement-outside-a-module
const bcrypt = require('bcryptjs')

class Bcrypt{
    constructor(){
        //
    }

    // generates hash
    generateHash(password) {
        // var bcrypt = require('bcryptjs');
        // var salt = bcrypt.genSaltSync(10);
        // var hash = bcrypt.hashSync("B4c0/\/", salt);
        return bcrypt.hashSync(password, 8); // Auto-gen a salt and hash 8은 옵션?
    };

    // compares the password
    validateHash(password, hash_pwd) {
        return bcrypt.compareSync(password, hash_pwd);
    };

}


// export default {generateHash, validateHash};
module.exports = Bcrypt;