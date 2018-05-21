const path = require( 'path' );

module.exports = {
  entry  : path.join( __dirname, 'app/index.js' ),
  output : {
    path      : path.resolve( 'build' ),
    filename: 'main.bundle.js',
    publicPath: '/'
  },
  module : {
    rules: [
      {
        test   : /\.jsx?$/,
        include: [
          path.resolve( 'src' )
        ],
        use    : [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [ '.js', '.jsx', '.json' ]
  }
};
