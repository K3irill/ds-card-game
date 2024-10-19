const subscribeEmail = document.getElementById('subscribe-email')
const subscribeCheckbox = document.getElementById('subscribe-checkbox')
const subscribeForm = document.getElementById('subscribe-form')
const successText = document.querySelector('.subscribe-block__success')

subscribeEmail.addEventListener('input', function (event) {
	if (this.validity.typeMismatch) {
		this.setCustomValidity('Formato de email inválido, verifique a ortografia')
	} else {
		this.setCustomValidity('')
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
