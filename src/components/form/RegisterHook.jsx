import React from "react";
import { useForm } from "react-hook-form";
import CheckBoxHook from "../checkbox/CheckBoxHook";
import DropdownHook from "../dropdown/DropdownHook";
import InputForm from "../input/inputForm";
import RadioHook from "../radio/RadioHook";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

const schema = yup
   .object({
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
      term: yup.boolean().required("Please accept the terms and conditions"),
   })
   .required();

const RegisterHook = () => {
   const {
      control,
      handleSubmit,
      setValue,
      getValues,
      formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
      reset,
      watch,
   } = useForm({
      resolver: yupResolver(schema),
      mode: "onChange",
      defaultValues: {
         gender: "male",
      },
   });
   const submit = (values) => {
      if (!isValid) return;
      return new Promise((resolver) => {
         setTimeout(() => {
            resolver();
            console.log(values);
            reset({
               username: "",
               password: "",
               email: "",
               gender: "male",
               job: "",
               term: false,
            });
         }, 3000);
      });
   };
   const watchGender = watch("gender");
   console.log(watchGender);
   return (
      <form
         onSubmit={handleSubmit(submit)}
         className="max-w-[324px] mx-auto my-10 p-3"
      >
         <div className="flex flex-col gap-3 mb-5">
            <label htmlFor="username" className="cursor-pointer">
               Username
            </label>
            <InputForm
               type="text"
               name="username"
               placeholder="Enter your user name"
               id="username"
               control={control}
            ></InputForm>
            {errors?.username && (
               <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
         </div>
         <div className="flex flex-col gap-3 mb-5">
            <label htmlFor="password" className="cursor-pointer">
               Password
            </label>
            <InputForm
               type="password"
               name="password"
               placeholder="Enter your password"
               id="password"
               control={control}
            ></InputForm>
            {errors?.password && (
               <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
         </div>
         <div className="flex flex-col gap-3 mb-5">
            <label htmlFor="email" className="cursor-pointer">
               Email Address
            </label>
            <InputForm
               type="email"
               name="email"
               placeholder="Enter your Email Address"
               id="email"
               control={control}
            ></InputForm>
            {errors?.email && (
               <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
         </div>
         <div className="flex flex-col gap-3 mb-5">
            <label className="cursor-pointer">Gender</label>
            <div className="flex item-center gap-x-5">
               <div className="flex items-center gap-x-3">
                  <RadioHook
                     control={control}
                     name="gender"
                     value="male"
                     checked={watchGender === "male"}
                  ></RadioHook>
                  <span>Male</span>
               </div>
               <div className="flex items-center gap-x-3">
                  <RadioHook
                     control={control}
                     name="gender"
                     value="female"
                     checked={watchGender === "female"}
                  ></RadioHook>
                  <span>Female</span>
               </div>
            </div>
            {errors?.gender && (
               <p className="text-red-500 text-sm">{errors.gender.message}</p>
            )}
         </div>
         <div className="flex flex-col gap-3 mb-5">
            <label htmlFor="">Job</label>
            <DropdownHook
               control={control}
               setValue={setValue}
               name="job"
               data={dropdownData}
               dropdownLabel="Select your job"
            ></DropdownHook>
            {errors?.job && (
               <p className="text-red-500 text-sm">{errors.job.message}</p>
            )}
         </div>
         <div className="flex flex-col gap-3 mb-5">
            <CheckBoxHook
               name="term"
               id="term"
               text="I accept the terms and conditions"
               control={control}
            ></CheckBoxHook>
            {errors?.term && (
               <p className="text-red-500 text-sm">{errors.term.message}</p>
            )}
         </div>
      </form>
   );
};

export default RegisterHook;
