"use strict";

import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  recommendations: any;
};

export const RecommendationsModal: React.FC<Props> = ({
  open,
  setOpen,
  recommendations,
}) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Dialog.Overlay className="fixed inset-0 bg-gray-900 opacity-75" />
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center">
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all">
            <div className="p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">
                  Create this playlist?
                </h2>
                <button
                  className="inline-flex rounded-md p-1 hover:bg-gray-200"
                  onClick={() => setOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="space-y-4 mt-4">
                {recommendations.map(
                  (track: SpotifyApi.TrackObjectFull, index: number) => (
                    <div
                      key={index}
                      className="bg-white shadow overflow-hidden sm:rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105 w-full xss:w-[368px] cursor-default"
                    >
                      <div className="flex items-center">
                        <Image
                          src={track.album.images[2].url}
                          alt={track.name}
                          className="w-16 h-16 mr-4"
                          width={64}
                          height={64}
                          quality={100}
                          loading="eager"
                        />
                        <div className="flex-1">
                          <h3 className="text-md leading-5 font-medium text-gray-900 overflow-ellipsis">
                            {track.name}
                          </h3>
                          <p className="mt-1 max-w-2xl text-sm text-gray-500 capitalize overflow-ellipsis">
                            {track.artists
                              .map(
                                (artist: SpotifyApi.ArtistObjectSimplified) =>
                                  artist.name
                              )
                              .join(", ")}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
            <button
              type="button"
              className="inline-flex justify-center w-[200px] border border-transparent shadow-sm p-4 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
              onClick={() => {
                /* Add function to create the playlist here */
              }}
            >
              Confirm
            </button>
            <button
              type="button"
              className="w-[200px] inline-flex justify-center border border-gray-300 shadow-sm p-4 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:text-sm"
              onClick={() => setOpen(false)}
              ref={cancelButtonRef}
            >
              Close
            </button>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
