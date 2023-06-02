import React, { useEffect, useState } from "react";
import axios from "axios";
import { Backdrop, CircularProgress } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import { BASE_URL } from "./constants";
import { AgGridReact } from "ag-grid-react";

function ApplicationDetails() {
  const [isLoading, setLoading] = useState(false);
  const [rows, setRows] = useState<any>([]);
  const [columnDefs, setColumnDef] = useState([
    {
      headerName: "#",
      valueFormatter: (params: any) => params.node.rowIndex + 1,
      sortable: true,
    },
    {
      headerName: "Consumed Quantity",
      field: "ConsumedQuantity",
      sortable: true,
    },
    {
      headerName: "Cost",
      valueFormatter: (params: any) => Number(params.data.Cost).toFixed(2),
      sortable: true,
    },
    { headerName: "Date", field: "Date", sortable: true },
    { headerName: "Meter Category", field: "MeterCategory", sortable: true },
    { headerName: "Resource Group", field: "ResourceGroup", sortable: true },
    { headerName: "Location", field: "Location", sortable: true },
    {
      headerName: "Service Name",
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
          headerName: "Environment",
          valueFormatter: (params: any) => params.data.Tags["business-unit"],
          sortable: true,
        },
      ],
    },
  ]);
  let { appName } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/applications/${appName}`)
      .then(function (response) {
        setRows(response.data);
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
      <AgGridReact
        columnDefs={columnDefs.map((item) => ({ ...item, filter: true }))}
        rowData={rows}
        paginationPageSize={15}
        pagination={true}
      ></AgGridReact>
    </div>
  );
}

export default ApplicationDetails;
