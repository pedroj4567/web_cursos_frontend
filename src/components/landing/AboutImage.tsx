export type AboutImageProps = {
  path: string;
};

const AboutImage = ({ path }: AboutImageProps) => {
  return <img src={path} alt="Imagen Cooperativa" className="w-2xl h-xl" />;
};

export default AboutImage;
