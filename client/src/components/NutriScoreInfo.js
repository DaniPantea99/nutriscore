import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

export default function NutriScoreInfo({ showModal, onClose }) {
  const { t } = useTranslation();
  return (
    <>
      <Transition appear show={showModal} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl p-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Nutri-Score Info
                  </Dialog.Title>
                  <div className="flex flex-col gap-2 my-2 text-sm text-justify text-gray-500">
                    <p>{t('nutriscore.description.firstParagraph')}</p>
                    <p>{t('nutriscore.description.secondParagraph')}</p>
                    <p>{t('nutriscore.description.thirdParagraph')}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    <span>
                      {t('nutriscore.description.source')}:{' '}
                      <a
                        className="hover:text-blue-500 active:text-blue-600"
                        href="https://en.wikipedia.org/wiki/Nutri-Score"
                        alt="wikipedia"
                      >
                        Wikipedia
                      </a>
                    </span>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => onClose(false)}
                    >
                      {t('nutriscore.description.button')}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
