const { JWK, JWE } = require('node-jose');
const jweSymmetricKeyAlgorithm = 'A256CBC-HS512';
const encrypt = async (publicKey, data) => {
    try {
        console.log(1);
        const key = await JWK.asKey(publicKey, 'pem');
        console.log(2);
        const options = {
            format: 'compact',
            contentAlg: jweSymmetricKeyAlgorithm,
        };

        console.log(3);
        return JWE.createEncrypt(options, key).update(JSON.stringify(data), 'utf8').final();
    } catch (error) {
        throw new Error('Funfou não', error.message);
    }
};

module.exports = encrypt;
