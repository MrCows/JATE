const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// Add and configure workbox plugins for a service worker and manifest file
// Add CSS loaders and babel to webpack

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/', // Set the public path explicitly to root or your desired path
      clean: true, // This ensures the output directory is cleaned before each build
    },
    plugins: [
      // HtmlWebpackPlugin generates the HTML file and injects the bundled JS
      new HtmlWebpackPlugin({
        template: './index.html', // Path to your HTML template
        title: 'JATE',
      }),

      // InjectManifest generates the service worker file using the custom source
      new InjectManifest({
        swSrc: './src-sw.js', // Source service worker file
        swDest: 'src-sw.js', // Destination for the generated service worker file
      }),

      // WebpackPwaManifest generates the manifest file for the PWA
      new WebpackPwaManifest({
        filename: 'manifest.json',
        name: 'Text Editor',
        short_name: 'TextEditor',
        description: 'A simple text editor with offline functionality!',
        background_color: '#ffffff',
        theme_color: '#317EFB',
        start_url: './',
        fingerprints: false, // Ensures consistent file naming for caching
        inject: true, // Injects the manifest link into the HTML
        icons: [
          {
            src: path.resolve('src/images/logo.png'), // Path to your logo
            sizes: [96, 128, 192, 256, 384, 512], // Icon sizes
            destination: path.join('assets', 'icons'), // Where icons will be output
          },
        ],
      }),
    ],

    module: {
      rules: [
        // CSS loaders
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'], // Processes CSS files and injects them into the DOM
        },
        // Babel loader for ES6+ support
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'], // Transforms modern JavaScript to older versions for better browser compatibility
            },
          },
        },
      ],
    },
  };
};