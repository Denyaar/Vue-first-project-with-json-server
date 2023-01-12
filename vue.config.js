
module.exports ={
  devServer:{
    proxy:{
      '^/api':{
        target:'http://localhost:5000',
        changeOrigin:true,
        logLevel: 'debug',
        cookiePathRewrite: {'^/api': '/'},
      },
    }
  }
}

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:true
})