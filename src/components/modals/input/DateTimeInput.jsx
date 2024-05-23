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
const DateTimeInput = ({ label, field, changeState }) => {
  const handleChange = (newValue) => {
    changeState(newValue)
  };
  
  return (
    <>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker 
            required
            margin="dense"
            id="name"
            label={label}
            field={field}
            onChange={handleChange}
            variant="standard" />
        </LocalizationProvider>
      <br />
    </>
  );
};

export default DateTimeInput;
