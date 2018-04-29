import * as Router from 'koa-router'
import * as KoaPassport from 'koa-passport'

const authRouter = new Router({ prefix: '/auth' })

// GET /auth/kelal
authRouter.get(
  '/kelal',
  KoaPassport.authenticate('kelal', { scope: ['profile'] })
)

// GET /auth/kelal/callback
authRouter.get(
  '/kelal/callback',
  KoaPassport.authenticate('kelal', { failureRedirect: '/login' }),
  async ctx => ctx.redirect('/')
)

export { authRouter }
