const bcrypt = require('bcrypt');

const password = 'admin';

const hash = bcrypt.hashSync(password, 10);
console.log('HASH:', hash);
