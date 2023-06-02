import React, { useEffect, useState } from "react";
import axios from "axios";
import { Backdrop, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";

import { BASE_URL } from "./constants";

const columnDefs = [
  {
    headerName: "#",
    valueFormatter: (params: { node: { rowIndex: number; }; }) => params.node.rowIndex + 1,
    sortable: true,
    width: "200",
  },
  {
    headerName: "Application Name",
    cellRenderer: (params: any) => (
      <Link to={`/resource-details/${params.data}`}>{params.data}</Link>
    ),
    sortable: true,
    width: "",
  },
];
function ResourcesList() {
  const [isLoading, setLoading] = useState(false);

  const [agGridOps, setAgGridOps] = useState<any>({
    columnDefs,
    rowData: [],
    paginationPageSize: 15,
    pagination: true,
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/resources`)
      .then(function (response) {
        setAgGridOps({ ...setAgGridOps, rowData: response.data });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        setLoading(false);
      });
  }, []);

  return (
    <div className="ag-theme-alpine container">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <AgGridReact {...agGridOps}></AgGridReact>
    </div>
  );
}

export default ResourcesList;
