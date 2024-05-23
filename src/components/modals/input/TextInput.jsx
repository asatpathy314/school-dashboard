import TextField from "@mui/material/TextField";

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
const TextInput = ({ label, field, defaultValue }) => {
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
        defaultValue={defaultValue}
      />
      <br />
    </>
  );
};

export default TextInput;
