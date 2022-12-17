import { Paper, Typography } from '@mui/material';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React from 'react';

const MyPaper = styled(Paper)`
  padding: 40px;
  margin-bottom: 20px;
`;

const Section = ({ title, variant, children }) => {
  return (
    <MyPaper>
      <Typography variant={variant} sx={{ mb: 3 }}>
        {title}
      </Typography>
      {children}
    </MyPaper>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};

export default Section;
