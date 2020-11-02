module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js',
      },
    },

    // plugins: [
    //   new BundleAnalyzerPlugin()
    // ]
  },
}
