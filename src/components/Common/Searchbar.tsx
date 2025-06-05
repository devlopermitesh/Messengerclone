import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { Skeleton } from '../ui/skeleton';

const SearchBar = ({ isloading }: { isloading: boolean }) => {
  return (
    <div className="flex justify-center items-center w-full py-4 px-6">
      <div className="w-full max-w-lg bg-gray-200 rounded-lg flex items-center px-4 py-2">
        
        {/* Search Icon */}
        <Search className="text-gray-500 mr-3" />
        
        {/* ShadCN Skeleton Loader when isloading is true */}
        {isloading ? (
          <Skeleton className="w-full bg-gray-300 h-10 rounded-lg " /> // ShadCN Skeleton
        ) : (
          <Input
            placeholder="Search Messenger..."
            className="w-full bg-gray-200 text-gray-700 rounded-lg border-none focus:outline-none focus:ring-0 hover:ring-0"
          />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
