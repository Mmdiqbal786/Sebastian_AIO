// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
// import Modal from "@/app/components/Modal";
// // import { FormField } from "@/app/types/FormFieldType";
// import DynamicForm, { FormField } from "@/app/lib/form/DynamicForm";

// interface FormData {
//   [key: string]: string | number | boolean;
// }

// interface EditModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   title: string;
//   initialData?: any;
//   fields: FormField[];
//   onSubmit: (data: FormData) => void;
//   onChange: (fieldName: string, value: string | number | boolean) => void;
//   loading: boolean;
// }

// const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, title, fields, onSubmit, onChange, loading, initialData }) => {
//   if (!isOpen) return null;

//   return (
//     <Modal modalOpen={isOpen} onClose={onClose}>
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//         <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-black text-white relative px-6 py-4 rounded-lg">
//           <div className="text-center relative py-4">
//             <h1 className="text-xl font-bold">{title}</h1>
//             <button 
//               onClick={onClose} 
//               className="absolute top-4 right-2 text-white text-2xl hover:opacity-80 transition-opacity"
//             >
//               ✕
//             </button>
//           </div>
//           <div className="card-body text-black px-2 py-2">
//             <DynamicForm
//               fields={fields}
//               initialData={initialData}
//               onSubmit={onSubmit}
//               onChange={onChange}
//               loading={loading}
//             />
//           </div>
//           {loading && (
//             <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center text-white text-lg">
//               Loading...
//             </div>
//           )}
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default EditModal;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Modal from "@/app/components/Modal";
// import { FormField } from "@/app/types/FormFieldType";
// import DynamicForm, { FormField } from "@/app/lib/form/DynamicForm";
import DynamicForm from "@/app/lib/form/ReactForm/OptimizedDynamicForm";
import { FormField } from "@/app/lib/form/ReactForm/types";

interface FormData {
  [key: string]: string | number | boolean;
}

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  initialData?: any;
  fields: FormField[];
  onSubmit: (data: FormData) => void;
  onChange: (fieldName: string, value: string | number | boolean) => void;
  loading: boolean;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, title, fields, onSubmit, onChange, loading, initialData }) => {
  if (!isOpen) return null;

  return (
    <Modal modalOpen={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-black text-white relative px-6 py-4 rounded-lg">
          <div className="text-center relative py-4">
            <h1 className="text-xl font-bold">{title}</h1>
            <button 
              onClick={onClose} 
              className="absolute top-4 right-2 text-white text-2xl hover:opacity-80 transition-opacity"
            >
              ✕
            </button>
          </div>
          <div className="card-body text-black px-2 py-2">
            <DynamicForm
              fields={fields}
              initialData={initialData}
              onSubmit={onSubmit}
              onChange={onChange}
              loading={loading}
            />
          </div>
          {loading && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center text-white text-lg">
              Loading...
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default EditModal;
