'use strict'

const Service = require('egg').Service

class HomeService extends Service {
  async classIndex() {
    const { app } = this
    const queryColumn =
      'a.class_id ,a.class_name,b.class_id sub_class_id,b.class_name sub_class_name,c.build_plan,c.head_img,c.introduction,c.`name`,c.result_img,c.title'
    const subQuery = `SELECT class_id,class_name FROM ${
      app.config.tablePrefix
    }content_class where parent_id = 13`
    const sql = `select ${queryColumn} from (${subQuery}) a left join ${
      app.config.tablePrefix
    }content_class b on FIND_IN_SET(b.class_id,queryChildrenTypeInfo(a.class_id)) left join ${
      app.config.tablePrefix
    }case c on c.class_id = b.class_id order by class_id`
    const result = await this.app.mysql.query(sql)
    return result
  }
}

module.exports = HomeService
