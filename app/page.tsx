import Card from "@/components/home/card";
import { DEPLOY_URL } from "@/lib/constants";
import { Github, Twitter } from "@/components/shared/icons";
import Image from "next/image";
import { nFormatter } from "@/lib/utils";
import ImageOrGif from "@/components/home/imageOrGif";

export default async function Home() {
  const { stargazers_count: stars } = await fetch(
    "https://api.github.com/repos/steven-tey/precedent",
    {
      ...(process.env.GITHUB_OAUTH_TOKEN && {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_OAUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
      }),
      // data will revalidate every 24 hours
      next: { revalidate: 86400 },
    },
  )
    .then((res) => res.json())
    .catch((e) => console.log(e));

  return (
    <>
      <div className="z-10 w-full max-w-xl px-5 xl:px-0">
        
        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          xyd is me 🧑🏻‍💻
        </h1>
        <p
          className="mt-6 animate-fade-up text-center text-gray-500 opacity-0 [text-wrap:balance] md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          An opinionated collection of nonsenses or...truth👀
        </p>
      </div>
      <div className="my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
        {features.map(({ title, description, demo, large }, index) => (
          <Card
            key={title}
            title={title}
            description={description}
            demo={index === 0 ? <ImageOrGif src="/profilePic.png" alt="Profile Picture" /> : demo}
            large={large}
            isFirstCard={index === 0} // Only true for the first card
          />
        ))}
      </div>
    </>
  );
}

const features = [
  {
    title: "🎊You landed in my GUI site now... congrats!🎊",
    description:
      
      "💁🏻‍♂️ About me: enterprenuer and builder, from data scientist to CTO advisor, have led large global coporate project for emerging tech, now turned myself into a web3 builder⚒️\n\n" +
      "👷 Project in build: CEO of MobiFi, web3 travel platform for digital nomad.\n\n" + 
      "📖 Learning: web3 development, solidity and Spanish🇪🇸\n\n"+
      "🧑🏻‍💻 Fun fact: I am not a developer, but I love writing code",
    
      large: true,
    demo: <ImageOrGif src="/profilePic.png" alt="Profile Picture" />,
    isFirstCard: true
  },
  {
    title: "All the links 🔗",
    description:
      "My fav link management app, all links in one place! \n\n" +
      "➡️Follow me on [Linktree](https://linktr.ee/yudixu)",
    demo: <ImageOrGif src="/followme.gif" alt="follow me" />,
  },
  {
    title: "I sometimes do 🎥",
    description:
      "My hobby to record my life of learning on [YouTube](https://www.youtube.com/channel/UCtv3XlsuLGfEuSYY-Re2yFg)... subscribe, like and comment🤝",
    demo: <ImageOrGif src="/recording.gif" alt="recoding" />,
  },
  {
    title: "5 Things to watch today",
    description:
      "AI generated headlines on topics of tech and finance everyday, coming soon...",
    demo: <ImageOrGif src="workinginprogress.gif" alt="working in progress" />,
    large: true
  },
  {
    title: "I can code it",
    description:
      "I suck at writing code, but I keep on building🤣. Give me a ⭐️ on [GitHub](https://github.com/xyd945)",
    demo: <ImageOrGif src="/code.gif" alt="coding" />,
  },

  {
    title: "Books I am reding",
    description:
      "Reading a book helps my brian gets smarter 🧠✨",
    demo: <ImageOrGif src="book.gif" alt="working in progress" />,
  },
];
