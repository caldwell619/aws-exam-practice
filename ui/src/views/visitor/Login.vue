<template lang='pug'>
	v-container
		v-row
			v-col(align='center')
				h1.amazon-orange Login
		v-row.oauth-row
			GoogleOauth(@toggleLoading="isLoading = !isLoading" :isLogin="false")
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
				v-text-field(outlined label='Email' :color="amazonOrange" :disabled="isLoading")
			v-col(cols='10' align='center')
				v-text-field(outlined label='Password' :color="amazonOrange" :disabled="isLoading")
		v-row
			v-col(align='center')
				router-link(to='/forgot-password') Forgot your password?
		v-row
			v-col(align='center')
				v-btn(:color="amazonOrange" :loading="isLoading") Login
		
</template>

<script>
import { amazonOrange } from '@/data/constants'
import LineThroughText from '@/components/util/LineThroughText.vue'
import GoogleOauth from '@/components/oauth/Google.vue'
export default {
	name: 'Login',
	components: {
		LineThroughText,
		GoogleOauth
	},
	data(){
		return {
			amazonOrange,
			isLoading: false
		}
	},
	computed: {
		isDarkMode(){
			return this.$vuetify.theme.isDark
				? 'dark'
				: 'light'
		},
	}
}
</script>

<style lang='sass' scoped>
@import '@/styles/variables'
a
	color: $amazon-orange
.oauth-row
	margin-top: 1%
.line-row
	margin: 4% 0
</style>