import { Search } from 'lucide-react';
import { Input } from '../ui/input';
const SearchBar = () => {
  return (
    <div className="flex justify-center items-center w-full py-4 px-6">
      <div className="w-full max-w-lg bg-gray-200 rounded-lg flex items-center px-4 py-2">
        <Search className="text-gray-500 mr-3" /> {/* Lucide Search Icon */}
        <Input
  placeholder="Search Messenger..."
  className="w-full bg-gray-200 text-gray-700 rounded-lg border-none focus:outline-none focus:ring-0 hover:ring-0"
/>

      </div>
    </div>
  );
};

export default SearchBar;
