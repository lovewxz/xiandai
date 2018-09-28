'use strict'

module.exports = appInfo => {
  const config = (exports = {
    mysql: {
      client: {
        // host
        host: '47.100.124.146',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: 'jyc774411',
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
  config.middleware = []

  return config
}
