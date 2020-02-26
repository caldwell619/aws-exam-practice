<template lang='pug'>
	router-link(to='/user/profile' v-if="isAuthenticated")
		v-avatar(size="36")
			img(
				v-if="hasImage"
				:src="pictureUrl"
				alt="profile image"
			)
			v-icon(dark v-else) mdi-account-circle
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	name: 'Avatar',
	computed: {
		...mapGetters('user', ['pictureUrl']),
		...mapGetters('session', ['isAuthenticated']),
		hasImage(){
			return !!this.pictureUrl
		}
	}
}
</script>

<style>

</style>