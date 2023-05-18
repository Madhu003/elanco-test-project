/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "datatables.net-dt";
import $ from "jquery";
import { Backdrop, CircularProgress } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import { BASE_URL } from "./constants";

let table;

function ResourceDetails() {
  const [isLoading, setLoading] = useState(false);
  const [rows, setRows] = useState<any>([]);
  let { name } = useParams();

  useEffect(() => {
    table = new DataTable("#myTable");
    console.log(table);
    setLoading(true);
    axios
      .get(`${BASE_URL}/resources/${name}`)
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
              <td>{entry.ConsumedQuantity}</td>
              <td>
                {entry.Cost.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </td>
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
      </table>
    </div>
  );
}

export default ResourceDetails;
