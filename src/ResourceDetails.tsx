import React, { useEffect, useState } from "react";
import axios from "axios";
import { Backdrop, CircularProgress } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import { BASE_URL } from "./constants";
import { AgGridReact } from "ag-grid-react";

function ResourceDetails() {
  const [isLoading, setLoading] = useState(false);
  const [rows, setRows] = useState<any>([]);

  //   <td>
  //     <Link to={`/application-details/${entry.Tags["app-name"]}`}>
  //       {entry.Tags["app-name"]}
  //     </Link>
  //   </td>
  //   <td>{entry.Tags.environment}</td>
  //   <td>{entry.Tags["business-unit"]}</td>
  // </tr>
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
      field: "ServiceName",
      sortable: true,
    },
    {
      headerName: "Tags",
      children: [
        {
          headerName: "App Name",
          cellRenderer: (params: any) => {
            return <Link to={`/application-details/${params.data.Tags["app-name"]}`}>
              {params.data.Tags["app-name"]}---
            </Link>
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
          valueFormatter: (params: any) => params.data.Tags["business-unit"],
          sortable: true,
        },
      ],
    },
  ]);
  let { name } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/resources/${name}`)
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
        columnDefs={columnDefs}
        rowData={rows}
        paginationPageSize={15}
        pagination={true}
      ></AgGridReact>

      {/* <table
        id="example"
        className="table table-striped table-bordered"
        style={{ width: "100%" }}
      >
        <thead>
          <tr>
            <th rowSpan={2}>#</th>
            <th rowSpan={2}>Consumed Quantity</th>
            <th rowSpan={2}>Cost</th>
            <th rowSpan={2}>Date</th>
            <th rowSpan={2}>Meter Category</th>
            <th rowSpan={2}>Resource Group</th>
            <th rowSpan={2}>Location</th>
            <th rowSpan={2}>ServiceName</th>
            <th colSpan={3}>Tags</th>
          </tr>
          <tr>
            <th>App Name</th>
            <th>Environment</th>
            <th>Business unit</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((entry: any, index: number) => (
            <tr>
              <td>{index + 1}</td>
              <td align="right">{entry.ConsumedQuantity}</td>
              <td align="right">$ {Number(entry.Cost).toFixed(2)}</td>
              <td>{entry.Date}</td>
              <td>{entry.MeterCategory}</td>
              <td>{entry.ResourceGroup}</td>
              <td>{entry.Location}</td>
              <td>{entry.ServiceName}</td>
              <td>
                <Link to={`/application-details/${entry.Tags["app-name"]}`}>
                  {entry.Tags["app-name"]}
                </Link>
              </td>
              <td>{entry.Tags.environment}</td>
              <td>{entry.Tags["business-unit"]}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
}

export default ResourceDetails;
