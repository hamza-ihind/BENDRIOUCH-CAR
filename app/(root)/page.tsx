import Hero from "@/components/home/hero";
import Features from "@/components/home/features";
import Contact from "@/components/home/contact";
import Approche from "@/components/home/approach";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Hero />
      <Features />
      <Approche />
      <Contact />
    </div>
  );
}
