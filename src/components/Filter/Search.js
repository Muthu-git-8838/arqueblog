import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

import SelectComponent from "./SelectComponent";

var isExists = false;

const Search = ({
  onFocus=()=>{},
  selectValue,
  onSelectChange,
  value = "",
  onChange = () => {},
}) => {
  const navigate = useNavigate();

  return (
    <Paper
      component="form"
      sx={{
        backgroundColor:'background.primary',
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: { xs: "100%", md: "100%" },
        marginTop: 3,
      }}
    >
      <SelectComponent
        selectValue={selectValue}
        onSelectChange={onSelectChange}
        onFocus={onFocus}
      />

      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        type="search"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        onFocus={onFocus}

        className="input"
        inputProps={{ "aria-label": "search google maps" }}
      />
      <IconButton
        onClick={() => navigate("/search-results")}
        sx={{ p: "10px" }}
        aria-label="search"
        bgcolor="blue"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default Search;
