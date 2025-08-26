import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';
import SearchBar from './components/SearchBar';
import BookCard from './components/BookCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import ViewToggle from './components/ViewToggle';
import ThemeToggle from './components/ThemeToggle';
import useBookSearch from './hooks/useBookSearch';
import './App.css';

function App() {
  const [viewMode, setViewMode] = useState('grid');
  const {
    books,
    loading,
    error,
    totalResults,
    currentQuery,
    hasMore,
    searchBooks,
    loadMore,
    retry,
    reset
  } = useBookSearch();

  const handleSearch = (query) => {
    searchBooks(query, 1, false);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const renderResults = () => {
    if (loading && books.length === 0) {
      return <LoadingSpinner />;
    }

    if (error && books.length === 0) {
      return (
        <ErrorMessage
          type="error"
          message={error}
          onRetry={retry}
        />
      );
    }

    if (!loading && books.length === 0 && currentQuery) {
      return (
        <ErrorMessage
          type="no-results"
          showRetryButton={false}
        />
      );
    }

    if (books.length === 0) {
      return null;
    }

    return (
      <div className="space-y-6">
        {/* Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card p-6 rounded-xl border">
          <div>
            <h2 className="text-2xl font-semibold mb-1">
              Found {totalResults.toLocaleString()} books
            </h2>
            {currentQuery && (
              <p className="text-muted-foreground">
                Results for "{currentQuery}"
              </p>
            )}
          </div>
          <ViewToggle 
            viewMode={viewMode} 
            onViewModeChange={handleViewModeChange} 
          />
        </div>

        {/* Books Grid/List */}
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'
            : 'space-y-4'
        }>
          {books.map((book, index) => (
            <BookCard 
              key={`${book.key}-${index}`} 
              book={book} 
              viewMode={viewMode}
            />
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center pt-8">
            <Button
              onClick={loadMore}
              disabled={loading}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
                  Loading more books...
                </>
              ) : (
                'Load More Books'
              )}
            </Button>
          </div>
        )}

        {/* Error message for load more */}
        {error && books.length > 0 && (
          <div className="text-center pt-4">
            <ErrorMessage
              type="error"
              title="Failed to load more books"
              message={error}
              onRetry={loadMore}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">Book Finder</h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <section className="mb-12">
          <SearchBar onSearch={handleSearch} isLoading={loading} />
        </section>

        {/* Results Section */}
        <section>
          {renderResults()}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted/50 border-t mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">
            © 2024 Book Finder. Powered by{' '}
            <a 
              href="https://openlibrary.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Open Library
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

