import { HeroImage } from "./HeroImage";

const Hero = () => {
  return (
    <section className="h-[650px] flex flex-col items-center  ">
      <div className="w-full flex h-full justify-evenly items-center flex-col lg:flex-row">
        <div className="text-5xl  w-xl p-2 space-y-6 ">
          <div className="h-[150px] flex flex-col justify-evenly">
            <p className="">
              Mejora Tus{" "}
              <span className="bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text   text-transparent px-3 rounded-2xl  font-extrabold underline">
                Habilidades
              </span>{" "}
            </p>
            <span className="mb-2">Más Rápido</span>
          </div>
          <div className="text-[25px] h-10 flex justify-start items-center">
            <a className="border-2 text-[#074799] px-4 py-1 rounded-xl font-bold cursor-pointer transition-all hover:bg-gradient-to-r from-blue-800 to-blue-600 hover:text-white  ">
              ¡Empieza tu evolución!
            </a>
          </div>
        </div>

        <HeroImage path="./svg/learning.svg" styles={`m-4 w-md`} />
      </div>
    </section>
  );
};

export default Hero;
