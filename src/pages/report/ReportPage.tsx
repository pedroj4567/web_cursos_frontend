import { useState, useEffect } from "react";
import {
  Card,
  Table,
  Badge,
  Alert,
  Spinner,
  TableBody,
  TableHead,
  TableHeadCell,
  TableRow,
  TableCell,
  Button,
} from "flowbite-react";
import { courseServices } from "../../services/course.services";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// ... (otros imports se mantienen igual)

type Course = {
  id: number;
  documentId: string;
  Title: string;
  Description: string;
  Level: string;
  Banner: string;
  userFavorites?: {
    id: number;
    username: string;
    email: string;
    createdAt: string;
  }[];
};

const ReportsPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatingPDF, setGeneratingPDF] = useState<number | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await courseServices.getCoursesByPageReport();
      setCourses(response.data);
    } catch (err) {
      setError("Error al cargar los cursos. Intente nuevamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const generateCoursePDF = async (course: Course) => {
    setGeneratingPDF(course.id);
    try {
      const doc = new jsPDF();

      // Configuración inicial
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.setTextColor(40);
      doc.text(`Reporte del Curso: ${course.Title}`, 15, 20);

      // Agregar imagen del banner si existe
      if (course.Banner) {
        try {
          const imgData = await getBase64ImageFromURL(course.Banner);
          doc.addImage(imgData, "JPEG", 15, 30, 50, 30);
        } catch (imgError) {
          console.error("Error al cargar la imagen:", imgError);
        }
      }

      // Información básica del curso
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text(`Nivel: ${course.Level}`, 70, 40);
      doc.text(`Descripción:`, 15, 70);

      // Dividir la descripción en líneas
      const splitDescription = doc.splitTextToSize(course.Description, 180);
      doc.text(splitDescription, 15, 80);

      // Usuarios inscritos
      doc.setFont("helvetica", "bold");
      doc.text(
        `Usuarios inscritos: ${course.userFavorites?.length || 0}`,
        15,
        120
      );

      if (course.userFavorites && course.userFavorites.length > 0) {
        // Preparar datos para la tabla
        const userData = course.userFavorites.map((user) => [
          user.username,
          user.email,
          new Date(user.createdAt).toLocaleDateString(),
        ]);

        // Crear tabla usando autoTable directamente
        autoTable(doc, {
          startY: 130,
          head: [["Usuario", "Email", "Fecha de registro"]],
          body: userData,
          theme: "grid",
          headStyles: {
            fillColor: [41, 128, 185],
            textColor: 255,
            fontStyle: "bold",
          },
          styles: {
            cellPadding: 3,
            fontSize: 10,
          },
          columnStyles: {
            0: { cellWidth: 40 },
            1: { cellWidth: 80 },
            2: { cellWidth: 40 },
          },
        });
      } else {
        doc.setFont("helvetica", "normal");
        doc.text("No hay usuarios inscritos en este curso.", 15, 130);
      }

      // Pie de página
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text(
          `Página ${i} de ${pageCount}`,
          180,
          doc.internal.pageSize.height - 10,
          { align: "right" }
        );
        doc.text(
          `Generado el: ${new Date().toLocaleDateString()}`,
          15,
          doc.internal.pageSize.height - 10
        );
      }

      // Guardar el PDF
      doc.save(`reporte-curso-${course.Title}.pdf`);
    } catch (err) {
      console.error("Error al generar PDF:", err);
      setError("Error al generar el reporte PDF");
    } finally {
      setGeneratingPDF(null);
    }
  };

  const getBase64ImageFromURL = async (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const dataURL = canvas.toDataURL("image/jpeg");
          resolve(dataURL);
        } else {
          reject(new Error("Could not get canvas context"));
        }
      };
      img.onerror = (error) => reject(error);
      img.src = url;
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Reportes de Cursos</h1>
      </div>

      {error && (
        <Alert color="failure" className="mb-4">
          {error}
        </Alert>
      )}

      {loading && !courses.length ? (
        <div className="text-center py-12">
          <Spinner size="xl" />
          <p className="mt-4">Cargando cursos...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {courses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg text-white">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/4">
                  {course.Banner && (
                    <img
                      src={course.Banner}
                      alt={course.Title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  )}
                </div>

                <div className="w-full md:w-3/4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      color={
                        course.Level === "Basico"
                          ? "success"
                          : course.Level === "Intermedio"
                          ? "warning"
                          : "failure"
                      }
                    >
                      {course.Level}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold text-white-800 mb-2">
                    {course.Title}
                  </h3>
                  <p className="text-gray-600 mb-4">{course.Description}</p>

                  <h4 className="font-semibold mb-2">
                    Usuarios inscritos: {course.userFavorites?.length || 0}
                  </h4>

                  {course.userFavorites && course.userFavorites.length > 0 ? (
                    <div className="overflow-x-auto">
                      <Table hoverable>
                        <TableHead>
                          <TableHeadCell>Usuario</TableHeadCell>
                          <TableHeadCell>Email</TableHeadCell>
                          <TableHeadCell>Fecha de registro</TableHeadCell>
                        </TableHead>
                        <TableBody>
                          {course.userFavorites.map((user) => (
                            <TableRow key={user.id}>
                              <TableCell>{user.username}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>
                                {new Date(user.createdAt).toLocaleDateString()}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <p className="text-gray-500">
                      No hay usuarios inscritos en este curso.
                    </p>
                  )}
                </div>
              </div>
              <Button
                onClick={() => generateCoursePDF(course)}
                disabled={generatingPDF === course.id}
              >
                {generatingPDF === course.id ? (
                  <>
                    <Spinner size="sm" className="mr-2" />
                    Generando...
                  </>
                ) : (
                  "Descargar Reporte PDF"
                )}
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
