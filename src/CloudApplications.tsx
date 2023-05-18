/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "datatables.net-dt";
import $ from "jquery";
import { Backdrop, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { BASE_URL } from "./constants";

let table;

function CloudApplications() {
  const [isLoading, setLoading] = useState(false);
  const [rows, setRows] = useState<any>([]);

  useEffect(() => {
    table = new DataTable("#myTable");
    console.log(table);
    setLoading(true);
    axios
      .get(`${BASE_URL}/raw`)
      .then(function (response) {
        setRows(response.data);
        $(document).ready(function () {
          $("#example").DataTable();
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

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <table
        id="example"
        className="table table-striped table-bordered"
        style={{ width: "100%" }}
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Consumed Quantity</th>
            <th>Cost</th>
            <th>Date</th>
            <th>Resource Group</th>
            <th>ServiceName</th>
            <th>Location</th>
            <th>Environment</th>
            <th>Business unit</th>
          </tr>
        </thead>
        <tbody>
          {rows.splice(0, 2000).map((entry: any, index: number) => (
            <tr>
              <td>{index + 1}</td>
              <td align="right">{entry.ConsumedQuantity}</td>
              <td align="right">${" "}{Number(entry.Cost).toFixed(2)}</td>
              <td>{entry.Date}</td>
              <td>{entry.Location}</td>
              <td>
                <Link to={`/application-details/${entry.ResourceGroup}`}>
                  {entry.ResourceGroup}
                </Link>
              </td>
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
      </table>
    </div>
  );
}

export default CloudApplications;
