import { createContext } from "react";
import { signupParamsTherapist } from "../../../types/therapist.types";

export type TherapistFormContextType = {
  formData: signupParamsTherapist;
  setFormData: React.Dispatch<React.SetStateAction<signupParamsTherapist>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TherapistFormData = createContext<TherapistFormContextType>({
  formData: {
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    languages: [],
    specialization: [],
    experience: "",
    qualification: [],
  },
  setFormData: () => {},
  handleChange: () => {},
});
