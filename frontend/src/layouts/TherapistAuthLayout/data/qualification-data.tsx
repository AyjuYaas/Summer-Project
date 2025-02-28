interface Qualification {
  label: string;
  value: string;
}

interface QualificationCategory {
  label: string;
  items: Qualification[];
}

const qualificationData: QualificationCategory[] = [
  // ======== Degree ==========
  {
    label: "Degree",
    items: [
      {
        label: "Bachelor of Psychology (B.Psych)",
        value: "Bachelor of Psychology (B.Psych)",
      },
      {
        label: "Master of Psychology (M.Psych)",
        value: "Master of Psychology (M.Psych)",
      },
      {
        label: "Bachelor of Social Work (BSW)",
        value: "Bachelor of Social Work (BSW)",
      },
      {
        label: "Master of Social Work (MSW)",
        value: "Master of Social Work (MSW)",
      },
      {
        label: "Doctor of Psychology (Psy.D)",
        value: "Doctor of Psychology (Psy.D)",
      },
      {
        label: "Doctor of Philosophy in Psychology (Ph.D.)",
        value: "Doctor of Philosophy in Psychology (Ph.D.)",
      },
      {
        label: "Master of Counseling Psychology (M.Coun)",
        value: "Master of Counseling Psychology (M.Coun)",
      },
      {
        label: "Master of Mental Health Counseling (MHC)",
        value: "Master of Mental Health Counseling (MHC)",
      },
    ],
  },

  // ======== Licenses and Certifications ==========
  {
    label: "Licenses and Certifiactions",
    items: [
      {
        label: "Licensed Clinical Social Worker (LCSW)",
        value: "Licensed Clinical Social Worker (LCSW)",
      },
      {
        label: "Licensed Professional Counselor (LPC)",
        value: "Licensed Professional Counselor (LPC)",
      },
      {
        label: "Certified Clinical Mental Health Counselor (CCMHC)",
        value: "Certified Clinical Mental Health Counselor (CCMHC)",
      },
      {
        label: "Board Certified Behavior Analyst (BCBA)",
        value: "Board Certified Behavior Analyst (BCBA)",
      },
      {
        label: "National Certified Counselor (NCC)",
        value: "National Certified Counselor (NCC)",
      },
    ],
  },

  // ======== Specialized Trainings ==========
  {
    label: "Specialized Trainings",
    items: [
      {
        label: "Cognitive Behavioral Therapy (CBT) Certification",
        value: "Cognitive Behavioral Therapy (CBT) Certification",
      },
      {
        label: "Dialectical Behavior Therapy (DBT) Certification",
        value: "Dialectical Behavior Therapy (DBT) Certification",
      },
      {
        label: "Eye Movement Desensitization and Reprocessing (EMDR) Training",
        value: "Eye Movement Desensitization and Reprocessing (EMDR) Training",
      },
      {
        label: "Trauma-Informed Therapy Training",
        value: "Trauma-Informed Therapy Training",
      },
    ],
  },
];

export default qualificationData;
