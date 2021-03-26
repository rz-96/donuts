import { Clock } from 'icons/clock';
import { rem } from 'polished';
import React from 'react';

function ShopClosedComponent({ open, onClickClose, t }) {
  return open ? (
    <div className="overflow-visible fixed z-10 inset-0 ">
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
          className="inline-block align-bottom bg-brand-primary-dark dark:bg-black rounded-lg text-left overflow-visible shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-1/2"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="p-3 flex justify-center flex-col items-center">
            <Clock className="w-14 text-white" />
            <h1
              style={{
                fontweight: '10',
                fontSize: rem(30),
                color: 'white',
                textAlign: 'center',
              }}
            >
              {t('common:shop-closed')}
            </h1>

            <button
              className="btn bg-white text-black hover:text-white"
              style={{ marginTop: rem(10), marginBottom: rem(13) }}
              onClick={onClickClose}
            >
              {t('common:alright')}
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export { ShopClosedComponent };
