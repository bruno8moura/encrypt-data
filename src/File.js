const { writeFile, readFile } = require('fs/promises')
const { join } = require('path')

class File{
    constructor(fullFilePath){         
        this.root = join( __dirname, '../' )
        this.output = join( this.root, 'output' )
        if(!fullFilePath) throw new Error('File not found. >>> ', fullFilePath)        
        this.fullFilePath = fullFilePath
    }

    async create(data, name='output'){
        const output = this.output.concat('/').concat(name)
        await writeFile(output, data)
    }

    async read() {
        const data = await readFile(this.fullFilePath, {
            encoding: 'utf-8',
        })

        return data.replace(/(\r\n|\n|\r)/gm, "");
    }

    printOutputPath() {
        return this.output
    }
}

module.exports = File