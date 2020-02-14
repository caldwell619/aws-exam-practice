<template lang='pug'>
  div
    v-navigation-drawer(v-model="drawer" app clipped width='350px')
      v-tabs.internal-drawer-container(v-model="tab" grow)
        v-tab(href='#tab-0' active-class='internal-drawer-container' ) Navigation
        v-tab-item.internal-drawer-container(value='tab-0')
          v-list.internal-drawer-container.listing-listy.list(dense)
            v-subheader Home
            v-divider
            NavMenuItem(v-for="(route, index) in routes" :key="index" :route="route")
        v-tab(href='#tab-1' @click="clearFleetNotifications")
          div.text-center
            v-badge(right color='red' :value="isNotificationBadgeShown")
              template(v-slot:badge)
                span {{ numberOfFleetNotifications }}
              span Fleet
        v-tab-item(value='tab-1')
          FleetCardDisplay
      div.find-me
        v-switch(
          v-model="isDarkMode"
          @change="saveDarkModeSetting"
          label='Dark Mode'
          color='red'
          hide-details
        )
    v-app-bar(app clipped-left)
      v-badge#menu-badge(left color='red' :value="isNotificationBadgeShown" v-if="isMobile")
        template(v-slot:badge)
          span {{ numberOfFleetNotifications }}
        span(@click.stop="drawer = !drawer")
          v-btn(icon)
            v-icon mdi-menu
      v-app-bar-nav-icon(v-else)
      v-toolbar-title.full-width
        v-row(justify='space-between')
          v-col Muster the Fleet
          v-col.flex-end(cols='2')
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import NavMenuItem from '@/components/header/NavMenuItem.vue'
import { routes } from '@/router/routes'
import FleetCardDisplay from '@/components/fleet/FleetCardDisplay.vue'

export default {
  components: {
    NavMenuItem,
    FleetCardDisplay
  },
  data() {
    return {
      tab: null,
      routes,
      drawer: null,
      isDarkMode: false
    }
  },
  computed: {
    ...mapGetters('fleet', ['numberOfFleetNotifications']),
    isNotificationBadgeShown(){
      return this.numberOfFleetNotifications
    },
    isMobile(){
      return window.innerWidth < 1264
    }
  },
  methods: {
    ...mapActions('fleet', ['clearFleetNotifications']),
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
      // it's fine, theres no previous dark mode setting
    }
  }
}
</script>

<style lang='sass'>
  .find-me
    height: 40px
    width: 130px
    position: absolute
    bottom: 5%
    right: 4%
  .internal-drawer-container
    height: 100%
  #menu-badge
    left: -1px !important
    top: 1px !important
</style>
