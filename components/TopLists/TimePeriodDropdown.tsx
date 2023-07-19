import React, { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { TimePeriod } from "types/types";
import { classNames } from "utils/classNames";
import SignOut from "../sign-out";

type TimePeriodDropdownProps = {
  onTimePeriodChange: (value: TimePeriod) => void;
  selectedTimePeriod: TimePeriod;
};

const timePeriods = [
  { id: "short_term", name: "Short term" },
  { id: "medium_term", name: "Medium term" },
  { id: "long_term", name: "Long term" },
];

export const TimePeriodDropdown: React.FC<TimePeriodDropdownProps> = ({
  onTimePeriodChange,
  selectedTimePeriod,
}) => {
  const [selected, setSelected] = useState(
    timePeriods.find((period) => period.id === selectedTimePeriod)
  );

  const handleSelect = (value: (typeof timePeriods)[0]) => {
    setSelected(value);
    onTimePeriodChange(value.id as TimePeriod);
  };

  return (
    <Listbox value={selected} onChange={handleSelect}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
            Assigned to
          </Listbox.Label>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 sm:text-sm sm:leading-6">
              <span className="block truncate">{selected?.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {timePeriods.map((period) => (
                  <Listbox.Option
                    key={period.id}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-green-600 text-white" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={period}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {period.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-green-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};
