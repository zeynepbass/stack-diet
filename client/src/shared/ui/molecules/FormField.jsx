import Input from '../atoms/Input';

const FormField = ({ label, as: Field = Input, className = '', ...props }) => (
  <div className={className}>
    {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
    <Field {...props} />
  </div>
);

export default FormField;
