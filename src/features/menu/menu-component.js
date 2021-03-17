import { Button, InputLabel, MenuItem, Modal, Select } from '@material-ui/core';
import { rem } from 'polished';
import React from 'react';

import { ModalContainer } from './menu-component-styles';

function MenuComponent({
  getOption,
  product,
  isOpen,
  onClickAdd,
  onChangeOption,
  onClickAbort,
}) {
  return isOpen ? (
    <ModalContainer data-test="menu-modal">
      <Modal
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
        }}
        open={isOpen}
      >
        <div
          style={{
            margin: rem(50),
            borderRadius: '10px',
            background: 'white',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
          }}
        >
          <p className="text-2xl font-semibold">
            {product.menu ? product.menu.title : 'Produkt hinzufügen'}
          </p>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {product.menu &&
              product.menu.extras.map((extra, i) => (
                <div key={i} className="m-2">
                  <InputLabel id="demo-simple-select-label">
                    {extra.text}
                  </InputLabel>
                  <Select
                    style={{ width: '100%' }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={getOption(extra._id)._id}
                    onChange={e =>
                      onChangeOption({
                        optionId: e.target.value,
                        extraId: extra._id,
                      })
                    }
                  >
                    {extra.options.map((e, i) => (
                      <MenuItem key={i} value={e._id}>
                        {`${e.text} (${e.price.toFixed(2)})€`}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              ))}
            <div className="flex flex-row mt-4">
              <Button
                onClick={onClickAdd}
                className="mr-2"
                style={{
                  marginRight: rem(10),
                  width: rem(150),
                  color: 'white',
                  backgroundColor: 'red',
                }}
                variant="outlined"
                color="primary"
                size="large"
              >
                Hinzufügen
              </Button>
              <Button
                onClick={onClickAbort}
                style={{
                  marginLeft: rem(10),
                  width: rem(150),
                  color: 'black',
                  backgroundColor: 'white',
                  borderColor: 'black',
                }}
                variant="outlined"
                color="primary"
                size="large"
              >
                Abbrechen
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </ModalContainer>
  ) : null;
}

export { MenuComponent };
