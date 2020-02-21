const shuffleArray = originalSet => {
	const maxIndex = originalSet.length - 1
	for(let iterator = 0; iterator < maxIndex; iterator++) {
		const randomIndex = Math.floor(Math.random() * maxIndex)
		const currentItem = originalSet[iterator]
    originalSet[iterator] = originalSet[randomIndex]
    originalSet[randomIndex] = currentItem
	}
}

const chopArrayAtIndex = (arrayToChop, indexToChopFrom) => {
  arrayToChop.splice(indexToChopFrom)
}

const randomizeAndChop = (arrayToChop, maxNumberOfItems) => {
	if(arrayToChop.length < maxNumberOfItems) {
		return arrayToChop
	} else {
		const baseArray = [...arrayToChop]
		shuffleArray(baseArray)
		chopArrayAtIndex(baseArray, maxNumberOfItems)
		return baseArray
	}
}

module.exports = randomizeAndChop