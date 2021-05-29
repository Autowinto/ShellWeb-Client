module.exports = {
  devServer: {
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  lintOnSave: process.env.NODE_ENV !== 'production',
  configureWebpack: {
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js',
      },
    },
    // module: {
    //   rules: [
    //     {
    //       test: /\.css$/,
    //       use: ['style-loader', 'css-loader'],
    //     },
    //   ],
    // },

    // plugins: [
    //   new BundleAnalyzerPlugin()
    // ]
  },
}
