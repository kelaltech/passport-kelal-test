import { ModelFactory, FunctionsType } from 'meseret'

import { userPaths } from './userPaths'
import { userMethods } from './userMethods'

export interface IUserPaths {
  name: {
    first: string
    last: string
  }
  gender: 'F' | 'M' | 'N'
  birthdate: Date
  country: string
  emails: Array<{
    address: string
  }>
  phones: Array<{
    code: number
    number: string
  }>
  username: string
}

export interface IUserMethods extends FunctionsType {
  getFullName: () => string

  getEnglishGender: () => string

  getEnglishBirthdate: (
    day?: boolean,
    month?: boolean,
    date?: boolean,
    year?: boolean
  ) => string
  getAge: () => number

  getEmailsList: () => string[]
  getPhonesList: () => string[]
}

export const userModelFactory = new ModelFactory<IUserPaths, IUserMethods>({
  name: 'users',
  paths: userPaths,
  methods: userMethods
})

export const UserModel = userModelFactory.model
