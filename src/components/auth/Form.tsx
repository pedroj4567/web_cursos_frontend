export type FormProps = {
  children: React.ReactNode;
};

const Form = ({ children }: FormProps) => {
  return (
    <form className="h-full p-2 rounded-2xl bg-white flex  flex-col  items-center py-5 px-7">
      {children}
    </form>
  );
};

export default Form;
