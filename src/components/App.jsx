import React, { Component } from 'react';
import { Searchbar, ImageGallery } from './';
import styled from '@emotion/styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  margin: 0 auto 10px;
  width: 70%;
`;

export class App extends Component {
  state = {
    query: '',
    showModal: false,
  };

  setImageQuery = query => {
    this.setState({
      query,
      page: 1,
    });
  };

  notify = (msg, params) => toast(msg, params);

  render() {
    const { query } = this.state;
    return (
      <Container>
        <Searchbar setImageQuery={this.setImageQuery} />
        <ImageGallery query={query} notification={this.notify} />
        <ToastContainer />
      </Container>
    );
  }
}

export default App;
