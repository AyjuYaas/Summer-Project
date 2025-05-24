export interface Therapist {
  _id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  validationStatus: string;
}

export interface pendingTherapist {
  _id: string;
  name: string;
  image: string;
  email: string;
  validationStatus: string;
}

export interface signupParamsTherapist {
  name: string;
  email: string;
  password: string;
  phone: string;
  gender: string;
  languages: string[];
  specialization: string[];
  experience: string;
  qualification: string[];
}

export interface updateParamsTherapist {
  image: string;
  availability: boolean;
  name: string;
  email: string;
  phone: string;
  gender: string;
  languages: string[];
  specialization: string[];
  experience: string;
  qualification: string[];
}

export interface TherapistContainer {
  name: string;
  image: string;
  experience: number;
  rating: number;
  specialization: string[];
  reviewCount: number;
  validationStatus: string;
}

export interface adminTherapist {
  _id: string;
  name: string;
  email: string;
  image: string;
  phone: string;
  gender: string;
  languages: string[];
  specialization: string[];
  experience: string;
  qualification: string[];
  validationStatus: string;
  createdAt: Date;
}
