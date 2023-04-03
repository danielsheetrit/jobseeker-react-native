import { Configuration, OpenAIApi } from 'openai';
// eslint-disable-next-line import/no-unresolved
import { OPEN_AI_KEY } from '@env';
import instructions from './instructions';

const configuration = new Configuration({
  apiKey: OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);

const getChatService = async (dialog) => {
  let fixedDialog = dialog;

  if (dialog.length > 10) {
    fixedDialog = dialog.slice(dialog.length - 10, dialog.length);
  }

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: instructions,
        },
        ...fixedDialog,
      ],
      temperature: 0,
      max_tokens: 256,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    return response.data.choices[0];
  } catch (err) {
    return console.log(err);
  }
};

export default getChatService;
