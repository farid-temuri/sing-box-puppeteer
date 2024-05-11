import { password } from "bun"

const defaultShadowSockSettings = () => {
	return {
		type: 'shadowsocks',
		listen: "::",
		listen_port: 443,
		network: "tcp",
		method: "2022-blake3-aes-128-gcm",
	}
}

export type User = {
	name: string,
	password: string
}

export type ConfigInboundSetting = {
		type:string,
		listen:string,
		listen_port:number,
		network:string,
		method:string,
		password: string,
		users:  User[]
}

export const defaultShadowSockParams = (password:string,users: User[] ):ConfigInboundSetting => {
	return {
		...defaultShadowSockSettings(),
		password: password,
		users: users
	}
}