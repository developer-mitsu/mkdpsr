const marked = require('./psr')
const fs = require('fs')

const parser = (filePath) => {
    return marked(fs.readFileSync(filePath, 'utf-8'))
}

module.exports = parser