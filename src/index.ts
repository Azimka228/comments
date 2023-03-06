import "./index.html";
import "./index.scss";

let form = document.querySelector(".form") as HTMLFormElement
let comments = document.querySelector(".comments") as HTMLDivElement

const createCard = (cardData: any) => {

	let currentDate = new Date();
	let currentDateYear = currentDate.getFullYear()
	let currentDayMonth = currentDate.getMonth()
	let currentDayDay = currentDate.getDate()
	let currentDateHours = currentDate.getHours()
	let currentDateMinutes = currentDate.getMinutes()

	let currentCardDate = cardData.date

	const cardDateNotSelected = cardData.date.length === 0
	const cardDateSelected = cardData.date.length > 0

	if (cardDateNotSelected) {
		currentCardDate = `"сегодня, ${currentDateHours}:${currentDateMinutes}"`
	}
	if (cardDateSelected) {
		const [currentCardDateYear, currentCardDateMonth, currentCardDay
		] = currentCardDate.split("-")


		let cardDate = new Date(Number(currentCardDateYear), Number(currentCardDateMonth)-1, Number(currentCardDay))

		let currentDayDate = new Date(Number(currentDateYear), Number(currentDayMonth), Number(currentDayDay))

		// @ts-ignore
		let differentDate = (currentDayDate - cardDate)
		const yesterday = 86400000
		const today = 0
		const fixedMinutes = currentDateMinutes < 10 ? `0${currentDateMinutes}`: currentDateMinutes

		currentCardDate = `"${currentCardDate}, ${currentDateHours}:${fixedMinutes}"`
		if (differentDate === yesterday) {
			currentCardDate = `"вчера, ${currentDateHours}:${fixedMinutes}"`
		}
		if (differentDate === today) {
			currentCardDate = `"сегодня, ${currentDateHours}:${fixedMinutes}'"`
		}

	}
	const date = `<div class="comments__data">${currentCardDate}</div>`

	let newDiv = document.createElement("div");
	newDiv.classList.add("item");
	newDiv.innerHTML += `<div class="comments__name">${cardData.nickName}</div>`;
	newDiv.innerHTML += `<div class="comments__text">${cardData.text}</div>`;
	newDiv.innerHTML += date;
	newDiv.innerHTML += `<div class="comments__delete"><img src="assets/delete.png" alt="delete"></div>`;
	newDiv.innerHTML += `<div class="comments__like"><img class="unliked"  src="assets/unliked.png" alt="unliked"></div>`;
	return newDiv

}

form.onsubmit = (e) => {
	const result: any = {}
	e.preventDefault()
	let formData = new FormData(form)
	for (const pair of formData.entries()) {
		result[pair[0]] = pair[1]
	}
	comments.append(createCard(result))
}
comments.addEventListener("click", (e) => {
	let currentElement = (<HTMLElement>e.target)
	let currentParentElement = (<HTMLElement>e.target).parentElement?.parentElement

	if (currentElement.parentElement?.classList.contains("comments__delete") && currentParentElement) {
		currentParentElement.remove()
	}
	if (currentElement.parentElement?.classList.contains("comments__like") && currentParentElement) {
		if (currentElement.classList.contains("unliked")) {
			currentElement.parentElement.innerHTML = "<img class=\"liked\"  src=\"assets/liked.png\" alt=\"liked\">"
		} else {
			currentElement.parentElement.innerHTML = "<img class=\"unliked\"  src=\"assets/unliked.png\" alt=\"unliked\">"
		}
		console.log()
		console.log(currentElement)
	}
})



