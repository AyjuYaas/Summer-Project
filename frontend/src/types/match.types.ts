export interface Match {
  _id: string;
  name: string;
  image: string;
}

export interface Pending {
  _id: string;
  user: {
    _id: string;
    name: string;
    gender: string;
    image: string;
    problemText: string;
  };
  therapist: { _id: string; name: string; image: string };
  status: string;
}

export interface Review {
  _id: string;
  user: { name: string; image: string };
  therapist: string;
  rating: number;
  reviewText: string;
  createdAt: string;
}

export interface matchedTherapists {
  _id: string;
  name: string;
  image: string;
  specialization: string[];
  experience: number;
  qualification: string[];
  gender: string;
  rating: number;
  reviewCount: number;
  score?: number;
  languages: string[];
  totalMatches: number;
}

export interface RequestingUser {
  _id: string;
  name: string;
  gender: string;
  image: string;
  problemText: string;
  requestId: string;
}
