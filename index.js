const encrypt = require('./src/encrypt');

const publicKey = process.argv[2].split('\\n').join('');
const data = process.argv[3];

//console.log(publicKey);

new Promise( ( resolve, reject ) => {
    resolve(encrypt(publicKey, data));
}).then( encrypted_data => console.log({encrypted_data}));



