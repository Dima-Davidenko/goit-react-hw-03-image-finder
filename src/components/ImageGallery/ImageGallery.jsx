import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Dna } from 'react-loader-spinner';
import { fetchPixabayImages } from '../../utils';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';

import { PICTURES_ON_PAGE } from '../../constants/constants';
import Slider from './Slider/Slider';

export class ImageGallery extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
    notification: PropTypes.func.isRequired,
  };

  state = {
    images: [],
    page: 1,
    totalPages: 0,
    isLoading: false,
    showModal: false,
    modalImageIdx: 0,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery } = prevProps;
    const { query } = this.props;
    const { page: prevPage } = prevState;
    const { page } = this.state;
    if (query !== prevQuery) {
      try {
        this.setState({ isLoading: true });
        const { hits, totalHits } = await fetchPixabayImages(query, 1);
        if (!hits.length) {
          this.props.notification("Didn't find anything", {
            icon: '🤦',
          });
        }
        this.setState({
          images: [...hits],

          totalPages: Math.ceil(totalHits / PICTURES_ON_PAGE),
          page: 1,
        });
      } catch (error) {
        this.props.notification(`Something went wrong! ${error.message}`, {
          icon: '😱',
        });
      } finally {
        this.setState({
          isLoading: false,
        });
      }
    } else if (page !== prevPage && page > 1) {
      try {
        this.setState({ isLoading: true });
        const { hits } = await fetchPixabayImages(query, page);
        this.setState({ images: [...prevState.images, ...hits] });
      } catch (error) {
        this.props.notification(`Something went wrong! ${error.message}`, {
          icon: '😱',
        });
      } finally {
        this.setState({
          isLoading: false,
        });
      }
    }
  }

  handleLoadMoreBtnClick = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  handleImageClick = imageID => {
    const modalIdx = this.state.images.findIndex(({ id }) => id === imageID);
    this.setState({
      modalImageIdx: modalIdx,
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { images, page, isLoading, totalPages, showModal, modalImageIdx } = this.state;
    return (
      <>
        {isLoading && (
          <Dna
            height="300"
            width="300"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass="spinner"
            visible={true}
          />
        )}
        <ul className="ImageGallery">
          {images.map(({ id, webformatURL, tags }) => (
            <ImageGalleryItem
              key={id}
              id={id}
              webformatURL={webformatURL}
              tags={tags}
              onImageClick={this.handleImageClick}
            />
          ))}
        </ul>
        {page < totalPages && (
          <LoadMoreBtn onClick={this.handleLoadMoreBtnClick} disabled={isLoading} />
        )}
        {showModal && (
          <Slider
            images={images}
            modalImageIdx={modalImageIdx}
            closeFunc={this.closeModal}
          ></Slider>
        )}
      </>
    );
  }
}

export default ImageGallery;
