<template lang="pug">
  v-app
    Header
    v-content
      router-view(v-if="isReadyToShow")
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Header from '@/components/header/Header.vue'

export default {
  components: {
    Header
	},
	computed: {
		...mapGetters('session', ['isReadyToShow'])
	},
	methods: {
		...mapActions('session', ['restoreSessionFromLocalStorage'])
	},
	async mounted(){
		await this.restoreSessionFromLocalStorage()
	}
}
</script>

<style lang='sass'>
  @import '@/styles/main.sass'
</style>
