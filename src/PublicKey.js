class PublicKey{
    constructor(publicKey) {
        if(!publicKey) throw new Error('Public key cannot be empty.')
        this.publicKey = publicKey
    }

    formatedPublicKey(){
       return this.publicKey.split('\\n').join('')
    }
}

module.exports = PublicKey