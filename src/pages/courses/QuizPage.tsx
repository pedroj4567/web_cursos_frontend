import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, Spinner, Alert } from "flowbite-react";
import { HiArrowLeft, HiCheck, HiX } from "react-icons/hi";
import ReactPlayer from "react-player";
import { courseServices } from "../../services/course.services";

const CursoQuizPage = () => {
  const { id: documentId } = useParams<{ documentId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [courseData, setCourseData] = useState<{
    videoIntroductorio: string;
    quizzes: {
      id: string;
      title: string;
      value: "YES" | "NO";
    }[];
  } | null>(null);
  const [videoWatched, setVideoWatched] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{
    [key: string]: "YES" | "NO" | null;
  }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const { data } = await courseServices.getCourseById(documentId!);
        console.log(data);
        setCourseData({
          videoIntroductorio: data.videoIntroductorio,
          quizzes: data.quizzes,
        });

        // Inicializar respuestas
        const initialAnswers: { [key: string]: "YES" | "NO" | null } = {};
        data.quizzes.forEach((quiz: any) => {
          initialAnswers[quiz.id] = null;
        });
        setUserAnswers(initialAnswers);
      } catch (err) {
        setError("Error al cargar el quiz");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (documentId) {
      fetchCourseData();
    }
  }, [documentId]);

  const handleVideoEnd = () => {
    setVideoWatched(true);
  };

  const handleAnswerSelect = (questionId: string, answer: "YES" | "NO") => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (courseData?.quizzes.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = () => {
    if (!courseData) return;

    // Calcular puntaje
    let correctAnswers = 0;
    courseData.quizzes.forEach((quiz) => {
      if (userAnswers[quiz.id] === quiz.value) {
        correctAnswers++;
      }
    });

    setScore(correctAnswers);
    setQuizSubmitted(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Alert color="failure">{error}</Alert>
        <Button color="gray" className="mt-4" onClick={() => navigate(-1)}>
          <HiArrowLeft className="mr-2" />
          Volver al curso
        </Button>
      </div>
    );
  }

  if (!courseData) return null;

  const currentQuestion = courseData.quizzes[currentQuestionIndex];

  return (
    <div className="container mx-auto p-4">
      <Button color="gray" className="mb-6" onClick={() => navigate(-1)}>
        <HiArrowLeft className="mr-2" />
        Volver al curso
      </Button>

      {!videoWatched ? (
        <Card className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Video Introductorio</h2>
          <div className="aspect-w-16 aspect-h-9 mb-4">
            <ReactPlayer
              url={courseData.videoIntroductorio}
              width="100%"
              height="100%"
              controls
              onEnded={handleVideoEnd}
            />
          </div>
          <Button color="blue" onClick={handleVideoEnd}>
            Continuar al Quiz
          </Button>
        </Card>
      ) : quizSubmitted ? (
        <Card className="max-w-2xl mx-auto">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Resultados del Quiz</h3>
            <p className="text-lg mb-6">
              Obtuviste {score} de {courseData.quizzes.length} respuestas
              correctas
            </p>
            {score === courseData.quizzes.length ? (
              <div className="text-green-500 flex flex-col items-center">
                <HiCheck className="text-5xl mb-4" />
                <p className="text-xl font-semibold">
                  ¡Felicidades! Pasaste el quiz.
                </p>
              </div>
            ) : (
              <div className="text-red-500 flex flex-col items-center">
                <HiX className="text-5xl mb-4" />
                <p className="text-xl font-semibold">
                  No alcanzaste el puntaje requerido.
                </p>
              </div>
            )}
            <Button color="blue" className="mt-6" onClick={() => navigate(-1)}>
              Volver al curso
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="max-w-2xl mx-auto">
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">
              Pregunta {currentQuestionIndex + 1} de {courseData.quizzes.length}
            </h3>
            <p className="text-lg">{currentQuestion.title}</p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center">
              <input
                type="radio"
                id="yes-answer"
                checked={userAnswers[currentQuestion.id] === "YES"}
                onChange={() => handleAnswerSelect(currentQuestion.id, "YES")}
                className="mr-2"
              />
              <label htmlFor="yes-answer">Sí</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="no-answer"
                checked={userAnswers[currentQuestion.id] === "NO"}
                onChange={() => handleAnswerSelect(currentQuestion.id, "NO")}
                className="mr-2"
              />
              <label htmlFor="no-answer">No</label>
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              color="gray"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Anterior
            </Button>

            {currentQuestionIndex < courseData.quizzes.length - 1 ? (
              <Button
                color="blue"
                onClick={handleNextQuestion}
                disabled={userAnswers[currentQuestion.id] === null}
              >
                Siguiente
              </Button>
            ) : (
              <Button
                color="green"
                onClick={handleSubmitQuiz}
                disabled={userAnswers[currentQuestion.id] === null}
              >
                Enviar Quiz
              </Button>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default CursoQuizPage;
