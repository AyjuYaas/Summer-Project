export interface Therapist {
  _id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
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
