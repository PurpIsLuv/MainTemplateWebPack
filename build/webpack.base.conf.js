let path = require('path');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const PATHS = {
  src: path.join(__dirname,'../src'),
  dist: path.join(__dirname,'../dist'),
  assets: 'assets/',
}


let conf = {
    externals: {
      paths: PATHS
    },
    entry: PATHS.src,
    output: {
        path: PATHS.dist,
        filename: `${PATHS.assets}js/[name].js`,
    },
    module: {
        rules: [
          {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
              loader: {
                scss: 'vue-style-loader!css-loader!sass-loader',
              },
            },
          },
          {
            test: /\.js$/, 
            exclude: /node_modules/, 
            loader: "babel-loader"
          },
          {
            test: /\.css$/,
            use: [
              'style-loader',
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  config: { path: `${PATHS.src}/js/config/postcss.config.js` } 
                },
              },
            ],
          },
          {
            test: /\.scss$/,
            use: [
              'style-loader',
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  config: { path: `${PATHS.src}/js/config/postcss.config.js` } 
                },
              },
              {
                loader: 'sass-loader',
                options: {
                },
              },
            ],
          },
          {
            test: /\.(png\jpg\svg\gif)$/,  
            loader: "file-loader",
            options: {
              name: '[name].[ext]'
            },
          },
        ]
    },
    resolve:{
      alias: {
        'vue$': 'vue/dist/vue.js',
      }
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: `${PATHS.assets}css/[name].css`,
        chunkFilename: '[id].css',
        ignoreOrder: false,
      }),
      new CopyWebpackPlugin([
        {from: `${PATHS.src}/img`, to: `${PATHS.assets}/img`},
      ]),
      new HtmlWebpackPlugin({
        hash: false,
        template: `${PATHS.src}/index.html`,
        filename: './index.html'
      }),
      new VueLoaderPlugin(),
    ],
};

module.exports = conf;