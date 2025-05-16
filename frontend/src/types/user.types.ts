interface Problems {
  problem: string;
  score: number;
}

export interface User {
  _id: string;
  name: string;
  age: Date;
  gender: string;
  image: string;
}

export interface Preference {
  _id: string;
  user: string;
  preferredGender: string;
  preferredLanguage: string;
  problemText: string;
  predictedProblems: Problems[];
}

export interface PreferenceForm {
  preferredGender: string;
  preferredLanguage: string;
  problemText: string;
}

export interface signupParamsUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  birthDate: Date | string;
  gender: string;
}

export interface updateParamsUser {
  image: string;
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  gender: string;
}
