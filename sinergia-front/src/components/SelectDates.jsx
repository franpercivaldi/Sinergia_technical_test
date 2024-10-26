import * as React from 'react';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

const SelectDates = ({ onChange }) => {
  const handleDateChange = (newValue) => {
    onChange(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoItem label="Período de inactividad" component="DateRangePicker">
        <DateRangePicker
          calendars={1}
          onChange={handleDateChange}
        />
      </DemoItem>
    </LocalizationProvider>
  );
};

export default SelectDates;
