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

    const response = await openai.createCompletion({
        // model: 'gpt-3.5-turbo',
        // model: "text-moderation-latest",
        model: "text-davinci-003",
        prompt: "Respond with `true` if you believe the message to be legitimate business correspondance or `false` if the message seems like a scam or promotion.",
        prompt:  'USER: Answer the question based on the context below. Keep the answer short and concise. Respond "Unsure about answer" if not sure about the answer.'
        // Context: `A website form is getting a lot of spam email from a small, local business. Would you be able to give me a floating point number between 0 and 1 that represents the probability that the following message is spam? The closer to 1, the more likely it is spam. The closer to 0, the less likely it is spam. \n\n failing business and need as much accuracy to avoid false positives. 
        // Here is the Message: ' + body.message + '\n\nAnswer:,
        // Question: `Does this message seem legitimate or like suspicuious spam. It was submitted via a homemade php contact form`?
        prompt: "The following messages are from a contact form for a counselor. Answer `true` if the following message seems like spam or unwanted business promotion. Answer `false` otherwise. \n\nMessage:' + body.message  + '\n\nAnswer: ',
        temperature: process.env.AI_TEMP ? parseFloat(process.env.AI_TEMP) : 0.3,
        max_tokens: process.env.AI_MAX_TOKENS
            ? parseInt(process.env.AI_MAX_TOKENS)
            : 100,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ["\n"],
    });

    const data = response.data.choices[0].text;
    // console.log(data)
    return NextResponse.json(JSON.stringify({message: data}), { status: 200 });
        
}