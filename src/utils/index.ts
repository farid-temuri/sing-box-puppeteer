import { getCurrentUsersAndPass } from "../config-service"
import { ConfigInboundSetting, User } from "../config-service/shadowSocks22"

export const getConfig = async () => {
	return await Bun.file( './sing-box/config.json' ).json()
}

export const saveConfig = async ( newConfig: {} ) => {
	// TODO add saving of logs and backups
	await Bun.write('./sing-box/config.json',JSON.stringify(newConfig))
}

const  makeid = (length:number) => {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	let counter = 0;
	while (counter < length) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
		counter += 1;
	}
	return result;
}


export const createRandB64String = () => {
	return btoa( makeid(16) )
}

export const getLink = ( user: User,shadowSockConfig:ConfigInboundSetting | null ) => {
	
	const method = shadowSockConfig?.method
	const pass = shadowSockConfig?.password
	const port = shadowSockConfig?.listen_port
	const server = process.env.SERVER

	return `ss://${btoa(method + ":" +  pass+ ":" + user.password)}@${server}:${port}#${user.name}`
}