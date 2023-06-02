import React, { useEffect, useState } from "react";
import axios from "axios";
import { Backdrop, CircularProgress } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import { BASE_URL } from "./constants";
import { AgGridReact } from "ag-grid-react";

const columnDefs = [
  {
    headerName: "#",
    valueFormatter: (params: { node: { rowIndex: number } }) =>
      params.node.rowIndex + 1,
    sortable: true,
  },
  {
    headerName: "Consumed Quantity",
    field: "ConsumedQuantity",
    cellStyle: {
      textAlign: "right",
    },
    sortable: true,
  },
  {
    headerName: "Cost",
    field: "Cost",
    valueFormatter: (params: { data: { Cost: any } }) =>
      "$" + Number(params.data.Cost).toFixed(2),
    cellStyle: {
      textAlign: "right",
    },
    sortable: true,
  },
  { headerName: "Date", field: "Date", sortable: true },
  { headerName: "Meter Category", field: "MeterCategory", sortable: true },
  { headerName: "Resource Group", field: "ResourceGroup", sortable: true },
  { headerName: "Location", field: "Location", sortable: true },

  {
    headerName: "Service Name",
    field: "ServiceName",
    sortable: true,
  },
  {
    headerName: "Tags",
    children: [
      {
        headerName: "App Name",
        cellRenderer: (params: any) => {
          return (
            <Link to={`/application-details/${params.data.Tags["app-name"]}`}>
              {params.data.Tags["app-name"]}---
            </Link>
          );
        },
        sortable: true,
      },
      {
        headerName: "Environment",
        field: "Tags.environment",
        sortable: true,
      },
      {
        headerName: "Business Unit",
        field: "Tags.business-unit",
        valueFormatter: (params: any) => params.data.Tags["business-unit"],
        sortable: true,
      },
    ],
  },
];

function ResourceDetails() {
  const [isLoading, setLoading] = useState(false);
  const [gridApi, setGridApi] = useState<any>(null);

  const [agGridOps, setAgGridOps] = useState<any>({
    columnDefs,
    rowData: [],
    paginationPageSize: 15,
    pagination: true,
    cacheQuickFilter: true
  });

  let { name } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/resources/${name}`)
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
  }, [name]);

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

export default ResourceDetails;
