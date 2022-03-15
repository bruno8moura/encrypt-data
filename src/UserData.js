const { promisify } = require('util')
const prompt = require('prompt')

class UserData {
    constructor() {
        prompt.start();
    }
    
    async readInput() {
        const getAsync = promisify(prompt.get)
        const { public_key, fullpath_to_file, output_file_name } = await getAsync(['public_key', 'fullpath_to_file', 'output_file_name'])
        return {
            public_key, 
            fullpath_to_file, 
            output_file_name
        }
    }
}

module.exports=UserData