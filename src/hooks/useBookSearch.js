import { useState, useCallback } from 'react';

const useBookSearch = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [currentQuery, setCurrentQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const BOOKS_PER_PAGE = 20;

  const searchBooks = useCallback(async (query, page = 1, append = false) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const offset = (page - 1) * BOOKS_PER_PAGE;
      const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}&limit=${BOOKS_PER_PAGE}&offset=${offset}&fields=key,title,author_name,cover_i,first_publish_year,publisher,isbn`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (append) {
        setBooks(prevBooks => [...prevBooks, ...data.docs]);
      } else {
        setBooks(data.docs);
      }
      
      setTotalResults(data.numFound);
      setCurrentQuery(query);
      setCurrentPage(page);
      setHasMore((page * BOOKS_PER_PAGE) < data.numFound);
      
    } catch (err) {
      console.error('Search error:', err);
      setError(err.message || 'Failed to search books. Please try again.');
      if (!append) {
        setBooks([]);
        setTotalResults(0);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = useCallback(() => {
    if (currentQuery && hasMore && !loading) {
      searchBooks(currentQuery, currentPage + 1, true);
    }
  }, [currentQuery, currentPage, hasMore, loading, searchBooks]);

  const retry = useCallback(() => {
    if (currentQuery) {
      searchBooks(currentQuery, 1, false);
    }
  }, [currentQuery, searchBooks]);

  const reset = useCallback(() => {
    setBooks([]);
    setLoading(false);
    setError(null);
    setTotalResults(0);
    setCurrentQuery('');
    setCurrentPage(1);
    setHasMore(false);
  }, []);

  return {
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
  };
};

export default useBookSearch;

