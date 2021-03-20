import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { values } from 'ramda';
import React from 'react';

function CartComponent({ cart, onClickRemove, totalPrice }) {
  return (
    <List>
      {cart.map((e, i) => (
        <div key={i}>
          <ListItem alignItems="flex-start">
            <ListItemText
              primary={`1 x ${e.title} - ${e.price.toFixed(2)}€`}
              secondary={
                <>
                  {e.selections &&
                    values(e.selections).map(selection => (
                      <>
                        {' '}
                        <p className="dark:text-white">
                          {`${selection.text} (${selection.price.toFixed(2)}€)`}
                        </p>
                      </>
                    ))}
                </>
              }
            />
            <ListItemSecondaryAction title={e.price}>
              <IconButton
                onClick={() => onClickRemove(e.id)}
                edge="end"
                aria-label="delete"
              >
                <Delete color="error" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </div>
      ))}
      <Divider />
      {totalPrice > 0 && (
        <ListItem alignItems="flex-start">
          <ListItemText
            primary={'Gesamtbetrag'}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                ></Typography>
                {'inkl. Mwst.'}
              </React.Fragment>
            }
          />

          <ListItemSecondaryAction>
            <Typography>{totalPrice.toFixed(2)}€</Typography>
          </ListItemSecondaryAction>
        </ListItem>
      )}
    </List>
  );
}

export { CartComponent };
