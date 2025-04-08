import { Link } from "react-router-dom";
import { CounterSection, Hero, Nav } from "../components/landing";
import VentoCard from "../components/landing/VentoCard";

const LandingPage = () => {
  return (
    <main className="bg-red-[#F1EFEC] h-screen">
      <Nav />
      <Hero />
      <CounterSection />

      <section className="w-full h-[650px]">
        <div className="grid grid-cols-3 p-3 gap-5 grid-rows-2 w-3/4 mx-auto h-full py-10">
          <VentoCard primary={true}>
            <div className="  mx-5 py-5 rounded-2xl h-full flex flex-col justify-evenly">
              <div className="px-5">
                <p className="text-4xl text-white font-bold ">
                  Explora programas que transformarán tus habilidades
                </p>
              </div>
              <div className="ml-3">
                <Link
                  to={"/auth/login"}
                  className="text-white font-bold border px-10 py-3 rounded-xl hover:bg-white/30 text-lg  transition-all"
                >
                  Ver los cursos
                </Link>
              </div>
            </div>
          </VentoCard>
          <VentoCard
            image={"./svg/web.svg"}
            title={"Desarrollo Web"}
            message={"Conviértete en experto en crear aplicaciones moderna."}
          />
          <VentoCard
            image={"./svg/mobile.svg"}
            title={"Desarrollo Movil"}
            message={"Construye apps nativas e híbridas profesionales."}
          />
          <VentoCard
            image={"./svg/hacker.svg"}
            title={"Seguridad Informatica"}
            message={"Protege sistemas y datos contra amenazas digitales."}
          />
          <VentoCard
            image={"./svg/ia.svg"}
            title={"Inteligencia Artificial"}
            message={
              "Aprende a implementar soluciones con IA con proyectos profesionales."
            }
          />
        </div>
      </section>

      <footer className="h-20 bg-[#074699] flex justify-center items-center">
        <div className="text-white text-lg font-bold">
          <h3>Derechos Reservados - 2023</h3>
        </div>
      </footer>
    </main>
  );
};

export default LandingPage;
