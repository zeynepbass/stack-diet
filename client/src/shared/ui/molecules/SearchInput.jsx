const SearchInput = ({ withIcon = false, className = '', ...props }) => (
  <div className="relative w-full">
    <input type="search" className={className} {...props} />
    {withIcon && (
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 19l-4-4M14 10A7 7 0 101 10a7 7 0 0013 0z" />
        </svg>
      </div>
    )}
  </div>
);

export default SearchInput;
