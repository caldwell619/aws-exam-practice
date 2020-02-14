<template lang='pug'>
	v-container
		v-row
			v-col(align='center')
				h1.amazon-orange Login
		v-row.oauth-row
			v-col(cols='4' align='center' @click="googleOauth")
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
				v-text-field(outlined label='Email')
			v-col(cols='10' align='center')
				v-text-field(outlined label='Password')
		v-row
			v-col(align='center')
				router-link(to='/forgot-password') Forgot your password?
		v-row
			v-col(align='center')
				v-btn(:color="amazonOrange") Login
		
</template>

<script>
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
		/*eslint-disable */
		await gapi.load('auth2')
		const  initializedApi = gapi.auth2.init({
				client_id: '386973624204-a5796o4g0q1p0ht6846vrhle8buqo4dr.apps.googleusercontent.com',
			})
		/*eslint-enable */
		this.googleApi = initializedApi
	},
	methods: {
		async googleOauth(){
			/*eslint-disable */
			await this.googleApi.signIn()
			const profile = this.googleApi.currentUser.get().getBasicProfile()
			console.log('user', JSON.stringify(profile))
			console.log('ID: ' + profile.getId()) // Do not send to your backend! Use an ID token instead.
			console.log('Name: ' + profile.getName())
			console.log('Image URL: ' + profile.getImageUrl())
			console.log('Email: ' + profile.getEmail()) // This is null if the 'email' scope is not present.
			/*eslint-enable */
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