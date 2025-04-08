import VentoCard from "./VentoCard";
import { Link } from "react-router-dom";

const CourseSection = () => {
  return (
    <section className="w-full h-[650px] bg-slate-50" id="courses">
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
          image={"./svg/idiomas.svg"}
          title={"Idiomas"}
          message={
            "Certificaciones Internacionales de Idiomas, preparate para conocer nuevos idiomas."
          }
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
  );
};

export default CourseSection;
