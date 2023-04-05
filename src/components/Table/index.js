import { React, useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { capitalizeFirstLetter } from "../../helpers/functions";
import apiRequest from "../../services/auth";
import Image from "../Image";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { Container } from "@mui/system";
import {
  Button,
  Grid,
  Card,
  Box,
  TextField,
  Typography,
  Stack,
  IconButton,
  Select,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import * as yup from "yup";
import { Validate } from "../../helpers/functions";
import FileUpload from "../../components/FileUpload";
import TablePagination from "@mui/material/TablePagination";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Checkbox from "@mui/material/Checkbox";

const getColumns = (rows = []) => {
  if (rows && rows.length === 0) return [];
  return Object.keys(rows[0]).map((x) => x);
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const schema = yup.object().shape({
  name: yup.string().required().label("Name"),
  description: yup.string().required().label("Description"),
  image: yup.array().min(1).label("Category Icon").optional(),
});
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Tables({
  handleCreate = () => {},
  handleEdit = () => {},
  handleDelete = () => {},
  handleExport = () => {},
  handleUpload = () => {},
  namespace = "",
  title = "",
  refresh = false,
  type = false,
}) {
  const [data, setData] = useState({
    name: "",
    description: "",
    image: [],
  });
  const [open, setOpen] = useState(false);
  const [allChecked, setAllChecked] = useState(false);
  const [checked, setChecked] = useState([]);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [exportData, setExportData] = useState(false);
  const [exportAddress, setExportAddress] = useState(false);
  const [filterBy, setFilterBy] = useState(false);
  const [filterField, setFilterField] = useState("");
  const [searchText, setSerachText] = useState("");
  const [upload, setUpload] = useState(false);
  const [update, setUpdate] = useState(false);
  const [error, setError] = useState({ path: null });
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [age, setAge] = useState("");

  const handleChange1 = (event) => {
    setAge(event.target.value);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  console.log("S-s-s>>>>>columns>>>>>", columns);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const filesUploaded = event.target.files;
    handleUpload(filesUploaded);
  };
  const Add = async () => {
    console.log("$$$$$$~~~~~~~~~>>>", data);
    setError({ path: null });
    let error = await Validate(schema, data);
    setError(error);
    if (error) return;
    setLoading(true);
    const response = await apiRequest({
      url: "category",
      method: "POST",
      data,
    });
    setLoading(false);
    handleClose();
    window.location.reload();
  };
  const get = async () => {
    const response = await apiRequest({
      url: namespace,
      method: "GET",
    });
    if (response.success) {
      setColumns(response.data.columns);
      setRows(response.data.rows);
      setDisabled(response.data.disabled || false);
      setExportData(response.data.export || false);
      setExportAddress(response.data.exportShippingAddress || false);
      setFilterBy(response.data.columns.map((c) => c.path));
      setUpload(response.data.upload || false);
      setUpdate(response.data.update || false);
    }
  };
  console.log("~~~~~jkkkkkkkkkkkk", filterBy);
  useEffect(() => {
    get();
    setChecked([]);
  }, [refresh]);

  useEffect(() => {
    setExportData(false);
    setExportAddress(false);
    setFilterBy(false);
    setFilterField("");
    setSerachText("");
  }, [type]);

  const filterColumn = filterField
    ? columns.find((column) => column.path === filterField)
    : false;

  return (
    <>
      <Grid container >
        <Grid item xs={12}>
           <Stack direction={'row'}  flexWrap={'wrap'} display={'flex'} spacing={2}>
           {filterBy && (
                <Box display={'flex'} spacing={3} columnGap={2} flexWrap={'wrap'}>
                  <Box sx={{ minWidth: 200, maxWidth: 200 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Filter By
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Filter By"
                        onChange={(e) => {
                          setSerachText("");
                          setFilterField(e.target.value);
                        }}
                        class="admin-edit-input"
                        aria-label=".form-select-lg"
                      >
                        {filterBy.map((by) => {
                          return <MenuItem value={by}>{by}</MenuItem>;
                        })}
                      </Select>
                    </FormControl>
                  </Box>
                  {filterField && filterColumn && (
                    <Box
                    >
                      {filterColumn.instance === "ENUM" ? (
                        <Box
                        >
                          <Select
                            class="admin-edit-input"
                            aria-label=".form-select-lg"
                            value={searchText}
                            onChange={(e) => {
                              setSerachText(e.target.value);
                            }}
                          >
                            {filterColumn.values.map((value) => {
                              return <MenuItem value={value}>{value}</MenuItem>;
                            })}
                          </Select>
                        </Box>
                      ) : filterColumn.instance === "Boolean" ? (
                        <Box>
                          <FormControl fullWidth>
                            <Select
                              class="admin-edit-input"
                              aria-label=".form-select-lg"
                              disabled={disabled}
                              value={searchText}
                              onChange={(e) => {
                                setSerachText(e.target.value);
                              }}
                            >
                              <MenuItem value="True">{"true"}</MenuItem>
                              <MenuItem value="False">{"false"}</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      ) : (
                        <TextField
                          className="admin-edit-input"
                          onChange={(e) => {
                            setSerachText(e.target.value);
                          }}
                          placeholder={filterColumn.path}
                          value={searchText}
                        />
                      )}
                    </Box>
                  )}
                </Box>
              )}
                <Stack direction={"row"} spacing={2}>

              {!disabled && (
                         <Button
                  color="secondary"
                  size="large"
                  sx={{
                    fontWeight: 100,
                    textTransform: "none",
                    borderRadius: 4,
                    bgcolor: "#ce93d8",
                    color: "#000",
                  }}
                  variant="contained"
                  onClick={() => handleCreate(columns)}
                >
                  CREATE NEW
                </Button>
              )}
              {!disabled && checked.length > 0 && (
                <Button
                size="large"
                sx={{
                  fontWeight: 100,
                  textTransform: "none",
                  borderRadius: 4,
                }}
                  onClick={() => {
                    rows.forEach((row, i) => {
                      checked.includes(i) && handleDelete(row);
                    });
                  }}
                  variant="contained"
                  color="error"
                >
                  Delete
                </Button>
              )}
                         </Stack>

           </Stack>

        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item>
              <Paper
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  width: "100%",
                }}
              >
                <TableContainer sx={{ maxHeight: 480, maxWidth: 1150 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column, idx) => {
                          return idx === 0 ? (
                            <StyledTableCell scope="col">
                              <Box className="data-area-email-main mx-3 ">
                                <Stack direction={"row"} spacing={3}>
                                  <Checkbox
                                    size="small"
                                    onChange={() =>
                                      setChecked(
                                        rows.length === checked.length
                                          ? []
                                          : rows.map((i, idx) => idx)
                                      )
                                    }
                                    type="checkbox"
                                    id={`checkbox-header-${idx}`}
                                    checked={
                                      checked.length > 0 &&
                                      rows.length === checked.length
                                    }
                                  />
                                  <Typography
                                    htmlFor={`checkbox-header-${idx}`}
                                  >
                                    {column.path}
                                  </Typography>
                                </Stack>
                              </Box>
                            </StyledTableCell>
                          ) : (
                            <StyledTableCell scope="col">
                              <Box className="data-area-text-main  mx-3">
                                {column.path}
                              </Box>
                            </StyledTableCell>
                          );
                        })}
                        <StyledTableCell>Actions</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row, i) => {
                        return (
                          (!filterField ||
                            (row[filterField]
                              ? typeof row[filterField] === "boolean"
                                ? row[filterField] == true
                                  ? "true"
                                  : "false"
                                : typeof row[filterField] === "number"
                                ? String(row[filterField])
                                : row[filterField]
                              : ""
                            ).includes(searchText)) && (
                            <StyledTableRow
                              id={`tr-${i}`}
                              key={`tr-${i}`}
                              className={`data-area ${
                                i % 2 === 0 ? "bg-dark-brown" : "bg-light-brown"
                              }`}
                            >
                              {Object.values(row).map((o, idx) => {
                                return idx === 0 ? (
                                  <TableCell
                                    scope="row"
                                    id={`th-${i}-${idx}`}
                                    key={`th-${i}-${idx}`}
                                  >
                                    <Box
                                      className="data-area-email  mx-3"
                                      key={`th-${i}-${idx}`}
                                      id={`th-${i}-${idx}`}
                                    >
                                      <Stack direction={"row"} spacing={3}>
                                        <Checkbox
                                          size="small"
                                          onClick={() => {
                                            let tmp = [...checked];
                                            if (tmp.includes(i)) {
                                              tmp = tmp.filter(
                                                (id) => id !== i
                                              );
                                            } else {
                                              tmp.push(i);
                                            }
                                            setChecked(tmp);
                                          }}
                                          type="checkbox"
                                          key={`checkbox-th-${i}-${idx}`}
                                          id={`checkbox-th-${i}-${idx}`}
                                          checked={
                                            allChecked || checked.includes(i)
                                          }
                                        />
                                        <Typography
                                          htmlFor={`checkbox-th-${i}-${idx}`}
                                        >
                                          {o ? o : "N/A"}
                                        </Typography>
                                      </Stack>
                                    </Box>
                                  </TableCell>
                                ) : (
                                  <TableCell>
                                    <Box className="data-area-text  mx-3">
                                      {Object.keys(row)[idx].startsWith(
                                        "imageLink"
                                      ) ? (
                                        <img className="img-fluid" src={o} />
                                      ) : typeof o === "boolean" ? (
                                        o ? (
                                          "True"
                                        ) : (
                                          "False"
                                        )
                                      ) : o ? (
                                        o
                                      ) : (
                                        "N/A"
                                      )}
                                    </Box>
                                  </TableCell>
                                );
                              })}
                              {(!disabled || update) && (
                                <TableCell>
                                  <Box className="data-area-text  mx-3">
                                    <Box className="edt-del-btns">
                                      <Stack direction={"row"}>
                                        {(!disabled ||
                                          (disabled && update)) && (
                                          <IconButton>
                                            <BorderColorIcon
                                              onClick={() =>
                                                handleEdit(row, columns)
                                              }
                                            />
                                          </IconButton>
                                        )}
                                        {!disabled && (
                                          <IconButton>
                                            <DeleteForeverIcon
                                              color="error"
                                              onClick={() => handleDelete(row)}
                                            />
                                          </IconButton>
                                        )}
                                      </Stack>
                                    </Box>
                                  </Box>
                                </TableCell>
                              )}
                            </StyledTableRow>
                          )
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
