import React, { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import useClickOutSide from "../../hooks/useClickOutSide";

const DropdownHook = ({ control, setValue, name, data, dropdownLabel }) => {
   const { show, setShow, nodeRef } = useClickOutSide();
   const dropdownValue = useWatch({
      control,
      defaultValue: "",
      name: "job",
   });
   const handleClick = (e) => {
      setValue(name, e.target.dataset.value);
      setLabel(e.target.textContent);
      setShow(false);
   };
   const [label, setLabel] = useState(dropdownLabel);
   useEffect(() => {
      if (dropdownValue === "") setLabel(dropdownLabel);
   }, [dropdownValue]);
   return (
      <div className="relative">
         <div
            className="p-5 rounded-lg border border-gray-100 bg-white flex items-center justify-between cursor-pointer"
            ref={nodeRef}
            onClick={() => setShow(!show)}
         >
            <span>{label}</span>
         </div>
         <div
            className={`absolute top-full left-0 w-full rounded-lg bg-white ${
               show ? "" : "opacity-0 invisible"
            }`}
         >
            {data.map((item) => (
               <div
                  className="p-5 cursor-pointer hover:bg-gray-100"
                  onClick={handleClick}
                  data-value={item.value}
                  key={item.id}
               >
                  {item.text}
               </div>
            ))}
         </div>
      </div>
   );
};

export default DropdownHook;
