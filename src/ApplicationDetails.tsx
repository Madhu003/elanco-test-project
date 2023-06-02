import React, { useEffect, useState } from "react";
import axios from "axios";
import { Backdrop, CircularProgress } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import { BASE_URL } from "./constants";
import { AgGridReact } from "ag-grid-react";

const columnDefs = [
  {
    headerName: "#",
    field: "id",
    sortable: true,
  },
  {
    headerName: "Consumed Quantity",
    field: "ConsumedQuantity",
    sortable: true,
    cellStyle: {
      textAlign: "right",
    },
  },
  {
    headerName: "Cost",
    field: "Cost",
    valueFormatter: (params: { data: { Cost: any } }) =>
      "$" + Number(params.data.Cost).toFixed(2),
    sortable: true,
    cellStyle: {
      textAlign: "right",
    },
  },
  { headerName: "Date", field: "Date", sortable: true },
  // { headerName: "Meter Category", field: "MeterCategory", sortable: true },
  { headerName: "Resource Group", field: "ResourceGroup", sortable: true },
  { headerName: "Location", field: "Location", sortable: true },
  {
    headerName: "Service Name",
    field: "ServiceName",
    cellRenderer: (params: any) => (
      <Link to={`/resource-details/${params.data.ServiceName}`}>
        {params.data.ServiceName}
      </Link>
    ),
    sortable: true,
  },
  {
    headerName: "Tags",
    children: [
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

function ApplicationDetails() {
  const [isLoading, setLoading] = useState(false);
  const [gridApi, setGridApi] = useState<any>(null);

  const [agGridOps, setAgGridOps] = useState<any>({
    columnDefs,
    rowData: [],
    paginationPageSize: 15,
    pagination: true,
    cacheQuickFilter: true,
  });

  let { appName } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/applications/${appName}`)
      .then(function (response) {
        setAgGridOps({
          ...setAgGridOps,
          rowData: response.data.map((item: any, index: number) => ({
            ...item,
            id: index + 1,
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
  }, [appName]);

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

export default ApplicationDetails;
