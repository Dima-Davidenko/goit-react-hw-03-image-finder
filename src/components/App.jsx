import React, { Component } from 'react';
import { Section, Filter, Contacts, NewContactForm } from './';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { nanoid } from 'nanoid';
import * as storageApi from '../utils/storageApi';

const Container = styled.div`
  margin: 0 auto;
  width: 70%;
`;

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = storageApi.load('contacts');
    if (savedContacts) {
      this.setState({ contacts: savedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      storageApi.save('contacts', this.state.contacts);
    }
  }

  addContact = ({ name, number }) => {
    if (this.state.contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())) {
      alert('Контакт з таким іменем вже існує');
    } else {
      this.setState(prevState => ({
        contacts: [
          ...prevState.contacts,
          {
            id: nanoid(),
            name,
            number,
          },
        ],
      }));
    }
  };

  setFilter = filter => {
    this.setState({
      filter: filter.toLowerCase().trim(),
    });
  };

  filterContacts = () => {
    const { contacts } = this.state;
    return contacts.filter(({ name }) => name.toLowerCase().includes(this.state.filter));
  };

  removeContact = idToRemove => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(({ id }) => id !== idToRemove),
    }));
  };
  render() {
    return (
      <Container>
        <Typography variant="h2" sx={{ mb: 10 }}>
          Телефонна книжка
        </Typography>
        <Section title="Додати новий контакт" variant="h3">
          <NewContactForm addContact={this.addContact} />
        </Section>
        <Section title="Ваші контакти" variant="h3">
          <Contacts contactsToShow={this.filterContacts()} removeContact={this.removeContact}>
            <Filter setFilter={this.setFilter} />
          </Contacts>
        </Section>
      </Container>
    );
  }
}

export default App;
