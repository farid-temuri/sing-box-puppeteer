import { getCurrentUsersAndPass, saveUsersAndPassOfSock } from '../config-service'
import type { User } from '../config-service/shadowSocks22'
import { createRandB64String } from '../utils'

const DEFAULT_NAME = 'xor_vpn_netherlands'

export const configRepository = {
  async create() {
    const { password, users } = await getCurrentUsersAndPass()

    const newUser: User = {
      name: DEFAULT_NAME,
      password: createRandB64String(),
    }

    users.push(newUser)

    saveUsersAndPassOfSock(password, users)
    return newUser
  },
}
