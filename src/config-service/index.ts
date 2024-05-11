import { createRandB64String, getConfig, saveConfig } from "../utils"
import { ConfigInboundSetting, User, defaultShadowSockParams } from "./shadowSocks22";

export const getCurrentUsersAndPass = async (): Promise<{
	password: string | null,
	users: User[],
	shadowSockConfig: ConfigInboundSetting | null
}> => {
	try {
		const currentConfig = await getConfig();
		
	const shadowSockConfig:ConfigInboundSetting = currentConfig.inbounds.find( (inb:ConfigInboundSetting) => {
		return inb.type === 'shadowsocks'
	})
		
	const password = shadowSockConfig.password
	const users = shadowSockConfig.users

	return {
		password,users, shadowSockConfig
	}
	} catch (error) {
		return {
			password: null, users: [],
			shadowSockConfig: null
		}
	}
}

export const saveUsersAndPassOfSock = ( password: string | null, users: User[] ) => {
	const localPass = password || createRandB64String();
	const config = defaultShadowSockParams( localPass, users )
	saveConfig({inbounds:[config]})
}