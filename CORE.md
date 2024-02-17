# Core | Instructions getting data from `youtubei/v1`

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
! `clientVersion` number may need change in the future, but for now this is accepted

More data may be appended at the end of the body, outside of `context`

## Video Details | Comments
Youtube uses pagination for comments, that's why we need "continuation tokens", to get the first one you need to send a POST request to `youtubei/v1/next`
For this request you need to include `videoId` to the body, with the ID of the video (what's after `watch?v=`)
