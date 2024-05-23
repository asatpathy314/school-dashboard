import TextField from "@mui/material/TextField";
import { Autocomplete } from "@mui/material";

/**
 * A component that renders a single select autocomplete input field.
 *
 * @component
 * @param {Object[]} options - The options for the autocomplete.
 * @param {string} name - The name of the input field.
 * @param {string} label - The label for the input field.
 * @param {string} value - The current value of the input field.
 * @returns {JSX.Element} The rendered SingleSelectAutocomplete component.
 */
const SingleSelectAutocomplete = ( { options, name, label, value } ) => {
    return (
        <Autocomplete
        options={options}
        renderInput={(params) => (
          <TextField
            {...params}
            margin="dense"
            id="multiSelectAutocomplete"
            name={name}
            label={label}
            type="text"
            variant="standard"
            value={value}
          />
        )}
      />
    )
}

export default SingleSelectAutocomplete