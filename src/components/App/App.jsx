import { useState, useEffect, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { Button } from '../Button/Button';
import { GlobalStyle } from '../GlobalStyle';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Searchbar } from '../Searchbar/Searchbar';
import { Grid } from '../GallerySceleton/GallerySceleton';
import { Box } from 'components/Box/Box';
import * as API from '../services/galleryApi';
import styles from './App.module.css';
import { Loader } from 'components/Loader/Loader';

export const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isFirstRender = useRef(true);

  const handleSubmitQuery = searchQuery => {
    if (searchQuery === '') {
      toast.error('Please, enter some query');
      return;
    }
    setQuery(searchQuery);
    setPage(1);
    setItems([]);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      console.log('first');
      isFirstRender.current = false;
      return;
    }

    async function fetch() {
      try {
        if (query.length === 0) {
          console.log(
            'чого при відкритті сторінки запускається функція fetch якщо є перевірка на перший рендер, яка спрацьовує?'
          );
          return;
        }

        setIsLoading(true);
        const images = await API.fetchImg(page, query);

        if (images.length === 0) {
          toast.error(
            `Sorry, we couldn't find the images by this query: "${query}" . Try something other.`
          );
          setIsLoading(false);
          return;
        }
        setIsLoading(false);
        setItems(prevState => [...prevState, ...images]);
      } catch (error) {
        console.log(error);
        toast.error(
          `Sorry, something happened. Please, reload page and try one more.`
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetch();
  }, [page, query]);

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div className={styles.app}>
      <GlobalStyle />
      <Toaster position="top-right" />
      <Searchbar onSubmit={handleSubmitQuery} />
      <ImageGallery items={items} />
      {isLoading && items.length === 0 && (
        <Box
          display="flex"
          justifyContent="center"
          wight="100wv"
          height="100vh"
        >
          <Grid />
        </Box>
      )}
      {isLoading && items.length > 0 && <Loader />}
      {items.length > 0 && <Button onLoadMore={onLoadMore}>Load more</Button>}
    </div>
  );
};
