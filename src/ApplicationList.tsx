import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "datatables.net-dt";
import $ from "jquery";
import { Backdrop, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { BASE_URL } from "./constants";

let table;

function ApplicationList() {
  const [rows, setRows] = useState<any>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    table = new DataTable("#myTable");
    console.log(table);
    setLoading(true);
    axios
      .get(`${BASE_URL}/applications`)
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
            <th>Application Name</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((entry: string, index: number) => (
            <tr>
              <td>{index + 1}</td>
              <td>
                <Link to={`/application-details/${entry}`}>{entry}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ApplicationList;
