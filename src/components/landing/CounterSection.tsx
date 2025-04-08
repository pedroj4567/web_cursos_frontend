import Counter from "./Counter";

const CounterSection = () => {
  return (
    <section className=" flex  bg-gradient-to-r from-blue-800 to-blue-600  text-white py-10 justify-around">
      <Counter title="Cursos de programacion" message="+500" />
      <Counter title="Cursos de idomas" message="+500" />

      <Counter title="Estudiantes Registrados" message="+2000" />
      <Counter title="Certificados Otorgados" message="+300" />
    </section>
  );
};

export default CounterSection;
