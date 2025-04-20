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
    <Card
      className="max-w-sm"
      renderImage={() => (
        <img
          width={500}
          height={500}
          src={image}
          alt="Logo curso"
          draggable={"false"}
        />
      )}
    >
      <h5 className="text-2xl font-bold  text-gray-900 ">{title}</h5>
      <span className="text-sm bg-blue-600 w-28 text-center text-white font-bold rounded-2xl px-2">
        {level}
      </span>

      <p className="font-normal text-gray-700 dark:text-gray-400">
        {shortDescription}
      </p>
      <Button className="cursor-pointer" onClick={handlerClick}>
        Ver Curso
      </Button>
    </Card>
  );
};

export default CardCourse;
