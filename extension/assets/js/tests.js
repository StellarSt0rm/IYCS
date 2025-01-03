videoId = window.location.toString().match(/v=([^&]*)/)[1] // Minimal regex, it works

// The minimal body for most fetches to the youtubei API
body = {
	"context": {  
		"client": {
			"clientName": "WEB",
			"clientVersion": "2.20240210.05.00"
		}
	}
}

// TODO, make functions for most of the datta getting, name it smth like "youtubeiDataGetter"
// TODO, make a dynamic function for finding the objects in the data, with just giving "data", should support all, including isLive
// After first fetch (With videoID) get basic video data:
contents = data.contents.twoColumnWatchNextResults.results.results.contents
token = contents.find(function(obj) {return obj.itemSectionRenderer?.targetId}).itemSectionRenderer
commentCount = contents.find(function(obj) {return obj.itemSectionRenderer?.sectionIdentifier}).itemSectionRenderer.contents[0].commentsEntryPointHeaderRenderer.commentCount.simpleText
isLive = contents.find(function(obj) {return obj.videoPrimaryInfoRenderer}).videoPrimaryInfoRenderer.viewCount.videoViewCountRenderer.isLive

// Get comments:
endpoints = data.onResponseReceivedEndpoints.at(-1)
comments = (endpoints.reloadContinuationItemsCommand || endpoints.appendContinuationItemsAction).continuationItems

// Fetching The Comments
fetchData = {
	"videoId": videoId //OR "continuation": token
}
fetchYoutubei({"body": JSON.stringify(fetchData), "url": "next"})