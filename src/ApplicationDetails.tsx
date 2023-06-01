/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Backdrop, CircularProgress } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import { BASE_URL } from "./constants";
import { AgGridReact } from "ag-grid-react";

function ApplicationDetails() {
  const [isLoading, setLoading] = useState(false);
  const [rows, setRows] = useState<any>([]);
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

  let columnDefs = [
    { headerName: "Make", field: "make" },
    { headerName: "Model", field: "model" },
    { headerName: "Price", field: "price" },
  ];

  let rowData = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 },
  ];

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
        rowData={rowData}
        className="ag-table"
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
            <th colSpan={2}>Tags</th>
          </tr>
          <tr>
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
              <td>
                <Link to={`/resource-details/${entry.ServiceName}`}>
                  {entry.ServiceName}
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

export default ApplicationDetails;
