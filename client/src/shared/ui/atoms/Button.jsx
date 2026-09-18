const VARIANT_CLASSES = {
  primary: 'w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500',
  pill: 'rounded-full py-2 px-6 bg-green-500 text-white hover:bg-green-600 transition duration-300',
};

const Button = ({ variant = 'primary', className = '', type = 'button', ...props }) => (
  <button
    type={type}
    className={`${VARIANT_CLASSES[variant] ?? ''} ${className}`}
    {...props}
  />
);

export default Button;
