<template lang='pug'>
	v-container
		v-row(align='center')
			v-col(align='center')
				router-link(to='/register')
					v-icon(large clickable) mdi-chevron-left
			v-col(align='center')
				h1.amazon-orange Register
			v-col(align='center')
		v-row
			v-col
				v-divider
		v-row(justify='center')
			v-col(cols='10' align='center')
				v-text-field(outlined label='Email' :color="amazonOrange" :disabled="isLoading" v-model="emailAddress")
			v-col(cols='10' align='center')
				v-text-field(
						outlined
						:color="amazonOrange"
						v-model="password"
						:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
						:type="showPassword ? 'text' : 'password'"
						label="Password"
						counter
						@click:append="showPassword = !showPassword"
				)
			v-col(cols='10' align='center')
				v-text-field(outlined label='Given Name' :color="amazonOrange" :disabled="isLoading" v-model="givenName")
			v-col(cols='10' align='center')
				v-text-field(outlined label='Family Name' :color="amazonOrange" :disabled="isLoading" v-model="familyName")
			v-col(cols='10' align='center')
				v-autocomplete(
					:disabled="isLoading"
					v-model="chosenLocale"
					:items="supportedLocales"
					label='Locale'
					:color="amazonOrange"
					outlined
				)
		v-row
			v-col(align='center')
				v-btn(:color="amazonOrange" :loading="isLoading" @click="beginSignUp") Sign Up
		
</template>

<script>
import { amazonOrange, supportedLocales } from '@/data/constants'
import { mapActions } from 'vuex'
export default {
	name: 'RegisterStandard',	
	data(){
		return {
			emailAddress: null,
			password: null,
			givenName: null,
			familyName: null,
			chosenLocale: 'English',
			amazonOrange,
			supportedLocales,
			isLoading: false,
			showPassword: false,
		}
	},
	methods: {
		...mapActions('user', ['registerUser']),
		async beginSignUp(){
			this.isLoading = true
			const params = {
				emailAddress: this.emailAddress,
				password: this.password,
				givenName: this.givenName,
				familyName: this.familyName,
				chosenLocale: this.chosenLocale,
			}
			try {
				await this.registerUser(params)
				this.$router.push('/user/home')
			} catch(error){
				console.error('error', error)
				this.isLoading = false
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
	margin-top: 1%
.line-row
	margin: 4% 0
</style>