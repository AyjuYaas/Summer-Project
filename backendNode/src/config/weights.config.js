export const qualificationWeights = {
  // Tier 1: Doctoral (highest weight)
  "Doctor of Psychology (Psy.D)": 3,
  "Doctor of Philosophy in Psychology (Ph.D.)": 3,

  // Tier 2: Master's
  "Master of Psychology (M.Psych)": 2,
  "Master of Counseling Psychology (M.Coun)": 2,
  "Master of Social Work (MSW)": 2,
  "Master of Mental Health Counseling (MHC)": 2,

  // Tier 3: Bachelor's
  "Bachelor of Psychology (B.Psych)": 1,
  "Bachelor of Social Work (BSW)": 1,

  // Tier 4: Licenses and Specialized Trainings
  "Licensed Clinical Social Worker (LCSW)": 0.5,
  "Licensed Professional Counselor (LPC)": 0.5,
  "Certified Clinical Mental Health Counselor (CCMHC)": 0.5,
  "Board Certified Behavior Analyst (BCBA)": 0.5,
  "National Certified Counselor (NCC)": 0.5,
  "Cognitive Behavioral Therapy (CBT) Certification": 0.5,
  "Dialectical Behavior Therapy (DBT) Certification": 0.5,
  "Eye Movement Desensitization and Reprocessing (EMDR) Training": 0.5,
  "Trauma-Informed Therapy Training": 0.5,
};

export const scoringWeights = {
  languageMatch: 1.5,
  genderMatch: 1,
  experiencePerYear: 0.5,
  ratingMultiplier: 1,
  predictedProblemMatch: 2,
};
