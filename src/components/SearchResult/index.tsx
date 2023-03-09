/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useState } from 'react';

import './styles.scss';

import MovieCard from '../MovieCard';

interface SearchResultProps {
  results: any[];
}

const SearchResult = ({ results }: SearchResultProps) => {
  const [searchResults, setSearchResults] = useState(results);

  const handleBookmark = (id: number) => {
    setSearchResults((prevMovies: any) => {
      const newMovies = prevMovies.map((results: any) => {
        if (results.id === id) {
          results.isBookmarked = !results.isBookmarked;
        }
        return results;
      });

      // Save bookmarks to localStorage
      const bookmarks = newMovies.filter((movie: any) => movie.isBookmarked);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

      return newMovies;
    });
  };

  return (
    <section className="searchResult-container">
      {searchResults.length > 0 ? (
        <section className="searchResult-container__section">
          {searchResults.map((result: any, index: number) => (
            <MovieCard
              key={result.id}
              {...result}
              className="movieResult-container"
              poster_path={result.poster_path}
              title={result.title}
              isBookmarked={result.isBookmarked}
              onBookmarkClick={() => handleBookmark(result.id)}
            />
          ))}
        </section>
      ) : (
        <p>No results found</p>
      )}
    </section>
  );
};

export default SearchResult;
