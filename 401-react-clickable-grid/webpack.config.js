module.exports = {
    entry: './src/js/main.jsx',

    output: {
        path    : 'dist/js/',
        filename: 'main.js'
    },

    module   : {
        loaders: [
            {
                test   : /\.js|jsx$/,
                loaders: ['babel']
            }
        ]
    },
    resolve  : {
        extensions: ['', '.js', '.jsx']
    },
    externals: {
        'react'    : 'React',
        'react-dom': 'ReactDOM'
    }
};
