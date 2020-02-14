<template lang='pug'>
	div.no-span {{ text }}
</template>

<script>
export default {
	name: 'LineThroughText',
	props: {
		text: {
			type: String,
			required: true
		}
	}
}
</script>

<style lang='sass' scoped>
@import '@/styles/variables'
.no-span
	width: 100%
	display: table
	white-space: nowrap
	text-align: center
	&::after,
	&::before
		border-top: 0.04px solid $amazon-orange
		content: ''
		display: table-cell
		position: relative
		top: 0.79em
		width: 45%
	&::before
		right: 1.5%
	&::after
		left: 1.5%


</style>