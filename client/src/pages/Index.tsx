import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeBand from "@/components/MarqueeBand";
import About from "@/components/About";
import Services from "@/components/Services";
import AgriBand from "@/components/AgriBand";
import Tech from "@/components/Tech";
import Impact from "@/components/Impact";
import Channels from "@/components/Channels";
import Stories from "@/components/Stories";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";
import s from "./Index.module.scss";
import { HomepageHelmet } from "@/helmet";

const Index = () => (
  <div className={s.page}>
    <HomepageHelmet/>
    <Hero />
    <MarqueeBand />
    <About />
    <Services />
    <AgriBand />
    <Tech />
    <Impact />
    <Channels />
    <Stories />
    <Partners />
  </div>
);

export default Index;
