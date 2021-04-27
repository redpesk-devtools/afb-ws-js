/* global __dirname, require, module*/

const path = require("path");
const yargs = require("yargs");
const env = yargs.argv.env; // use --env with webpack 2
const pkg = require("./package.json");

let libraryName = pkg.name + '.js';

if (env === "prod") {
  mode = "production";
} else {
  mode = "development";
}

const config = {
  mode: mode,
  entry: [
    "/src/index.js",
  ],
  devtool: "source-map",
  output: {
    path: __dirname + "/dist",
    filename: libraryName,
    library: {
      type: 'this',
      export: 'default',
    },
    globalObject: "this",
    clean : true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js|\.ts|\.tsx)$/,
        use: {
          loader: "babel-loader",
        },
        exclude: /(node_modules|bower_components)/,
      },
    ],
  },
  resolve: {
    modules: [path.resolve("./node_modules"), path.resolve("./dist")],
    extensions: [".json", ".js", ".ts"],
  },
};

module.exports = config;
