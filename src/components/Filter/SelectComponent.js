import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch } from "react-redux";
import { getCategories } from "../../store/common/CommonActions";
import { useSelector } from "react-redux";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function SelectComponent({
  onFocus = () => {},
  selectValue = "",
  onSelectChange = () => {},
}) {
  const [personName, setPersonName] = React.useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const categories = useSelector((state) => state.common.categories);

  return (
    <div>
      <FormControl sx={{ minWidth: 80, }} size="small" variant="filled">
        {/* <InputLabel id="demo-select-small">All</InputLabel> */}
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={selectValue}
          onChange={(e) => onSelectChange(e.target.value)}
          size="small"
          onFocus={onFocus}
          MenuProps={MenuProps}
         
        >
          <MenuItem key={"all"} value={"all"}>
            <ListItemText primary={"All"} />
          </MenuItem>
          {categories &&
            categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                <ListItemText primary={category.name} />
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
