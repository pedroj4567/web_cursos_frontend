import { Label, TextInput } from "flowbite-react";
import { IconType } from "react-icons";

export type FormFieldProps = {
  type: string;
  icon: IconType;
  placeholder: string;
  required: boolean;
  idField: string;
  label: string;
};

const FormField = ({
  icon,
  placeholder,
  required = true,
  type,
  idField,
  label,
}: FormFieldProps) => {
  return (
    <div className="max-w-xl w-full mb-3">
      <div className="mb-2 block">
        <Label htmlFor={idField}>{label}</Label>
      </div>
      <TextInput
        id={idField}
        type={type}
        rightIcon={icon}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default FormField;
