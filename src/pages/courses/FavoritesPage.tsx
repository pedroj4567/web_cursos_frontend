import { useEffect, useState } from "react";
import { CardCourse } from "../../components/courses";
import { Arrow } from "../../components/icons";
import { Pagination } from "flowbite-react";
import { Link } from "react-router-dom";
import { AuthService } from "../../services";

const FavoritiesPage = () => {
  const [favoriteCourses, setFavoriteCourses] = useState<[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const coursesPerPage = 4;

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setIsLoading(true);
        const user = await AuthService.getUserInSession();
        setFavoriteCourses(user.favoritesCourse || []);
      } catch (error) {
        setFavoriteCourses([]);
      } finally {
        setIsLoading(false);
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

  if (isLoading) {
    return (
      <section className="w-full px-4 py-8">
        <div className="mx-auto text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-700 mb-4"></div>
          <p className="text-lg text-slate-600">Cargando tus favoritos...</p>
        </div>
      </section>
    );
  }

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
        </div>

        {/* Empty State */}
        {favoriteCourses.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <div className="mx-auto max-w-md">
              <svg
                className="mx-auto h-24 w-24 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <h3 className="mt-4 text-xl font-medium text-gray-900">
                No tienes cursos favoritos aún
              </h3>
              <p className="mt-2 text-gray-600">
                Guarda tus cursos favoritos haciendo clic en el corazón cuando
                explores nuestros cursos.
              </p>
              <div className="mt-6">
                <Link
                  to="/courses/search"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                >
                  <svg
                    className="-ml-1 mr-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  Explorar cursos
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Courses Grid */}
        {favoriteCourses.length > 0 && (
          <>
            <div className="grid p-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentCourses.map((course) => (
                <CardCourse
                  key={course.documentId}
                  courseId={course.documentId}
                  image={course.Banner}
                  level={course.Level}
                  shortDescription={
                    course.ShortDescription || course.description
                  }
                  title={course.Title}
                />
              ))}
            </div>

            {/* Pagination */}
            {favoriteCourses.length > coursesPerPage && (
              <div className="flex justify-center mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(
                    favoriteCourses.length / coursesPerPage
                  )}
                  onPageChange={setCurrentPage}
                  showIcons
                  previousLabel="Anterior"
                  nextLabel="Siguiente"
                />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default FavoritiesPage;
