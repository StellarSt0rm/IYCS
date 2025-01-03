(async function() {
	//Define Stuff
	const autoload = {
		comments: document.getElementById("comments"),
		commentsLimit: document.getElementById("comments-limit"),
		chat: document.getElementById("chat"),
		transcript: document.getElementById("transcript"),
		limitStyle: document.getElementById("limit-style")
	}
	const other = {
		cleanAction: document.getElementById("clean-action"),
		startStatus: document.getElementById("start-status")
	}

	// Set Other Styling
	autoload.chat.parentElement.setAttribute("checkbox", "disabled")
	autoload.chat.setAttribute("disabled", "")
	
	// Get Settings
	await browser.storage.local.get("iycs_settings").then(data => {
		settings = data.iycs_settings
		if(!JSON.stringify(settings)) {
			settings = {
				autoload: {
					comments: false,
					commentsLimit: 0,
					chat: false,
					transcript: false,
					limitStyle: "stop_load"
				},
				other: {
					cleanAction: "both",
					startStatus: true
				}
			}
		}
	})

	// Functions
	function setSettings() {
		browser.storage.local.set({iycs_settings: settings})
		console.log(settings)
	}

	// Disabled Inputs
	function verifyDisableElements() {
		if(!settings.autoload.comments) {
			autoload.commentsLimit.setAttribute("disabled", "")
		} else {
			autoload.commentsLimit.removeAttribute("disabled")
		}
	}
	verifyDisableElements()

	// Set States/Values
	function syncVisuals() {
		autoload.comments.checked = settings.autoload.comments
		autoload.commentsLimit.value = settings.autoload.commentsLimit ? settings.autoload.commentsLimit : ""
		autoload.chat.checked = settings.autoload.chat
		autoload.transcript.checked = settings.autoload.transcript
		
		autoload.limitStyle.value = settings.autoload.limitStyle
		other.cleanAction.value = settings.other.cleanAction
		other.startStatus.value = settings.other.startStatus ? "max" : "min"
	}
	syncVisuals()

	// Even Listeners
	autoload.comments.addEventListener("change", function() {
		settings.autoload.comments = this.checked
		verifyDisableElements(settings)
		setSettings()
	})
	autoload.chat.addEventListener("change", function() {
		settings.autoload.chat = this.checked
		setSettings()
	})
	autoload.transcript.addEventListener("change", function() {
		settings.autoload.transcript = this.checked
		setSettings()
	})
	autoload.commentsLimit.addEventListener("input", function() {
    	newValue = this.value.replace(/[^0-9]/g, '')
		if(this.value != newValue) {this.value = newValue; return}

		settings.autoload.commentsLimit = this.value ? parseInt(this.value) : 0
		setSettings()
	})
	
	autoload.limitStyle.addEventListener("change", function() {
		settings.autoload.limitStyle = this.value 
		setSettings()
	})
	other.cleanAction.addEventListener("change", function() {
		settings.other.cleanAction = this.value
		setSettings()
	})
	other.startStatus.addEventListener("change", function() {
		settings.other.startStatus = this.value == "max" ? true : false
		setSettings()
	})
	
	document.getElementById("reset").addEventListener("click", function() {
		if(!confirm("Are you sure? This Will Reset Your Configurations!")) {return}
		
		settings = {
			autoload: {
				comments: false,
				commentsLimit: 0,
				chat: false,
				transcript: false,
				limitStyle: "stop_load"
			},
			other: {
				cleanAction: "both",
				startStatus: "max"
			}
		}
		setSettings()
		syncVisuals()
	})
})()
