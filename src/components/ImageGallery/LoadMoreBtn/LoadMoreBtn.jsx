import React from 'react';
import PropTypes from 'prop-types';

function LoadMoreBtn({ onClick, disabled }) {
  return (
    <button className="Button" onClick={onClick} disabled={disabled}>
      Load more
    </button>
  );
}

LoadMoreBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default LoadMoreBtn;
