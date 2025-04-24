import { useState } from "react";
import { CardCourse } from "../../components/courses";
import { Arrow } from "../../components/icons";
import { Pagination } from "flowbite-react";
import { Link } from "react-router-dom";

const FavoritiesPage = () => {
  // Mock data for favorite courses
  const favoriteCourses = [
    {
      courseId: "1",
      image:
        "https://wpengine.com/wp-content/uploads/2021/07/jsheader-1024x535.png",
      level: "intermedio",
      shortDescription: "Curso de desarrollo web con Javascript",
      title: "Javascript Moderno",
    },
    {
      courseId: "2",
      image:
        "https://wpengine.com/wp-content/uploads/2021/07/jsheader-1024x535.png",
      level: "principiante",
      shortDescription: "Aprende los fundamentos de React para crear app webs",
      title: "React desde Cero",
    },
    {
      courseId: "3",
      image:
        "https://wpengine.com/wp-content/uploads/2021/07/jsheader-1024x535.png",
      level: "avanzado",
      shortDescription: "Patrones de diseño en TypeScript",
      title: "TypeScript Profesional",
    },
    {
      courseId: "4",
      image:
        "https://wpengine.com/wp-content/uploads/2021/07/jsheader-1024x535.png",
      level: "intermedio",
      shortDescription: "Desarrollo de APIs con Node.js",
      title: "Node.js Backend Master",
    },
    {
      courseId: "5",
      image:
        "https://wpengine.com/wp-content/uploads/2021/07/jsheader-1024x535.png",
      level: "principiante",
      shortDescription: "Fundamentos de HTML y CSS",
      title: "Frontend Essentials",
    },
    {
      courseId: "6",
      image:
        "https://wpengine.com/wp-content/uploads/2021/07/jsheader-1024x535.png",
      level: "avanzado",
      shortDescription: "GraphQL para aplicaciones modernas",
      title: "GraphQL Avanzado",
    },
    {
      courseId: "7",
      image:
        "https://wpengine.com/wp-content/uploads/2021/07/jsheader-1024x535.png",
      level: "intermedio",
      shortDescription: "Testing en aplicaciones JavaScript",
      title: "Testing Profesional",
    },
    {
      courseId: "8",
      image:
        "https://wpengine.com/wp-content/uploads/2021/07/jsheader-1024x535.png",
      level: "principiante",
      shortDescription: "Introducción a bases de datos",
      title: "SQL para Desarrolladores",
    },
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 4;

  // Calculate current courses to display
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = favoriteCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  return (
    <section className="w-full px-4 py-8">
      <div className="mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="text-3xl px-4 py-2 text-slate-600">
            <h1>
              Tus{" "}
              <span className="text-blue-700 font-bold">Cursos Favoritos</span>
            </h1>
          </div>

          <div className="border text-center rounded-3xl bg-blue-700 text-white transition-all px-5 py-1">
            <Link
              to={"/courses/search"}
              className="font-bold w-full flex gap-3 items-center justify-center"
            >
              Explorar más cursos
              <Arrow />
            </Link>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid p-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentCourses.map((course) => (
            <CardCourse
              key={course.courseId}
              courseId={course.courseId}
              image={course.image}
              level={course.level}
              shortDescription={course.shortDescription}
              title={course.title}
            />
          ))}
        </div>

        {/* Pagination */}
        {favoriteCourses.length > coursesPerPage && (
          <div className="flex justify-center mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(favoriteCourses.length / coursesPerPage)}
              onPageChange={setCurrentPage}
              showIcons
              previousLabel="Anterior"
              nextLabel="Siguiente"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default FavoritiesPage;
