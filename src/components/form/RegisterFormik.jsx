import React from "react";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import InputFormik from "../input/inputFormik";
import RadioFormik from "../radio/RadioFormik";
import DropdownFormik from "../dropdown/DropdownFormik";
import CheckboxFormik from "../checkbox/CheckboxFormik";

const dropdownData = [
   {
      id: 1,
      value: "teacher",
      text: "Teacher",
   },
   {
      id: 2,
      value: "developer",
      text: "Developer",
   },
   {
      id: 3,
      value: "doctor",
      text: "Doctor",
   },
   {
      id: 4,
      value: "constructor",
      text: "Constructor",
   },
];

const RegisterFormik = () => {
   console.log("render");
   return (
      <Formik
         initialValues={{
            username: "",
            password: "",
            email: "",
            gender: "male",
            job: "",
            term: false,
         }}
         validationSchema={yup.object({
            username: yup.string().required("Please enter your username"),
            password: yup
               .string()
               .min(8, "Your password must be at least 8 characters or greater")
               .matches(
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  {
                     message:
                        "Your password must have at least 1 uppercase, 1 lowercase, 1 special character",
                  }
               )
               .required("Please enter your password"),
            email: yup
               .string()
               .email("Please enter a valid email")
               .required("Please enter your email"),
            gender: yup
               .string()
               .required("You must select your gender female or male")
               .oneOf(["male", "female"], "You can only select male or female"),
            job: yup
               .string()
               .required("Please select your job")
               .oneOf(["teacher", "developer", "doctor", "constructor"]),
            term: yup
               .boolean()
               .required("Please accept the terms and conditions"),
         })}
         onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
               alert(JSON.stringify(values, null, 2));
               setSubmitting(false);
            }, 3000);
         }}
      >
         {(formik) => {
            console.log(formik);
            const watchGender = formik.values.gender;
            console.log(watchGender);
            return (
               <form
                  onSubmit={formik.handleSubmit}
                  className="max-w-[324px] mx-auto my-10 p-3"
               >
                  <InputFormik
                     name="username"
                     placeholder="Enter your username"
                     id="username"
                     label="Username"
                     type="text"
                  ></InputFormik>
                  <InputFormik
                     type="password"
                     name="password"
                     id="password"
                     label="Password"
                     placeholder="Enter your password"
                  ></InputFormik>
                  <InputFormik
                     type="text"
                     name="email"
                     id="email"
                     placeholder="Enter your email"
                     label="Email"
                  ></InputFormik>
                  <div className="flex flex-col gap-3 mb-5">
                     <label className="cursor-pointer">Gender</label>
                     <div className="flex item-center gap-x-5">
                        <div className="flex items-center gap-x-3">
                           <RadioFormik
                              name="gender"
                              value="male"
                              checked={watchGender === "male"}
                              label="Male"
                           ></RadioFormik>
                        </div>
                        <div className="flex items-center gap-x-3">
                           <RadioFormik
                              name="gender"
                              value="female"
                              checked={watchGender === "female"}
                              label="Femail"
                           ></RadioFormik>
                        </div>
                     </div>
                  </div>
                  <DropdownFormik
                     labelText="Select Your Job"
                     data={dropdownData}
                     name="job"
                     setValue={formik.setFieldValue}
                  ></DropdownFormik>
                  <CheckboxFormik name="term">
                     I accept the terms and conditions
                  </CheckboxFormik>
                  <button
                     type="submit"
                     className="bg-blue-500 font-semibold text-white text-center w-full px-2 py-4 rounded-md"
                  >
                     {formik.isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white border-t-2 border-t-transparent rounded-full animate-spin mx-auto"></div>
                     ) : (
                        "Submit"
                     )}
                  </button>
               </form>
            );
         }}
      </Formik>
   );
};

export default RegisterFormik;
