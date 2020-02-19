<template lang='pug'>
	v-container
		v-row
			v-col(align='center')
				h1.amazon-orange Login
		v-row.oauth-row
			v-col(cols='4' align='center' @click="singInGoogleUser")
				v-img.pointer-image(
					:src="require('@/assets/images/google-logo.png')"
					height='50px'
					contain
					alt='google sign in'
				)
			v-col(cols='4' align='center')
				v-img.pointer-image(
					:src="require(`@/assets/images/amazon-${isDarkMode}.png`)"
					height='50px'
					contain
					alt='amazon sign in'
				)
			v-col(cols='4' align='center')
				v-img.pointer-image(
					:src="require(`@/assets/images/github-${isDarkMode}.png`)"
					height='50px'
					contain
					alt='github sign in'
				)
		v-row.line-row(justify='center')
			v-col(cols='10')
				LineThroughText(text='or')
		v-row(justify='center')
			v-col(cols='10' align='center')
				v-text-field(outlined label='Email' :color="amazonOrange")
			v-col(cols='10' align='center')
				v-text-field(outlined label='Password' :color="amazonOrange")
		v-row
			v-col(align='center')
				router-link(to='/forgot-password') Forgot your password?
		v-row
			v-col(align='center')
				v-btn(:color="amazonOrange") Login
		
</template>

<script>
import { mapActions } from 'vuex'
import { amazonOrange } from '@/data/constants'
import LineThroughText from '@/components/util/LineThroughText.vue'
export default {
	name: 'Login',
	components: {
		LineThroughText
	},
	data(){
		return {
			amazonOrange,
			googleApi: null
		}
	},
	computed: {
		isDarkMode(){
			return this.$vuetify.theme.isDark
				? 'dark'
				: 'light'
		},
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
		async singInGoogleUser(){
			try {
				await this.googleApi.signIn()
				const { id_token } = this.googleApi.currentUser.get().getAuthResponse()
				await this.googleOauth(id_token)
			} catch(error){
				console.error('error', error)
			}
		}	
	}
}
</script>

<style lang='sass' scoped>
@import '@/styles/variables'
a
	color: $amazon-orange
.oauth-row
	margin-top: 13%
.line-row
	margin: 4% 0
.pointer-image
	cursor: pointer
</style>