<template lang="pug">
  v-app
    Header
    v-content
      router-view
</template>

<script>
import Header from '@/components/header/Header.vue'

export default {
  components: {
    Header
  }
}
</script>

<style lang='sass'>
  @import '@/styles/main.sass'
</style>
