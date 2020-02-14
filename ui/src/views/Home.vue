<template lang='pug'>
	v-container.splash-container
		v-row
			v-col
				h1.amazon-orange Welcome!
		v-row
			v-col
				p.splash-text.
					This platform is built entirely with AWS services, and is designed to help anyone and everyone on 
					their way to getting an AWS certification.
				p.splash-text.
					Through crowd sourcing and volunteering, we can all learn and take practice quizes to help 
					get that certification you've been wanting.
		v-row
			v-col(cols='4' align='center')
				router-link(to='/register')
					v-btn Sign Up
			v-col(cols='4' align='center')
				router-link(to='/login')
					v-btn(:color="amazonOrange") Login
</template>

<script>
import { amazonOrange } from '@/data/constants'
export default {
	name: 'Home',
	data(){
		return {
			amazonOrange
		}
	}
}
</script>

<style lang='sass'>
	.splash-container
		margin-top: 15%
	.splash-text
		line-height: 2.0em
		font-size: 1.2em
</style>