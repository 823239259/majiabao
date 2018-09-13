// vue.config.js
module.exports = {
    // 选项...
    //打出来的包的相对路径
    baseUrl: './',
    //对应的server服务部分
    devServer: {
        port: '8107',
        proxy: {
            '/api': {
                target: 'http://platform-trade.dktai.cn',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            },
            '/others':{
                target: 'http://futures.duokongtai.cn',
                changeOrigin: true,
                pathRewrite: {
                    '^/others': '/'
                }
            }
        }
    },
    // 页面出口设置等
    pages: {
        index: {
            // page 的入口
            entry: "src/main.js",
            // 模板来源
            template: "public/index-prod.html", // 这里用来区分加载那个 html
            // 在 dist/index.html 的输出
            filename: "index.html",
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            // title: "时光机后台管理系统",
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ["chunk-vendors", "chunk-common", "index"]
        }
    },
    configureWebpack: {
        externals: {   //用于打包减小体积
            'vue': 'Vue',
            'vuex': 'Vuex',
            'axios': 'axios',
            'mint-ui': 'MINT',
            'vue-router': 'VueRouter',
        }
    }
  }