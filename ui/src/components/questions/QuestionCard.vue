<template lang='pug'>
	v-card(
      class="mx-auto"
      max-width="375"
    )
      v-img(
        class="white--text align-end"
        height="100px"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      )
        v-card-title {{ question.title }}
      v-card-subtitle.pb-0Number {{ question.category }}
      card-text.text--primary
				v-col {{ question.description }}
      v-card-actions
        v-row
          v-col(align='end')
</template>

<script>
export default {
	name: 'QuestionCard',
	props: {
		question: {
			type: Object,
			required: true
		}
	}
}
</script>

<style>

</style>