const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

const checkEmail = (errors, email) => {
  if (!EMAIL_PATTERN.test(email.trim())) {
    errors.email = 'Geçerli bir e-posta adresi girin';
  }
};

const checkNewPassword = (errors, { password, confirmPassword }) => {
  if (password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Parola en az ${MIN_PASSWORD_LENGTH} karakter olmalı`;
  }
  if (password !== confirmPassword) {
    errors.confirmPassword = 'Parolalar eşleşmiyor';
  }
};

export const validateLogin = ({ email, password }) => {
  const errors = {};
  checkEmail(errors, email);
  if (!password) {
    errors.password = 'Parola zorunlu';
  }
  return errors;
};

export const validateRegister = (values) => {
  const errors = {};
  if (!values.firstName.trim()) {
    errors.firstName = 'İsim zorunlu';
  }
  if (!values.lastName.trim()) {
    errors.lastName = 'Soyisim zorunlu';
  }
  checkEmail(errors, values.email);
  checkNewPassword(errors, values);
  return errors;
};

export const validateForgotPassword = ({ email }) => {
  const errors = {};
  checkEmail(errors, email);
  return errors;
};

export const validateResetPassword = (values) => {
  const errors = {};
  checkNewPassword(errors, values);
  return errors;
};
