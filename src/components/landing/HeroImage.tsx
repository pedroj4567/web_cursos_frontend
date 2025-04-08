export type imageProps = {
  path: string;
  styles: string;
};

export const HeroImage = ({ path, styles }: imageProps) => {
  return (
    <div className={styles}>
      <img src={path} alt="Hero imagen" draggable="false" />
    </div>
  );
};
