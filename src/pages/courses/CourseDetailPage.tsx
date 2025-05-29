import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Badge,
  Rating,
  RatingStar,
  Spinner,
  Alert,
} from "flowbite-react";
import {
  HiHeart,
  HiOutlineHeart,
  HiArrowLeft,
  HiOutlineBookOpen,
  HiOutlineClock,
} from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
import { courseServices } from "../../services/course.services";
import { AuthService } from "../../services";

type Course = {
  id: string;
  title: string;
  instructor: string;
  description: string;
  longDescription: string;
  category: string;
  level: "Principiante" | "Intermedio" | "Avanzado";
  rating: number;
  students: number;
  duration: string;
  lastUpdated: string;
  image: string;
  youtubeUrl: string;
  syllabus: string[];
  requirements: string[];
};

const CourseDetailPage = () => {
  const { id: courseId } = useParams<{ id: string }>();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [favLoading, setFavLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [userId, setUserId] = useState();
  useEffect(() => {
    if (courseId) {
      const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const { data } = await courseServices.getCourseById(courseId);
          setCourse(data);

          // Obtener favoritos del usuario para verificar si este curso está marcado
          const user = await AuthService.getUserInSession();
          setUserId(user.id);

          const isFav = user.favoritesCourse.some(
            (favCourse: Course) => favCourse.id === data.id
          );

          setIsFavorite(isFav);
        } catch (error) {
          console.error(error);
          setError("No se pudo cargar el curso.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [courseId, userId!]);

  const toggleFavorite = async () => {
    if (!course) return;
    setFavLoading(true);
    try {
      if (isFavorite) {
        await courseServices.removeFavoriteCourse(userId!, course.id);
      } else {
        await courseServices.addFavoriteCourse(userId!, course.id);
      }
      // ¡Vuelve a obtener el usuario actualizado!
      const updatedUser = await AuthService.getUserInSession();
      const isFav = updatedUser.favoritesCourse.some(
        (favCourse: Course) => favCourse.id === course.id
      );
      setIsFavorite(isFav);
    } catch (error) {
      console.error("Error actualizando favoritos:", error);
    } finally {
      setFavLoading(false);
    }
  };

  const enrollCourse = () => {
    if (!course) return;
    window.open(course.VideoUrl, "_blank");
  };

  const renderRatingStars = () => {
    if (!course) return null;
    const stars = [];
    const fullStars = Math.floor(course.Rating);
    const hasHalfStar = course.Rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<RatingStar key={i} filled />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<RatingStar key={i} filled={false} />);
      } else {
        stars.push(<RatingStar key={i} filled={false} />);
      }
    }
    return stars;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert color="failure">{error}</Alert>
        <Link to="/courses" className="inline-block mt-4">
          <Button color="gray">
            <HiArrowLeft className="mr-2" />
            Volver a los cursos
          </Button>
        </Link>
      </div>
    );
  }

  if (!course) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header con botón de volver */}
      <div className="flex justify-between items-center mb-6">
        <Link to="/courses">
          <Button color="gray">
            <HiArrowLeft className="mr-2" />
            Volver a cursos
          </Button>
        </Link>
        <Button
          color="light"
          onClick={toggleFavorite}
          aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
          disabled={favLoading}
        >
          {favLoading ? (
            <Spinner size="sm" />
          ) : isFavorite ? (
            <HiHeart className="text-red-500 text-xl" />
          ) : (
            <HiOutlineHeart className="text-xl" />
          )}
        </Button>
      </div>

      {/* Título y descripción */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {course.title}
        </h1>
        <p className="text-xl text-gray-600 mb-4">{course.description}</p>
        <div className="flex items-center space-x-4">
          <Rating>
            {renderRatingStars()}
            <span className="ml-2 text-gray-500">
              {course.Rating.toFixed(1)}
            </span>
          </Rating>
          {/* <span className="text-gray-500">
            {course.students.toLocaleString()} estudiantes
          </span> */}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Contenido principal */}
        <div className="lg:w-2/3">
          <Card className="mb-6">
            <img
              src={course.Banner}
              alt={course.Title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <h2 className="text-2xl font-bold mb-4">Descripción del curso</h2>
            <p className="text-gray-700 mb-6">{course.Description}</p>

            <h3 className="text-xl font-bold mb-3">Lo que aprenderás</h3>
            {/* <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
              {course.syllabus.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul> */}

            <h3 className="text-xl font-bold mb-3">Requisitos</h3>
            <ul className="mb-6">
              {course.Topics.requirements.map((item, index) => (
                <li key={index} className="flex items-start mb-2">
                  <span className="text-gray-500 mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/3">
          <Card className="sticky top-8">
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Instructor:</span>
                <span>{course.Profesor}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Nivel:</span>
                <Badge
                  color={
                    course.Level === "Principiante"
                      ? "success"
                      : course.Level === "Intermedio"
                      ? "warning"
                      : "failure"
                  }
                >
                  {course.Level}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Duración:</span>
                <span className="flex items-center">
                  <HiOutlineClock className="mr-1" /> {course.Duration} Semanas
                </span>
              </div>
              {/* <div className="flex justify-between items-center">
                {/* <span className="font-semibold">Actualizado:</span> */}
              {/* <span className="flex items-center">
                  <HiOutlineCalendar className="mr-1" /> {course.lastUpdated}
                </span> */}
              {/* </div> */}
            </div>
            <Button
              color="blue"
              size="lg"
              className="w-full"
              onClick={enrollCourse}
            >
              <HiOutlineBookOpen className="mr-2" />
              Ver Curso en YouTube
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
