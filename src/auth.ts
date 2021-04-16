import {randomBytes} from 'crypto'

export default class Auth {
  private access: {token: string; expires: number; accountID: string}[] = []
  private readonly expireTime = 3600000 // 1 hour in milliseconds

  public createAccess = (accountID: string): string => {
    let token = randomBytes(128).toString('hex')
    const expires = Math.round(Date.now() / 1000 / 60) + this.expireTime

    this.access = this.access.filter((acc) => acc.accountID !== accountID)
    while (this.access.find((acc) => acc.token === token)) token = randomBytes(128).toString('hex')

    this.access.push({token, expires, accountID})
    return token
  }

  public verifyAccess = (token: string): boolean => {
    const data = this.access.find((acc) => acc.token === token)

    if (data && data.expires > Math.round(Date.now() / 1000 / 60)) return true

    this.access = this.access.filter((acc) => acc.token !== token)
    return false
  }

  public revokeAccess = (data: {token?: string; accountID?: string} = {}) => {
    if (data.token) this.access = this.access.filter((acc) => acc.token !== data.token)
    else if (data.accountID) this.access = this.access.filter((acc) => acc.accountID !== data.accountID)
  }

  public refreshAccess = (token: string) => {
    const data = this.access.find((acc) => acc.token === token)

    if (data) {
      const position = this.access.indexOf(data)
      this.access[position].expires = Math.round(Date.now() / 1000 / 60) + this.expireTime
    }
  }
}
