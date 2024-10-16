//change text for mobile
function updateContent() {
	const width = window.innerWidth
	const articlePreviewTitle = document.getElementById('article-preview__title')
	const articlePreviewText = document.getElementById('article-preview__text')

	if (width < 768) {
		articlePreviewTitle.innerText =
			'Resgatando o sonho de criar projetos educativos para crianças a partir dos games'
		articlePreviewText.innerText =
			'O publicitário Marcelo Lessa entrou no curso Unreal Engine da EBAC para desengavetar ideias antigas e torná las reais.'
	} else {
		articlePreviewTitle.innerText =
			'El Artista Técnico, cuando la programación y el diseño de juegos se juntan'
		articlePreviewText.innerText =
			'¡Es posible unir la pasión por los dos universos! ¿Habías escuchado este término antes? Si no te suena de nada, no te sientas mal, el concepto es nuevo. ¡Nosotros te lo explicamos!'
	}
}

updateContent()

window.addEventListener('resize', updateContent)
