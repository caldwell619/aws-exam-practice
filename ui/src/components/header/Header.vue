<template lang='pug'>
	div
		v-navigation-drawer(v-model="drawer" app clipped )
			v-list.internal-drawer-container.listing-listy.list(dense)
				v-subheader {{ usersName }}
				v-divider
				NavMenuItem(v-for="(route, index) in allowableRoutes" :key="index" :route="route")
			div.find-me
				v-switch(
					v-model="isDarkMode"
					@change="saveDarkModeSetting"
					label='Dark Mode'
					:color="amazonOrange"
					hide-details
				)
		v-app-bar(app clipped-left)
			v-app-bar-nav-icon(@click.stop="drawer = !drawer")
			v-toolbar-title.full-width
				v-row(justify='space-between' align='baseline')
					v-col
					v-col.flex-end(cols='2') 
						Avatar
</template>

<script>
import NavMenuItem from '@/components/header/NavMenuItem.vue'
import Avatar from '@/components/oauth/Avatar.vue'
import { routes } from '@/router/routes'
import { amazonOrange } from '@/data/constants'
import { mapGetters } from 'vuex'
export default {
	components: {
		NavMenuItem,
		Avatar
	},
	data() {
		return {
			routes,
			drawer: false,
			isDarkMode: false,
			amazonOrange
		}
	},
	computed: {
		...mapGetters('user', ['usersName']),
		...mapGetters('session', ['allowableRoutes']),
		isMobile(){
			return window.innerWidth < 1264
		},
		menuActivatorClassName(){
			return this.drawer
				? 'menu-open'
				: ''
		},
		menuActivatorIconName(){
			return this.drawer
				? 'mdi-close'
				: 'mdi-chevron-right'
		}
	},
	methods: {
		saveDarkModeSetting() {
			window.localStorage.setItem( 'darkMode', JSON.stringify({ darkMode: !this.darkMode }))
			this.$vuetify.theme.dark = this.isDarkMode
		},
	},
	mounted() {
		try {
			const isDarkMode = JSON.parse(window.localStorage.getItem('darkMode')).darkMode
			this.isDarkMode = isDarkMode
			this.$vuetify.theme.dark = isDarkMode
		} catch (error) {
			// setting it to true if not previusly set
			this.$vuetify.theme.dark = true
		}
	}
}
</script>

<style lang='sass'>
	.menu-open
		top: 8px !important
		left: 200px !important
	.menu-toggle
		transition: all 0.25s
		color: white
		position: fixed
		top: 20px
		left: 7px
		font-size: 50px
		z-index: 100
		background-color: rgba(52, 52, 52, 0.53)
		border-radius: 2px
		height: 30px
		width: 30px
		display: flex
		justify-content: center
		align-items: center
	.find-me
		height: 40px
		width: 130px
		position: absolute
		bottom: 15%
		right: 4%
		@media screen and (min-width: 786px)
			bottom: 5%
			right: 4%
	.internal-drawer-container
		height: 100%
	#menu-badge
		left: -1px !important
		top: 1px !important
</style>