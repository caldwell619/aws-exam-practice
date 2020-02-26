<template lang='pug'>
	v-container
		v-row
			v-col(align='center')
				h1.amazon-orange Welcome
		v-row.user-home-actions(justify='center')
			v-col(cols=8 align='center')
				router-link(to='/user/quiz/settings')
					h4.text--primary Take a Quiz
		v-row.user-home-action(justify='center')
			v-col(cols=8 align='center')
				router-link(to='/user/flash-cards/settings')
					h4.text--primary Practice with Flash Cards
</template>

<script>
export default {
	Name: 'UserHome',
}
</script>

<style lang='sass'>
.user-home-actions
	margin-top: 15%
.user-home-action
	margin-top: 5%
</style>