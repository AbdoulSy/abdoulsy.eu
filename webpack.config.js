var path = require('path');

module.exports = {
  entry: './app/init.js',
  output: {
    filename: 'bundle.js',
    path: './dist'
  },
  module: {
    // configuration regarding modules

    rules: [
      // rules for modules (configure loaders, parser options, etc.)

      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, "app")
        ],
        exclude: [
          path.resolve(__dirname, "app/demo-files")
        ],
        // matching conditions, each accepting regular expression or string
        // test and include behave equal, both must be matched
        // exclude must not be matched (takes preferrence over test and include)
        // Best practices:
        // - Use RegExp only in test and for filename matching
        // - Use arrays of absolute paths in include and exclude
        // - Try to avoid exclude and prefer include

        // conditions for the issuer (the origin of the import)

        enforce: "pre",
        enforce: "post",
        // apply these rule even if rules are overridden (advanced option)

        loader: "babel-loader",
        // the loader which should be applied, it'll be resolve relative to the context
        // -loader suffix is no longer optional in Webpack 2 for clarity reasons
        // see webpack 1 upgrade guide

        options: {
          presets: ["es2015", "react"]
        }
        // options for the loader
      }

    ]}
};
