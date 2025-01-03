function log(text) {
	console.log("[IYCS]", text)
}

// Multipurpose fetcher for the youtubei API
async function fetchYoutubei(data) {
	key = "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8"
	version = "2.20240210.05.00"

	url = data.url

	headers = {
		"content-type": "application/json",
		"accept-encoding": "gzip, deflate, br",
		"x-youtube-client-name": "1",
		"x-youtube-client-version": version
	}

	body = {
		"context": {
			"client": {
				"clientName": "WEB",
				"clientVersion": version
			}
		}
	}
	dataBody = JSON.parse(data.body)
	Object.keys(dataBody).forEach(key => {
		body[key] = dataBody[key]
	})

	
	// For some reason fetches made through this function will not show on devtools
	return fetch(`https://www.youtube.com/youtubei/v1/${url}?key=${key}&prettyPrint=false`, {
		method: "POST",
		/*headers: headers,*/
		body: JSON.stringify(body)
	})
}