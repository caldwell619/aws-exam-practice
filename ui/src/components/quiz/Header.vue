<template lang='pug'>
	v-row
		v-col
			h3.amazon-orange Timer
			Timer(@timerToggle="emitTimerToggle" :shouldStart="shouldStart" justify='start')
		v-col
			h3.amazon-orange Category:
			v-row
				v-col
					h4 {{ domainTitle }}
		v-col
			h3.amazon-orange Progress
			v-row
				v-col
					h4.
						{{ questionNumber }} #[span.amazon-orange of] {{ numberOfQuestions }}
</template>

<script>
import Timer from '@/components/util/Timer.vue'
export default {
	name: 'QuizHeader',
	components: {
		Timer
	},
	props: {
		questionNumber: {
			type: Number,
			required: true
		},
		numberOfQuestions: {
			type: Number,
			required: true
		},
		domainTitle: {
			type: String,
			required: true
		},
		shouldStart: {
			type: Boolean,
			required: true
		}
	},
	methods: {
		emitTimerToggle(){
			this.$emit('timerToggle')
		}
	}
}
</script>

<style>

</style>