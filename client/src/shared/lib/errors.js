export const getErrorMessage = (error) =>
  error.response?.data?.message ?? 'Bir şeyler ters gitti, lütfen tekrar deneyin.';
