import TextField from "@mui/material/TextField";
import { Autocomplete } from "@mui/material";

/**
 * Renders a single select autocomplete component.
 *
 * @component
 * @param {Object[]} options - The options for the autocomplete.
 * @param {string} name - The name of the input field.
 * @param {string} label - The label for the input field.
 * @returns {JSX.Element} The single select autocomplete component.
 */
const SingleSelectAutocomplete = ( { options, name, label } ) => {
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
          />
        )}
      />
    )
}

export default SingleSelectAutocomplete