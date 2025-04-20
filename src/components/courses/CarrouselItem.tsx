const CarrouselItem = () => {
  return (
    <div className="flex h-full items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://midu.dev/images/wallpapers/una-taza-de-javascript.png"
          alt="Fondo tecnológico"
          className="w-full h-full object-cover blur-sm"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <h3 className="text-4xl md:text-5xl font-bold text-white relative z-10 px-4 text-center drop-shadow-lg">
        Desarrollo Web
      </h3>
    </div>
  );
};

export default CarrouselItem;
