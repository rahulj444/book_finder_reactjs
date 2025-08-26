import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';

const SearchBar = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [debounceTimer, setDebounceTimer] = useState(null);

  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    setQuery(value);

    // Clear existing timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // Set new timer for debounced search
    if (value.trim().length > 2) {
      const timer = setTimeout(() => {
        onSearch(value.trim());
      }, 500);
      setDebounceTimer(timer);
    }
  }, [debounceTimer, onSearch]);

  const handleSearch = useCallback(() => {
    if (query.trim()) {
      onSearch(query.trim());
    }
  }, [query, onSearch]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  const handleClear = useCallback(() => {
    setQuery('');
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
  }, [debounceTimer]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
          Discover Your Next Great Read
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Search through millions of books to find exactly what you're looking for
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Input
            type="text"
            placeholder="Search for a book title..."
            value={query}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="h-14 text-lg pl-12 pr-12 rounded-xl border-2 focus:border-primary"
            disabled={isLoading}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          {query && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <Button
          onClick={handleSearch}
          disabled={!query.trim() || isLoading}
          className="h-14 px-8 text-lg rounded-xl min-w-[120px]"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
              Searching...
            </div>
          ) : (
            <>
              <Search className="mr-2 h-5 w-5" />
              Search
            </>
          )}
        </Button>
      </div>

      {query && (
        <Button
          variant="outline"
          onClick={handleClear}
          className="mt-4 mx-auto flex items-center gap-2"
        >
          <X className="h-4 w-4" />
          Clear Search
        </Button>
      )}
    </div>
  );
};

export default SearchBar;

