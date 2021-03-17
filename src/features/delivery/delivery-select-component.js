import React from 'react';

function DeliverySelectComponent({ onClickDelivery, onClickPickup, open }) {
  return (
    open && (
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
            className="inline-block align-bottom bg-white rounded-lg text-left overflow-visible shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-1/5"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="rounded-lg px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="justify-center sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4">
                  <h3
                    className="text-2xl text-center leading-6 font-medium text-gray-900"
                    id="modal-headline"
                  >
                    Abholen oder Liefern?
                  </h3>
                </div>
              </div>
            </div>
            <div className="flex justify-center rounded-lg bg-white px-4 py-3 sm:px-6 ">
              <button
                data-test="pickup"
                name="Abholen"
                onClick={onClickPickup}
                type="button"
                className="w-1/2 m-2 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-lg font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:text-lg"
              >
                Abholen
              </button>
              <button
                onClick={onClickDelivery}
                type="button"
                className="w-1/2 m-2 border-red-600 inline-flex justify-center rounded-md border shadow-sm px-4 py-2 font-medium text-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:text-lg"
              >
                Liefern
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export { DeliverySelectComponent };
