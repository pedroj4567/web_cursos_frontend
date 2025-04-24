import { useState } from "react";
import {
  TextInput,
  Button,
  Checkbox,
  Label,
  Dropdown,
  DropdownItem,
  Card,
  Badge,
} from "flowbite-react";
import { HiSearch, HiFilter } from "react-icons/hi";

type Course = {
  id: number;
  title: string;
  description: string;
  category: string;
  level: "Principiante" | "Intermedio" | "Avanzado";
  image: string;
};

type Filters = {
  category: string;
  level: string[];
};

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    category: "",
    level: [],
  });

  const courses: Course[] = [
    {
      id: 1,
      title: "JavaScript Moderno 2024",
      description: "Aprende JavaScript desde cero hasta temas avanzados",
      category: "Programación",
      level: "Intermedio",
      image:
        "https://wpengine.com/wp-content/uploads/2021/07/jsheader-1024x535.png",
    },
    {
      id: 2,
      title: "React desde Cero",
      description: "Domina React con proyectos prácticos",
      category: "Frontend",
      level: "Principiante",
      image:
        "https://wpengine.com/wp-content/uploads/2021/07/jsheader-1024x535.png",
    },
    {
      id: 3,
      title: "Node.js Avanzado",
      description: "Construye APIs robustas con Node.js",
      category: "Backend",
      level: "Avanzado",
      image:
        "https://wpengine.com/wp-content/uploads/2021/07/jsheader-1024x535.png",
    },
    {
      id: 4,
      title: "Diseño UI/UX",
      description: "Principios fundamentales de diseño de interfaces",
      category: "Diseño",
      level: "Principiante",
      image:
        "https://wpengine.com/wp-content/uploads/2021/07/jsheader-1024x535.png",
    },
  ];

  const categories = ["Programación", "Frontend", "Backend", "Diseño"];
  const levels: Course["level"][] = ["Principiante", "Intermedio", "Avanzado"];

  const handleFilterChange = (filterName: keyof Filters, value: string) => {
    if (filterName === "level") {
      setFilters((prev) => ({
        ...prev,
        level: prev.level.includes(value)
          ? prev.level.filter((l) => l !== value)
          : [...prev.level, value],
      }));
    } else {
      setFilters((prev) => ({ ...prev, [filterName]: value }));
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      !filters.category || course.category === filters.category;
    const matchesLevel =
      filters.level.length === 0 || filters.level.includes(course.level);

    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filters */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Buscar Cursos</h1>

        <div className="flex gap-4 mb-4">
          <TextInput
            icon={HiSearch}
            placeholder="Buscar cursos..."
            className="flex-grow"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            color="gray"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <HiFilter />
            Filtros
          </Button>
        </div>

        {showFilters && (
          <Card className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category Filter */}
              <div>
                <Label htmlFor="category">Categoría</Label>
                <Dropdown
                  label={filters.category || "Todas las categorías"}
                  dismissOnClick={true}
                >
                  <DropdownItem
                    onClick={() => handleFilterChange("category", "")}
                  >
                    Todas las categorías
                  </DropdownItem>
                  {categories.map((category) => (
                    <DropdownItem
                      key={category}
                      onClick={() => handleFilterChange("category", category)}
                    >
                      {category}
                    </DropdownItem>
                  ))}
                </Dropdown>
              </div>

              {/* Level Filter */}
              <div>
                <Label>Nivel</Label>
                <div className="flex flex-col gap-2 mt-2">
                  {levels.map((level) => (
                    <div key={level} className="flex items-center gap-2">
                      <Checkbox
                        id={`level-${level}`}
                        checked={filters.level.includes(level)}
                        onChange={() => handleFilterChange("level", level)}
                      />
                      <Label htmlFor={`level-${level}`}>{level}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-gray-600">
          {filteredCourses.length}{" "}
          {filteredCourses.length === 1
            ? "curso encontrado"
            : "cursos encontrados"}
        </p>
      </div>

      {/* Courses List */}
      <div className="space-y-4">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Course Image */}
                <div className="w-full md:w-1/4">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Course Info */}
                <div className="w-full md:w-3/4">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge color="info" className="w-fit">
                      {course.category}
                    </Badge>
                    <Badge
                      color={
                        course.level === "Principiante"
                          ? "success"
                          : course.level === "Intermedio"
                          ? "warning"
                          : "failure"
                      }
                      className="w-fit"
                    >
                      {course.level}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>

                  <div className="flex justify-end">
                    <Button color="blue">Ver Curso</Button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card>
            <p className="text-center text-gray-500 py-8">
              No se encontraron cursos que coincidan con tu búsqueda
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
