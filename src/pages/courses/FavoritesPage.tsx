import { useEffect, useState } from "react";
import { CardCourse } from "../../components/courses";
import { Arrow } from "../../components/icons";
import { Pagination } from "flowbite-react";
import { Link } from "react-router-dom";
import { AuthService } from "../../services";

const FavoritiesPage = () => {
  const [favoriteCourses, setFavoriteCourses] = useState<[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 4;

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const user = await AuthService.getUserInSession();
        console.log(user);
        setFavoriteCourses(user.favoritesCourse || []);
      } catch (error) {
        setFavoriteCourses([]);
      }
    };
    fetchFavorites();
  }, []);

  // Pagination logic
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
              key={course.documentId}
              courseId={course.id}
              image={course.Banner}
              level={course.Level}
              shortDescription={course.ShortDescription || course.description}
              title={course.Title}
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
