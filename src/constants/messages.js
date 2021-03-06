export const generalMessages = {};

export const successMessages = {};

export const errorMessages = {
  // Defaults
  default: 'Hmm, an unknown error occured',
  timeout: 'Server Timed Out. Check your internet connection',
  invalidJson: 'Response returned is not valid JSON',

  // Firebase Related
  invalidFirebase: 'Firebase is not connected correctly',

  // Member
  memberExists: 'Member already exists',
  missingFirstName: 'Display name is missing',
  missingLastName: 'Last name is missing',
  missingEmail: 'Email is missing',
  missingPassword: 'Password is missing',
  passwordsDontMatch: 'Passwords do not match',
  notVerifiedEmail: 'Email is not verified',
  missingVerifyCode: 'Missing Verify Code',
  verificationFailed: 'Verification Failed',
  codeNotverified: 'Code not verified',

  // Recipes
  recipe404: 'Recipe not found',
  missingMealId: 'Missing meal definition',
};
