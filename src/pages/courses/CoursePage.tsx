import { Link } from "react-router-dom";
import { CardCourse } from "../../components/courses";
import { Arrow } from "../../components/icons";
import { useEffect, useState } from "react";
import { courseServices } from "../../services/course.services";

const CoursePage = () => {
  const [recommendedCourses, setRecommendedCourses] = useState<[]>([]);
  // const [webDevCourses, setWebDevCourses] = useState<[]>([]);
  const [loading, setLoading] = useState({
    recommended: true,
    webDev: true,
  });
  const [error, setError] = useState({
    recommended: null,
    webDev: null,
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Obtener cursos recomendados
        const recommendedResponse = await courseServices.getCoursesByPage({
          page: 1,
          pageSize: 4,
        });
        console.log(recommendedResponse.data);
        setRecommendedCourses(recommendedResponse.data);
      } catch (err) {
        setError({
          recommended: err,
          // webDev: err,
        });
      } finally {
        setLoading({
          recommended: false,
          webDev: false,
        });
      }
    };

    fetchCourses();
  }, []);

  if (loading.recommended || loading.webDev) {
    return (
      <div className="w-full px-4 py-8 text-center">
        <p>Cargando cursos...</p>
      </div>
    );
  }

  if (error.recommended || error.webDev) {
    return (
      <div className="w-full px-4 py-8 text-center text-red-500">
        <p>Error al cargar los cursos. Por favor intenta nuevamente.</p>
      </div>
    );
  }

  return (
    <section className="w-full px-4 py-8">
      <div className="mx-auto">
        {/* Sección de cursos recomendados */}
        <div className="flex justify-between items-center">
          <div className="text-2xl px-4 py-2 text-slate-600">
            <h1>
              Cursos Recomendados por{" "}
              <span className="text-blue-700 font-bold">Profesores</span>
            </h1>
          </div>

          <div className="border text-center rounded-3xl bg-blue-700 text-white transition-all px-5 py-1">
            <Link
              to={"/courses/search"}
              className="font-bold w-full flex gap-3 items-center justify-center"
            >
              Ver todos los cursos disponibles
              <Arrow />
            </Link>
          </div>
        </div>

        <div className="grid p-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recommendedCourses.map((course) => (
            <CardCourse
              key={course.documentId}
              courseId={course.documentId}
              image={
                course.Banner ||
                "https://wpengine.com/wp-content/uploads/2021/07/jsheader-1024x535.png"
              }
              level={course.Level}
              shortDescription={
                course.ShortDescription || "Descripción no disponible"
              }
              title={course.Title}
            />
          ))}
        </div>

        {/* Sección de cursos de desarrollo web */}
        {/* <div className="mx-auto mt-10">
          <div className="flex justify-between items-center">
            <div className="text-3xl px-4 py-2 text-slate-600">
              <h1>
                Cursos de{" "}
                <span className="text-blue-700 font-bold">Desarrollo Web</span>
              </h1>
            </div>

            <div className="border text-center rounded-3xl bg-blue-700 text-white transition-all px-5 py-1">
              <Link
                to="/courses/search?category=Desarrollo+Web"
                className="font-bold w-full flex gap-3 items-center justify-center"
              >
                Ver cursos
                <Arrow />
              </Link>
            </div>
          </div>

          <div className="grid p-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"></div>
        </div> */}
      </div>
    </section>
  );
};

export default CoursePage;
