<template lang='pug'>
	v-col(:cols="cols" align='center' @click="singInGoogleUser")
		v-img.pointer-image(
			:src="require('@/assets/images/google-logo.png')"
			height='50px'
			contain
			alt='google sign in'
		)
</template>

<script>
import { mapActions } from 'vuex'
export default {
	name: 'GoogleOauth',
	props: {
		isLogin: {
			type: Boolean,
			require: true
		},
		cols: {
			type: [String, Number],
			require: false,
			default: '4'
		}
	},
	data(){
		return {
			googleApi: null
		}
	},
	async mounted(){
		const client_id = process.env.VUE_APP_GOOGLE_OAUTH_CLIENT_ID
		/*eslint-disable */
		await gapi.load('auth2')
		const  initializedApi = gapi.auth2.init({
				client_id
			})
		/*eslint-enable */
		this.googleApi = initializedApi
	},
	methods: {
		...mapActions('user', ['googleOauth']),
		// make this into a component
		async singInGoogleUser(){
			this.$emit('toggleLoading')
			try {
				await this.googleApi.signIn()
				const { id_token } = this.googleApi.currentUser.get().getAuthResponse()
				const actionPayload = {
					codeToSend: id_token,
					isLogin: this.isLogin
				}
				await this.googleOauth(actionPayload)
				this.$router.push('/user/home')
			} catch(error){
				this.$emit('toggleLoading')
				console.error('error', error)
			}
		}	
	}
}
</script>

<style>

</style>