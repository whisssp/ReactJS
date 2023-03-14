import React from "react";
import { useController } from "react-hook-form";

const InputForm = ({ control, ...props }) => {
   const { field } = useController({
      control,
      defaultValue: "",
      name: props.name,
   });
   return (
      <input
         className="outline-0 px-4 py-3 border-gray-300 border-2 rounded-md transition-all focus:border-blue-500"
         {...field}
         {...props}
      />
   );
};

export default InputForm;
