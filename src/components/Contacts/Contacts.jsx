import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

function Contacts({ contactsToShow, children, removeContact }) {
  const handleRemoveBtnClick = evt => {
    removeContact(evt.currentTarget.dataset.id);
  };

  return (
    <div>
      {children}
      <Grid item xs={12} md={6}>
        <List sx={{ maxWidth: '500px' }}>
          {contactsToShow.map(({ id, name, number }) => (
            <ListItem
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  data-id={id}
                  onClick={evt => handleRemoveBtnClick(evt)}
                >
                  <DeleteIcon />
                </IconButton>
              }
              key={id}
            >
              <ListItemAvatar>
                <Avatar>
                  <LocalPhoneIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={`${name}  ${number}`} />
            </ListItem>
          ))}
        </List>
      </Grid>
    </div>
  );
}

Contacts.propTypes = {
  contactsToShow: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  removeContact: PropTypes.func.isRequired,
};

export default Contacts;
