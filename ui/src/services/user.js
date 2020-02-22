import client from '@/client'

export default {
  async register({
    identifier, plainTextPassword, firstName, lastName
  }) {
    return (await client.post('/user/create', {
      identifier, plainTextPassword, firstName, lastName
    })).data
  },
  async login({ identifier, plainTextPassword }) {
    return (await client.post('/user/login', { identifier, plainTextPassword })).data
	},
	async googleOauthRegister(codeToSend){
		const { data } = await client.post('/register/oauth/google', { idToken: codeToSend })
		return data
	},
	async standardRegister(userPayload){
		const { data } = await client.post('/register', userPayload)
		return data
	},
	async googleOauthLogin(codeToSend){
		const apiRes = await client.post('/login/oauth/google', { idToken: codeToSend })
		console.log('api res', apiRes)
		return apiRes.data
	}
}
