import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, SearchIcon } from '@heroicons/react/24/outline';

export default function SearchApp({ isSearchOpen, closeSearch }) {
    return (
        <Transition.Root show={isSearchOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeSearch}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-x-0 top-0 flex max-h-full">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="-translate-y-full"
                                enterTo="translate-y-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-y-0"
                                leaveTo="-translate-y-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen h-full">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 bg-slate-100">
                                            <div className="flex items-start justify-between">
                                                {/* <Dialog.Title className="text-lg font-medium text-gray-900">Search</Dialog.Title> */}
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                        onClick={closeSearch}
                                                    >
                                                        <span className="absolute -inset-0.5" />
                                                        <span className="sr-only">Close panel</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-8 bg-transparent-gray-100">
                                                <div className="flex justify-center py-2">
                                                    <input
                                                        type="text"
                                                        className="w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm hover:ring-gray-500 hover:border-gray-500 transition-all duration-300 sm:text-sm"
                                                        placeholder="最新猫咪产品"
                                                    />
                                                    <div className="sm:flex sm:flex-row-reverse">
                                                        <button
                                                            type="button"
                                                            className="mt-3 inline-flex w-full justify-end bg-transparent px-4 py-2 text-base font-small text-gray-700 hover:text-gray-500 sm:mt-0 sm:w-auto sm:text-sm"
                                                            onClick={closeSearch}
                                                        >
                                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}