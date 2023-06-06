import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai'


export async function POST(request: Request) {

    // break the app if the API key is missing
    if (!process.env.OPENAI_API_KEY) {
        return NextResponse.json({ error: 'No OpenAI Key Error' }, { status: 500 });
    }

    const body = await request.json();
    console.log(`Prompt content: ${body.message}`)
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const aiResponse = await openai.createCompletion({
		model: "text-davinci-003",
        // model: 'gpt-3.5-turbo',
        // // model: "text-moderation-latest",
        // // model: "text-davinci-003",
		// temperature: 0.3,
        temperature: process.env.AI_TEMP ? parseFloat(process.env.AI_TEMP) : 0.3,
        prompt: "Respond with ok if you believe the message to be legitimate business correspondance or spam if the message seems like a scam or promotion. Here is the message: " + body.message + "\n\nAnswer:",
        // prompt: 'The following messages are from a contact form for a counselor. Answer `true` if the following message seems like spam or unwanted business promotion. Answer `false` otherwise. \n\nMessage:' + body.message  + '\n\nAnswer: ',
        // // Context: `A website form is getting a lot of spam email from a small, local business. Would you be able to give me a floating point number between 0 and 1 that represents the probability that the following message is spam? The closer to 1, the more likely it is spam. The closer to 0, the less likely it is spam. \n\n failing business and need as much accuracy to avoid false positives.
		// max_tokens: 7,
        max_tokens: process.env.AI_MAX_TOKENS
            ? parseInt(process.env.AI_MAX_TOKENS)
            : 7,
        // top_p: 1,
        // frequency_penalty: 0,
        // presence_penalty: 0,
        // stop: ["\n"],

    })
	.then((response) => {
		return response.data;
	})
	.then((data) => {
		const { choices } = data;
		if (!choices || choices.length === 0) {
			throw new Error('No choices available');
		}
		return choices[0].text;
	})
	.then((text) => {
		// If the AI response contains the word spam, return an error
		const pattern = /\b(spam)\b/i;
		const result = text?.match(pattern);
		if (result) {
			return NextResponse.json(JSON.stringify({error: 'This message seems like spam or unwanted business promotion.', status: 'error', ok: true}), { status: 200 });
		}
	})
	.catch((err) => {

		return NextResponse.json(JSON.stringify({error: 'There was an error with the AI response.', status: 'error', ok: true}), { status: 200 });
	});

	// Successful response
	return NextResponse.json(JSON.stringify({message: 'This message seems legitimate.',  status: 'ok', ok: true}), { status: 200 });

}
