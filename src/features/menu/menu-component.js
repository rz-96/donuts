import { Button } from '@material-ui/core';
import { Label } from 'components/label/label-component-styles';
import { Select } from 'components/select/select-container';
import { rem } from 'polished';
import React from 'react';

function MenuComponent({
  getOption,
  product,
  isOpen,
  onClickAdd,
  onChangeOption,
  onClickAbort,
}) {
  return isOpen ? (
    <div
      className="overflow-visible fixed z-10 inset-0 "
      data-test="menu-modal"
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className="bg-white dark:bg-black inline-block align-bottom  rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full md:w-96"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div
            className="dark:text-white"
            style={{
              display: 'flex',
              justifyContent: 'center',
              borderRadius: '10px',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '20px',
            }}
          >
            <p className="text-2xl font-semibold dark:text-white">
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
                  <div className="dark:text-white m-2" key={i}>
                    <Label
                      className="dark:text-white"
                      id="demo-simple-select-label"
                    >
                      {extra.text}
                    </Label>
                    <Select
                      className="w-full"
                      selected={getOption(extra._id)}
                      onChange={e =>
                        onChangeOption({
                          optionId: e._id,
                          extraId: extra._id,
                        })
                      }
                      getText={e => `${e.text} (${e.price.toFixed(2)}€)`}
                      values={extra.options}
                    />
                    {/* <Select
                    className="dark:text-white"
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
                      <MenuItem
                        className="dark:text-white"
                        key={i}
                        value={e._id}
                      >
                        {`${e.text} (${e.price.toFixed(2)})€`}
                      </MenuItem>
                    ))}
                  </Select> */}
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
                <button
                  onClick={onClickAbort}
                  style={{
                    marginLeft: rem(10),
                    width: rem(150),
                    borderColor: 'black',
                  }}
                  className="border-solid bg-white dark:bg-black dark:text-white"
                  size="large"
                >
                  Abbrechen
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export { MenuComponent };
