const { JWK, JWE } = require('node-jose');
const jweSymmetricKeyAlgorithm = 'A256CBC-HS512';
const encrypt = async (publicKey, data) => {
    try {
        const key = await JWK.asKey(publicKey, 'pem');
        const options = {
            format: 'compact',
            contentAlg: jweSymmetricKeyAlgorithm,
        };

        return JWE.createEncrypt(options, key).update(JSON.stringify(data), 'utf8').final();
    } catch (error) {
        throw new Error('Funfou não', error.message);
    }
};

module.exports = encrypt;
