import client from './client.js'

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
}
