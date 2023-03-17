/* eslint-disable @typescript-eslint/restrict-template-expressions */
// MoviesByGenre.tsx

import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MovieCard from '../MovieCard';
import SearchBar from '../SearchBar';
import Navbar from '../Navbar';
import SearchResult from '../SearchResult';
import searchIcon from '../assets/search-normal.svg';

import './styles.scss';

const SeriesByGenre = () => {
  const { genreId } = useParams<{ genreId: string }>();
  const [series, setSeries] = React.useState([]);
  const [flag, setFlag] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/tv?api_key=13622fc50c5257d370284ea008163f90&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}`,
      )
      .then((response) => {
        setSeries(response.data.results);
        console.log(response.data.results);
      })
      .catch((error) => console.error(error));
  }, [genreId]);

  const handleBookmark = (id: number) => {
    setSeries((prevSeries: any) => {
      const newSeries = prevSeries.map((movie: any) => {
        if (movie.id === id) {
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          movie.isBookmarked = !movie.isBookmarked;
        }
        return movie;
      });

      // Save bookmarks to localStorage
      const bookmarks = newSeries.filter((movie: any) => movie.isBookmarked);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

      return newSeries;
    });
  };
  const handleSearch = (results: any) => {
    setSearchResults(results);
    setFlag(!flag);
  };

  return (
    <main className="homePage-container">
      <Navbar />
      <section className="homePage-container__main">
        <SearchBar value="" icon={searchIcon} onSearch={handleSearch} />
        {flag ? (
          <SearchResult results={searchResults} />
        ) : (
          <section className="seriesByGenre-container">
            <section className="seriesByGenre-container__section">
              {series.map((serie: any) => (
                <MovieCard
                  key={serie.id}
                  {...serie}
                  id={serie.id}
                  genre="series"
                  poster_path={serie.poster_path}
                  media_type="TV Series"
                  title={serie.title}
                  className="seriesByGenre-container__card"
                  release_date={serie.first_air_date.substring(0, 4)}
                  // isBookmarked={serie.isBookmarked}
                  onBookmark={() => handleBookmark(serie.id)}
                />
              ))}
            </section>
          </section>
        )}
      </section>
    </main>
  );
};

export default SeriesByGenre;
