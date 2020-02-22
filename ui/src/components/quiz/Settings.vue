<template lang='pug'>
	v-container
		v-row(justify='center')
			v-col(align='center' cols='7')
				h1.amazon-orange Practice
		v-row(justify='center')
			v-col(align='center')
				v-autocomplete(
					v-model="chosenDomain"
					:items="questionDomains"
					label='Domain'
					:color="amazonOrange"
					outlined
				)
		v-row(justify='center')
			v-col(align='center' )
				v-autocomplete(
					v-model="chosenScope"
					:items="questionScopes"
					label='Scope'
					:color="amazonOrange"
					outlined
				)
		v-row(justify='center')
			v-col(align='center' )
				v-text-field(
					label='Number of Questions'
					outlined
					:color="amazonOrange"
					v-model="numberOfQuestions"
					type='tel'
				)
		v-row.action-container(justify='center')
			v-col(align='center' cols='5')
				h3.link-container.flex-centered(@click="requestQuestions") Start
				
</template>

<script>
import { mapActions } from 'vuex'
import { questionScopes, questionDomains, amazonOrange } from '@/data/constants'
const anyOption = { text: 'Any', value: 'any'}
export default {
	name: 'Splash',
	data(){
		return {
			amazonOrange,
			chosenScope: null,
			chosenDomain: null,
			isLoading: false,
			numberOfQuestions: null,
			questionScopes,
			questionDomains: [...questionDomains, anyOption]
		}
	},
	methods: {
		...mapActions('question', ['fetchQuestions']),
		beginQuiz(){
			this.$router.push('/user/quiz/begin')
		},
		async requestQuestions(){
			this.isLoading = true
			const questionParams = {
				scope: this.chosenScope,
				domain: this.chosenDomain,
				numberOfQuestions: this.numberOfQuestions
			}
			try {
				await this.fetchQuestions(questionParams)
				this.beginQuiz()
			} catch(error){
				console.error('error', error)
				this.isLoading = false
			}
		}
	}
}
</script>

<style lang='sass'>
@import '@/styles/variables'
.link-container
	width: 100%
	padding: 10px
	border: 3px $amazon-orange solid
	color: $amazon-orange
	border-radius: 5%
	cursor: pointer
	&:active
		transform: scale(0.96)

.action-container
	margin-top: 30%

</style>