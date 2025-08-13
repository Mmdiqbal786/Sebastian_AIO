
// "use client";

// import React, { useState } from "react";
// import { useForm, FieldError } from "react-hook-form";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { handleChange } from "@/app/lib/utils";

// interface FieldConfig {
//   name: string;
//   label: string;
//   type: "text" | "textarea" | "file" | "radio" | "password" | "phone" | "number" | "email" | "date";
//   placeholder?: string;
//   options?: string[];
//   validation?: { [key: string]: any };
// }

// interface DynamicFormProps {
//   title?: string;
//   fields: FieldConfig[];
//   apiEndpoint: string;
// }

// export default function DynamicForm({ title = "Form", fields, apiEndpoint }: DynamicFormProps) {
//   const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
//   const [loading, setLoading] = useState(false);
//   const [, setFormData] = useState<any>({});

//   const password = watch("password");

//   const onSubmit = async (data: any) => {
//     if (data.password && data.confirmPassword && data.password !== data.confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }
  
//     const formDataToSend = new FormData();
  
//     Object.keys(data).forEach((key) => {
//       if (data[key] instanceof FileList && data[key].length > 0) {
//         Array.from(data[key]).forEach((file) => {
//           if (file.size > 2 * 1024 * 1024) {
//             toast.error(`${key} must be less than 2MB`);
//             return;
//           }
//           formDataToSend.append(key, file);
//         });
//       } else {
//         formDataToSend.append(key, data[key]);
//       }
//     });
  
//     setLoading(true);
//     try {
//       const response = await axios.post(apiEndpoint, formDataToSend, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
  
//       if (response.status === 201) {
//         toast.success("Form submitted successfully!");
//         reset();
//         setFormData({});
//       } else {
//         toast.error(response.data.message || "Something went wrong");
//       }
//     } catch (error: any) {
//       toast.error(`Error: ${error.response?.data?.message || error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="card w-full text-white max-w-lg p-6 bg-black shadow-lg rounded-lg">
//       <ToastContainer position="top-right" autoClose={2000} />
//       <h2 className="text-2xl font-semibold text-center mb-4">{title}</h2>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         {fields.map((field) => (
//           <div key={field.name} className="mb-4">
//             <label className="block mb-1">{field.label}:</label>

//             {["text", "password", "number", "email", "date"].includes(field.type) && (
//               <input
//                 type={field.type}
//                 className="w-full p-2 text-black border rounded"
//                 {...register(field.name, field.validation)}
//                 placeholder={field.placeholder}
//                 onChange={handleChange(setFormData)}
//               />
//             )}

//             {field.type === "textarea" && (
//               <textarea
//                 className="w-full p-2 text-black border rounded"
//                 {...register(field.name, field.validation)}
//                 placeholder={field.placeholder}
//                 onChange={handleChange(setFormData)}
//               />
//             )}

//             {field.type === "file" && (
//               <input
//                 type="file"
//                 className="w-full p-2 border rounded bg-white text-black"
//                 {...register(field.name, { required: `${field.label} is required` })}
//                 onChange={handleChange(setFormData)}
//               />
//             )}

//             {field.type === "radio" && field.options && (
//               <div className="flex gap-4">
//                 {field.options.map((option) => (
//                   <label key={option} className="flex items-center">
//                     <input
//                       type="radio"
//                       value={option}
//                       {...register(field.name, field.validation)}
//                       onChange={handleChange(setFormData)}
//                     />
//                     <span className="ml-2">{option}</span>
//                   </label>
//                 ))}
//               </div>
//             )}

//             {field.type === "phone" && (
//               <input
//                 type="text"
//                 className="w-full p-2 text-black bg-white border rounded"
//                 {...register(field.name, {
//                   required: "Phone number is required",
//                   pattern: {
//                     value: /^\+\d{1,3}\s?\d{7,14}$/,
//                     message: "Invalid phone number format (e.g., +92 3123456789)",
//                   },
//                 })}
//                 placeholder={field.placeholder || "Enter phone number (e.g., +92 3123456789)"}
//                 onChange={handleChange(setFormData)}
//               />
//             )}

//             {errors[field.name] && (
//               <span className="text-red-500 text-sm">{(errors[field.name] as FieldError).message}</span>
//             )}
//           </div>
//         ))}

//         {fields.some((field) => field.name === "password") && (
//           <div className="mb-4">
//             <label className="block mb-1">Confirm Password:</label>
//             <input
//               type="password"
//               className="w-full p-2 text-black border rounded"
//               {...register("confirmPassword", {
//                 required: "Confirm password is required",
//                 validate: (value) => value === password || "Passwords do not match",
//               })}
//               placeholder="Re-enter password"
//             />
//             {errors.confirmPassword && (
//               <span className="text-red-500 text-sm">{(errors.confirmPassword as FieldError).message}</span>
//             )}
//           </div>
//         )}

//         <button
//           type="submit"
//           className={`w-full p-3 mt-4 bg-blue-600 text-white rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
//           disabled={loading}
//         >
//           {loading ? "Submitting..." : "Submit"}
//         </button>
//       </form>
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm, FieldError } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleChange } from "@/app/lib/utils";

export interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "textarea" | "file" | "radio" | "password" | "phone" | "number" | "email" | "date";
  placeholder?: string;
  options?: string[];
  validation?: { [key: string]: any };
}

interface DynamicFormProps {
  title?: string;
  fields: FieldConfig[];
  apiEndpoint: string;
  mode: "login" | "register";
  redirectTo?: string; // used for login redirection (default is "/employee")
}

export default function DynamicForm({
  title = "Form",
  fields,
  apiEndpoint,
  mode,
  redirectTo = "/employee",
}: DynamicFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [, setFormData] = useState<any>({});
  const router = useRouter();

  const password = watch("password");

  const onSubmit = async (data: any) => {
    if (mode === "register") {
      // If you have a confirm password field, you can validate it here.
      if (data.password && data.confirmPassword && data.password !== data.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      // Build FormData (to support file uploads)
      const formDataToSend = new FormData();
      Object.keys(data).forEach((key) => {
        if (data[key] instanceof FileList && data[key].length > 0) {
          Array.from(data[key]).forEach((file) => {
            if (file.size > 2 * 1024 * 1024) {
              toast.error(`${key} must be less than 2MB`);
              return;
            }
            formDataToSend.append(key, file);
          });
        } else {
          formDataToSend.append(key, data[key]);
        }
      });

      setLoading(true);
      try {
        const response = await axios.post(apiEndpoint, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.status === 201) {
          toast.success("Registration successful!");
          reset();
          setFormData({});
        } else {
          toast.error(response.data.message || "Something went wrong");
        }
      } catch (error: any) {
        toast.error(`Error: ${error.response?.data?.message || error.message}`);
      } finally {
        setLoading(false);
      }
    } else if (mode === "login") {
      // Login: send the data as JSON
      setLoading(true);
      try {
        const response = await axios.post(apiEndpoint, data);
        if (response.status === 200) {
          toast.success("Login successful!");
          reset();
          router.push(redirectTo);
        } else {
          toast.error(response.data.message || "Something went wrong");
        }
      } catch (error: any) {
        toast.error(`Error: ${error.response?.data?.error || error.message}`);
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    }
  };

  return (
    <div className="card w-full text-white max-w-lg p-6 bg-black shadow-lg rounded-lg">
      <ToastContainer position="top-right" autoClose={2000} />
      <h2 className="text-2xl font-semibold text-center mb-4">{title}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field) => (
          <div key={field.name} className="mb-4">
            <label className="block mb-1">{field.label}:</label>
            {["text", "password", "number", "email", "date"].includes(field.type) && (
              <input
                type={field.type}
                className="w-full p-2 text-black border rounded"
                {...register(field.name, field.validation)}
                placeholder={field.placeholder}
                onChange={handleChange(setFormData)}
              />
            )}
            {field.type === "textarea" && (
              <textarea
                className="w-full p-2 text-black border rounded"
                {...register(field.name, field.validation)}
                placeholder={field.placeholder}
                onChange={handleChange(setFormData)}
              />
            )}
            {field.type === "file" && (
              <input
                type="file"
                className="w-full p-2 border rounded bg-white text-black"
                {...register(field.name, { required: `${field.label} is required` })}
                onChange={handleChange(setFormData)}
              />
            )}
            {field.type === "radio" && field.options && (
              <div className="flex gap-4">
                {field.options.map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      value={option}
                      {...register(field.name, field.validation)}
                      onChange={handleChange(setFormData)}
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                ))}
              </div>
            )}
            {field.type === "phone" && (
              <input
                type="text"
                className="w-full p-2 text-black bg-white border rounded"
                {...register(field.name, {
                  required: "Phone number is required",
                  pattern: {
                    value: /^\+\d{1,3}\s?\d{7,14}$/,
                    message: "Invalid phone number format (e.g., +92 3123456789)",
                  },
                })}
                placeholder={field.placeholder || "Enter phone number (e.g., +92 3123456789)"}
                onChange={handleChange(setFormData)}
              />
            )}
            {errors[field.name] && (
              <span className="text-red-500 text-sm">
                {(errors[field.name] as FieldError).message}
              </span>
            )}
          </div>
        ))}
        {/* Render Confirm Password only if the field exists and mode is register */}
        {mode === "register" && fields.some((field) => field.name === "confirmPassword") && (
          <div className="mb-4">
            <label className="block mb-1">Confirm Password:</label>
            <input
              type="password"
              className="w-full p-2 text-black border rounded"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) => value === password || "Passwords do not match",
              })}
              placeholder="Re-enter password"
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">
                {(errors.confirmPassword as FieldError).message}
              </span>
            )}
          </div>
        )}
        <button
          type="submit"
          className={`w-full p-3 mt-4 bg-blue-600 text-white rounded ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading
            ? mode === "login"
              ? "Logging in..."
              : "Submitting..."
            : mode === "login"
            ? "Login"
            : "Register"}
        </button>
      </form>
    </div>
  );
}
