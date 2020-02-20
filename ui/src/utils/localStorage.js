export const writeToLocalStorage = (key, payload) => {
	localStorage.setItem(key, JSON.stringify(payload))
}

export const getItemFromLocalStorage = key => JSON.parse(localStorage.getItem(key))