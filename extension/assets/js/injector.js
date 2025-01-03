function initIYCS() {
	function injectIYCS() {
		window.iycs.injected = true
		
		fetch(browser.runtime.getURL('assets/iycs-app.html'))
			.then(response => response.text())
			.then(html => {
				// If the addon reloads, remove old UI
				iycsOld = document.querySelector("iycs-app")
				if(iycsOld) {iycsOld.remove()}
				
				const iycsApp = document.createElement('iycs-app')				
				iycsApp.innerHTML = html
				window.iycs.ytd.watchDescription.appendChild(iycsApp)
				
				makeFrontend()
		});
	}
	
	// Observers
	const pgm_obs = new MutationObserver(() => {
		window.iycs.ytd.watchFlexy = document.querySelector("ytd-watch-flexy")
		
		if(window.iycs.ytd.watchFlexy) {
			window.iycs.ytd.watchDescription = document.querySelector("ytd-watch-metadata")
			pgm_obs.disconnect()
			injectIYCS()
		}
	})

	window.iycs.injected = false
	window.iycs.ytd = {
		pageManager: document.querySelector("ytd-page-manager"),
		watchFlexy: document.querySelector("ytd-watch-flexy"),
		watchDescription: document.querySelector("ytd-watch-metadata"),
	}
	
	// When opening a new tab, normally, watchFlexy is not loaded, so we activate the pgm_observer, else, we inject directly
	if(window.iycs.ytd.watchFlexy == null) {
		if(window.iycs.ytd.pageManager) { // For some reason, sometimes pageManager is not getting set correctly, so we wait 1 second
			pgm_obs.observe(window.iycs.ytd.pageManager, { childList: true })
		} else {
			setTimeout(() => {
				window.iycs.ytd.pageManager = document.querySelector("ytd-page-manager")
				pgm_obs.observe(window.iycs.ytd.pageManager, { childList: true })
			}, 1000)
		}
	} else {injectIYCS()}
}

// Check that settings arent unset, if they are, put default settings values, then execute initIYCS()
(function() {
	browser.storage.local.get("iycs_settings").then(data => {
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
			browser.storage.local.set({iycs_settings: settings})
		}

		window.iycs = {}
		window.iycs.settings = settings

		if(!window.iycs.injected) initIYCS()
	})
})()

// Get New Settings If There Are Changes
browser.storage.onChanged.addListener(function(changes){
	window.iycs.settings = changes.iycs_settings.newValue
})