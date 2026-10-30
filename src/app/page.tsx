import Header from "./Header";
import Hero from "./Hero";
import About from "./About";
import VoiceAI from "./VoiceAI";
import AISystems from "./AISystems";
import Footer from "./Footer";
import { Stack, Reviews, Websites } from "./Extras";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <VoiceAI />
      <AISystems />
      <Stack />
      <Reviews />
      <Websites />
      <Footer />
    </main>
  );
}
