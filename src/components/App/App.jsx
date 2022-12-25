import { Component } from 'react';
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

export class App extends Component {
  state = {
    page: 1,
    query: '',
    items: [],
    isLoading: false,
  };

  handleSubmitQuery = query => {
    if (query === '') {
      toast.error('Please, enter some query');
      return;
    }
    this.setState({ query, page: 1, items: [] });
  };

  async componentDidUpdate(_, prevState) {
    const { page, query } = this.state;
    if (prevState.page !== page || prevState.query !== query) {
      try {
        this.setState({ isLoading: true });
        const images = await API.fetchImg(page, query);

        if (images.length === 0) {
          toast.error(
            `Sorry, we couldn't find the images by this query: "${query}" . Try something other.`
          );
          this.setState({ isLoading: false });
          return;
        }
        this.setState({ isLoading: false });

        this.setState(prevState => ({
          items: [...prevState.items, ...images],
        }));
      } catch (error) {
        toast.error(
          `Sorry, something happened. Please, reload page and try one more.`
        );
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  onLoadMore = () => {
    // if (this.state.query.length > 0) {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    // }
  };

  render() {
    const { items, isLoading } = this.state;

    return (
      <div className={styles.app}>
        <GlobalStyle />
        <Toaster position="top-right" />
        <Searchbar onSubmit={this.handleSubmitQuery} />
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
        {items.length > 0 && (
          <Button onLoadMore={this.onLoadMore}>Load more</Button>
        )}
      </div>
    );
  }
}
