import React, { useState, ChangeEvent } from "react";
import { TimePeriod } from "types/types";

type TimePeriodDropdownProps = {
  onTimePeriodChange: (value: TimePeriod) => void;
  selectedTimePeriod: TimePeriod;
};

export const TimePeriodDropdown: React.FC<TimePeriodDropdownProps> = ({
  onTimePeriodChange,
  selectedTimePeriod,
}) => {
  return (
    <select
      value={selectedTimePeriod}
      onChange={(e: ChangeEvent<HTMLSelectElement>) =>
        onTimePeriodChange(e.target.value as TimePeriod)
      }
    >
      <option value="short_term">Short term</option>
      <option value="medium_term">Medium term</option>
      <option value="long_term">Long term</option>
    </select>
  );
};
