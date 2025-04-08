const AboutSection = () => {
  return (
    <section className=" h-[50em] grid grid-cols-2 gap-6" id="information">
      <div className="flex justify-center items-center ">
        <div></div>
        <div className="w-2xl ">
          <img
            src={"./images/imageInfo.webp"}
            alt="Imagen Cooperativa"
            className="w-2xl h-xl"
          />
        </div>
      </div>
      <div>
        <div className="flex justify-center flex-col space-y-10  h-full mx-20">
          <div className="text-5xl w-full text-righ">
            <h2 className="font-bold">
              Recursos relevantes y
              <span className="text-blue-500 px-3 font-extrabold  text-5xl">
                Actualizados
              </span>
            </h2>
          </div>
          <div className="text-xl ">
            <p className="text-black/70">
              Impulsa tu conocimiento con nuestra educación digital: Mentoría
              personalizada + proyectos prácticos + recursos premium =
              aprendizaje real.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
