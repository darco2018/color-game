/** @format */
/* eslint-disable import/no-extraneous-dependencies */
//------------------------------------------------

const CopyPlugin = require("copy-webpack-plugin");

exports.copyRootFiles = ({ context, from, to, ignore }) => ({
  plugins: [
    new CopyPlugin([
      {
        context,
        from,
        to,
        ignore
      }
    ])
  ]
});

//------------------------------------------------
const webpack = require("webpack");

exports.keepVendorHashConsistent = () => ({
  plugins: [
    new webpack.HashedModuleIdsPlugin() // vendor hash should stay consistent between builds
  ]
});
//------------------------------------------------

const StyleLintPlugin = require("stylelint-webpack-plugin");

exports.stylelint = () => ({
  plugins: [
    new StyleLintPlugin({
      files: "src/**/*.css",
      failOnError: false,
      emitErrors: false, // reports errors as warnings
      quiet: false
    })
  ]
});

//------------------------------------------------

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

exports.uglifyJS = () => ({
  plugins: [new UglifyJsPlugin()]
});

//------------------------------------------------

const CleanWebpackPlugin = require("clean-webpack-plugin");

exports.clean = dir => ({
  plugins: [
    new CleanWebpackPlugin(dir, {
      verbose: true
    })
  ]
});

//------------------------------------------------

exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/,
        include,
        exclude,
        use: {
          loader: "url-loader",
          options
        }
      }
    ]
  }
});

//--------------------------------------------------

const PostcssPresetEnv = require("postcss-preset-env");
const PostcssImport = require("postcss-import");
const PostcssDiscardComments = require("postcss-discard-comments");

exports.nextGenerationCss = () => ({
  loader: "postcss-loader",
  options: {
    plugins: loader => [
      new PostcssImport({ root: loader.resourcePath }),
      new PostcssDiscardComments({ root: loader.resourcePath }),
      // convert modern CSS into something most browsers can understand,
      // determining the polyfills you need based on your targeted browsers
      // supports any standard browserslist configuration
      //  includes autoprefixer: {},
      new PostcssPresetEnv()
    ]
  }
});

// ------------------------------------

const PurifyCSSPlugin = require("purifycss-webpack");

exports.purifyCSS = ({ paths, purifyOptions }) => ({
  plugins: [new PurifyCSSPlugin({ paths, purifyOptions })] // unmaintained plugin
});

// ------------------------

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

exports.extractCSS = ({ include, exclude, use = [] }) => {
  // Output extracted CSS to a file
  // const plugin = ;

  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include,
          exclude,
          use: [MiniCssExtractPlugin.loader].concat(use) //  a CSS file per JS file
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "css/[name].css", // styles/[name].css
        chunkFilename: "[id].css"
      })
    ]
  };
};

// ------------------------------ DEV-SERVER -----------------------------
// https://medium.com/code-oil/burning-questions-with-answers-to-why-webpack-dev-server-live-reload-does-not-work-6d6390277920
// While webpack-dev-server transpiles the client (browser) scripts to an ES5 state,
// the project only officially supports the last two versions of major browsers,
// so you can skip babel for development
exports.devServer = ({ host, port, contentBase } = {}) => ({
  devServer: {
    contentBase, // Put your main static html page containing the <script> tag here to enjoy 'live-reloading'
    watchContentBase: true,
    stats: "errors-only",
    host, // Defaults to `localhost`
    port, // Defaults to 8080
    hot: true,
    open: true,
    overlay: true
  }
});

// ------------------------------ START loaders -----------------------------
// "build": "webpack --mode production --module-bind js=babel-loader"
// loader-runner allows you to run loaders in isolation without webpack.
// inspect-loader allows you to inspect what's being passed between loaders.
// careful with loader ordering! right to left

exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
});

exports.eslint = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        // pre - not modified by other loaders. Anyway, loaders work from bottom to top
        enforce: "pre",
        test: /\.js$/,
        include,
        exclude,
        loader: "eslint-loader"
        // needs .eslintrc
        // as soon as config file appears VS starts finding JS errors & correcting them on save
        // they can be seen in PROBLEMS
      }
    ]
  }
});

exports.babel = include => ({
  module: {
    rules: [
      {
        // // **Conditions** to match files using RegExp, function.
        test: /\.m?js$/,
        include,
        exclude: /(node_modules|some_other_dir)/,
        // use: "babel-loader?presets[]=env"
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"] // abel-preset-env is valuable as it can choose which features to compile and which polyfills to enable based on your browser definition.
            }
          }
          // Add more loaders here
        ]
      }
    ]
  }
});

const HtmlWebpackPlugin = require("html-webpack-plugin");

exports.loadHtml = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.html$/,
        include,
        exclude,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      //  by default will generate its own index.html file, even though we already have one in the dist/ folder.
      title: "Indexowa",
      template: "./src/index.html",
      filename: `index.html`,
      inject: "body",
      chunks: ["index"],
      showErrors: true
      // will inject  script tag of pageOne in body of index.html :  <script type="text/javascript" src="bundle.js"></script>
    }),
    new HtmlWebpackPlugin({
      title: "Mainowa",
      template: "./src/main.html",
      filename: `main.html`, // can be skipped only for index.html
      inject: "body",
      chunks: ["main"],
      showErrors: true
    })
  ]
});
