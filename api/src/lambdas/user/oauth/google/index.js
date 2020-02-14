const { OAuth2Client } = require('google-auth-library')
const axios = require('axios')
const CLIENT_ID = process.env.CLIENT_ID

const client = new OAuth2Client(CLIENT_ID)
async function verify() {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload()
  const userid = payload['sub']
	/*
	// schema of payload
	"email": "testuser@gmail.com",
	"email_verified": "true",
	"name" : "Test User",
	"picture": "https://lh4.googleusercontent.com/-kYgzyAWpZzJ/ABCDEFGHI/AAAJKLMNOP/tIXL9Ir44LE/s99-c/photo.jpg",
	"given_name": "Test",
	"family_name": "User",
	*/
}
verify().catch(console.error)