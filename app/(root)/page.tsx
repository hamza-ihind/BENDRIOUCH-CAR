import Hero from "@/components/home/hero";
import Features from "@/components/home/features";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Hero />
      <Features />
    </div>
  );
}
