import { FC, ChangeEvent } from 'react';
import { Search } from 'lucide-react';

interface SearchFieldProps {
  search: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchField: FC<SearchFieldProps> = ({ search }): JSX.Element => {
  return (
    <div className="relative flex items-center">
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={20}
      />
      <input
        className="bg-[#161f28] rounded-lg text-xl pl-10 pr-3 py-2 outline-none w-full placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
        placeholder="Search"
        type="text"
        onChange={search}
      />
    </div>
  );
};

export default SearchField;
