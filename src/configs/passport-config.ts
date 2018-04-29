import * as KoaPassport from 'koa-passport'
import * as PassportKelal from 'passport-kelal'
import { Document, Schema } from 'mongoose'

import { UserModel } from '../models/user/UserModel'

// USER/PROFILE SERIALIZATION & DESERIALIZATION
KoaPassport.serializeUser((user: Document, done: Function) =>
  done(null, user._id)
)
KoaPassport.deserializeUser((_id: Schema.Types.ObjectId, done: Function) =>
  UserModel.findById(_id, (err: any, profile: Document) => done(err, profile))
)

// KELAL STRATEGY
KoaPassport.use(
  new PassportKelal.Strategy(
    {
      appId: '5a8aa5bb8866fd292c7e239c',
      appSecret: 'happy',
      callbackUrl: 'http://localhost:1200/auth/kelal/callback'
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        console.log('Access Token:', accessToken)
        console.log('Refresh Token:', refreshToken)
        cb(
          null,
          (await UserModel.findOneAndUpdate(profile._id, profile)) ||
            (await new UserModel(profile).save())
        )
      } catch (e) {
        cb(e)
      }
    }
  )
)
