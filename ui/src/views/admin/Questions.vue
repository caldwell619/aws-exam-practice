<template lang='pug'>
	v-container
		v-row
    	v-col(align='center')
				h1.amazon-orange Questions
    v-row
      v-col
        v-divider
    v-row
</template>

<script>
import questions from '@/data/testQuestions'
import QuestionCard from '@/components/questions/QuestionCard.vue'
export default {
	name: 'Questions',
	components: {
		QuestionCard
	},
	data(){
		return {
			questions
		}
	}
}
</script>

<style>

</style>