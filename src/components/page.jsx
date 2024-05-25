import { motion } from "framer-motion";
import AdSense from "./AdSense";
import Head from "next/head";

export default function Page({ children, duration }) {
  return (
    <>
      <Head>
        <title>Dictionary App - Find Definitions and Synonyms</title>
        <meta
          name="description"
          content="A comprehensive dictionary app to find definitions, synonyms, translations, and more."
        />
        <meta
          name="keywords"
          content="dictionary, definitions, synonyms, translations, words"
        />
        <meta name="author" content="Aviral Shastri" />
        <meta
          property="og:title"
          content="Dictionary App - Find Definitions and Synonyms"
        />
        <meta
          property="og:description"
          content="Find definitions, synonyms, translations, and more with our comprehensive dictionary app."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://dictionary-alpha-liard.vercel.app//"
        />
        <meta
          property="og:image"
          content="https://dictionary-alpha-liard.vercel.app/LogoLarge.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Dictionary App - Find Definitions and Synonyms"
        />
        <meta
          name="twitter:description"
          content="A comprehensive dictionary app to find definitions, synonyms, translations, and more."
        />
        <AdSense />
      </Head>
      <motion.main
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: duration }}
      >
        {children}
      </motion.main>
    </>
  );
}
