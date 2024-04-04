// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { DynamicRemotePlugin } = require('@openshift/dynamic-plugin-sdk-webpack');

const sharedModules = {
  '@openshift/dynamic-plugin-sdk': { singleton: true },
  '@scalprum/react-core': { singleton: true },
  react: { singleton: true },
  'react-dom': { singleton: true },
};

const dynamicPlugin = new DynamicRemotePlugin({
  extensions: [],
  sharedModules,
  moduleFederationSettings: {
    libraryType: 'global',
  },
  entryScriptfilename: 'remoteModule.(contenthash].js',
  pluginMetadata: {
    name: 'remoteModule',
    version: '1.0.0',
    exposedModules: {
      RemoteModuleComponent: './src/RemoteModuleComponent.tsx',
    },
    extensions: [],
  },
});

const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const config = {
  entry: {},
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:8003/',
  },
  plugins: [
    dynamicPlugin,

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        use: {
          loader: 'swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                tsx: true,
              },
            },
          },
        },
        exclude: ['/node_modules/'],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';

    config.plugins.push(new MiniCssExtractPlugin());
  } else {
    config.mode = 'development';
  }
  return config;
};
