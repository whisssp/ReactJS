import React from "react";
import { useController } from "react-hook-form";

const RadioHook = ({ control, ...props }) => {
   const { field } = useController({
      control,
      name: props.name,
      defaultValue: props.value,
   });
   return (
      <label className="cursor-pointer custom-radio">
         <input
            type="radio"
            {...field}
            className="hidden"
            checked={props.checked}
            value={props.value}
         />
         <div className="w-full h-full bg-white rounded-full"></div>
      </label>
   );
};

export default RadioHook;
