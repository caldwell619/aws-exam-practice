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
		const { data } = client.post('/oauth/google', { code: codeToSend })
		return data
	}
}
