const CopyWebpackPlugin = require( 'copy-webpack-plugin' )
const HtmlWebpackPlugin = require( 'html-webpack-plugin' )
const MiniCSSExtractPlugin = require( 'mini-css-extract-plugin' )
const path = require( 'path' )

module.exports = {
    entry: path.resolve( __dirname, '../src/app.js' ),
    output:
    {
        filename: 'bundle.[contenthash].js',
        path: path.resolve( __dirname, '../dist' )
    },
    devtool: 'source-map',
    plugins: [
        new CopyWebpackPlugin(
        {
            patterns: [
            {
                from: path.resolve( __dirname, '../src/assets' )
            } ]
        } ),
        new HtmlWebpackPlugin(
        {
            template: path.resolve( __dirname, '../src/index.html' ),
            minify: true
        } ),
        new MiniCSSExtractPlugin( )
    ],
    module:
    {
        rules: [
            // HTML
            {
                test: /\.(html)$/,
                exclude: [ /node_modules/, require.resolve( '../src/index.html' ) ],
                use:
                {
                    loader: 'html-loader',
                }
            },

            // JS
            {
                test: /\.(jsx|js)$/,
                exclude: [ /node_modules/ ],
                use: [
                    'babel-loader'
                ],
                resolve:
                {
                    extensions: [ '.jsx', '.js' ]
                }
            },

            // TS
            {
                test: /\.(tsx|ts)$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            // CSS
            {
                test: /\.css$/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    'css-loader'
                ]
            },

            // Images
            {
                test: /\.(jpg|png|gif|svg|gltf|glb|bin)$/,
                exclude: /node_modules/,
                use: [
                {
                    loader: 'file-loader',
                    options:
                    {
                        outputPath: 'assets/images/'
                    }
                } ]
            },

            // Fonts
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                exclude: /node_modules/,
                use: [
                {
                    loader: 'file-loader',
                    options:
                    {
                        outputPath: 'assets/fonts/'
                    }
                } ]
            },

            // Shaders
            {
                test: /\.(glsl|vs|fs|vert|frag)$/,
                exclude: /node_modules/,
                use: [
                    'raw-loader'
                ]
            },

        ]
    },
    resolve:
    {
        extensions: [ '.tsx', '.ts', '.js' ],
    }
}