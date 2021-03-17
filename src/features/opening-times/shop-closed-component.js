import { Button, Modal } from '@material-ui/core';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import { rem } from 'polished';
import React from 'react';

function ShopClosedComponent({ open, onClickClose }) {
  return (
    <div className="flex justify-center items-center absolute">
      <Modal className="flex items-center justify-center" open={open}>
        <div
          style={{
            width: rem(500),
            margin: rem(50),
            borderRadius: '10px',
            background: 'red',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            padding: rem(10),
            fontSize: '20px',
          }}
        >
          <QueryBuilderIcon
            style={{ fontweight: rem(10), fontSize: rem(70), color: 'white' }}
          />
          <h1
            style={{
              fontweight: '10',
              fontSize: rem(30),
              backgroundColor: 'red',
              color: 'white',
              textAlign: 'center',
            }}
          >
            Wir haben momentan geschlossen. Morgen sind wir wieder für Sie da.
          </h1>

          <Button
            style={{ marginTop: rem(10), marginBottom: rem(13) }}
            variant="contained"
            size="medium"
            color="white"
            backgroundColor="red"
            onClick={onClickClose}
          >
            Alles klar!
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export { ShopClosedComponent };
