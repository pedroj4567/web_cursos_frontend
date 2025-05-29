import React from "react";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

const Form = ({ children, ...rest }: FormProps) => (
  <form {...rest}>{children}</form>
);

export default Form;
