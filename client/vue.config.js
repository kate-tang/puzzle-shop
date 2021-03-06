module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "src/assets/scss/style.scss";
        `
      }
    }
  },
  chainWebpack: config => {
    config.module.rule('vue').use('vue-loader').tap(options => {
      options.compilerOptions = {
        ...(options.compilerOptions || {}),
        isCustomElement: tag => tag.startsWith('ion-')
      };
      return options;
    });
  },
  runtimeCompiler: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/puzzle-shop/' : '/',
  configureWebpack: {
    performance: {
      hints: false
    }
  }
};