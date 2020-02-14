<template lang='pug'>
  router-link.link(:to="{path: route.path}" v-if="!route.divider")
    v-list-item
      v-list-item-action
        v-icon {{route.icon}}
      v-list-item-content
        v-list-item-title {{route.title}}
  span(v-else)
    v-divider
    v-subheader {{ route.header }}
</template>

<script>
export default {
  name: 'NavMenuItem',
  props: {
    route: Object
  },
  computed: {
    institutionId() {
      return '123'
    }
  },
}
</script>

<style lang='sass' scoped>
a
  text-decoration: none
.link
  width: 100%
  display: flex
  justify-content: space-between
  margin: 3% 3% 3% 0

.nav
  color: white
  font-size: 150%

</style>
