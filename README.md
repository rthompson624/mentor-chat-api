# Description
This is a Google Cloud project using [Google Cloud Functions](https://firebase.google.com/docs/functions/get-started?hl=en&authuser=0) to serve as the http endpoints for the [Mentor Chat](https://github.com/rthompson624/mentor-chat) frontend.

# Development
The file `/functions/.env` needs to be available and contain the value for the key `OPENAI_API_KEY`.

To run in local test mode, navigate to the `/functions` directory and start the emulation server using the following command.
```
npm run serve
```
The output from this command will contain the url for the emulation server UI. The UI will contain the urls for the http endpoints.

Changes made to the source code require a server restart to take effect.

# Deployment
Run this command to deploy:
```
firebase deploy --only functions
```
After running this command, the Firebase CLI outputs the URL for any HTTP function endpoints. In your terminal, you should see a line like the following:
```
Function URL (createChatCompletion): https://us-central1-MY_PROJECT.cloudfunctions.net/createChatCompletion
```
