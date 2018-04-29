import './configs/passport-config'

import { ServerApp } from 'meseret'
import * as KoaPassport from 'koa-passport'

import { UserModel } from './models/user/UserModel'
import { indexRouter } from './routers/indexRouter'
import { authRouter } from './routers/authRouter'

const passportKelalTest = new ServerApp({
  name: 'passport-kelal Test',

  models: [UserModel],
  mongoUris: process.env.MONGO_URI || 'mongodb://localhost/passport-kelal-test',

  httpServers: [{ port: Number(process.env.PORT) || 1200 }],

  routers: [indexRouter, authRouter],

  keys: [
    'THESE ARE SECRETS USED TO SIGN COOKIES',
    'USE .env FOR A BETTER SECURITY'
  ],
  sessionMaxAge: 1000 * 60 * 60 * 24 * 14,
  sessionRenew: true,

  middleware: [KoaPassport.initialize(), KoaPassport.session()]
})

passportKelalTest
  .start()
  .then(() => console.log(`Starting '${passportKelalTest.config.name}'...`))
  .catch(err =>
    console.error(`'${passportKelalTest.config.name}' start problem: ${err}`)
  )

export { passportKelalTest }
