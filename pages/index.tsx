import Card from "@/components/home/Card";
import Layout from "@/components/layout";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import WebVitals from "@/components/home/WebVitals";
import SearchBox from "@/components/home/SearchBox";
import Image from "next/image";

export default function Home() {
  return (
    <Layout>
      <motion.div
        className="w-full px-5 xl:px-0"
        initial="hidden"
        whileInView="show"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <motion.h1
          className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem]"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer>
            <Image
              alt="HODL.ar logo"
              src="/hodl-logo.png"
              width={500}
              height={200}
            />
          </Balancer>
        </motion.h1>
        <motion.p
          className="mt-6 text-center text-gray-500 md:text-xl"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer>El subdominio del bitcoiner argentino.</Balancer>
        </motion.p>
      </motion.div>

      {/* here we are animating with Tailwind instead of Framer Motion because Framer Motion messes up the z-index for child components */}

      <div className="my-10 grid w-full max-w-screen-xl animate-[slide-down-fade_0.5s_ease-in-out] grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
        <Card
          key={"Registrá tu subdominio"}
          title={"Registrá tu subdominio"}
          description={"Hacé la busqueda para ver si está disponible"}
          demo={<SearchBox />}
          large={true}
        />
        {features.map(({ title, description, demo }) => (
          <Card
            key={title}
            title={title}
            description={description}
            demo={demo}
            large={false}
          />
        ))}
      </div>
    </Layout>
  );
}

const features = [
  {
    title: "Subdominios creados",
    description: "Tienen su página que termina con hodl.ar",
    demo: <WebVitals />,
  },
  {
    title: "Copiá el código",
    description: "Generá tu propio repositorio de código en Github",
    demo: (
      <div>
        <a href={"https://github.com/lacrypta/links/fork"}>Forkear Repo</a>
        <Image
          alt="Github logo"
          src="/github-logo.png"
          width={200}
          height={200}
        />
      </div>
    ),
  },
  {
    title: "Configuralo en Netlify",
    description: "Create un cuenta en [Netlify](https://www.netlify.com/)",
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <Image
          alt="Netlify logo"
          src="/netlify-logo.png"
          width={200}
          height={200}
        />
      </div>
    ),
  },
  {
    title: "Registrá tu subdominio",
    description: "Reclamá GRATIS tu dirección ÚNICA",
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <b>TuNombre</b>.HODL.ar
      </div>
    ),
  },
];
