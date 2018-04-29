import { SchemaDefinition } from 'mongoose'

export const userPaths: SchemaDefinition = {
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true }
  },
  gender: {
    type: String,
    required: true,
    enum: ['F', 'M', 'N'],
    uppercase: true
  },
  birthdate: { type: Date, required: true },
  country: {
    type: String,
    required: true,
    /* todo enum: COUNTRIES, */ uppercase: true
  },
  emails: {
    type: [
      {
        address: { type: String, required: true, lowercase: true }, // todo: make this unique
        verified: { type: Boolean, default: false }
      }
    ],
    required: true, // todo: is this needed ???
    validate: [
      (email: any[]) => email.length > 0,
      'At least one user email address is required.'
    ]
  },
  phones: {
    type: [
      {
        code: { type: Number, required: true }, // todo: make this unique (in combination with 'number')
        number: { type: String, required: true }, // todo: make this unique (in combination with 'code')
        verified: { type: String, default: false }
      }
    ],
    required: true, // todo: is this needed ???
    validate: [
      (phone: any[]) => phone.length > 0,
      'At least one user phone number is required.'
    ]
  },
  username: {
    type: String,
    required: true,
    lowercase: true,
    index: true,
    unique: true
  } // todo: confirm this is the right usage of index and unique
}
