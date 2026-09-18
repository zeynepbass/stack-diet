const Textarea = ({ className = '', ...props }) => (
  <textarea
    className={`mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${className}`}
    {...props}
  />
);

export default Textarea;
