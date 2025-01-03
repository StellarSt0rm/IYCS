async function startBackend() {
	// Vars
	window.iycs.video = {
		details: {},
		comments: [],
		replies: [],
		chat: [],
		transcript: []
	}

	window.iycs.video.details = await getVideoDetails(window.location.toString().match(/v=([^&]*)/)[1])

	window.iycs.loaders = {}

	// Set Icons / Initial States
	filters = app.main.search.filters.buttons
	filters[Object.keys(filters).at(-3)].children[0].innerHTML = app.main.icons.sortDown
	app.main.info.statusFields.forEach(item => {
		setReset(item)
		item.count.textContent = "0"
	})

	// Relocate Vars
	app = window.iycs.app

	// Add Event Listeners
	statusIcons = app.main.info.statusFields

	statusIcons.forEach(item => {
		item.button.addEventListener("click", function(event) {
			if(item.button.textContent == "Stop") {
				window.iycs.loaders[item.function.name] = false
				return
			} else if(item.button.textContent != "Continue") {
				window.iycs.video[item.function.name] = []
				item.count.textContent = 0
				
				// Comments Have An Extra Array
				if(item.function.name == "comments") window.iycs.video.replies = []
			}

			setLoading(item)
			dataGetter[item.function.this](window.iycs.video.details[item.function.data], item, !event.isTrusted)
			setReset(item)
		})

		window.iycs.loaders[item.function.name] = false
		if(item.autoload) item.button.click()
	})
}