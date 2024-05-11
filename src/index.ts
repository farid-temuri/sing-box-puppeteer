import { Elysia } from 'elysia'
import { getCurrentUsersAndPass, saveUsersAndPassOfSock } from './config-service'
import { User } from './config-service/shadowSocks22'
import { createRandB64String, getLink, saveConfig } from './utils'

const DEFAULT_NAME = "xor_vpn_netherlands"

const port = 3000

const app = new Elysia()
	.get( '/users/', async () => {
		const { users,password,shadowSockConfig } = await getCurrentUsersAndPass()
		


		const server = 'xor-vpn.duckdns.org'
		return users.map(  (user) => {
			return {
				...user,
				link: getLink(user,shadowSockConfig)
			}
		})
	} )
	.post( '/users/new', async () => {
		const { password,users } = await getCurrentUsersAndPass()
		
		let newUser: User = {
			name: DEFAULT_NAME,
			password: createRandB64String()
		}

		users.push( newUser )
		
		saveUsersAndPassOfSock(password, users)
		
		return newUser
	})
	.get( '/main-pass/', async () => {
		const { password } = await getCurrentUsersAndPass()
		return password
	} )
	.listen( port )

console.log(`Listening on localhost:${port}`);
