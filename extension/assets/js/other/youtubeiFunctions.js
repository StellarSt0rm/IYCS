// Utils
function getEndpoints(data) {
	endpoint = data.onResponseReceivedEndpoints.at(-1)
	return (endpoint.reloadContinuationItemsCommand || endpoint.appendContinuationItemsAction).continuationItems
}

// This gets the details of the video
async function getVideoDetails(videoId) {
	returnData = {}

	await fetchYoutubei({"body": `{"videoId": "${videoId}"}`, "url": "next"}).then(res => res.json()).then(async data => {
		contents = data.contents.twoColumnWatchNextResults.results.results.contents

		token = contents.find(function(obj) {return obj.itemSectionRenderer?.targetId}).itemSectionRenderer.contents[0].continuationItemRenderer.continuationEndpoint.continuationCommand.token
		live = contents.find(function(obj) {return obj.videoPrimaryInfoRenderer}).videoPrimaryInfoRenderer.viewCount.videoViewCountRenderer.isLive
		share = data.playerOverlays.playerOverlayRenderer.shareButton.buttonRenderer.navigationEndpoint.shareEntityServiceEndpoint.serializedShareEntity

		//We have to fetch the first batch of comments due to the count in the initial fetch is shortened (ex: 1.5K)
		await fetchYoutubei({"body": `{"continuation": "${token}"}`, "url": "next"}).then(res => res.json()).then(data => {
			count = data.onResponseReceivedEndpoints[0].reloadContinuationItemsCommand.continuationItems[0].commentsHeaderRenderer.countText.runs[0].text.replace(",", "")

			returnData = {
				initialToken: token,
				shareId: share,
				commentCount: count,
				isLive: live,
			}
		})
	})

	return returnData
}

function parseComments(data) {
	result = {
		continuation: null,
		comments: []
	}

	// If there's a continuation, save it to results
	if(data.at(-1).continuationItemRenderer) {
		result.continuation = data.pop().continuationItemRenderer.continuationEndpoint.continuationCommand.token
	}

	for(i = 0; i < data.length; i++) {
		item = data[i].commentThreadRenderer

		// Replies Load will be done in a different function, so we save it for later
		replies = item.replies?.commentRepliesRenderer.contents[0].continuationItemRenderer.continuationEndpoint.continuationCommand.token
		item = item.comment.commentRenderer

		// THIS BULLSHIT WONT WORK IF I PUT IT IN A SEPARATE FUNCTION
		text = ""
		textContents = item.contentText.runs
		for(i2=0;i2<textContents.length;i2++) {
			textData = textContents[i2]
			
			// If the section has link/timestamp this will trigger
			if(textData.navigationEndpoint) {
					if(textData.navigationEndpoint.urlEndpoint) textData.text = `<span class="iycs_comment_link">${textData.text}</span>`
					if(textData.navigationEndpoint.watchEndpoint) textData.text = `<span class="iycs_comment_timestamp">${textData.text}</span>`
			}

			text += textData.text
		}

		result.comments.push({
			id: item.commentId,
			text: text,
			date: item.publishedTimeText.runs.shift().text,
			likes: (item.voteCount?.simpleText || 0),
			isOwner: item.authorIsChannelOwner,
			hearted: item.isLiked,
			replyCount: item.replyCount,
			repliesToken: replies,

			author: {
				id: item.authorEndpoint.browseEndpoint.browseId,
				name: item.authorText.simpleText,
				thumbnail: item.authorThumbnail.thumbnails[0]
			}
		})
	}
	
	return result
}

function parseReplies(data) {
	result = {
		continuation: null,
		replies: []
	}

	if(data.at(-1).continuationItemRenderer) {
		result.continuation = data.pop().continuationItemRenderer.button.buttonRenderer.command.continuationCommand.token
	}

	for(i = 0; i < data.length; i++) {
		item = data[i].commentRenderer
		
		// THIS BULLSHIT WONT WORK IF I PUT IT IN A SEPARATE FUNCTION
		text = ""
		textContents = item.contentText.runs
		for(i2=0;i2<textContents.length;i2++) {
			textData = textContents[i2]
			
			// If the section has link/timestamp this will trigger
			if(textData.navigationEndpoint) {
					if(textData.navigationEndpoint.urlEndpoint) textData.text = `<span class="iycs_comment_link">${textData.text}</span>`
					if(textData.navigationEndpoint.watchEndpoint) textData.text = `<span class="iycs_comment_timestamp">${textData.text}</span>`
			}

			text += textData.text
		}

		result.replies.push({
			id: {
				full: item.commentId,
				parent: item.commentId.split(".")[0],
				this: item.commentId.split(".")[1]
			},
			text: text,
			date: item.publishedTimeText.runs.shift().text,
			likes: (item.voteCount?.simpleText || 0),
			isOwner: item.authorIsChannelOwner,
			hearted: item.isLiked,

			author: {
				id: item.authorEndpoint.browseEndpoint.browseId,
				name: item.authorText.simpleText,
				thumbnail: item.authorThumbnail.thumbnails[0]
			}
		})
	}
	
	return result
}

