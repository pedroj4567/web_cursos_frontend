import { useState, useEffect } from "react";
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
import strapiApi from "../../lib/axios";
import { courseServices } from "../../services/course.services";
import { useNavigate } from "react-router-dom";

type Course = {
  id: number;
  documentId: string;
  Title: string;
  Description: string;
  ShortDescription: string;
  Level: string;
  Banner: string;
  categories: {
    name: string;
  }[];
};

type Filters = {
  category: string;
  level: string[];
  search: string;
};

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    category: "",
    level: [],
    search: "",
  });
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({ pagination: { total: 0 } });
  const navigate = useNavigate();

  // Obtener categorías únicas para los filtros
  const [categories, setCategories] = useState<string[]>([]);
  const levels = ["Basico", "Intermedio", "Avanzado"];

  // Cargar categorías al montar el componente
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await strapiApi.get("/categories");
        setCategories(data.data.map((cat: any) => cat.name));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Cargar cursos cuando cambian los filtros
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const result = await courseServices.getFilteredCourses({
          search: filters.search,
          category: filters.category,
          level: filters.level,
          page: 1,
          pageSize: 10,
        });
        setCourses(result.data);
        setMeta(result.meta);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchCourses();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [filters]);

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

  const handleSearch = () => {
    setFilters((prev) => ({ ...prev, search: searchQuery }));
  };

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
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button
            color="gray"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <HiFilter />
            Filtros
          </Button>
          <Button onClick={handleSearch}>Buscar</Button>
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

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <p>Cargando cursos...</p>
        </div>
      )}

      {/* Results Count */}
      {!loading && (
        <div className="mb-4">
          <p className="text-gray-600">
            {meta.pagination.total}{" "}
            {meta.pagination.total === 1
              ? "curso encontrado"
              : "cursos encontrados"}
          </p>
        </div>
      )}

      {/* Courses List */}
      <div className="space-y-4">
        {!loading && courses.length > 0
          ? courses.map((course) => (
              <Card
                key={course.id}
                className="hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Course Image */}
                  <div className="w-full md:w-1/4">
                    <img
                      src={course.Banner}
                      alt={course.Title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Course Info */}
                  <div className="w-full md:w-3/4">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      {course.categories?.map((category) => (
                        <Badge
                          key={category.name}
                          color="info"
                          className="w-fit"
                        >
                          {category.name}
                        </Badge>
                      ))}
                      <Badge
                        color={
                          course.Level === "Basico"
                            ? "success"
                            : course.Level === "Intermedio"
                            ? "warning"
                            : "failure"
                        }
                        className="w-fit"
                      >
                        {course.Level}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {course.Title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {course.ShortDescription || course.Description}
                    </p>

                    <div className="flex justify-end">
                      <Button
                        color="blue"
                        onClick={() => {
                          navigate(`/courses/${course.documentId}`);
                        }}
                      >
                        Ver Curso
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          : !loading && (
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
