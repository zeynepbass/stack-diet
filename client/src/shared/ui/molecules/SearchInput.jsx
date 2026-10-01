import { Search } from 'lucide-react';

const SearchInput = ({ withIcon = false, className = '', ...props }) => (
  <div className="relative w-full">
    <input type="search" className={className} {...props} />
    {withIcon && (
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-4 h-4 text-gray-500" />
      </div>
    )}
  </div>
);

export default SearchInput;
