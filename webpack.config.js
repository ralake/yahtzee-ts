const webpack = require('webpack')

const env = process.env.NODE_ENV

const DOMAINS = {
  development: 'http://localhost:2001',
  production: 'https://yahtzee-282014.ew.r.appspot.com'
}

module.exports = {
  mode: env,
  entry: `${__dirname}/src/client/Index.tsx`,
  output: {
    path: `${__dirname}/public/dist`,
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      DOMAIN: JSON.stringify(DOMAINS[env])
    })
  ],
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [{ loader: 'ts-loader' }]
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  }
}
