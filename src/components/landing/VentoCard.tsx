import React from "react";

export type VentoCard = {
  primary?: boolean;
  children?: React.ReactNode;
  image?: string;
  title?: string;
  message?: string;
};

const VentoCard = ({
  primary = false,
  children,
  image,
  title,
  message,
}: VentoCard) => {
  return (
    <div
      className={`w-full ${
        primary
          ? "bg-gradient-to-r from-blue-800 to-blue-500 col-span-2 "
          : "bg-slate-200"
      } to-blue-500  rounded-3xl`}
    >
      {children}
      {image && (
        <div className="  mt-7 px-10 flex items-center relative h-25  ">
          <img src={image} alt="icono de card" className="w-[150px] z-10" />
          <div className="absolute w-30 h-30 bg-blue-500/80 left-15  rounded-full"></div>
        </div>
      )}

      {title && (
        <div className="mx-auto mt-5 px-8">
          <p className="text-2xl font-extrabold text-blue-700 ">{title}</p>
        </div>
      )}

      {message && (
        <div className=" px-8 text-sm mt-3  mx-auto ">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default VentoCard;
