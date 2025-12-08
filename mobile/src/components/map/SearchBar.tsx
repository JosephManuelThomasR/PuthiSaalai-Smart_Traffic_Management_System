
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => {
  const isMobile = useIsMobile();

  return (
    <div className={`absolute ${isMobile ? 'top-2' : 'top-4'} left-1/2 transform -translate-x-1/2 w-11/12 sm:w-96 z-10`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input 
          type="text" 
          placeholder="Search location or incident..." 
          className="pl-10 bg-white/90 backdrop-blur-sm shadow-lg border-orange-200 focus:border-orange-300"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
