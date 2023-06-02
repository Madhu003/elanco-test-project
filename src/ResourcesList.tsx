import React, { useEffect, useState } from "react";
import axios from "axios";
import { Backdrop, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";

import { BASE_URL } from "./constants";

const columnDefs = [
  {
    headerName: "#",
    field: "id",
    sortable: true,
    width: "200",
  },
  {
    headerName: "Application Name",
    field: "resourceName",

    cellRenderer: (params: any) => (
      <Link to={`/resource-details/${params.data.resourceName}`}>{params.data.resourceName}</Link>
    ),
    sortable: true,
    width: "",
  },
];
function ResourcesList() {
  const [isLoading, setLoading] = useState(false);
  const [gridApi, setGridApi] = useState<any>(null);

  const [agGridOps, setAgGridOps] = useState<any>({
    columnDefs,
    rowData: [],
    paginationPageSize: 15,
    pagination: true,
    cacheQuickFilter: true,
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/resources`)
      .then(function (response) {
        debugger;
        setAgGridOps({
          ...setAgGridOps,
          rowData: response.data.map((item: string, index: number) => ({
            id: index + 1,
            resourceName: item,
          })),
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        setLoading(false);
      });
  }, []);

  const onGridReady = (params: { api: React.SetStateAction<null> }) => {
    setGridApi(params.api);
  };

  const onSearchInputChange = (event: any) => {
    const { value } = event.target;
    gridApi?.setQuickFilter(value); // Apply filter on the grid
  };

  return (
    <div className="ag-theme-alpine container">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="search-bar">
        <input
          className="form-control"
          type="text"
          placeholder="Search..."
          onChange={onSearchInputChange}
        />
      </div>
      <AgGridReact {...agGridOps} onGridReady={onGridReady}></AgGridReact>
    </div>
  );
}

export default ResourcesList;
