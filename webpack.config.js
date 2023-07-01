const path = require('path')

module.exports = {
    entry: {
        finalPage: './src/scripts/finalPageScript.js',
        loginPage: './src/scripts/loginPageScript.js',
        registerPage: './src/scripts/registerPageScript.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist/scripts'),
        filename: '[name].js'
    },
    mode: 'production',
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /.js$/,
            use: ['babel-loader']
        }]
    }
}