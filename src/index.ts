import "./index.html";
import "./index.scss";

let form = document.querySelector(".form") as HTMLFormElement
let comments = document.querySelector(".comments") as HTMLDivElement

let tx = document.getElementsByTagName("textarea");
for (let i = 0; i < tx.length; i++) {
	tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
	tx[i].addEventListener("input", OnInput, false);
}

function OnInput(this: any) {
	this.style.height = "auto";
	this.style.height = (this.scrollHeight) + "px";
}

let form__nickName = document.querySelector('.form__name') as HTMLInputElement
let form__textarea = document.querySelector('.form__textarea') as HTMLTextAreaElement
let form__date = document.querySelector('.form__date') as HTMLTextAreaElement

const createCard = (cardData: any) => {
	form__nickName.value = ''
	form__textarea.value = ''
	form__date.value = ''
	tx[0].style.height = '22px'

	let currentDate = new Date();
	let currentDateYear = currentDate.getFullYear()
	let currentDayMonth = currentDate.getMonth()
	let currentDayDay = currentDate.getDate()
	let currentDateHours = currentDate.getHours()
	let currentDateMinutes = currentDate.getMinutes()
	let currentCardDate = cardData.date

	const cardDateNotSelected = cardData.date.length === 0
	const cardDateSelected = cardData.date.length > 0
	const fixedMinutes = currentDateMinutes < 10 ? `0${currentDateMinutes}` : currentDateMinutes

	if (cardDateNotSelected) {
		currentCardDate = `сегодня, ${currentDateHours}:${fixedMinutes}`
	}
	if (cardDateSelected) {
		const [currentCardDateYear, currentCardDateMonth, currentCardDay
		] = currentCardDate.split("-")

		let cardDate = new Date(Number(currentCardDateYear), Number(currentCardDateMonth) - 1, Number(currentCardDay))

		let currentDayDate = new Date(Number(currentDateYear), Number(currentDayMonth), Number(currentDayDay))

		// @ts-ignore
		let differentDate = (currentDayDate - cardDate)
		const yesterday = 86400000
		const today = 0


		currentCardDate = `${currentCardDate}, ${currentDateHours}:${fixedMinutes}`
		if (differentDate === yesterday) {
			currentCardDate = `вчера, ${currentDateHours}:${fixedMinutes}`
		}
		if (differentDate === today) {
			debugger
			currentCardDate = `сегодня, ${currentDateHours}:${fixedMinutes}'`
		}

	}

	let newDiv = document.createElement("div");
	newDiv.classList.add("item");

	let itemHeadImg = "<img src='assets/avatar.jpg' alt=\"avatar\">"
	let itemHead = `<div class='comments__head'>${itemHeadImg}</div>`

	let itemBodyLike = `<div class="comments__like"><img class="unliked"  src="assets/unliked.png" alt="unliked"></div>`
	let itemBodyText = `<p class="comments__text">${cardData.text}</p>`
	let itemBodyNickName = `<h3 class="comments__name">${cardData.nickName}</h3>`
	let itemBoydDate = `<div class="comments__data">${currentCardDate}</div>`
	let itemBodyTitle = `<div class=\"comments__title\">${itemBodyNickName}${itemBoydDate}</div>`
	let itemBody = `<div class=\"comments__body\">${itemBodyTitle}${itemBodyText}${itemBodyLike}</div>`

	let itemToolsDelete = `<div class="comments__delete"><img src="./assets/delete.png" alt="delete"></div>`
	let itemTools = `<div class="comments__tools">${itemToolsDelete}</div>`

	newDiv.innerHTML += itemHead;
	newDiv.innerHTML += itemBody;
	newDiv.innerHTML += itemTools;
	return newDiv

}

form.onsubmit = (e) => {
	const result: any = {}
	e.preventDefault()
	let formData = new FormData(form)
	for (const pair of formData.entries()) {
		result[pair[0]] = pair[1]
	}
	comments.prepend(createCard(result))
}
comments.addEventListener("click", (e) => {
	let currentElement = (<HTMLElement>e.target)
	let currentParentElement = (<HTMLElement>e.target).parentElement?.parentElement

	if (currentElement.parentElement?.classList.contains("comments__delete") && currentParentElement) {
		currentParentElement.remove()
	}
	if (currentElement.parentElement?.classList.contains("comments__like") && currentParentElement) {
		if (currentElement.classList.contains("unliked")) {
			currentElement.parentElement.innerHTML = "<img class=\"liked\"  src='assets/liked.png\' alt=\"liked\">1"
		} else {
			currentElement.parentElement.innerHTML = "<img class=\"unliked\"  src='assets/unliked.png\' alt=\"unliked\">"
		}
		console.log()
		console.log(currentElement)
	}
})



