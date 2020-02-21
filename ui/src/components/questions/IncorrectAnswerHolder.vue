<template lang='pug'>
	v-container
		v-row.hidden(v-for="(answer, index) in incorrectAnswers" :class="shownClassName")
			v-col(cols=1) {{ index + 1 }}.
			v-col {{ answer }}
			v-col
				v-icon mdi-pencil
</template>

<script>
export default {
	name: 'IncorrectAnswerHolder',
	props: {
		incorrectAnswers: {
			type: Array,
			required: true
		},
		isShown: {
			type: Boolean,
			required: false,
			default: true
		}
	},
	computed: {
		shownClassName(){
			return this.isShown
				? 'shown'
				: ''
		}
	}
}
</script>

<style lang='sass'>

.hidden
	max-height: 0
	transition: all 0.3s
	opacity: 0

.shown
	opacity: 1 !important
	max-height: 100vh !important

</style>