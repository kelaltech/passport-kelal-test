import { userModelFactory as factory, IUserMethods } from './UserModel'

export const userMethods: IUserMethods = {
  getFullName(): string {
    const p = factory.documentify(this)

    return `${p.name.first} ${p.name.last}`
  },

  getEnglishGender(): string {
    const p = factory.documentify(this)

    return p.gender === 'F'
      ? 'Female'
      : p.gender === 'M'
        ? 'Male'
        : 'Not specified'
  },

  getEnglishBirthdate(
    day = false,
    month = true,
    date = true,
    year = true
  ): string {
    const p = factory.documentify(this)

    const bd = new Date(p.birthdate)
    let str = ''

    if (day) {
      const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ]
      str += days[bd.getDay()]
    }

    if (month) {
      if (day) str += ', '
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
      str += months[bd.getMonth()]
    }

    if (date) {
      if (day || month) str += ' '
      str += String(bd.getDate())
    }

    if (year) {
      if (day || month || date) str += ', '
      str += String(bd.getFullYear())
    }

    return str
  },

  getAge(): number {
    const p = factory.documentify(this)

    const ageInMs = Date.now() - p.birthdate.getTime()

    return new Date(ageInMs).getFullYear() - 1970
  },

  getEmailsList(): string[] {
    const p = factory.documentify(this)

    const list: string[] = []
    for (const email of p.emails) list.push(email.address)

    return list
  },

  getPhonesList(): string[] {
    const p = factory.documentify(this)

    const list: string[] = []
    for (const phone of p.phones) list.push(`(+${phone.code}) ${phone.number}`)

    return list
  }
}
