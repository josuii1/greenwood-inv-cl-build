import React from "react";
import { Table } from 'react-bootstrap';

function WorkOrderTable({ data }) {
  return (
    <Table striped bordered>
      <thead>
        <tr>
          <th>#</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Qty</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, rowIndex) => (
          <tr key={rowIndex}>
            <td>{item.MFGNUM_0}</td>
            <td>{item.STRDAT_0}</td>
            <td>{item.ENDDAT_0}</td>
            <td>{item.EXTQTY_0} EA</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default WorkOrderTable;
