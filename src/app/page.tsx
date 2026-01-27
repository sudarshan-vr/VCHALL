import { Metadata } from "next";
import Contact from "./components/home/contact";
import HeroSection from "./components/home/hero";
import Gallery from "./components/home/gallery";
import Services from "./components/home/services";
import StatsFacts from "./components/home/stats-facts";
import Testimonial from "./components/home/testimonial";

export const metadata: Metadata = {
    title: "Vijayalakshmi Convention Hall",
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsFacts/>
      <Services/>
      <Gallery/>
      <Testimonial/>
      <Contact contactdataNumber="10"/>
    </>
  );
}
