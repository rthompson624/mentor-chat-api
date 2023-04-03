import * as functions from "firebase-functions";
import { OpenAIApi, Configuration, ChatCompletionRequestMessage } from "openai";
import * as cors from 'cors';

const corsHandler = cors({ origin: true });

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openAIApi = new OpenAIApi(configuration);

export const createChatCompletion = functions.https.onRequest((request, response) => {
  corsHandler(request, response, async () => {
    try {
      const messages: ChatCompletionRequestMessage[] = request.body.messages;
      const chatResponse = await openAIApi.createChatCompletion({ model: 'gpt-3.5-turbo', messages });
      const responseMessage = chatResponse.data.choices[0].message;
      response.json(responseMessage);
    } catch (error: any) {
      functions.logger.error('Error encountered in /createChatCompletion', formatErrorMessage(error));
      response.json({ error: { message: formatErrorMessage(error) } });
    }
  });
});

const formatErrorMessage = (error: any): string => {
  if (error && error.message) {
    return `Error: ${error.message}`;
  }
  if (typeof error === 'object') {
    return `Error: ${JSON.stringify(error)}`;
  }
  return `Error: ${error}`;
};
