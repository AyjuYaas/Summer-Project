export default function validatePassword(password) {
  const errors = [];

  // Check length
  if (password.length < 6 || password.length > 100) {
    errors.push("Password must be between 6 and 100 characters");
  }

  // Check for uppercase
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  // Check for digit
  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one digit");
  }

  // Check for special character
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push(
      "Password must contain at least one special character (!@#$%^&*)"
    );
  }

  // Check for spaces
  if (/\s/.test(password)) {
    errors.push("Password must not contain spaces");
  }

  return {
    isValid: errors.length === 0,
    errors: errors,
  };
}
