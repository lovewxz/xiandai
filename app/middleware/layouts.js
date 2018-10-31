'use strict'

module.exports = () => {
  return async function(ctx, next) {
    const settings = await ctx.service.index.getIndexById(10)
    const projectContent = await ctx.service.fe.home.projectIndex()
    ctx.params.settings = settings
    ctx.params.projectContent = projectContent
    await next()
  }
}
