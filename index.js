const File = require('./src/File')
const encrypt = require('./src/encrypt')
const PublicKey = require('./src/PublicKey')
const UserData = require('./src/UserData')

async function main() {
    try {
        const { public_key, fullpath_to_file, output_file_name } = await new UserData().readInput()
        
        const file = new File(fullpath_to_file)
        const opened_data = await file.read()
        
        const formatedPublicKey = new PublicKey(public_key).formatedPublicKey()

        const encrypted_data = await encrypt(formatedPublicKey, JSON.parse(opened_data))
        await file.create(encrypted_data, output_file_name)
        console.log('See your file at ', file.printOutputPath());
    } catch (error) {
        console.error('error: ', error.message)
    }
}

main();

