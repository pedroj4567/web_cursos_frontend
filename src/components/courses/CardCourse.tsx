import { Button, Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";

export type CardCourseProps = {
  courseId: string;
  image: string;
  title: string;
  level: string;
  shortDescription: string;
};

const CardCourse = ({
  image,
  level,
  shortDescription,
  courseId,
  title,
}: CardCourseProps) => {
  const navigate = useNavigate();

  const handlerClick = () => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <Card className="max-w-sm h-full flex flex-col">
      {/* Imagen (se mantiene igual que tu versión original) */}
      <img
        width={500}
        height={500}
        src={image}
        alt="Logo curso"
        draggable={false}
        className="w-full object-cover"
      />

      {/* Contenido de texto con altura fija */}
      <div className="flex flex-col h-48 ">
        <h5 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2">
          {title}
        </h5>

        <span className="text-sm bg-blue-600 text-white font-bold rounded-2xl px-2 w-fit mt-2">
          {level}
        </span>

        <p className="font-normal text-gray-700 dark:text-gray-400 line-clamp-3 mt-2 flex-growm pb-2">
          {shortDescription}
        </p>

        {/* Botón siempre en la parte inferior */}
        <Button className="w-full mt-auto" onClick={handlerClick}>
          Ver Curso
        </Button>
      </div>
    </Card>
  );
};

export default CardCourse;
