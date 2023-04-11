import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Label from "./Label";

const parseValue = (value) => {
  return value
    ? typeof value === "string"
      ? value
      : value.id || value._id || value.key
    : "";
};

export default function BasicSelect(props) {
  const [value, setValue] = React.useState(null);
  const handleChange = (event) => {
    setValue(parseValue(event.target.value));
    props.onChange(event);
  };

  React.useEffect(() => {
    if (value === null && props.values.length > 0) {
      props.onChange({
        target: {
          value: props.multiple
            ? [parseValue(props.values[0])]
            : parseValue(props.values[0]),
        },
      });
      setValue(parseValue(props.values[0]));
    }
  }, [value, props.values]);

  React.useEffect(() => {
    if (props.value) setValue(props.value);
  }, [props.value]);

  return (
    <>
      {props.label && <Label {...props} />}
      <FormControl fullWidth>
        <Select
          value={value}
          defaultValue={value}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          label={" "}
          sx={{
            "& legend": { display: "none" },
            textAlign: "left",
          }}
          {...props}
          onChange={handleChange}
        >
          {props.values.map((v) => {
            const name = typeof v === "string" ? v : v.name || v.label;
            const id = typeof v === "string" ? v : v.id || v._id || v.key;

            return <MenuItem value={id}>{name}</MenuItem>;
          })}
        </Select>
        {/* <FormHelperText>Without label</FormHelperText> */}
      </FormControl>
    </>
  );
}

BasicSelect.defaultProps = {
  values: [],
  onChange: () => {},
  label: "N/A",
  id: "outlined-select",
};
