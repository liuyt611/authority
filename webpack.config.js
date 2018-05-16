const resolve = require('path').resolve;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const url = require('url');
const publicPath = ''
// automatically open browser, if not set will be false
const port = 8010


module.exports = (options = {}) => ({
  entry: {
    // vendor: './src/vendor',
    index: './src/main.js'
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
    chunkFilename: '[id].js?[chunkhash]',
    publicPath: options.dev ? '/assets/' : publicPath
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
        options:{
          loaders:{
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
            'less':'vue-style-loader!css-loader!less-loader'
          }
        }
      },
      //lint
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        // exclude: /node_modules/
        include: [
          resolve('src'),
          resolve('node_modules/vue-echarts'), // vue-echarts config
          resolve('node_modules/resize-detector') // vue-echarts config
        ]
      },
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader', 'postcss-loader']
        loader: ExtractTextPlugin.extract(
          { fallback: 'style-loader', use: 'css-loader' }
        )
      },
      {
        test: /\.scss$/,
        // use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
        loader: ExtractTextPlugin.extract(
          { fallback: 'style-loader', use: 'css-loader!sass-loader' }
        )
      },
      // {
      //   test: /\.less$/,
      //   use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader']
      // },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
      },
      // media
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      }
    }),
    new ExtractTextPlugin("[name].css?[chunkhash]")
  ],
  resolve: {
      extensions: [".js", ".json"],
    alias: { // 路径简写字典
      '~': resolve(__dirname, 'src/'),
      // mock 目录路径缩写 Mock
      'Mock':resolve(__dirname, 'mock/')
    }
  },
  devServer: {
    host: '127.0.0.1', 
    port: port,
    proxy: {
      // API 跨域转发配置
      '/api/': {
        target: 'https://dap.auto-smart.com/', // 接口跨域目标 url
        // target: 'http://172.20.206.135:8088',
        changeOrigin: true
      }
    },
    historyApiFallback: {
      index: url.parse(options.dev ? '/assets/' : publicPath).pathname
    }
  },
  devtool: options.dev ? '#eval-source-map' : '#source-map'
})
