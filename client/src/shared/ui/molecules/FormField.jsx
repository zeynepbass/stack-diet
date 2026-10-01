import { useId } from 'react';
import Input from '../atoms/Input';

const FormField = ({ label, error, className = '', ...props }) => {
  const id = useId();

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <Input id={id} aria-invalid={Boolean(error)} {...props} />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FormField;
