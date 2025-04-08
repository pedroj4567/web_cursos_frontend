export type CounterProps = {
  title: string;
  message: string;
};

const Counter = ({ message, title }: CounterProps) => {
  return (
    <div className="w-70 flex flex-col items-center justify-center h-50 space-y-3 ">
      <span className="font-extrabold text-3xl">{message}</span>
      <p className="text-2xl text-center ">{title}</p>
    </div>
  );
};

export default Counter;
