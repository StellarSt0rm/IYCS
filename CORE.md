# Core | Instructions for getting data from `youtubei/v1`

## Requests
Most requests are POST request, the basic body for the request to get accepted is:
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

More data may be appended at the end of the body, outside of `context`

## Video Details | Comments
Youtube uses pagination for comments, that's why we need "continuation tokens", to get the first one you need to send a POST request to `youtubei/v1/next`
For this request you need to include `videoId` to the body, with the ID of the video (what's after `watch?v=`)

This first request will return video data, from which you can get:

- Transcript continuation token
- Initial comments continuation token
- \[Other basic video data (likes, comment count, etc)\]
