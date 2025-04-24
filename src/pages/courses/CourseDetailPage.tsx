import { useState } from "react";
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
  HiOutlineCalendar,
  HiExternalLink,
} from "react-icons/hi";
import { Link, useParams } from "react-router-dom";

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
  const { courseId } = useParams<{ courseId: string }>();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error] = useState<string | null>(null);
  console.log(courseId);

  // Datos simulados del curso
  const course: Course = {
    id: "1",
    title: "JavaScript Moderno 2024",
    instructor: "Juan Pérez",
    description: "Aprende JavaScript desde cero hasta temas avanzados",
    longDescription:
      "Este curso te llevará desde los fundamentos de JavaScript hasta conceptos avanzados como closures, promises, async/await y programación funcional. Aprenderás mediante proyectos prácticos y ejercicios interactivos.",
    category: "Programación",
    level: "Intermedio",
    rating: 4.7,
    students: 1250,
    duration: "8 semanas",
    lastUpdated: "Enero 2024",
    image:
      "https://wpengine.com/wp-content/uploads/2021/07/jsheader-1024x535.png",
    youtubeUrl: "https://www.youtube.com/watch?v=ejBkOjEG6F0",
    syllabus: [
      "Introducción a JavaScript",
      "Variables y tipos de datos",
      "Funciones y scope",
      "Manipulación del DOM",
      "Eventos",
      "ES6+ Features",
      "Async/Await",
      "Proyecto final",
    ],
    requirements: [
      "Conocimientos básicos de HTML",
      "Computadora con navegador moderno",
      "Editor de código (VS Code recomendado)",
    ],
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const enrollCourse = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      window.open(course.youtubeUrl, "_blank");
    }, 1000);
  };

  const renderRatingStars = () => {
    const stars = [];
    const fullStars = Math.floor(course.rating);
    const hasHalfStar = course.rating % 1 >= 0.5;

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
        >
          {isFavorite ? (
            <HiHeart className="text-red-500 text-xl" />
          ) : (
            <HiOutlineHeart className="text-xl" />
          )}
        </Button>
      </div>
      {}
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
              {course.rating.toFixed(1)}
            </span>
          </Rating>
          <span className="text-gray-500">
            {course.students.toLocaleString()} estudiantes
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Contenido principal */}
        <div className="lg:w-2/3">
          <Card className="mb-6">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />

            <h2 className="text-2xl font-bold mb-4">Descripción del curso</h2>
            <p className="text-gray-700 mb-6">{course.longDescription}</p>

            <h3 className="text-xl font-bold mb-3">Lo que aprenderás</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
              {course.syllabus.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-bold mb-3">Requisitos</h3>
            <ul className="mb-6">
              {course.requirements.map((item, index) => (
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
                <span>{course.instructor}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-semibold">Nivel:</span>
                <Badge
                  color={
                    course.level === "Principiante"
                      ? "success"
                      : course.level === "Intermedio"
                      ? "warning"
                      : "failure"
                  }
                >
                  {course.level}
                </Badge>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-semibold">Duración:</span>
                <span className="flex items-center">
                  <HiOutlineClock className="mr-1" /> {course.duration}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-semibold">Actualizado:</span>
                <span className="flex items-center">
                  <HiOutlineCalendar className="mr-1" /> {course.lastUpdated}
                </span>
              </div>
            </div>

            <Button
              color="blue"
              size="lg"
              className="w-full mb-4"
              onClick={enrollCourse}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Cargando...
                </>
              ) : (
                <>
                  <HiOutlineBookOpen className="mr-2" />
                  Ver Curso en YouTube
                </>
              )}
            </Button>

            <Button
              color="light"
              size="lg"
              className="w-full"
              onClick={() => window.open(course.youtubeUrl, "_blank")}
            >
              <HiExternalLink className="mr-2" />
              Abrir en YouTube
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
