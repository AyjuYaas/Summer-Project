interface Step {
  step: string;
  stepDes: string;
  content: string;
}

const steps: Step[] = [
  {
    step: "Welcome to",
    stepDes: "Therafind",
    content:
      "Discover the easiest way to find the right therapist for you. Our smart system simplifies the process in just a few steps:",
  },
  {
    step: "Step 1",
    stepDes: "Login/Signup",
    content: `Create an account in seconds by filling out a quick and easy form. `,
  },
  {
    step: "Step 2",
    stepDes: "Share your Concern",
    content:
      "Tell us about your situation, and our AI-powered recommendation system will suggest potential concerns and guide you toward the best therapists.",
  },
  {
    step: "Step 3",
    stepDes: "Choose Your therapist",
    content:
      "Browse our list of verified therapists and select the one that best fits your needs.",
  },
  {
    step: "Step 4",
    stepDes: "Connect & Communicate",
    content:
      "Start your journey toward healing through chat, calls, or video sessions with your chosen therapist. Your well-being is just a few clicks away!",
  },
];

export default steps;
