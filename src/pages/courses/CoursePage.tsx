import { Link } from "react-router-dom";
import { CardCourse } from "../../components/courses";
import { Arrow } from "../../components/icons";

const CoursePage = () => {
  return (
    <section className="w-full px-4 py-8  ">
      <div className="mx-auto  ">
        <div className="flex justify-between items-center">
          <div className="text-2xl px-4  py-2 text-slate-600">
            <h1>
              Cursos Recomendados por{" "}
              <span className="text-blue-700 font-bold">Profesores</span>
            </h1>
          </div>

          <div className="border  text-center rounded-3xl bg-blue-700 text-white transition-all  px-5 py-1">
            <Link
              to={"/courses/search"}
              className="font-bold w-full flex gap-3 items-center justify-center"
            >
              Ver todos los cursos disponibles
              <Arrow />
            </Link>
          </div>
        </div>
        <div className="grid  p-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <CardCourse
            courseId="1"
            image="https://wpengine.com/wp-content/uploads/2021/07/jsheader-1024x535.png"
            level="intermedio"
            shortDescription="Curso de desarrollo web con Javascript"
            title="Javascript Moderno 2025"
          />

          <CardCourse
            courseId="2"
            image="https://wpengine.com/wp-content/uploads/2021/07/jsheader-1024x535.png"
            level="intermedio"
            shortDescription="Curso de desarrollo web con Javascript"
            title="Javascript Moderno 2025"
          />

          <CardCourse
            courseId="3"
            image="https://wpengine.com/wp-content/uploads/2021/07/jsheader-1024x535.png"
            level="intermedio"
            shortDescription="Curso de desarrollo web con Javascript"
            title="Javascript Moderno 2025"
          />

          <CardCourse
            courseId="4"
            image="https://wpengine.com/wp-content/uploads/2021/07/jsheader-1024x535.png"
            level="intermedio"
            shortDescription="Curso de desarrollo web con Javascript"
            title="Javascript Moderno 2025"
          />
        </div>
      </div>

      <div className="mx-auto mt-10  ">
        <div className="flex justify-between items-center">
          <div className="text-3xl px-4  py-2 text-slate-600">
            <h1>
              Cursos de{" "}
              <span className="text-blue-700 font-bold">Desarrollo Web</span>
            </h1>
          </div>

          <div className="border  text-center rounded-3xl bg-blue-700 text-white transition-all  px-5 py-1">
            <Link
              to={"/courses/search"}
              className="font-bold w-full flex gap-3 items-center justify-center"
            >
              Ver cursos
              <Arrow />
            </Link>
          </div>
        </div>
        <div className="grid  p-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <CardCourse
            courseId="1"
            image="https://wpengine.com/wp-content/uploads/2021/07/jsheader-1024x535.png"
            level="intermedio"
            shortDescription="Curso de desarrollo web con Javascript"
            title="Javascript Moderno 2025"
          />

          <CardCourse
            courseId="2"
            image="https://wpengine.com/wp-content/uploads/2021/07/jsheader-1024x535.png"
            level="intermedio"
            shortDescription="Curso de desarrollo web con Javascript"
            title="Javascript Moderno 2025"
          />

          <CardCourse
            courseId="3"
            image="https://wpengine.com/wp-content/uploads/2021/07/jsheader-1024x535.png"
            level="intermedio"
            shortDescription="Curso de desarrollo web con Javascript"
            title="Javascript Moderno 2025"
          />
        </div>
      </div>
    </section>
  );
};

export default CoursePage;
