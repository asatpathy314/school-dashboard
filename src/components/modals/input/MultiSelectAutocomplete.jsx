import TextField from "@mui/material/TextField";
import { Autocomplete } from "@mui/material";

/**
 * MultiSelectAutocomplete component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.options - The options for the autocomplete.
 * @param {string} props.name - The name of the input field.
 * @param {string} props.label - The label for the input field.
 * @param {function} props.changeState - The function to handle state changes.
 * @param {string} props.value - The current value of the input field.
 * @returns {JSX.Element} The MultiSelectAutocomplete component.
 */
const MultiSelectAutocomplete = ({
  options,
  name,
  label,
  changeState,
  defaultValue,
}) => {
  console.log(defaultValue);
  return (
    <Autocomplete
      multiple
      onChange={(event, newValue) => {
        changeState(newValue);
      }}
      options={options}
      defaultValue={defaultValue}
      renderInput={(params) => (
        <TextField
          {...params}
          id="multiSelectAutocomplete"
          name={name}
          label={label}
          type="text"
          variant="standard"
        />
      )}
    />
  );
};

export default MultiSelectAutocomplete;
