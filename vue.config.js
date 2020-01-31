module.exports = {
  lintOnSave: false,
  publicPath: './',
  productionSourceMap: false,
  devServer: {
    hot: true, //热加载
    host: 'localhost', //ip地址
    port: 8888, //端口
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: 'http://39.98.110.191:8088', // 域名 这会告诉开发服务器将任何未知请求 (没有匹配到静态文件的请求) 代理到http://localhost:8080
       // target: 'http://127.0.0.1:8088',
        changOrigin: true, // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {
          '^/api': '' // // 替换target中的请求地址，也就是说，在请求的时候，url用'/proxy'代替'http://ip.taobao.com'
        }
      }
    }
  }
}
