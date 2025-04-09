export type FormProps = {
  children: React.ReactNode;
};

const Form = ({ children }: FormProps) => {
  return <form className="mx-auto p-5">{children}</form>;
};

export default Form;
