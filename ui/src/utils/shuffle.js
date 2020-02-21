export default originalSet => {
	const maxIndex = originalSet.length - 1
	for(let iterator = 0; iterator < maxIndex; iterator++) {
		const randomIndex = Math.floor(Math.random() * maxIndex)
		const currentItem = originalSet[iterator]
    originalSet[iterator] = originalSet[randomIndex]
    originalSet[randomIndex] = currentItem
	}
	return originalSet
}

