module.exports = {
  entry: "./src/main.js",
  output: {
    path: __dirname,
    filename: "public/bundle.js",
  },
  module: {
    rules: [
      {
        test: /.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "entry",
                  corejs: "3.22",
                },
              ],
            ],
          },
        },
      },
    ],
  },
};
