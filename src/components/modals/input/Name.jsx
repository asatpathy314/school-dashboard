import TextField from "@mui/material/TextField";

/**
 * A component for rendering a text input field for a name.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.label - The label for the input field.
 * @returns {JSX.Element} - The rendered component.
 */
const Name = ( {label} ) => {
    return (
        <TextField
        autoFocus
        required
        margin="dense"
        id="name"
        name="name"
        label={label}
        type="text"
        variant="standard"
      />
    )
}

export default Name

