'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    const res = await ctx.service.index.getIndexById(10)
    const classContent = await ctx.service.fe.home.classIndex()
    const arr = []
    classContent.forEach(content => {
      const index = arr.findIndex(item => item.class_id === content.class_id)
      const params = {
        head_img: content.head_img,
        introduction: content.introduction,
        build_plan: content.build_plan,
        name: content.name,
        result_img: content.result_img
      }
      if (index > -1) {
        if (params.name) {
          arr[index].list.push(params)
        }
      } else {
        arr.push({
          class_id: content.class_id,
          class_name: content.class_name,
          list: params.name ? [params] : []
        })
      }
    })
    await ctx.render('index.ejs', { settings: res, classContent: arr })
  }
}

module.exports = HomeController