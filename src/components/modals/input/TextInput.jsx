import TextField from "@mui/material/TextField";

/**
 * A component for rendering a text input field for a name.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.label - The label for the input field.
 * @returns {JSX.Element} - The rendered component.
 */
const TextInput = ( {label, field} ) => {
    return (
      <>
          <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name={field}
          label={label}
          type="text"
          variant="standard"
          />
          <br />
      </>
    )
}

export default TextInput
