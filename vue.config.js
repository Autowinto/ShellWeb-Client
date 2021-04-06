module.exports = {
  configureWebpack: {
    //   resolve: {
    //     alias: {
    //       vue$: 'vue/dist/vue.esm.js',
    //     },
    //   },
    //   // plugins: [
    //   //   new BundleAnalyzerPlugin()
    //   // ]
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
  },
}
