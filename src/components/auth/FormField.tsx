import { Label, TextInput } from "flowbite-react";
import { IconType } from "react-icons";

export type FormFieldProps = {
  type: string;
  icon: IconType;
  placeholder: string;
  required?: boolean;
  idField: string;
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const FormField = ({
  icon,
  placeholder,
  required = true,
  type,
  idField,
  label,
  error,
  ...rest
}: FormFieldProps) => {
  return (
    <div className="w-lg mb-3">
      <div className="mb-2 block">
        <Label htmlFor={idField} className="text-blue-700">
          {label}
        </Label>
      </div>
      <TextInput
        id={idField}
        type={type}
        rightIcon={icon}
        placeholder={placeholder}
        required={required}
        {...rest}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FormField;
