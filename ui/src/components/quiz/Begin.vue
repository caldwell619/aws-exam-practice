<template lang='pug'>
	v-container
		QuizHeader(
			@timerToggle="shouldStart = !shouldStart" 
			:questionNumber="questionNumber"
			:numberOfQuestions="numberOfQuestions"
			:domainTitle="domainTitle"
			:shouldStart="shouldStart"
		)
		v-row
			v-col(align='center')
				h2.amazon-orange.question-title Question
				v-divider.divider-spacing
				h4.left-align.pre.question-content {{ question.title }}
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
import shuffle from '@/utils/shuffle'
import { amazonOrange } from '@/data/constants'
import questions from '@/data/testQuestions.js'
import Timer from '@/components/util/Timer.vue'
import QuizHeader from '@/components/quiz/Header.vue'
export default {
	name: 'BeginQuiz',
	components: {
		Timer,
		QuizHeader
	},
	data(){
		return {
			shouldStart: false,
			question: {},
			isLoading: false,
			givenAnswer: null,
			questionNumber: 1,
			amazonOrange
		}
	},
	created(){
		this.question = this.$store.state.question.questionsForQuiz[0]
	},
	watch: {
		questionNumber(newQuestionNumber){
			this.question = questions[newQuestionNumber - 1]
		}
	},
	computed: {
		numberOfQuestions(){
			return this.$store.state.question.numberOfQuestions
		},
		answerSet(){
			return shuffle([this.question.correctAnswer, ...this.question.incorrectAnswers])
		},
		domainTitle(){
			return this.question && this.question.domain.text || ''
		}
	},
	mounted(){
		this.shouldStart = true
	},
	methods: {
		submitAnswer(){
			if(this.givenAnswer === this.question.correctAnswer){
				console.log('yes')
			}
			this.givenAnswer = null
			this.questionNumber++
			
		},
	}
}
</script>

<style lang='sass'>
.question-content
	
</style>