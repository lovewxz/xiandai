'use strict'

module.exports = appInfo => {
  const config = (exports = {
    cluster: {
      listen: {
        port: 7001,
        hostname: 'localhost'
      }
    },
    mysql: {
      client: {
        // host
        host: 'localhost',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: '302608037@qq.com',
        // 数据库名
        database: 'mingyi'
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false
    }
  })
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_xiandai'

  // add your config here
  config.middleware = ['errorHandler']
  // 表前缀
  config.tablePrefix = 'hospital_'
  // api前缀
  config.apiPrefix = '/api/v1'

  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ['http://m.mei120.com', 'http://localhost:9528']
  }

  config.cors = {
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTION'
  }

  config.jwt = {
    secret: 'xiandai',
    enable: true, // default is false
    ignore: ['/api/v1/userAccess', '/', '/front']
  }

  config.qiniu = {
    AK: 'Jrida2qZ_ul1FgR6BZhyrhNdreZcCk3XR_mLuXr2',
    SK: 'If-CH9GODwIzDYMXF3m5uaSGcvyGOPxCbCcAsKRT',
    bucket: 'mingyi'
  }

  config.view = {
    mapping: {
      '.ejs': 'ejs'
    }
  }

  return config
}
