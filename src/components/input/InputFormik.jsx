import { useField } from "formik";
import React from "react";

const InputFormik = ({ label, ...props }) => {
   const [field, meta] = useField(props);
   return (
      <div className="flex flex-col gap-3 mb-5">
         <label htmlFor={props.name || props.id} className="cursor-pointer">
            {label}
         </label>
         <input
            {...field}
            {...props}
            className="outline-0 px-4 py-3 border-gray-300 border-2 rounded-md transition-all focus:border-blue-500"
         />
         {meta.touched && meta.error && (
            <p className="text-red-500 text-sm">{meta.error}</p>
         )}
      </div>
   );
};

export default InputFormik;