//-----
function parseTranscript(data) {
	result = []
	for(i = 0; i < data.length; i++) {
		item = data[i].transcriptCueGroupRenderer

		result.push({
			time: item.formattedStartOffset.simpleText,
			text: item.cues[0].transcriptCueRenderer.cue.simpleText
		})
	}
	
	return result
}

// Main Data Getters
const dataGetter = {
	getComments: async(token, thisDiv, autoloaded) => {
		text = thisDiv.count

		window.iycs.loaders.comments = true

		if(window.iycs.settings.autoload.limitStyle == "dont_load" && window.iycs.settings.autoload.commentsLimit != 0 && window.iycs.settings.autoload.commentsLimit < window.iycs.video.details.commentCount) {
			setReset(thisDiv)
			return
		}

		// This will fetch comments until token is null
		while(token) {
			data = {}

			// Stop Functionality
			if(window.iycs.loaders.comments == false) {
				window.iycs.video.details[thisDiv.function.data] = token
				setStopped(thisDiv)
				return
			}

			// Autoload Limit
			if(window.iycs.settings.autoload.commentsLimit != 0 && autoloaded && window.iycs.settings.autoload.commentsLimit < parseInt(thisDiv.count.textContent)) {
				window.iycs.video.details[thisDiv.function.data] = token
				setStopped(thisDiv)
				return
			}

			// Sometimes youtubei/v1 doesnt return what we want for some reason, this will catch the error when parsing, and try again,
			// We should not lose comments due to the token not being overwritten yet
			try {
				await fetchYoutubei({"body": `{"continuation": "${token}"}`, "url": "next"}).then(res => res.json()).then(async data => {
					continuationItems = getEndpoints(data)
					
					data = parseComments(continuationItems, thisDiv)
					token = data.continuation

					window.iycs.video.comments.push(data.comments)
					thisDiv.count.textContent = parseInt(thisDiv.count.textContent) + data.comments.length

					// Get Replies For Current Batch
					for(i = 0; i < data.comments.length; i++) {
						repliesToken = data.comments[i].repliesToken

						// Skip if comment has no replies
						if(!repliesToken) continue

						getReplies(repliesToken, thisDiv)
					}
				})
			} catch(e) {}
		}

		setLoaded(thisDiv)
	},

	getChat: async(token, thisDiv) => {
		window.iycs.loaders.chat = true
		if(window.iycs.loaders.chat == false) {
			return
		}
		setFailed(thisDiv)
	},

	getTranscript: async(token, thisDiv) => {
		text = thisDiv.count
		window.iycs.loaders.transcript = true

		text.textContent = 0
		await fetchYoutubei({"body": `{"params": "${token}"}`, "url": "get_transcript"}).then(res => res.json()).then(data => {
			transcript = parseTranscript(data.actions[0].updateEngagementPanelAction.content.transcriptRenderer.body.transcriptBodyRenderer.cueGroups)
			
			window.iycs.video.transcript = transcript
			text.textContent = transcript.length

			setLoaded(thisDiv)
		})
	}
}

async function getReplies(repliesToken, thisDiv) {
	while (repliesToken) {
		try {
			await fetchYoutubei({"body": `{"continuation": "${repliesToken}"}`, "url": "next"}).then(res => res.json()).then(data => {
				continuationItems = getEndpoints(data)

				data = parseReplies(continuationItems)
				repliesToken = data.continuation
				
				thisDiv.count.textContent = parseInt(thisDiv.count.textContent) + data.replies.length
				window.iycs.video.replies.push(data.replies)
			})
		} catch(e) {}
	}
}