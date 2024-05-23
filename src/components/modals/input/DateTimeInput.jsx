import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextInput from './TextInput';

/**
 * A text input component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.label - The label for the text input.
 * @param {string} props.field - The field name for the text input.
 * @param {string} props.value - The value of the text input.
 * @returns {JSX.Element} The rendered TextInput component.
 */
const DateTimeInput = ({ label, field, defaultValue }) => {
  return (
    <>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              required
              margin = "dense"
              id = "dateTime"
              name={field}
              label={label}
              defaultValue={defaultValue}
              renderInput={(params) => <TextInput {...params} />}
            />
        </LocalizationProvider>
      <br />
    </>
  );
};

export default DateTimeInput;
