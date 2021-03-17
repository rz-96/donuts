import { Select } from 'components/select/select-container';

function PostcodeInput({ onClick, places, postcode, onChangePostcode }) {
  return (
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
          className="inline-block align-center bg-white rounded-lg text-left overflow-visible shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="rounded-lg px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex items-center justify-center">
              <div className="w-10 mx-auto flex-shrink-0 flex items-center justify-center h-12 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div className="w-full mt-3 text-left sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Postleitzahl angeben
                </h3>
                <div className="flex">
                  <Select
                    className="w-2/3"
                    selected={postcode}
                    onChange={onChangePostcode}
                    getText={e => `${e.city} - ${e.postcode}`}
                    values={places}
                  />
                  <button
                    onClick={onClick}
                    type="button"
                    className="w-1/3 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Bestätigen
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-white px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"></div>
        </div>
      </div>
    </div>
  );
}

export { PostcodeInput };
