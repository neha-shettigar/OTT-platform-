import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MovieCard from '../MovieCard';
import SearchBar from '../SearchBar';
import Navbar from '../Navbar';
import searchIcon from '../../assets/search-normal.svg';
import { addBookmark, removeBookmark } from '../../states/actions';
import { RootState } from '../../states/store';

import './styles.scss';

interface BookmarkInterface {
  id: number;
  poster_path?: string;
  media_type?: string;
  title?: string;
  className: string;
  release_date: string;
}

const BookMarks = () => {
  const [, setBookmarks] = React.useState<BookmarkInterface[]>(() => {
    // Retrieve bookmarks from localStorage
    const savedBookmarks = localStorage.getItem('bookmarks');
    return savedBookmarks != null ? JSON.parse(savedBookmarks) : [];
  });
  const bookmarks = useSelector((state: RootState) => state.bookmarks);
  const dispatch = useDispatch();

  const toggleBookmark = (movie: BookmarkInterface) => {
    const index = bookmarks.findIndex((b: any) => b.id === movie.id);
    if (index >= 0) {
      dispatch(removeBookmark(movie.id));
      setBookmarks((bookmarks: any) =>
        bookmarks.filter((b: any) => b.id !== movie.id),
      );
    } else {
      setBookmarks((bookmarks) => [...bookmarks, movie]);
      dispatch(addBookmark(movie));
    }

    // Save bookmarks to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  };

  return (
    <main className="homePage-container">
      <Navbar />
      <section className="homePage-container__main">
        <SearchBar value="" icon={searchIcon} />
        <section className="bookmarks-container">
          {bookmarks.map((movie: any) => (
            <MovieCard
              key={movie.id}
              {...movie}
              // release_date={movie.release_date.substring(0, 4)}
              isInCarousel={false} // or true, depending on where it's being rendered
              // className={
              //   isInCarousel ? 'carousel-movieCard' : 'movieCard-container'
              // }
              className="movieCard-container"
              poster_path={movie.poster_path}
              media_type={movie.media_type}
              title={movie.title}
              onBookmark={() => toggleBookmark(movie)}
              isBookmarked={true}
            />
          ))}
        </section>
      </section>
    </main>
  );
};
export default BookMarks;
