import type { ConfigInboundSetting, User } from '../config-service/shadowSocks22'

export async function getConfig() {
  return await Bun.file('./sing-box/config.json').json()
}

export async function saveConfig(newConfig: object) {
  // TODO add saving of logs and backups
  await Bun.write('./sing-box/config.json', JSON.stringify(newConfig))
}

function makeid(length: number) {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  let counter = 0
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
    counter += 1
  }
  return result
}

export function createRandB64String() {
  return btoa(makeid(16))
}

export function getLink(user: User, shadowSockConfig: ConfigInboundSetting | null) {
  const method = shadowSockConfig?.method
  const pass = shadowSockConfig?.password
  const port = shadowSockConfig?.listen_port
  const server = process.env.SERVER

  return `ss://${btoa(`${method}:${pass}:${user.password}`)}@${server}:${port}#${user.name}`
}
