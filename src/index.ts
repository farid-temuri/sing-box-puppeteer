import { Elysia } from 'elysia'
import { $ } from 'bun'
import { getCurrentUsersAndPass, saveUsersAndPassOfSock } from './config-service'
import type { User } from './config-service/shadowSocks22'
import { getLink } from './utils'
import { configRepository } from './repository'

const port = 3000

new Elysia()
  .onRequest((ctx) => {
    if (!process.env.SECRET_QUERY)
      return

    const parsedKey = new URL(ctx.request.url).searchParams.get(process.env.SECRET_QUERY)

    if (parsedKey !== process.env.SECRET_VALUE)
      return 'chill'
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
    return await configRepository.create()
  })
  .get('/main-pass/', async () => {
    return (await getCurrentUsersAndPass()).password
  })
  .listen(port)

// eslint-disable-next-line no-console
console.log(`Listening on localhost:${port}`)
