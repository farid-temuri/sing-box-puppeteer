import { Elysia } from 'elysia'
import { getCurrentUsersAndPass, saveUsersAndPassOfSock } from './config-service'
import type { User } from './config-service/shadowSocks22'
import { createRandB64String, getLink } from './utils'

const DEFAULT_NAME = 'xor_vpn_netherlands'

const port = 3000

new Elysia()
  .onRequest((ctx) => {
    const parsedUrl = new URL(ctx.request.url)
    if (parsedUrl.searchParams.get('asd') !== process.env.SECRET)
      return 'охладите трахание'
  })
  .get('/users/', async () => {
    const { users, shadowSockConfig } = await getCurrentUsersAndPass()

    return users.map((user) => {
      return {
        ...user,
        link: getLink(user, shadowSockConfig),
      }
    })
  })
  .post('/users/new', async () => {
    const { password, users } = await getCurrentUsersAndPass()

    const newUser: User = {
      name: DEFAULT_NAME,
      password: createRandB64String(),
    }

    users.push(newUser)

    saveUsersAndPassOfSock(password, users)

    return newUser
  })
  .get('/main-pass/', async () => {
    const { password } = await getCurrentUsersAndPass()
    return password
  })
  .listen(port)

// eslint-disable-next-line no-console
console.log(`Listening on localhost:${port}`)
