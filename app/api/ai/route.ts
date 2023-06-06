import NextAuth, { NextAuthOptions } from "next-auth";
import { Configuration, OpenAIApi }  from "openai";

const handler = (req, res) => {


      // break the app if the API key is missing
      if (!process.env.OPENAI_API_KEY) {
        return res.status(404).json({
          error: {
            code: 'not_found',
            message:
              "The requested endpoint was not found or doesn't support this method.",
          },
        });
    }

	const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

	const response = openai.Completion.create({
	model="text-davinci-003",
	prompt="Summarize this for a second-grade student:\n\nJupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass one-thousandth that of the Sun, but two-and-a-half times that of all the other planets in the Solar System combined. Jupiter is one of the brightest objects visible to the naked eye in the night sky, and has been known to ancient civilizations since before recorded history. It is named after the Roman god Jupiter.[19] When viewed from Earth, Jupiter can be bright enough for its reflected light to cast visible shadows,[20] and is on average the third-brightest natural object in the night sky after the Moon and Venus.\n\nJupiter is the fifth planet from the Sun and the biggest planet in our Solar System. It is very bright and you can see it in the night sky. It is named after the Roman god Jupiter and people have known about it since ancient times.",
	temperature=0.7,
	max_tokens=256,
	top_p=1,
	frequency_penalty=0,
	presence_penalty=0
	})

	return res.status(200).json(response);


export { handler as GET, handler as POST }
