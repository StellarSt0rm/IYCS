function makeFrontend() {
	window.iycs.app = {
		status: window.iycs.settings.other.startStatus || true,
		root: document.querySelector("iycs-app"),
		main: {
			this: document.getElementById("iycs-main"),
			head: {
				this: document.getElementById("iycs-head"),
				loadAllButton: document.getElementById("iycs-load-all"),
				statusToggle: document.getElementById("iycs-toggle")
			},
			
			info: {
				this: document.getElementById("iycs-info"),
				statusFields: [
					{
						this: document.getElementById("iycs-status-comments"),
						count: document.getElementsByClassName("iycs_status_count")[0],
						button: document.getElementsByClassName("iycs_status_load")[0],
						icon: document.getElementsByClassName("iycs_status_icon")[0],
						autoload: window.iycs.settings.autoload.comments,
						function: {
							this: "getComments",
							name: "comments",
							data: "initialToken"
						}
					},
					{
						this: document.getElementById("iycs-status-chat"),
						count: document.getElementsByClassName("iycs_status_count")[1],
						button: document.getElementsByClassName("iycs_status_load")[1],
						icon: document.getElementsByClassName("iycs_status_icon")[1],
						autoload: window.iycs.settings.autoload.chat,
						function: {
							this: "getChat",
							name: "chat",
							data: "initialToken"
						}
					},
					{
						this: document.getElementById("iycs-status-transcript"),
						count: document.getElementsByClassName("iycs_status_count")[2],
						button: document.getElementsByClassName("iycs_status_load")[2],
						icon: document.getElementsByClassName("iycs_status_icon")[2],
						autoload: window.iycs.settings.autoload.transcript,
						function: {
							this: "getTranscript",
							name: "transcript",
							data: "shareId"
						}
					}
				]
			},
			
			search: {
				searchbar: {
					this: document.getElementById("iycs-searchbar"),
					input: document.getElementById("iycs-search-input"),
					select: document.getElementById("iycs-search-select"),
					searchButton: document.getElementById("iycs-search-button")
				},
				filters: {
					this: document.getElementById("iycs-search-filters"),
					buttons: document.getElementsByClassName("iycs_search_filter")
				},
				results: {
					this: document.getElementById("iycs-search-results"),
					messagesContainer: document.getElementById("iycs-search-messages"),
					noQueryMessage: document.getElementsByClassName("iycs_search_message")[0],
					noResultsMessage: document.getElementsByClassName("iycs_search_message")[1]
				}
			},
			help: {
				this: document.getElementById("iycs-help-button"),
				separator: document.getElementById("iycs-search-separator")
			},
			
			icons: {
				verified: "✔",
				hearted: "❤",
				showReplies: "+",
				showParent: "▼",
				goToTime: "|▶",
				
				loading: `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 1000 1000"><path fill="#ff6f02" d="m31 7.002 13 1.686L33.296 19 31 7.002zM17 41 4 39.314 14.704 29 17 41z" transform="translate(-99.949975 -97.95005) scale(24.9875)"/><path fill="#ff6f00" d="M8 24c0-8.837 7.163-16 16-16 1.024 0 2.021.106 2.992.29l.693-3.865c-1.16-.313-2.423-.42-3.685-.42-11.053 0-20 8.947-20 20 0 4.844 1.686 9.474 4.844 13.051l3.037-2.629C9.468 31.625 8 27.987 8 24zm31.473-12.733-3.143 2.537C38.622 16.572 40 20.125 40 24c0 8.837-7.163 16-16 16-1.029 0-2.033-.106-3.008-.292l-.676 3.771c1.262.21 2.525.317 3.684.317 11.053 0 20-8.947 20-20 0-4.421-1.579-8.948-4.527-12.529z" transform="translate(-99.949975 -97.95005) scale(24.9875)"/></svg>`,
				loaded: `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 1000 1000"><g transform="matrix(25 0 0 25 500 500)"><linearGradient id="loaded" x1="9.858" x2="38.142" y1="9.858" y2="38.142" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#21ad64"/><stop offset="1" stop-color="#0f4e2d"/></linearGradient><path fill="url(#loaded)" d="M44 24c0 11.045-8.955 20-20 20S4 35.045 4 24 12.955 4 24 4s20 8.955 20 20z" transform="translate(-24 -24)"/></g><path d="M32.172 16.172 22 26.344l-5.172-5.172c-.781-.781-2.047-.781-2.828 0l-1.414 1.414c-.781.781-.781 2.047 0 2.828l8 8c.781.781 2.047.781 2.828 0l13-13c.781-.781.781-2.047 0-2.828L35 16.172c-.781-.781-2.047-.781-2.828 0z" opacity=".05" transform="matrix(25 0 0 25 -100 -100)"/><path d="m20.939 33.061-8-8c-.586-.586-.586-1.536 0-2.121l1.414-1.414c.586-.586 1.536-.586 2.121 0L22 27.051l10.525-10.525c.586-.586 1.536-.586 2.121 0l1.414 1.414c.586.586.586 1.536 0 2.121l-13 13c-.585.585-1.535.585-2.121 0z" opacity=".07" transform="matrix(25 0 0 25 -100 -100)"/><path fill="#fff" d="m21.293 32.707-8-8c-.391-.391-.391-1.024 0-1.414l1.414-1.414c.391-.391 1.024-.391 1.414 0L22 27.758l10.879-10.879c.391-.391 1.024-.391 1.414 0l1.414 1.414c.391.391.391 1.024 0 1.414l-13 13c-.39.391-1.024.391-1.414 0z" transform="matrix(25 0 0 25 -100 -100)"/></svg>`,
				stopped: `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 1000 1000"><g transform="matrix(25 0 0 25 500.016132 500.016132)"><linearGradient id="stopped" x1="9.858" x2="38.142" y1="9.858" y2="38.142" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fdd835"/><stop offset="1" stop-color="#886f01"/></linearGradient><path fill="url(#stopped)" d="M44 24c0 11.045-8.955 20-20 20S4 35.045 4 24 12.955 4 24 4s20 8.955 20 20z" transform="translate(-24 -24)"/></g><path d="M32.172 16.172 19 29c-.781.781-.781 2.047 0 2.828l1.586 1.586c.781.781 2.047.781 2.828 0l13-13c.781-.781.781-2.047 0-2.828L35 16.172c-.781-.781-2.047-.781-2.828 0z" opacity=".05" transform="matrix(25 0 0 25 -192.65908966 -119.80919834)"/><path d="M20.939 33.061 19.5 31.5c-.586-.586-.586-1.536 0-2.121l13.025-12.853c.586-.586 1.536-.586 2.121 0l1.414 1.414c.586.586.586 1.536 0 2.121l-13 13c-.585.585-1.535.585-2.121 0z" opacity=".07" transform="matrix(25 0 0 25 -192.65919024 -119.80773834)"/><path fill="#fff" d="M21.293 32.707 19.8 31.2c-.391-.391-.391-1.024 0-1.414l13.079-12.907c.391-.391 1.024-.391 1.414 0l1.414 1.414c.391.391.391 1.024 0 1.414l-13 13c-.39.391-1.024.391-1.414 0z" transform="matrix(25 0 0 25 -192.65919803 -119.80906634)"/></svg>`,
				failed: `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 1000 1000"><g transform="matrix(25 0 0 25 499.9896 499.9896)"><linearGradient id="failed" x1="9.858" x2="38.142" y1="9.858" y2="38.142" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f44336"/><stop offset="1" stop-color="#7f0f07"/></linearGradient><path fill="url(#failed)" d="M44 24c0 11.045-8.955 20-20 20S4 35.045 4 24 12.955 4 24 4s20 8.955 20 20z" transform="translate(-24 -24)"/></g><path d="M584.562635 336.726881 335.098127 579.676373c-14.791359 14.791359-14.791359 38.768133 0 53.559492l30.037254 30.037254c14.791359 14.791359 38.768133 14.791359 53.559492 0l246.207-246.207c14.791359-14.791359 14.791359-38.768133 0-53.559492l-26.779746-26.779746c-14.791359-14.791359-38.768133-14.791359-53.559492 0z" opacity=".05" transform="matrix(1.32 0 0 1.32 -160.0104 -160.0104)"/><path d="m371.818301 656.587652-27.253221-29.563779c-11.098254-11.098254-11.098254-29.090304 0-40.169619l246.680475-243.422967c11.098254-11.098254 29.090304-11.098254 40.169619 0l26.779746 26.779746c11.098254 11.098254 11.098254 29.090304 0 40.169619l-246.207 246.207c-11.079315 11.079315-29.071365 11.079315-40.169619 0z" opacity=".07" transform="matrix(1.32 0 0 1.32 -160.0104 -160.0104)"/><path fill="#fff" d="m378.515121 649.883246-28.275927-28.541073c-7.405149-7.405149-7.405149-19.393536 0-26.779746l247.703181-244.445673c7.405149-7.405149 19.393536-7.405149 26.779746 0l26.779746 26.779746c7.405149 7.405149 7.405149 19.393536 0 26.779746l-246.207 246.207c-7.38621 7.405149-19.393536 7.405149-26.779746 0z" transform="matrix(1.32 0 0 1.32 -160.0104 -160.0104)"/><path d="M32.172 16.172 19 29c-.781.781-.781 2.047 0 2.828l1.586 1.586c.781.781 2.047.781 2.828 0l13-13c.781-.781.781-2.047 0-2.828L35 16.172c-.781-.781-2.047-.781-2.828 0z" opacity=".05" transform="scale(25) rotate(90 26.25 18.543)"/><path d="M20.939 33.061 19.5 31.5c-.586-.586-.586-1.536 0-2.121l13.025-12.853c.586-.586 1.536-.586 2.121 0l1.414 1.414c.586.586.586 1.536 0 2.121l-13 13c-.585.585-1.535.585-2.121 0z" opacity=".07" transform="matrix(0 25 -25 0 1119.80103959 -192.6743544)"/><path fill="#fff" d="M21.293 32.707 19.8 31.2c-.391-.391-.391-1.024 0-1.414l13.079-12.907c.391-.391 1.024-.391 1.414 0l1.414 1.414c.391.391.391 1.024 0 1.414l-13 13c-.39.391-1.024.391-1.414 0z" transform="matrix(0 25 -25 0 1119.80170764 -192.68440818)"/></svg>`,
				
				sortUp: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0.47 1.98 14.53 11.05" fill="currentColor"><path d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707V12.5zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/></svg>`,
				sortDown: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0.47 2 14.53 11.02" fill="currentColor"><path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/></svg>`,
				hasLikes: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="1 1 22 20"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"/></svg>`,
				hasReplies: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="4 8 40 39"><path d="M42 8H6c-1.105 0-2 .895-2 2v26c0 1.105.895 2 2 2h8v7.998c0 .891 1.077 1.337 1.707.707L24.412 38H42c1.105 0 2-.895 2-2V10c0-1.105-.895-2-2-2z"/></svg>`
			}
		}
	}
	
	// Assign vars from main IYCS object
	app = window.iycs.app

	// Function
	function syncStatus() {
		toggle = document.getElementById("iycs-toggle")
		loadAll = document.getElementById("iycs-load-all")
		container = document.getElementById("iycs-main-container")

		if(!app.status) {
			toggle.children[0].setAttribute("minimized", "")
			toggle.setAttribute("title", "Maximize IYCS")
			loadAll.setAttribute("disabled", "")
			container.style.display = "none"
		} else {
			toggle.children[0].removeAttribute("minimized")
			toggle.setAttribute("title", "Minimize IYCS")
			loadAll.removeAttribute("disabled")
			container.style.display = "revert"
		}
	}
	syncStatus()
	
	// Event Listeners
	document.getElementById("iycs-toggle").addEventListener("click", () => {
		app.status = !app.status
		syncStatus()
	})

	// Observers
	changeMargin = app.root.style.marginTop = (document.querySelector('ytd-metadata-row-container-renderer:not([disable-upgrade])').children[0].children.length ? "8px" : "16px")
	const dynamic_margin = new MutationObserver(async function() {
		// Detects video change and adapts UI, then resets backend
		changeMargin

		if(window.location.toString().startsWith("https://www.youtube.com/watch?")) startBackend()
	}).observe(iycs.ytd.watchFlexy, { attributes: true })

	new ResizeObserver(_ => {
		separator = app.main.help.separator
		container = _[0].target.children[0]

		if(container.scrollWidth > container.clientWidth) {
			separator.style.visibility = "visible"
		} else {
			separator.style.visibility = "hidden"
		}
	}).observe(app.main.search.filters.this)

	// Start Backend
	if(window.location.toString().startsWith("https://www.youtube.com/watch?")) startBackend()
}

// Global Frontend Functions
function setReset(element) {
	element.icon.innerHTML = app.main.icons.loading
	element.button.textContent = "Load"
	element.icon.children[0].classList.remove("iycs_rotate")
}

function setLoading(element) {
	element.icon.innerHTML = app.main.icons.loading
	element.icon.children[0].classList.add("iycs_rotate")
	element.button.textContent = "Stop"
}

function setLoaded(element) {
	element.icon.innerHTML = app.main.icons.loaded
	element.button.textContent = "Reload"
	element.icon.children[0].classList.remove("iycs_rotate")
}

function setStopped(element) {
	element.icon.innerHTML = app.main.icons.stopped
	element.button.textContent = "Continue"
	element.icon.children[0].classList.remove("iycs_rotate")
}

function setFailed(element) {
	element.icon.innerHTML = app.main.icons.failed
	element.button.textContent = "Load"
	element.icon.children[0].classList.remove("iycs_rotate")
}