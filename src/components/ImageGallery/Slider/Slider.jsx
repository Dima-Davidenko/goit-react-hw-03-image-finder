import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { Dna } from 'react-loader-spinner';

const modalRoot = document.querySelector('#modalRoot');

export class Slider extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    modalImageIdx: PropTypes.number.isRequired,
    closeFunc: PropTypes.func.isRequired,
  };

  state = {
    images: this.props.images,
    modalImageIdx: this.props.modalImageIdx,
    imageForModal: this.props.images[this.props.modalImageIdx].largeImageURL,
    altForModal: this.props.images[this.props.modalImageIdx].tags,
    loading: true,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.closeFunc();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.closeFunc();
    }
  };

  showNextSlide = (target, type) => {
    const typeAction = {
      next: 1,
      previous: -1,
    };
    target.parentNode.classList.remove('loaded');
    const nextModalIdx = this.state.modalImageIdx + typeAction[type];
    const nextModalImage = this.state.images[nextModalIdx];
    this.setState({
      modalImageIdx: nextModalIdx,
      imageForModal: nextModalImage.largeImageURL,
      altForModal: nextModalImage.tags,
      showModal: true,
      loading: true,
    });
  };

  onImageLoaded = target => {
    this.setState({
      loading: false,
    });
    target.parentNode.classList.add('loaded');
  };

  render() {
    const { images, imageForModal, altForModal, modalImageIdx, loading } = this.state;
    return createPortal(
      <div className="Overlay" onClick={this.handleBackdropClick}>
        <div className="Modal">
          <img
            className="modalImg"
            src={imageForModal}
            alt={altForModal}
            onLoad={({ currentTarget }) => this.onImageLoaded(currentTarget)}
          />
          <p className="textForModal">{altForModal}</p>

          <button
            type="button"
            className="slideBtn prevSlide"
            onClick={({ currentTarget }) => {
              this.showNextSlide(currentTarget, 'previous');
            }}
            disabled={!(modalImageIdx > 0) || loading}
          ></button>

          <button
            type="button"
            className="slideBtn nextSlide"
            onClick={({ currentTarget }) => {
              this.showNextSlide(currentTarget, 'next');
            }}
            disabled={!(modalImageIdx < images.length - 1) || loading}
          ></button>

          <Dna
            height="300"
            width="300"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass="spinner"
            visible={true}
          />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Slider;
