const commandLineArgs = require('command-line-args');

const optionDefinitions = [
    {
        name: 'src',
        alias: 's',
        type: String,
    },
];
const options = commandLineArgs(optionDefinitions);

module.exports = options