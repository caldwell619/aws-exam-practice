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
	async sendGoogleCodeToApi(codeToSend){
		const apiRes = await client.post('/auth/google', { idToken: codeToSend })
		console.log('api res', apiRes)
		return apiRes.data
	}
}
