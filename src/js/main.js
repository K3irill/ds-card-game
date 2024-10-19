const email = document.getElementById('email')

email.addEventListener('input', function (event) {
	if (this.validity.typeMismatch) {
		this.setCustomValidity('Formato de email inválido, verifique a ortografia')
	} else {
		this.setCustomValidity('')
	}
})
