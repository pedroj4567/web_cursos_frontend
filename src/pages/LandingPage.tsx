import {
  CounterSection,
  Hero,
  Nav,
  CourseSection,
  Footer,
  AboutSection,
} from "../components/landing";

const LandingPage = () => {
  return (
    <main className="h-screen">
      <Nav />
      <Hero />
      <CounterSection />
      <AboutSection />
      <CourseSection />
      <Footer />
    </main>
  );
};

export default LandingPage;
