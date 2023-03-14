import { useField } from "formik";
import React from "react";

const RadioFormik = (props) => {
   const [field] = useField(props);
   return (
      <div className="flex items-center gap-x-3">
         <label className="cursor-pointer custom-radio">
            <input
               {...field}
               type="radio"
               className="hidden"
               checked={props.checked}
               value={props.value}
            />
            <div className="w-full h-full bg-white rounded-full"></div>
         </label>
         <span>{props.label}</span>
      </div>
   );
};

export default RadioFormik;
