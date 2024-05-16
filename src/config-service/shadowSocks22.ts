function defaultShadowSockSettings(): Omit<ConfigInboundSetting, 'password' | 'users'> {
  return {
    type: 'shadowsocks',
    listen: '::',
    listen_port: 443,
    network: 'tcp',
    tcp_fast_open: true,
    method: '2022-blake3-aes-128-gcm',
  }
}

export interface User {
  name: string
  password: string
}

export interface ConfigInboundSetting {
  type: string
  listen: string
  listen_port: number
  network: string
  method: string
  tcp_fast_open: boolean
  password: string
  users: User[]
}

export function defaultShadowSockParams(password: string, users: User[]): ConfigInboundSetting {
  return {
    ...defaultShadowSockSettings(),
    password,
    users,
  }
}
