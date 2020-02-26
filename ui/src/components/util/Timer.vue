<template lang='pug'>
	span
		v-row
			v-col {{ minutesDisplay }} : {{ secondsDisplay }}
		v-row(justify='center' v-if="hasButtons")
			v-col(cols=4 align='center')
				v-icon(@click="emitToggleTimer") {{ buttonText }}
			v-col(cols=4 align='center')
					v-icon(@click="clearTimer" :disabled="isTimerRuning") mdi-close
</template>

<script>
export default {
	name: 'Timer',
	props: {
		justify: {
			type: String,
			required: false,
			default: 'center'
		},
		shouldStart: {
			type: Boolean,
			required: false
		},
		hasButtons: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	watch: {
		shouldStart(){
			this.toggleTimer()
		}
	},
	data(){
		return {
			minutes: 0,
			seconds: 0,
			isTimerRuning: false,
			timerFunction: null
		}
	},
	computed: {
		buttonText(){
			return this.isTimerRuning
				? 'mdi-pause'
				: 'mdi-play'
		},
		minutesDisplay(){
			return this.minutes < 10
				? `0${this.minutes}`
				: this.minutes
		},
		secondsDisplay(){
			return this.seconds < 10
				? `0${this.seconds}`
				: this.seconds
		}
	},
	methods: {
		emitToggleTimer(){
			this.isTimerRuning
				? this.$emit('timerToggle')
				: this.$emit('timerToggle', { minutes: this.minutes, seconds: this.seconds }) 
		},
		toggleTimer(){
			if(this.isTimerRuning){
				this.isTimerRuning = false
				clearInterval(this.timerFunction)
			} else {
				this.isTimerRuning = true
				this.timerFunction = setInterval(() => {
					this.seconds++
					if(this.seconds === 60){
						this.minutes++
						this.seconds = 0
					}
				}, 1000)
			}
		},
		clearTimer(){
			this.minutes = 0
			this.seconds = 0
			clearInterval(this.timerFunction)
		}
	}
}
</script>

<style>

</style>