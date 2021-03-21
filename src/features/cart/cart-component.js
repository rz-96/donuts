import { Trash } from 'icons/trash';
import { values } from 'ramda';
import React from 'react';

function CartComponent({ cart, onClickRemove, totalPrice }) {
  return (
    <div>
      {cart.map((e, i) => (
        <div key={i}>
          <div className="flex flex-row w-full">
            <div className="w-5/6 flex items-center flex-col justify-center">
              <p className="w-full font-normal">{`1 x ${
                e.title
              } - ${e.price.toFixed(2)}€`}</p>
              {e.selections && (
                <div className="w-full">
                  {values(e.selections).map(selection => (
                    <>
                      {' '}
                      <p className="text-sm font-thin dark:text-white">
                        {`${selection.text} (${selection.price.toFixed(2)}€)`}
                      </p>
                    </>
                  ))}
                </div>
              )}
            </div>

            <div className="items-center w-1/6  justify-center flex my-3">
              <button
                onClick={() => onClickRemove(e.id)}
                name="delete"
                data-test="delete-button"
              >
                <Trash className="w-3/4 text-red-600" />
              </button>
            </div>
          </div>
          <div className="w-100 border-1 my-3" />
        </div>
      ))}
      <div className="w-100 border-1 my-3" />

      {totalPrice > 0 && (
        <div className="my-3 flex flex-row w-full">
          <div className="w-5/6">
            <p className="font-normal">Gesamtbetrag</p>
            <p className="font-thin text-xs">{'inkl. Mwst.'}</p>
          </div>

          <div className="items-center w-1/6  justify-center flex">
            <p>{totalPrice.toFixed(2)}€</p>
          </div>
        </div>
      )}
      {/* {totalPrice > 0 && (
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
      )} */}
    </div>
  );
}

export { CartComponent };
