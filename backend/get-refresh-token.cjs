const { google } = require('googleapis');
const readline = require('readline');
const fs = require('fs').promises;

// Replace with your actual client ID and client secret
const CLIENT_ID = '212901732261-rq3gi8gda0m63l978kp9m3s6cfpsjrdl.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:5000/oauth2callback';

const SCOPES = ['https://mail.google.com/'];

async function main() {
  const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  console.log('Authorize this app by visiting this url:', authUrl);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Enter the code from that page here: ', async (code) => {
    rl.close();

    try {
      const tokenResponse = await oAuth2Client.getToken(code);
      const { tokens } = tokenResponse;
      oAuth2Client.setCredentials(tokens);
      console.log('Refresh Token:', tokens.refresh_token);
      // Store the refresh token securely (e.g., in a file or database)
      await fs.writeFile('refresh_token.json', JSON.stringify(tokens));
      console.log('Token stored to refresh_token.json');
    } catch (error) {
      console.error('Error retrieving access token', error);
    }
  });
}

main().catch(console.error);
