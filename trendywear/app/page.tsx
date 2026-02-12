import Hero from "@/components/home/Hero";
import Collections from "@/components/home/Collections";
import WomensWear from "@/components/home/WomensWear";
import MensWear from "@/components/home/MensWear";

export default function Home() {
  return (
    <main>
      <Hero />  
      <Collections />
      <WomensWear />
      <MensWear />
    </main>
  );
}
