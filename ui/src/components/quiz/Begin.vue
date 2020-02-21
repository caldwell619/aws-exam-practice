<template lang='pug'>
	span
		v-row
			v-col
				h3.amazon-orange Timer
				Timer(@timerToggle="" :shouldStart="shouldStart" justify='start')
			v-col
				h3.amazon-orange Category:
				v-row
					v-col
						h4 {{ categoryTitle }}
			v-col
				h3.amazon-orange Progress
				v-row
					v-col(cols=1)
						h4 {{ questionNumber }}
					v-col(cols=2)
						h4.amazon-orange.question-title of
					v-col(cols=1)
						h4 {{ numberOfQuestions }}
		v-row
			v-col(align='center')
				h2.amazon-orange.question-title Question
				h3.left-align {{ question.title }}
		v-row
			v-col
				v-radio-group(v-model="givenAnswer")
					v-radio(
						:color="amazonOrange"
						v-for="answer in answerSet"
						:label="answer"
						:value="answer"
					)
		v-row
			v-col(align='center')
				v-btn(:color="amazonOrange" large @click="submitAnswer") Next
</template>

<script>
import { amazonOrange } from '@/data/constants'
import questions from '@/data/testQuestions.js'
import Timer from '@/components/util/Timer.vue'
export default {
	name: 'BeginQuiz',
	components: {
		Timer
	},
	data(){
		return {
			shouldStart: false,
			question: {},
			isLoading: false,
			givenAnswer: null,
			questionNumber: 1,
			numberOfQuestions: 20,
			amazonOrange
		}
	},
	created(){
		this.question = questions[0]
	},
	watch: {
		questionNumber(newQuestionNumber){
			this.question = questions[newQuestionNumber - 1]
		}
	},
	computed: {
		answerSet(){
			return [this.question.correctAnswer, ...this.question.incorrectAnswers]
		},
		categoryTitle(){
			return this.question && this.question.category.text || ''
		}
	},
	methods: {
		submitAnswer(){
			if(this.givenAnswer === this.question.correctAnswer){
				console.log('yes')
			}
			this.givenAnswer = null
			this.questionNumber++
			
		}
	}
}
</script>

<style>

</style>