const { Responder, extractResponseParams } = require('simple-lambda-actions/dist/util/responseHandler')
const path = require('path')


// base of oauth api
const OAUTH_API_BASE = `api.typeform.com`
const CLIENT_ID = process.env.TYPEFORM_CLIENT_ID
const CLIENT_SECRET = process.env.TYPEFORM_CLIENT_SECRET

function postRequest (host, path, body) {
	const options = {
		method: 'post',
		host: host,
		path: path,
		headers: {
			'Content-Length': body.length,
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	}
  return new Promise((resolve, reject) => {
    const request = https.request(options, res => {
      res.setEncoding('utf8')
      let response = []
      res.on('data', chunk => response.push(chunk))
      res.on('end', () => resolve(response.join('')))
      res.on('error', reject)
    })

    request.write(body)
  })
}

async function exchangeCodeForToken (code, redirectUri) {
  const body = `grant_type=authorization_code&code=${code}&client_id=${CLIENT_ID}&`
    + `client_secret=${CLIENT_SECRET}&redirect_uri=${redirectUri}`
  const response = await postRequest(OAUTH_API_BASE, `/oauth/token`, body)
  const data = JSON.parse(response)

  if (data['access_token']) {
    return data['access_token']
  }
}

// set `yourdomain.com` to the domain you open the popup from
// https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
const renderResponse = (token) => `
<!doctype html>
<html><body>
<script type='application/javascript'>
window.opener.postMessage('token:${token}', 'yourdomain.com')
</script>
</body></html>
`

async function callback (event, context, callback) {
  const qs = event.queryStringParameters

  if (!qs || !qs.code) {
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({ message: 'Code was not specified' })
    })
  }

  const redirectUri = `https://` + path.join(event.headers.Host, event.requestContext.path)

  try {
    const token = await exchangeCodeForToken(qs.code, redirectUri)
    return callback(null, {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: renderResponse(token)
    })
  } catch (e) {
    return callback(null, {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: e.message })
    })
  }
}

module.exports.callback = callback