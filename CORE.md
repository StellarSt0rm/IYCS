# Core | Instructions for getting data from `youtubei/v1`

## Requests
Most requests are POST request, the basic body for the requests is:
```json
"context": {  
		"client": {
			"clientName": "WEB",
			"clientVersion": "2.20240210.05.00"
		}
}
```
! `clientVersion` number may need change in the future

<br>
You also need to provide the API key as a url param:

`key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8`

<br>
And you can add another one if you dont want pretty print (ex: "1.6K")

`prettyPrint=false`

! Doest work at the moment for some reason, youtubei will still give prettied values!

<br>

All appearances of the variable `data` is from `fetch().then(res => res.json).then(data => {})`

<br>

More data may be appended at the end of the body, outside of `context`

## Video Details
Youtube uses pagination for comments, that's why we need "continuation tokens", to get the first one you need to send a request to `youtubei/v1/next`

For this request you need to include `videoId` to the body, with the ID of the video (what's after `watch?v=`)

<br>
This first request will return video data, from which you can get:

- Transcript token
- Initial comments continuation token
- \[Other basic video data (likes, comment count, etc)\]

<br>

I recommend too look through the response yourself to get the paths of what you want, but the paths for the transcript token, and inital comments continuation, code snippet to get them:
```js
contents = data.contents.twoColumnWatchNextResults.results.results.contents

commentsToken = contents.find(function(obj) {return obj.itemSectionRenderer?.targetId}).itemSectionRenderer.contents[0].continuationItemRenderer.continuationEndpoint.continuationCommand.token
transcriptToken = data.playerOverlays.playerOverlayRenderer.shareButton.buttonRenderer.navigationEndpoint.shareEntityServiceEndpoint.serializedShareEntity
```

## Comments
To get the comments you have to send a request to `youtubei/v1/next`

For this request you need to incldude `continuation` to the body, with the `commentsToken`

<br>

Here's a small code snippet on the paths for the most important values:
```js
endpoint = data.onResponseReceivedEndpoints.at(-1) // Youtubei returns two objects for the first two requests, this is to get the last one
items = (endpoint.reloadContinuationItemsCommand || endpoint.appendContinuationItemsAction).continuationItems

// Get the continuation, the other objects are all comments
items.at(-1).continuationItemRenderer.continuationEndpoint.continuationCommand.token

// To get the replies for a comment, you can find the replies token through this path
items[*].commentThreadRenderer.replies?.commentRepliesRenderer.contents[0].continuationItemRenderer.continuationEndpoint.continuationCommand.token

// And all the rest of the data of a comment can be get from this path
items[*].commentThreadRenderer.comment.commentRenderer
```

### Replies
For the replies it's the same as the comments, but you have to give the replies token for the comment you wanna get the replies from

The paths are Almost* the same, but they vary a bit:
```js
// You still get the endpoints the same way

// To get the contination token (If there are more than 20 replies in the parent comment)
items.at(-1).continuationItemRenderer.button.buttonRenderer.command.continuationCommand.token

// And all the data for the comment can be found in this path
items[*].commentRenderer
```

## Transcript
To get the transcript you have to send a request to `youtubei/v1/get_transcript`

For this request you need to include `params` to the body, with the `transcriptToken`

<br>

And here i provide a code snippet to parse the transcript:
```js
result = []
rawTranscript = data.actions[0].updateEngagementPanelAction.content.transcriptRenderer.body.transcriptBodyRenderer.cueGroups
for(i = 0; i < rawTranscript.length; i++) {
		item = rawTranscript[i].transcriptCueGroupRenderer

		result.push({
			time: item.formattedStartOffset.simpleText,
			text: item.cues[0].transcriptCueRenderer.cue.simpleText
		})
	}
```


## End
And that's all i have for now, when i figure out Chat Replay / Live Chat i will update this file
