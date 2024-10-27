import '../styles/style.scss'
//*hide header by scrolling
let lastScrollTop = 0
const header = document.getElementById('header')

window.addEventListener('scroll', function () {
	let scrollTop = window.pageYOffset || document.documentElement.scrollTop
	if (scrollTop > lastScrollTop) {
		header.style.top = '-140px'
	} else {
		header.style.top = '0px'
	}
	lastScrollTop = scrollTop
})

//*subscribe form
const subscribeEmail = document.getElementById('subscribe-email')
const subscribeCheckbox = document.getElementById('subscribe-checkbox')
const subscribeForm = document.getElementById('subscribe-form')
const successText = document.querySelector('.subscribe-block__success')
const errorText = document.createElement('p')
errorText.textContent = 'Formato de email inválido, verifique a ortografia'

subscribeEmail.addEventListener('input', function (event) {
	if (subscribeEmail.value.length === 0) {
		if (subscribeCheckbox.parentNode.contains(errorText)) {
			subscribeCheckbox.parentNode.removeChild(errorText)
		}
		return
	}

	if (!this.validity.valid) {
		if (!subscribeCheckbox.parentNode.contains(errorText)) {
			subscribeCheckbox.parentNode.insertBefore(errorText, subscribeCheckbox)
		}
	} else {
		if (subscribeCheckbox.parentNode.contains(errorText)) {
			subscribeCheckbox.parentNode.removeChild(errorText)
		}
	}
})
subscribeForm.addEventListener('submit', event => {
	event.preventDefault()

	if (subscribeEmail.checkValidity() && subscribeCheckbox.checked) {
		successText.classList.remove('hidden')
		subscribeForm.classList.add('hidden')
	} else {
		if (!subscribeEmail.checkValidity()) {
			subscribeEmail.reportValidity()
		}
	}
})

//*simple accordion
const navTitles = document.querySelectorAll('.footer__nav-title')

navTitles.forEach(navTitle => {
	navTitle.addEventListener('click', function () {
		this.classList.toggle('active')
		let acc = this.nextElementSibling
		let img = this.querySelector('.img-accordion')

		if (acc.style.maxHeight) {
			acc.style.maxHeight = null
			img.classList.remove('rotated')
		} else {
			acc.style.maxHeight = acc.scrollHeight + 'px'
			img.classList.add('rotated')
		}
	})
})
