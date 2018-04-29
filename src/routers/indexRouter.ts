import * as Router from 'koa-router'

const indexRouter = new Router()

// GET /
indexRouter.get('/', async ctx => {
  ctx.body = {
    ctx: {
      isAuthenticated: ctx.isAuthenticated(),
      state: {
        user: ctx.state.user
      }
    }
  }
})

export { indexRouter }
