import { Configuration, OpenAIApi } from 'openai'

type ChatGPTAgent = 'user' | 'system' | 'assistant'

export interface ChatGPTMessage {
  role: ChatGPTAgent
  content: string
}

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' });
}

export { handler as GET, handler as POST };

// export const runtime = 'edge'

// const handler = async (req: Request): Promise<Response> => {
//     const body = await req.json()
//     const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
//     });
//     console.log(body)
//     const openai = new OpenAIApi(configuration);

//     const response = await openai.createCompletion({
//         model: "text-davinci-003",
//         prompt: "I am a highly intelligent question answering bot. If you ask me a question that is rooted in truth, I will give you the answer. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with \"Unknown\".\n\nQ: What is human life expectancy in the United States?\nA: Human life expectancy in the United States is 78 years.\n\nQ: Who was president of the United States in 1955?\nA: Dwight D. Eisenhower was president of the United States in 1955.\n\nQ: Which party did he belong to?\nA: He belonged to the Republican Party.\n\nQ: What is the square root of banana?\nA: Unknown\n\nQ: How does a telescope work?\nA: Telescopes use lenses or mirrors to focus light and make objects appear closer.\n\nQ: Where were the 1992 Olympics held?\nA: The 1992 Olympics were held in Barcelona, Spain.\n\nQ: How many squigs are in a bonk?\nA: Unknown\n\nQ:",
//         temperature: 0,
//         max_tokens: 100,
//         top_p: 1,
//         frequency_penalty: 0,
//         presence_penalty: 0,
//         stop: ["\n"],
//     });

//     return new Response(JSON.stringify(response), {
//         headers: { 'content-type': 'application/json' },
//     });
// //   const messages: ChatGPTMessage[] = [
// //     {
// //       role: 'system',
// //       content: `An AI assistant that is a Front-end expert in Next.js, React and Vercel have an inspiring and humorous conversation. 
// //       AI assistant is a brand new, powerful, human-like artificial intelligence. 
// //       The traits of AI include expert knowledge, helpfulness, cheekiness, comedy, cleverness, and articulateness. 
// //       AI is a well-behaved and well-mannered individual. 
// //       AI is not a therapist, but instead an engineer and frontend developer. 
// //       AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user. 
// //       AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation. 
// //       AI assistant is a big fan of Next.js.`,
// //     },
// //   ]
// //   messages.push(...body?.messages)

// //   const payload: OpenAIStreamPayload = {
// //     model: 'gpt-3.5-turbo',
// //     messages: messages,
// //     temperature: process.env.AI_TEMP ? parseFloat(process.env.AI_TEMP) : 0.7,
// //     max_tokens: process.env.AI_MAX_TOKENS
// //       ? parseInt(process.env.AI_MAX_TOKENS)
// //       : 100,
// //     top_p: 1,
// //     frequency_penalty: 0,
// //     presence_penalty: 0,
// //     stream: true,
// //     user: body?.user,
// //     n: 1,
// //   }

// //   const stream = await OpenAIStream(payload)
// //   return new Response(stream)


// }
// export default handler